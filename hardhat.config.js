require("@nomiclabs/hardhat-waffle");
require('solidity-coverage');
require("@nomiclabs/hardhat-etherscan");
require('dotenv').config();

module.exports = {
 
  networks: {
    ropsten: {
      url: `https://ropsten.infura.io/v3/${process.env.infuraId}`,
      accounts: [process.env.privateKey]
    },
    mainnet:{
      url:`https://mainnet.infura.io/v3/${process.env.infuraId}`,
      accounts: [process.env.privateKey]
    },
    kovan:{
      url: `https://kovan.infura.io/v3/${process.env.infuraId}`,
      accounts: [process.env.privateKey]
    },
    rinkeby:{
      url: `https://rinkeby.infura.io/v3/${process.env.infuraId}`,
      accounts: [process.env.privateKey]
    },
    goerli:{
      url: `https://goerli.infura.io/v3/${process.env.infuraId}`,
      accounts: [process.env.privateKey]
    },
    sepolia:{
      url: `https://sepolia.infura.io/v3/${process.env.infuraId}`,
      accounts: [process.env.privateKey]
    },
    binance_testnet:{
      url:`https://data-seed-prebsc-1-s1.binance.org:8545`,
      accounts: [process.env.privateKey]
    },
    binance_mainnet:{
      url:`https://bsc-dataseed1.binance.org`,
      accounts: [process.env.privateKey]
    }
  },
  etherscan: {
    apiKey: process.env.BSCSCAN_API_KEY
  },
  solidity: {
    version: "0.8.10",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  mocha: {
    timeout: 1000000
  }
};