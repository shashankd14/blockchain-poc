const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

//remove the contents of the entire build folder-->
const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

//read 'Campaign.sol' from the 'contracts' folder
const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf-8');

//compile both contracts (Campaign, CampaignFactory) with the solidity compiler
const output = solc.compile(source, 1).contracts;

//creates 'build' folder if none exists
fs.ensureDirSync(buildPath);

for(let contract in output){
  let name = contract.replace(':', '');
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(':', '') + '.json'),
    output[contract]
  );

}
