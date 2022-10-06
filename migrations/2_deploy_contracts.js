// 2_deploy_contracts.js
const TokenFarm = artifacts.require(`TokenFarm`)
const DappToken = artifacts.require(`DappToken`)
const DaiToken = artifacts.require(`DaiToken`)

module.exports = async function(deployer, newtwork, accounts) {

    await deployer.deploy(DaiToken)
    const daiToken = await DaiToken.deployed()

    await deployer.deploy(DappToken)
    const dappToken = await DappToken.deployed()

    await deployer.deploy(TokenFarm, dappToken.address, daiToken.address)
    const tokenFarm = await TokenFarm.deployed()

    //100万Dappデプロイする
    await dappToken.transfer(tokenFarm.address, '1000000000000000000000000')

    //100Daiデプロイする 今、DaiToken をデプロイすると、すべてのトークンはデプロイした人（＝あなた / Ganache の accounts[0]）のものになります。なので、ここでは、Dai の一部を投資家に譲渡しています。 Ganache のアカウントの上から2番目のアカウントのことを示しています。
    await daiToken.transfer(accounts[1], '100000000000000000000')
}