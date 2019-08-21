import Web3 from 'web3';

//const web3 = new Web3(window.web3.currentProvider); -- window is not defined
let web3;

//inside the browser and metamask is availabale
if(typeof window !== 'undefined' && window.web3 !== 'undefined'){
//we are in the browser and metamask is running
  web3 = new Web3(window.web3.currentProvider);
} else{
  //we are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/c3af6212bb5644c888e616635e0ed4b8'
  );
  web3 = new Web3(provider);
}

export default web3;
