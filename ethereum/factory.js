import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  //'0x609827309069B12445FDe558FC89359516579109'
  '0x0398d78C41A8D2E9200806054A0d5c5C19B38bDf'
);

export default instance;
