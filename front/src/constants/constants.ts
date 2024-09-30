import contractAbi from '../../../smartcontracts/artifacts/contracts/AI.sol/AIMarketPlace.json';
const contractAddress = "0x1E7d75A4f1507fFf1C9bc17F84AAE20355934554";
const state = {
    account: '',
    setAccount: (value: string) => {
        state.account = value; // Function to update the account
    },
};
export {contractAbi, contractAddress, state}
