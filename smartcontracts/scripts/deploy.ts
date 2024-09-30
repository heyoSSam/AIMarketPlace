const { ethers } = require("hardhat");

async function main() {
  // Get the deployer account
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // Get the contract factory and deploy the contract
  const MyContract = await ethers.getContractFactory("AIMarketPlace"); // Replace with your contract name
  const contract = await MyContract.deploy(); // Add constructor arguments if needed

  console.log("Contract deployed to address:", contract.target);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });