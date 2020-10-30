/*
  An app that syndicates files over both bittorrent and IPFS.
*/

const WebTorrent = require("webtorrent");
const client = new WebTorrent();

// const IPFS = require("./lib/ipfs");
// const ipfs = new IPFS();

const fileNames = [
  {
    path: '/mnt/HC_Volume_4733554/files/',
    filename: 'abc-mainnet-658958-v0.22.4-10-27-2020.zip'
  },
  {
    path: '/mnt/HC_Volume_4733554/files/',
    filename: 'abc-testnet-1417941-v0.22.5-10-27-2020.zip'
  },
  {
    path: '/mnt/HC_Volume_4733554/files/',
    filename: 'blockbook-bch-mainnet-v0.3.2-10-28-2020.zip'
  },
  {
    path: '/mnt/HC_Volume_4733554/files/',
    filename: 'blockbook-bch-testnet-v0.3.2-10-28-2020.zip'
  },
  {
    path: '/mnt/HC_Volume_4733554/files/',
    filename: 'slpdb-mainnet-08-06-2020-647202-2f23af5122f11c24fb86026bea2b198a024c8f9b.zip'
  },
  {
    path: '/mnt/HC_Volume_4733554/files/',
    filename: 'slpdb-testnet-08-06-2020-1399300-2f23af5122f11c24fb86026bea2b198a024c8f9b.zip'
  },
  {
    path: '/mnt/HC_Volume_4733554/files/',
    filename: 'fulcrum-mainnet-10-28-2020.zip'
  },
  {
    path: '/mnt/HC_Volume_4733554/files/',
    filename: 'fulcrum-testnet-10-29-2020.zip'
  },
  {
    path: '/mnt/HC_Volume_7319195/',
    filename: 'bchn-mainnet-655089-09-30-2020.zip'
  }
];

// const filePath = "/mnt/HC_Volume_4733554/files/";

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
      const fileName = fileNames[i].filename;
      const path = `${fileNames[i].path}${fileName}`;

      console.log(`Preparing to share this file: `);
      console.log(fileName);

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
