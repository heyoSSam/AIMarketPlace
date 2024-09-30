import contractAbi from '../../../smartcontracts/artifacts/contracts/AI.sol/AIMarketPlace.json';
const contractAddress = "0x6D90fDd1fA486b29c1f36F7d172Ed20641976F1A";
const state = {
    account: '',
    setAccount: (value: string) => {
        state.account = value; // Function to update the account
    },
};
export {contractAbi, contractAddress, state}
