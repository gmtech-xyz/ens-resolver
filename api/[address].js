const ENS = require('ethereum-ens');
const Web3 = require('web3');

const web3Provider = new Web3.providers.HttpProvider(
  process.env.RPC_URL
);

const ensProvider = new ENS(web3Provider);

export default async function handler(req, res) {
  try {
    const address = req.query.address;
    const name = await (ensProvider.reverse(address).name());
    res.setHeader("Cache-Control", "s-maxage=84600");
    res.status(200).send(name);
  } catch (error) {
    return res.status(422).send(error.message)
  }
}
