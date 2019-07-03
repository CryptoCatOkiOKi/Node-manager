/* eslint-disable no-console */
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const fs = require('fs')

console.log(`START`)

async function getWalletInfo(wallet) {
  // const { stdout, stderr } = await exec('/root/bin/' + wallet + ' getinfo')
  const { stdout, stderr } = await exec(wallet + ' getinfo')
  // console.log('stdout:', stdout);
  if (stderr) {
    console.log('stderr:', stderr)
  }
  return stdout
}

const getRootBinFiles = async () => {
  const wallets = await fs.readdirSync('/root/bin/')
  // var wallets = await fs.readdirSync(__dirname);
  return wallets
}

const getWalletInfoList = async (walletName) => {
  // var walletsGetinfoString;
  const walletsInfoArray = []
  const wallets = await getRootBinFiles()
  console.log('walletName ' + walletName)
  // console.log('wallets ' + wallets);

  for (let i = 0, len = wallets.length; i < len; i++) {
    if (
      wallets[i].includes('.sh') &&
      (wallets[i].includes(walletName) || walletName === undefined) &&
      wallets[i].includes('-cli')
    ) {
      console.log(wallets[i])

      const info = await getWalletInfo(wallets[i])
      // walletsGetinfoString = walletsGetinfoString + info
      walletsInfoArray.push(JSON.parse(info))

      console.log(info)
      console.log('end foreach loop')
    }
  }

  console.log('end check_wallets')
  return walletsInfoArray
}

// const showWalletsStatus = async walletName => {
//   const walletsInfo = await checkWallets(walletName)
//   // console.log(walletsInfo);

//   for (let i = 0, len = walletsInfo.length; i < len; i++) {
//     console.log('---------------------------------')
//     console.log(walletsInfo[i].blocks)
//   }
// }

// showWalletsStatus();

const getSysInfo = async () => {
  //const sysInfo = fs.readFileSync(__dirname+'/memory-cpu-sysinfo.sh', 'utf8');
  //console.log(sysInfo)

  const { stdout, stderr } = await exec('/bin/bash ' + __dirname +'/memory-cpu-sysinfo.sh')
  // console.log('stdout:', stdout);
  if (stderr) {
    console.log('stderr:', stderr)
  }
  return stdout
}

const getNodesCount = async () => {
  //const nodesList = fs.readFileSync(__dirname+'/wallets-list-stats.sh', 'utf8');
  //console.log(nodesList)

  const { stdout, stderr } = await exec('/bin/bash ' + __dirname +'/wallets-list-stats.sh')
  // console.log('stdout:', stdout);
  if (stderr) {
    console.log('stderr:', stderr)
  }
  return stdout
}

const getNodesList = async () => {
  //const nodesList = fs.readFileSync(__dirname+'/wallets-list-stats.sh', 'utf8');
  //console.log(nodesList)

  const { stdout, stderr } = await exec('/bin/bash ' + __dirname +'/wallets-list-stats.sh list')
  // console.log('stdout:', stdout);
  if (stderr) {
    console.log('stderr:', stderr)
  }
  return stdout
}

const getPhantomCoinInfo = async () => {

  const { stdout, stderr } = await exec('/bin/bash ' + __dirname + '/phantom-info.sh COIN_CONF')
  // console.log('stdout:', stdout);
  if (stderr) {
    console.log('stderr:', stderr)
  }
  return stdout
}

const getPhantomMasternodeInfo = async (coin_name) => {

  const { stdout, stderr } = await exec('/bin/bash ' + __dirname +'/phantom-info.sh MASTERNODE_CONF ' + coin_name)
  // console.log('stdout:', stdout);
  if (stderr) {
    console.log('stderr:', stderr)
  }
  return stdout
}


// const getNumOfAddNodes

module.exports = {
  getRootBinFiles: getRootBinFiles,
  getWalletInfo:getWalletInfo,
  getWalletInfoList: getWalletInfoList,
  getSysInfo: getSysInfo,
  getNodesCount: getNodesCount,
  getNodesList: getNodesList,
  getPhantomCoinInfo: getPhantomCoinInfo,
  getPhantomMasternodeInfo: getPhantomMasternodeInfo
}
