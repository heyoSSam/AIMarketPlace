import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require('dotenv').config();

const config: HardhatUserConfig = {
  solidity: "0.8.27",
  networks: {
    holesky: {
      url: process.env.ALCHEMY_HOLESKY_URL, 
      accounts: [process.env.DEPLOYER_PRIVATE_KEY] 
    }
  },
};

export default config;
