require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-ethers');
require("hardhat-contract-sizer");

if (process.env.REPORT_GAS) {
  require('hardhat-gas-reporter');
}

if (process.env.REPORT_COVERAGE) {
  require('solidity-coverage');
}

require("dotenv").config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: '0.8.11',
    settings: {
      optimizer: {
        enabled: true,
        runs: 800,
      },
    },
  },
  networks: {
    rinkeby: {
      url: process.env.ALCHEMY_RINKEBY,
      accounts: [process.env.ADMIN_PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: {
      rinkeby: process.env.ETHERSCAN_API
    },
    customChains: [
      {
        network: "rinkeby",
        chainId: 4,
        urls: {
          apiURL: `https://api-rinkeby.etherscan.io/api`,
          browserURL: "https://rinkeby.etherscan.io"
        }
      }
    ]
  },
  gasReporter: {
    currency: 'USD',
    gasPrice: 100,
    showTimeSpent: true,
  },
  plugins: ['solidity-coverage'],
};
