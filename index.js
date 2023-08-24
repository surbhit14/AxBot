import { Client, GatewayIntentBits } from 'discord.js';
const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ] 
});
import Database from "@replit/database";
const usernameToAddress = new Database();
import { ethers } from "ethers";
let contractABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "destinationChain",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "destinationAddress",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "senderAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "receiverAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "symbol",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "sendToken",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_gateway",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_gasReceiver",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "currPaymentId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_receiver",
				"type": "address"
			}
		],
		"name": "getReceivedPayments",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "sender",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "receiver",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "destinationChain",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "paymentId",
						"type": "uint256"
					}
				],
				"internalType": "struct Escrow.Payment[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_sender",
				"type": "address"
			}
		],
		"name": "getSentPayments",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "sender",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "receiver",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "destinationChain",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "paymentId",
						"type": "uint256"
					}
				],
				"internalType": "struct Escrow.Payment[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "payments",
		"outputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "destinationChain",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "paymentId",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "receivedPayments",
		"outputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "destinationChain",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "paymentId",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "sentPayments",
		"outputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "destinationChain",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "paymentId",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
let ERC20abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name_",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "symbol_",
				"type": "string"
			},
			{
				"internalType": "uint8",
				"name": "decimals_",
				"type": "uint8"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "InvalidAccount",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
const TOKEN = process.env['TOKEN']
const KEY = process.env['PVTKEY']
import express from 'express'
import cors from 'cors'
const app = express();
// const PORT = 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function keepAlive() {
  app.listen(3000, () => {
    console.log("Server is ready.")
  })
}

// Express routes
app.get('/', (req, res) => {
    res.send('Bot Backend is Running!');
});

