const { Web3 } = require('web3');
require('dotenv').config();
const contractabi = require('./contractabi.json');
const tokencontractabi = require('./tokenContractabi.json');

/**
 * Function to approve token
 */
const tokenapprove = async () => {
  // Provider URL from environment variables
  const providerUrl = `${process.env.API_KEY}`;

  // Contract address and token contract address
  const contractAddress = '0xac4b76d96cd3074db649d2c6de9fce973152da6d';
  const tokencontractaddress = '0x63F7a20eF2C7E5A77A578Ca97762cdd1fE710589';

  // Amount of tokens to approve (in smallest units)
  const bitamount = 100;

  const walletOne = '0xaC7162fA7F60f1463594bD704d922aeD05C2702B';
  const walletTwo = '0x313905A1CB9C1D9fa190e913B00Ffe00Ed17639C';

  // Create a new Web3 instance with the provider URL
  const web3 = new Web3(providerUrl);

  // Create instances of the contract and token contract
  const contract = new web3.eth.Contract(contractabi, contractAddress);
  const tokencontract = new web3.eth.Contract(
    tokencontractabi,
    tokencontractaddress
  );
  web3.eth.accounts.wallet.add(`0x${process.env.PRIVATE_KEY}`);
  var gasPrice = await web3.eth.getGasPrice();
  //   console.log('gas Price ==> ', gasPrice);
  try {
    // Wallet addresses
    const account = '0xb62962Bb2661BC5c5fFfa648A2C2B7A3e8CD4d4B';

    // Send approval transaction
    tokencontract.methods
      .approve(contractAddress, bitamount)
      .send({ from: account, gasLimit: 190785, gasPrice: 1000000000 })
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
// Call the tokenapprove function
tokenapprove();
