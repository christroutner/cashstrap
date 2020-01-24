const IPFS = require('ipfs')

const FILE_PATH = './'

let _this

class IPFSLib {
  constructor() {
    _this = this
  }

  async startIPFS () {
    // starting ipfs node
    console.log('Starting IPFS...!')
    this.ipfs = new IPFS({
      repo: './ipfs-config/node',
      start: true,
      EXPERIMENTAL: {
        pubsub: true
      },
      relay: {
        enabled: true, // enable circuit relay dialer and listener
        hop: {
          enabled: true // enable circuit relay HOP (make this node a relay)
        }
      }
    })

    // Wait until IPFS reports it is ready.
    await this.ipfs.ready
    console.log(`... IPFS is ready.`)

    return this.ipfs
  }

  // Upload a file to IPFS.
  async upload (fileName) {
    return new Promise((resolve, reject) => {
      _this.ipfs.addFromFs(fileName, { recursive: true }, (err, result) => {
        if (err) { reject(err) }
        /*   console.log("result ipfs upload :")
        console.log(result) */
        resolve(result)
      })
    })
  }
}

module.exports = IPFSLib
