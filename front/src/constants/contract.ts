import Web3 from 'web3';
import {contractAbi, contractAddress} from './constants';

const web3 = new Web3((window as any).ethereum);
const contract = new web3.eth.Contract(contractAbi.abi, contractAddress);

export {contract}