import { Client, GatewayIntentBits } from 'discord.js';
const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ] 
});
// const keepAlive = require("./server")
// const Database = require("@replit/database")
import Database from '@replit/database'
import { ethers } from "ethers";
// import contractABI from './contract.json'
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
const TOKEN = process.env['TOKEN']
const KEY = process.env['PVTKEY']
import express from 'express'
const app = express();
// const PORT = 3000;

const usernameToAddress = new Database()
const addressToUsername = new Database()

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
app.post('/register', (req, res) => {
    const { discordUsername, userAddress } = req.body;
    if (!discordUsername || !userAddress) {
        return res.status(400).send('Both discordUsername and userAddress are required.');
    }
    //store in database
  usernameToAddress.set(discordUsername, userAddress)
  addressToUsername(userAddress,discordUsername)
  console.log(`Received: Discord Username - ${discordUsername}, User Address -     
  ${userAddress}`);
  res.send('Registration successful!');
});

app.get('/address/:userName', (req, res) => {
    const { userName } = req.params;
    let userAddress = usernameToAddress.get(userName)
    if (!userAddress) {
        return res.status(404).send('User not found.');
    }
    res.json(userAddress);
});

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });


client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

function getProvider(chainName) {
    switch (chainName) {
        case 'ethereum-goerli':
            return new ethers.providers.JsonRpcProvider('https://goerli.infura.io/v3/YOUR_INFURA_PROJECT_ID');
        case 'polygon-mumbai':
            return new ethers.providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com/');
        case 'celo-alfajores':
            return new ethers.providers.JsonRpcProvider('https://alfajores-forno.celo-testnet.org');
        case 'base-testnet':
            return new ethers.providers.JsonRpcProvider('YOUR_BASE_TESTNET_RPC_URL'); // Replace with the RPC URL for Base testnet when available
        default:
            console.error(`Unsupported chain: ${chainName}`);
            return null;
    }
}

const COMMANDS = {
    '$deposit': 'Deposit tokens into the discord bot for future use on our website.',
    '$register': 'Link your discord account with your wallet on our website.',
    '$transfer address': 'Transfer tokens to a specified address. Usage: $transfer address [amount] [tokenSymbol] [toAddress] [senderChain] [receiverChain] (optionalEmail)',
    '$transfer username': 'Transfer tokens to a Discord user\'s registered address. Usage: $transfer username [amount] [tokenSymbol] [toUsername] [senderChain] [receiverChain] (optionalEmail)',
  '$help': 'Displays this help message.',
  '$bridge': 'Bridge tokens between chains. Usage: $bridge [amount] [tokenSymbol] [fromChain] [toChain]',
   // '$getSentPayments [chain]': 'Retrieve the top 5 payments sent by the user on the specified chain',
   // '$getReceivedPayments [chain]': 'Retrieve the top 5 payments received by the user on the specified chain'
};


client.on("messageCreate",async (msg) => {
  if (msg.author.bot) return
  // console.log("Message");
  // console.log(msg);
  // console.log(msg.content)

  if (msg.content == "$deposit") {
  msg.channel.send('Deposit tokens into the discord bot for future use on our website: [YOUR_WEBSITE_URL]') 
}
  
  if (msg.content == "$register") {
    //link discord username to wallet-address given
    //optional parameter of email/phone or get linked email/phone from discord
  msg.channel.send('Link your discord account with your wallet on our website [YOUR_WEBSITE_URL]');
    
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

    // const provider = getProvider(senderChain);
    // console.log(ethers)
    // console.log(ethers.providers)
  const provider = new ethers.providers.JsonRpcProvider("https://celo-alfajores.infura.io/v3/3829e40831594f05a2e04ef536263af6");

  const wallet = new ethers.Wallet(KEY, provider);
  const contract = new ethers.Contract("0x3933C2024998Eb96400638B51600309cFfB3196A",contractABI, wallet);

    const destinationChain = receiverChain;
    const destinationContractAddress = "0xaBDE735f8ff2a47937C101Ee5c76e87abe7A9E9B";//deployed on Fantom
    // const username = msg.author.username;
    // const senderAddress = usernameToAddress(username);
    const senderAddress = "0x58141dAB6824Ba4c5810852c697CBaF83CFdF268";

    try {

      //amount should be less than approved given
      // console.log(typeof amount)
      //ethers.utils.parseUnits(amount, 18)
      // const fees = ethers.utils.parseEther('0.1');

      const balance = await provider.getBalance("0x9bAeFa966911F13D74b79Fe01b98b18c218800a6");
      console.log("Balance is: ",balance)
      // const fees = ethers.parseUnits("0.1", "ether");
      // console.log(ethers)
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

  if (command === '$bridge') {
    if (args.length < 3) {
            return msg.reply('Usage: $bridge [tokenSymbol] [amount] [destChain]');
        }

        const [tokenSymbol, amount, destinationChain] = args;

         const provider = new ethers.providers.JsonRpcProvider("https://celo-alfajores.infura.io/v3/3829e40831594f05a2e04ef536263af6");

  const wallet = new ethers.Wallet(KEY, provider);
  const contract = new ethers.Contract("0x3933C2024998Eb96400638B51600309cFfB3196A",contractABI, wallet);

    const destinationContractAddress = "0xaBDE735f8ff2a47937C101Ee5c76e87abe7A9E9B";//deployed on Fantom
    // const username = msg.author.username;
    // const senderAddress = usernameToAddress(username);
    const senderAddress = "0x58141dAB6824Ba4c5810852c697CBaF83CFdF268";
    const toAddress = senderAddress;

    try {

      //amount should be less than approved given
      const balance = await provider.getBalance("0x9bAeFa966911F13D74b79Fe01b98b18c218800a6");
      console.log("Balance is: ",balance)
const tx = await contract.sendToken(destinationChain,destinationContractAddress,senderAddress,toAddress, tokenSymbol,amount,{
  value: ethers.utils.parseEther('0.4')
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
  }
  if (command === '$getSentPayments' || command === '$getReceivedPayments') {
    if (args.length < 1) {
        return msg.reply('Usage: $getSentPayments [chain] or $getReceivedPayments [chain]');
    }
    

    const chain = args[0];
    const provider = getProvider(chain);
    const wallet = new ethers.Wallet(KEY, provider);
  const contract = new ethers.Contract("0x3933C2024998Eb96400638B51600309cFfB3196A",contractABI, wallet);

    if (!provider) {
        return msg.reply(`Unsupported chain: ${chain}`);
    }

    try {
        
        const username = msg.author.username;
        const curAddress = usernameToAddress(username);
        const history="";
        if(command == '$getSentPayments')
          history = await contract.getSentPayments(curAddress);
        else
          history = await contract.getReceivedPayments(curAddress);
          
        const top5Payments = history.slice(0, 5);
        let response = `Top 5 Sent payments:\n`;
        top5Payments.forEach(tx => {
            response += `Transaction ${tx}`;
        });

        msg.reply(response);
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