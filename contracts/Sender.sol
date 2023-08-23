// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import {IERC20} from "@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IERC20.sol";
import {IAxelarGateway} from "@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGateway.sol";
import {IAxelarGasService} from "@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGasService.sol";

contract Sender {
    address public owner;
    IAxelarGasService immutable gasService;
    IAxelarGateway immutable gateway;

    constructor(address _gateway, address _gasReceiver) {
        gateway = IAxelarGateway(_gateway);
        gasService = IAxelarGasService(_gasReceiver);
        owner = msg.sender; // Set the contract creator as the owner initially
    }

     struct Payment {
        address sender;
        address receiver;
        string destinationChain;
        uint256 amount;
        uint256 paymentId;
    }

    mapping(address => mapping(uint256 => Payment)) public sentPayments;
    mapping(address => mapping(uint256 => Payment)) public receivedPayments;
    
    Payment[] public payments;
    uint256 public currPaymentId = 0;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    function sendToken(
        string memory destinationChain,
        string memory destinationAddress,
        address senderAddress,
        address receiverAddress,
        string memory symbol,
        uint256 amount
    ) external payable onlyOwner {
        require(msg.value > 0, 'Gas payment is required');
        address tokenAddress = gateway.tokenAddresses(symbol);

        IERC20(tokenAddress).transferFrom(senderAddress, address(this), amount);
        IERC20(tokenAddress).approve(address(gateway), amount);
        bytes memory payload = abi.encode(receiverAddress);
        currPaymentId++;
        Payment memory payment = Payment(senderAddress, receiverAddress, destinationChain,amount,currPaymentId);
        sentPayments[senderAddress][currPaymentId] = payment;
        receivedPayments[receiverAddress][currPaymentId] = payment;
        payments.push(payment);

        gasService.payNativeGasForContractCallWithToken{ value: msg.value }(
            address(this),
            destinationChain,
            destinationAddress,
            payload,
            symbol,
            amount,
            msg.sender
        );
        gateway.callContractWithToken(destinationChain, destinationAddress, payload, symbol, amount);
    }

    function getSentPayments(address _sender) external view returns (Payment[] memory) {
        Payment[] memory result = new Payment[](currPaymentId);
        uint256 count = 0;
        for (uint256 i = 1; i <= currPaymentId; i++) {
            if (sentPayments[_sender][i].sender == _sender) {
                result[count] = sentPayments[_sender][i];
                count++;
            }
        }
        return result;
    }

       function getReceivedPayments(address _receiver) external view returns (Payment[] memory) {
        Payment[] memory result = new Payment[](currPaymentId);
        uint256 count = 0;
        for (uint256 i = 1; i <= currPaymentId; i++) {
            if (receivedPayments[_receiver][i].receiver == _receiver) {
                result[count] = receivedPayments[_receiver][i];
                count++;
            }
        }
        return result;
    }

}
