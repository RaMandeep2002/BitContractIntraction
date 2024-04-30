const { Web3 } = require('web3');
require('dotenv').config();
const contractabi = require('./contractabi.json');
const tokencontractabi = require('./tokenContractabi.json');

// Provider URL from environment variables
const providerUrl = `${process.env.API_KEY}`;

// Contract address and token contract address
const contractAddress = '0xac4b76d96cd3074db649d2c6de9fce973152da6d';
const tokencontractaddress = '0x63F7a20eF2C7E5A77A578Ca97762cdd1fE710589';

// Amount of tokens to approve (in smallest units)
const bitamount = 100;

const walletOne = '0xfD2E0FBe4A8a871702F464D7dB888bb3814f4A93';
const walletTwo = '0xFa7E807a6084579cecA61Dc44678EC03627199d4';

// Create a new Web3 instance with the provider URL
const web3 = new Web3(providerUrl);

// Create instances of the contract and token contract
const contract = new web3.eth.Contract(contractabi, contractAddress);
const tokencontract = new web3.eth.Contract(
  tokencontractabi,
  tokencontractaddress
);
web3.eth.accounts.wallet.add(`0x${process.env.PRIVATE_KEY}`);
var gasPrice = web3.eth.getGasPrice();
/**
 * Function to approve token
 */
const tokenapprove = async () => {
  //   console.log('gas Price ==> ', gasPrice);
  console.log('tokenapprove log1');
  // return
  try {
    // Wallet addresses
    const account = 'add you address';
    const useraccount = 'add user account';
    // Send approval transaction
    await tokencontract.methods
      .approve(contractAddress, bitamount)
      .send({ from: account })
      .on('transactionHash', (hash) => {
        console.log('Approval Transaction Hash:', hash);
      })
      .on('receipt', (receipt) => {
        console.log('Approval Receipt:', receipt);
      })
      .on('error', (error) => {
        console.error('Approval Error:', error);
      });
  } catch (err) {
    console.log('Error ===> ', err);
  }
};

const onStartBit = async () => {
  //   console.log('gas Price ==> ', gasPrice);
  console.log('onStartBit log2');
  // return
  try {
    // Wallet addresses
    const account = 'add you address';
    const useraccount = 'add user account';
    // Send approval transaction
    await contract.methods
      .onStartBit(useraccount, bitamount, walletOne, walletTwo)
      .send({ from: account })
      .on('transactionHash', (hash) => {
        console.log('onStartBit Transaction Hash:', hash);
      })
      .on('receipt', (receipt) => {
        console.log('onStartBit Receipt:', receipt);
      })
      .on('error', (error) => {
        console.error('onStartBit Error:', error);
      });
  } catch (err) {
    console.log('Error ===> ', err);
  }
};
// Call the tokenapprove function

async function main() {
  await tokenapprove();
  // setTimeout(() => {
  await onStartBit();
  // }, 5000);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
