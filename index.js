/*
  An app that syndicates files over both bittorrent and IPFS.
*/

const WebTorrent = require('webtorrent')
const client = new WebTorrent()

const IPFS = require('./lib/ipfs')
const ipfs = new IPFS()

const fileName = `./fox.jpg`

const options = {
  name: 'fox.jpg'
}

async function runTest() {
  try {
    // Report any torrent errors.
    client.on('error', err => {
      console.error(`Error with webtorrent: `, err)
    })

    // start IPFS
    await ipfs.startIPFS()

    // Upload file to IPFS
    const ipfsData = await ipfs.upload(fileName)
    const ipfsHash = ipfsData[ipfsData.length - 1].hash
    console.log(`IPFS hash: ${ipfsHash}`)

    // const torrent = await client.seed(fileName, options)
    const magnetURI = await seedFile(fileName)
    console.log(`File is being seeded. Magnet URI: ${magnetURI}`)
  } catch(err) {
    console.error(`Error in runTest: `, err)
  }
}
runTest()

// Wraps the seed call in a promise.
function seedFile(filename) {
  try {
    return new Promise(resolve => {
      client.seed(filename, options, torrent => {
        return resolve(torrent.magnetURI)
      })
    });
  } catch(err) {
    console.error(`Error in seedFile()`)
    throw err
  }
}
