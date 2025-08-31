require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
const {vars} = require("hardhat/config");

/** @type import('hardhat/config').HardhatUserConfig */


module.exports = {
    solidity: {
        version: "0.8.29",
        settings: {
            optimizer: {
                enabled: true,
                runs: 1000
            }
        }
    },

    networks: {
        very: {
            url: "https://rpc.verylabs.io",
            chainId: 4613,
            accounts: [`0x${vars.get("PRIVATE_KEY")}`]
        }
    },
    paths: {
        sources: "./contracts",
        tests: "./test-hardhat", // i deleted test-hardhat, i am using foundry to test
        cache: "./hh-cache",
        artifacts: "./hh-artifacts"
    }
};