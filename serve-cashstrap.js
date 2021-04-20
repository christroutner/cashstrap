/*
  An app that syndicates files over both bittorrent and IPFS.
*/

const WebTorrent = require("webtorrent");
const client = new WebTorrent({
  torrentPort: 58261
});

// const IPFS = require("./lib/ipfs");
// const ipfs = new IPFS();

const fileNames = [
  // BCH
  // {
  //   // BCHN full node
  //   path: '/mnt/usb-hd/full-nodes/bch/',
  //   filename: 'bchn-mainnet-04-15-21-683465-v23.0.0.zip'
  // },
  // {
  //   // BCHN fulcrum
  //   path: '/mnt/usb-hd/indexers/bch/',
  //   filename: 'fulcrum-v1.2.3-bch-683578-04-15-21.zip'
  // },
  // {
  //   // BCHN SLPDB
  //   path: '/mnt/usb-hd/indexers/bch/',
  //   filename: 'slpdb-bchn-main-2021-03-24-680164-f1f48a3b7a852e24fd26b3baf6df65b47de6d89e.zip'
  // },

  // ABC
  // {
  //   // ABC full node
  //   path: '/mnt/usb-hd/full-nodes/abc/',
  //   filename: 'abc-mainnet-04-18-21-682645-0.23.1.zip'
  // },
  // {
  //   // ABC Fulcrum
  //   path: '/mnt/usb-hd/indexers/abc/',
  //   filename: 'fulcrum-abc-mainnet-04-18-21-682669-v1.2.3.zip'
  // },
  // {
  //   // ABC SLPDB
  //   path: '/mnt/usb-hd/indexers/abc/',
  //   filename: 'slpdb-abc-v1-f1f48a3b7a852e24fd26b3baf6df65b47de6d89e-01-19-21-669672.zip'
  // },

  // BCHN testnet3
  // {
  //   // testnet full node
  //   path: '/mnt/usb-hd/full-nodes/testnet/',
  //   filename: 'bchn-testnet3-04-12-2021-1442953.zip'
  // },
  {
    // testnet Fulcrum
    path: '/mnt/usb-hd/indexers/testnet/',
    filename: 'fulcrum-bchn-testnet3-04-12-21-1442953.zip'
  }
  // {
  //   // testnet SLPDB
  //   path: '/mnt/usb-hd/indexers/testnet/',
  //   filename: 'slpdb-testnet-bchn-01-20-21-f1f48a3b7a852e24fd26b3baf6df65b47de6d89e-1431114.zip'
  // }
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
