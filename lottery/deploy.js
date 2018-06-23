const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider('absorb early gate abandon daughter control dismiss stuff radar salute pencil knife','https://rinkeby.infura.io/3WjKX7omSSWVUo52TDLB'
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('Atempting to deploy from the account: ',accounts[0]);

  result = await new web3.eth.Contract(JSON.parse(interface))
  .deploy({ data: '0x' + bytecode })
  .send({ from: accounts[0], gas: '1000000'});
console.log (interface);
  console.log('Contract deployed to: ', result.options.address);

};
deploy();
