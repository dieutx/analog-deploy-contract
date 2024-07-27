require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
require("dotenv").config();

module.exports = {
  defaultNetwork: "sepolia",
  solidity: "0.8.26",
  networks: {
    shibuya: {
      url: "https://evm.shibuya.astar.network", //URL of the RPC node for Swisstronik.
      accounts: [process.env.PRIVATE_KEY], //
      //Make sure you have enough funds in this wallet to deploy the smart contract
    },
	sepolia: {
      url: "https://rpc2.sepolia.org",
      accounts: [process.env.PRIVATE_KEY], //
      //Make sure you have enough funds in this wallet to deploy the smart contract
    },
  },
  etherscan: {
	
	apiKey: process.env.ETHERSCAN_API_KEY,
	/*
	apiKey: {
      // Is not required by blockscout. Can be any non-empty string
      'sepolia': process.env.ETHERSCAN_API_KEY
    },
	*/
	customChains: [
      {
        network: "shibuya",
        chainId: 81,
        urls: {
          apiURL: "https://shibuya.blockscout.com/api",
          browserURL: "https://shibuya.blockscout.com/",
        }
      },
	  {
        network: "sepolia",
        chainId: 11155111,
        urls: {
          apiURL: "https://eth-sepolia.blockscout.com/api",
          browserURL: "https://eth-sepolia.blockscout.com/",
        }
      }
    ]
  },
  sourcify: {
    // Disabled by default
    // Doesn't need an API key
    enabled: true
  },
};