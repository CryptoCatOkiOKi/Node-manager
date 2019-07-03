/* eslint-disable no-console */
const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()

const config = require('../nuxt.config.js')
const checkWallets = require('./utils/check-wallets')

// Import and Set Nuxt.js options
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.get('/getinfo', async (req, res) => {
    if (!req.query.coin) {
      return res.send({
        error: 'You must provide a coin!'
      })
    }

    if (!req.query.alias) {
      return res.send({
        error: 'You must provide an alias!'
      })
    }  

    res.setHeader('Access-Control-Allow-Origin', '*')
    res.contentType('application/json')
    // const walletsInfo = await checkWallets.getWalletInfoList(req.query.address)

    const list = await checkWallets.getNodesList()
    const listJSON = JSON.parse(list)
    console.log('list '+ list)
    let walletCommand
    let walletInfo
    listJSON.forEach(async value => {
      if (
        value.name.includes(req.query.coin) &&
        value.alias.includes(req.query.alias)
      ) {      
        console.log('value '+ value.command)
        walletCommand = value.command
      }

    })

    if (walletCommand) {
      walletInfo = await checkWallets.getWalletInfo(walletCommand)
    } else {
      walletInfo = {
        error: 'Node not found!'
      }
    }
    return res.send(walletInfo)
  })

  app.get('/wallets', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    const list = await checkWallets.getRootBinFiles()
    console.log(list)
    return res.send(list)
  })

  app.get('/sysInfo', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    const list = await checkWallets.getSysInfo()
    console.log(list)
    return res.send(list)
  })

  app.get('/nodescount', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    const list = await checkWallets.getNodesCount()
    console.log(list)
    return res.send(list)
  })  

  app.get('/nodes', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    const list = await checkWallets.getNodesList()
    console.log(list)
    return res.send(list)
  })

  app.get('/phantomcoins', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    const list = await checkWallets.getPhantomCoinInfo()
    console.log(list)
    return res.send(list)
  })

  app.get('/phantomnodes', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    if (!req.query.coin) {
      return res.send({
        error: 'You must provide an alias!'
      })
    }      
    
    const list = await checkWallets.getPhantomMasternodeInfo(req.query.coin)
    console.log(list)
    return res.send(list)
  })

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
