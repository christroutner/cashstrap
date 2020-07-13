/*
  An app that syndicates files over both bittorrent and IPFS.
*/

const WebTorrent = require("webtorrent");
const client = new WebTorrent();

// const IPFS = require("./lib/ipfs");
// const ipfs = new IPFS();

const fileNames = [
  `abc-mainnet-627883-v0.21.2-03-24-2020.zip`,
  `abc-testnet-1368227-v0.21.2-03-24-2020.zip`,
  `blockbook-bch-mainnet-v0.3.2-03-23-2020.zip`,
  `blockbook-bch-testnet-v0.3.2-03-23-2020.zip`,
  `slpdb-v1-mainnet-07-13-2020-643744-54714dfec7f82487d6d08dca19ae88918e7f8eef.zip`,
  `slpdb-v1-testnet-07-13-2020-1394061-54714dfec7f82487d6d08dca19ae88918e7f8eef.zip`,
  `fulcrum-testnet-04-12-2020.zip`,
  `fulcrum-mainnet-04-12-2020.zip`
];

const filePath = "/mnt/HC_Volume_4733554/files/";

// const fileName = `./fox.jpg`

async function uploadFiles() {
  try {
    // Report any torrent errors.
    client.on("error", err => {
      console.error(`Error with webtorrent: `, err);
    });

    // start IPFS
    // await ipfs.startIPFS();

    // Loop through each file.
    for (let i = 0; i < fileNames.length; i++) {
      const fileName = fileNames[i];

      console.log(`Preparing to share this file: `);
      console.log(fileName);

      const path = `${filePath}${fileName}`;

      // Upload file to IPFS
      // const ipfsData = await ipfs.upload(path);
      // const ipfsHash = ipfsData[ipfsData.length - 1].hash;
      // console.log(`IPFS hash: ${ipfsHash}`);

      // const torrent = await client.seed(fileName, options)
      const options = { name: fileName };
      const magnetURI = await seedFile(path, options);

      console.log(`File is being seeded as torrent. Magnet URI:`);
      console.log(magnetURI);

      console.log(" ");
    }
  } catch (err) {
    console.error(`Error in runTest: `, err);
  }
}
uploadFiles();

// Wraps the torrent seed call in a Promise.
function seedFile(filename, options) {
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
