/*
  An app that syndicates files over both bittorrent and IPFS.
*/

const WebTorrent = require('webtorrent')
const client = new WebTorrent()

const fileName = `./fox.jpg`

const options = {
  name: 'fox.jpg'
}

async function runTest() {
  try {
    client.on('error', err => {
      console.error(`Error with webtorrent: `, err)
    })

    // client.seed(fileName, options, torrent => {
    //   // console.log(`File is being seeded: ${JSON.stringify(torrent.info,null,2)}`)
    //   console.log(`File is being seeded. Magnet URI: ${torrent.magnetURI}`)
    //   // console.log(`File is being seeded: `, torrent)
    // })

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
