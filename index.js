/*
  An app that syndicates files over both bittorrent and IPFS.
*/

const WebTorrent = require("webtorrent");
const client = new WebTorrent();

const IPFS = require("./lib/ipfs");
const ipfs = new IPFS();

const fileNames = [
  `slpdb-mainnet-01-14-2020-929f59a5550cf269bc49a2c7853fd0bf59ec894a-617806.zip`,
  `blockbook-testnet-01-21-2020-1355060.zip`,
  `blockbook-mainnet-01-21-20-618876.zip`,
  `bitcore-node-testnet-09-13-2019.zip`,
  `bitcore-node-bch-mainnet-618830-01-21-2020.zip`
];

const filePath = "../";

// const fileName = `./fox.jpg`

const options = {
  name: "fox.jpg"
};

async function uploadFiles() {
  try {
    // Report any torrent errors.
    client.on("error", err => {
      console.error(`Error with webtorrent: `, err);
    });

    // start IPFS
    await ipfs.startIPFS();

    // Loop through each file.
    for (let i = 0; i < fileNames.length; i++) {
      const fileName = fileNames[i];

      console.log(`Preparing to share this file: `);
      console.log(fileName);

      const path = `${filePath}${fileName}`

      // Upload file to IPFS
      const ipfsData = await ipfs.upload(path);
      const ipfsHash = ipfsData[ipfsData.length - 1].hash;
      console.log(`IPFS hash: ${ipfsHash}`);

      // const torrent = await client.seed(fileName, options)
      const magnetURI = await seedFile(path);

      console.log(`File is being seeded as torrent. Magnet URI:`);
      console.log(magnetURI);

      console.log(" ");
    }
  } catch (err) {
    console.error(`Error in runTest: `, err);
  }
}
uploadFiles();

// Wraps the seed call in a promise.
function seedFile(filename) {
  try {
    return new Promise(resolve => {
      client.seed(filename, options, torrent => {
        return resolve(torrent.magnetURI);
      });
    });
  } catch (err) {
    console.error(`Error in seedFile()`);
    throw err;
  }
}
