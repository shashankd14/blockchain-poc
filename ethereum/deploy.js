const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
  'retire symptom interest loud humble play toilet maze illegal virtual gold upper',
  'https://rinkeby.infura.io/c3af6212bb5644c888e616635e0ed4b8'
);

const web3 = new Web3(provider);

const deploy = async()=>{
  const accounts = await web3.eth.getAccounts();
  console.log('Attempting to deploy from accounts', accounts[0]);

const result =  await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({data: compiledFactory.bytecode})
    .send({ gas: '1000000', from: accounts[0] });

console.log('Contract deployed to', result.options.address);
};

deploy();