//Late the option for email or phone number
app.post('/register', async(req, res) => {
    let { discordUsername, userAddress } = req.body;
    if (!discordUsername || !userAddress) {
        return res.status(400).send('Both discordUsername and userAddress are required.');
    }
  discordUsername = discordUsername.split("#")[0];
  console.log(`Received: Discord Username - ${discordUsername}, User Address -     
  ${userAddress}`);
  
  await usernameToAddress.set(discordUsername, userAddress);
  let newAddr = await usernameToAddress.get(discordUsername);
  console.log(newAddr);
  // await usernameToAddress.delete(discordUsername)
  res.send(`Registration successful! for ${newAddr}`);
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

function getProvider(chainName) {
    switch (chainName) {
        case 'ethereum-2'://goerli
            return new ethers.providers.JsonRpcProvider('https://goerli.infura.io/v3/3829e40831594f05a2e04ef536263af6');
        case 'Avalanche':
            return new ethers.providers.JsonRpcProvider('https://avalanche-fuji.infura.io/v3/3829e40831594f05a2e04ef536263af6');
        case 'celo':
            return new ethers.providers.JsonRpcProvider('https://celo-alfajores.infura.io/v3/3829e40831594f05a2e04ef536263af6');
        case 'linea':
            return new ethers.providers.JsonRpcProvider('https://linea-goerli.infura.io/v3/3829e40831594f05a2e04ef536263af6');
        default:
            console.error(`Unsupported chain: ${chainName}`);
            return null;
    }
}

const sendingContractAddresses = {
  'ethereum-2': '0x55473C40312325C3d9842a58064108D26afb0B55',
  'Avalanche':'0x83322721A389BEAa9419920e38e42532C7a3A041',
  'celo':'0x48d224D52bAeF97d13c438B0826b5344e038F6Dd',
  'linea':'0x4a2D1E38ac018bb1b1a34B8f8b0a403e8fDC2D55',
}

const receivingContractAddresses = {
  'ethereum-2': '0x923058019341b417c97e2DaC2aa52b4BC778fF47',
  'Avalanche':'0x4Fdc7fa4ffC5095e26cB854637A1EEA38Bd025df',
  'celo':'0x8CdaAdE4880b63b7c40c1b6E4F5029D31BeB33b0',
  'linea':'0x55473C40312325C3d9842a58064108D26afb0B55',
  'Fantom':'0x3933C2024998Eb96400638B51600309cFfB3196A'
}

const ERC20TokenAddressesByChain = {
    'aUSDC': {
        'ethereum-2': '0x254d06f33bDc5b8ee05b2ea472107E300226659A',//eth-goerli
        'Avalanche':'0x57F1c63497AEe0bE305B8852b354CEc793da43bB',
        'celo':'0x254d06f33bDc5b8ee05b2ea472107E300226659A',
        'linea':'0x254d06f33bDc5b8ee05b2ea472107E300226659A'
    },
    'wAXL':{
      'ethereum-2': '0x23ee2343B892b1BB63503a4FAbc840E0e2C6810f',
        'Avalanche':'0xa8B51e6517f9A6Ab7b247bF10b71b1A738eD8E50',
        'celo':'0x23ee2343B892b1BB63503a4FAbc840E0e2C6810f',
        'linea':'0x23ee2343B892b1BB63503a4FAbc840E0e2C6810f'
    },
    'celo':{
      'celo':'0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9'
    }
};
const COMMANDS = {
    '$deposit': 'Deposit tokens into the discord bot for future use on our website.',
    '$register': 'Link your discord account with your wallet on our website.',
    '$transfer address': 'Transfer tokens to a specified address. Usage: $transfer address [amount] [tokenSymbol] [toAddress] [senderChain] [receiverChain]',
    '$transfer username': 'Transfer tokens to a Discord user\'s registered address. Usage: $transfer username [amount] [tokenSymbol] [toUsername] [senderChain] [receiverChain] (optionalEmail)',
  '$bridge': 'Bridge tokens between chains. Usage: $bridge [amount] [tokenSymbol] [srcChain][destChain]',
   '$getSentPayments [chain]': 'Retrieve the top 5 payments sent by the user on the specified chain',
   '$getReceivedPayments [chain]': 'Retrieve the top 5 payments received by the user on the specified chain',
    '$help': 'Displays all the commands available.'
};

client.on("messageCreate",async (msg) => {
  if (msg.author.bot) return
  if (msg.content == "$deposit") {
  msg.channel.send('Deposit tokens into the discord bot for future use on our website: https://axbot-seven.vercel.app/') 
}
  
  if (msg.content == "$register") {
    //link discord username to wallet-address given
    //optional parameter of email/phone or get linked email/phone from discord
    msg.channel.send('Link your discord account with your wallet on our website https://axbot-seven.vercel.app/');
}

    const args = msg.content.split(' ');
    const command = args.shift().toLowerCase();
  if (command === '$transfer') {
    if (args.length < 6) {
        return msg.reply('Usage: $transfer [method: address/username] [amount] [tokenSymbol] [toRecipient] [senderChain] [receiverChain] (optionalEmail)');
    }

    const [method, amount, tokenSymbol, toRecipient, senderChain, receiverChain, email] = args;
    console.log(method);
    if (method !== 'address' && method !== 'username') {
        return msg.reply('Invalid method. Please use "address" or "username".');
    }
    
    let toAddress;
    if (method === 'address') {
        toAddress = toRecipient;
    } else if (method === 'username') {
        // Mapping of Discord usernames to wallet addresses
          toAddress = usernameToAddress.get(toRecipient);
        if (!toAddress) {
            return msg.reply(`No address found for username ${toRecipient}.`);
        }
    }
    
  const provider = getProvider(senderChain);
  const wallet = new ethers.Wallet(KEY, provider);
  const srcContractAddress = sendingContractAddresses[senderChain];
  console.log(`Sending Contract Address: ${srcContractAddress}`)  
  const destinationChain = receiverChain;
  const destinationContractAddress = receivingContractAddresses[destinationChain]
  console.log(`Destination Contract Address: ${destinationContractAddress}`)  
  const contract = new ethers.Contract(srcContractAddress,contractABI, wallet);

    const userName = msg.author.username;
    console.log(`Username: ${userName}`)
    const senderAddress = await usernameToAddress.get(userName);

    try {
      //amount should be less than approved given
const tx = await contract.sendToken(destinationChain,destinationContractAddress,senderAddress,toAddress, tokenSymbol,amount,{
  value: ethers.utils.parseEther('0.5')//getBigInt
});
      
      await tx.wait();
      console.log(`Transfer successful! Transaction hash: ${tx.hash}`)
      msg.reply(`Tokens transferred successfully`);
    } catch (error) {
      console.log(`Error: ${error.message}`);
      msg.reply(`Some problem occured`);
    }
}

  if (command === '$bridge') {
    if (args.length < 4) {
            return msg.reply('Usage: $bridge [amount] [tokenSymbol] [srcChain][destChain]');
        }

        const [amount, tokenSymbol,srcChain,destinationChain] = args;

      const provider = getProvider(srcChain);
  const wallet = new ethers.Wallet(KEY, provider);
  const srcContractAddress = sendingContractAddresses[srcChain];
  const destinationContractAddress = receivingContractAddresses[destinationChain]
  const contract = new ethers.Contract(srcContractAddress,contractABI, wallet);

  const userName = msg.author.username;
  const senderAddress = usernameToAddress.get(userName);
  const toAddress = senderAddress;

    try {

      //amount should be less than approved given
      const balance = await provider.getBalance("0x9bAeFa966911F13D74b79Fe01b98b18c218800a6");
      console.log("Balance is: ",balance)
      const tx = await contract.sendToken(destinationChain,destinationContractAddress,senderAddress,toAddress, tokenSymbol,amount,{
  value: ethers.utils.parseEther('0.4')//getBigInt
});
      
      await tx.wait();
      console.log(`Transfer successful! Transaction hash: ${tx.hash}`)
      msg.reply(`Tokens transferred successfully`);
    } catch (error) {
      console.log(`Error: ${error.message}`);
      msg.reply(`Some problem occured`);
    }
  }

  if (command === '$balance') {
    //use getApproval function of token
    const userName = msg.author.username;
    console.log(`Username: ${userName}`)
    const ownerAddress = await usernameToAddress.get(userName);
    for (let token in ERC20TokenAddressesByChain) {
        console.log(`Token: ${token}`);
    
    for (let chain in ERC20TokenAddressesByChain[token]) {
        console.log(`  Chain: ${chain}`);
        let deployedContract =  sendingContractAddresses[chain]
        let contractAddr = ERC20TokenAddressesByChain[token][chain];
        console.log(`  Address: ${ERC20TokenAddressesByChain[token][chain]}`);
      //call approve function of this contract 
      const provider = getProvider(chain);
  // const wallet = new ethers.Wallet(KEY, provider);
  const contract = new ethers.Contract(contractAddr,ERC20abi, provider);
      //owner,spender(deployed address for this chain)
      const balance = await contract.allowance(ownerAddress,deployedContract);
        // console.log(`Balance for Chain: ${chain} and Token: ${token}: ${balance}`);
      msg.channel.send(`Balance for Chain: ${chain} and Token: ${token}: ${balance}`)
      // msg.reply(`Tokens transferred successfully`);
    }
}
    
}
  
if (command === '$getSentPayments') {
    if (args.length < 1) {
        return msg.reply('Usage: $getSentPayments [chain]');
    }
    console.log("Inside get Payments")
    const chain = args[0];
    const provider = getProvider(chain);
    // const wallet = new ethers.Wallet(KEY, provider);

    //sendingContract 
  const contractAddr = sendingContractAddresses[chain];
  const contract = new ethers.Contract(contractAddr,contractABI, provider);
  try {
        const username = msg.author.username;
        const curAddress = usernameToAddress.get(username);
        const history = await contract.getSentPayments(curAddress);
        console.log(history);          
        msg.reply(history);
    } catch (error) {
        console.error('Error fetching transaction history:', error.message);
        msg.reply('Error fetching transaction history. Please try again later.');
    }
}

  if (command === '$help') {
    let response = 'Here are the available commands:\n\n';

    for (const cmd in COMMANDS) {
        response += `**${cmd}**: ${COMMANDS[cmd]}\n`;
    }

    msg.reply(response);
  }
})
client.login(TOKEN);
keepAlive()

