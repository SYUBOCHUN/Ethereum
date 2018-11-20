const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

//加入本機端區塊鏈資訊
const Web3 = require('web3')
const web3 = new Web3();
const eth = web3.eth;
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545')); //指定為RPC server的位置

/*A_讀取智能合約相關交易的程式碼，對應response的A部分
//讀取私鏈內所有帳戶
const accounts = web3.eth.accounts
console.log("讀取私鏈內所有帳戶",accounts)
//目前區塊高度
let blockHeight = web3.eth.blockNumber;
console.log("目前區塊高度",blockHeight)
//讀取私鏈內所有區塊資料
var blocks = []
console.log("讀取區塊資料中...")
for (let i = 0; i <= blockHeight; i++) {
    blocks.push(eth.getBlock(i, true));
}
console.log("讀取完畢！\n")


//讀出特定地址之所有交易
console.log("讀取特定交易中...")
let accountTransactions = [];

blocks.forEach(block => {
    block.transactions.forEach(transaction => {
        if (transaction.from === web3.eth.getTransactionReceipt(req.body['address']).contractAddress || transaction.to === web3.eth.getTransactionReceipt(req.body['address']).contractAddress) {
            accountTransactions.push(transaction);
        }
    })
})
console.log("讀取完畢!")
*/


//加入 node fetch 需要的套件指令
const fetch = require('node-fetch');

// 设置默认的中间件 (logger, static, cors and no-cache)
server.use(middlewares)

//你需要使用一个body-parser来处理POST，PUT和PATCH
//你可以使用JSON Server使用的那个
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
    if (req.method === 'POST') {
        const abi = [{"constant":true,"inputs":[],"name":"accountD","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"accountA","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getState","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"accountCFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"accountE","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"ins","type":"address"}],"name":"getoperator","outputs":[{"name":"","type":"uint256"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"},{"name":"_ID","type":"uint256"},{"name":"_Pstate","type":"string"}],"name":"setoperator","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"accountDFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"accountC","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"operatorAccounts","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"accountBFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"accountEFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"purchasePrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"CountOperators","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"accountB","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"accountAFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getoperators","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_accountB","type":"address"},{"name":"_accountC","type":"address"},{"name":"_accountD","type":"address"},{"name":"_accountE","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"}];
        console.log(req.method)
        console.log("==============================================================================")
        console.log(req.body)
        console.log("==============================================================================")
        //console.log(req.body['address'])
        router.render = (req, res) => {
            res.status(200).jsonp({
                smartcontractInfo: {
                    contractaddress:req.body['address'],
                    contractaccount:web3.eth.getTransactionReceipt(req.body['address']).contractAddress,
                    blocks:web3.eth.getTransactionReceipt(req.body['address']).blockNumber,
                    station_A:web3.eth.getTransactionReceipt(req.body['address']).from,
                    station_B:web3.eth.contract(abi).at(web3.eth.getTransactionReceipt(req.body['address']).contractAddress).accountB(),
                    station_C:web3.eth.contract(abi).at(web3.eth.getTransactionReceipt(req.body['address']).contractAddress).accountC(),
                    station_D:web3.eth.contract(abi).at(web3.eth.getTransactionReceipt(req.body['address']).contractAddress).accountD(),
                    station_E:web3.eth.contract(abi).at(web3.eth.getTransactionReceipt(req.body['address']).contractAddress).accountE(),
                    State:web3.eth.contract(abi).at(web3.eth.getTransactionReceipt(req.body['address']).contractAddress).getState()
                },
                /* A_讀取智能合約所有交易資料需要的變數在此
                contracttransactionInfo: {
                    accountTransactions:accountTransactions,
                    accountTransactions_length:accountTransactions.length,
                }
                */
            })
            //提供給首頁直接get到私鏈細部資料
        }} else if (req.method === 'GET') {
            router.render = (req, res) => {
                res.status(200).jsonp({
                    privateblockchain: {
                        blockNumber:web3.eth.blockNumber,
                        peerCount:web3.net.peerCount,
                        pending:web3.eth.getBlock("pending").transactions.length,
                        account:web3.eth.accounts.length,
                    },
                })
            }
        } else {
        router.render = (req, res) => {
            res.status(500).jsonp({
                error: "error message here"
            })
        }
    } 
    // 继续json-server路由
    next()
})

// 使用默认路由
server.use(router)
server.listen(3003, () => {
    console.log('JSON Server is running')
    console.log("url:",'http://localhost:3003/posts')
})


/*
//經由post之後，模擬伺服器回傳值
router.render = (req, res) => {
    res.jsonp({
        body: web3.eth.blockNumber
    })
}
*/

/*
//經由post之後模擬伺服器失敗的樣子
router.render = (req, res) => {
    res.status(500).jsonp({
      error: "error message here"
    })
}
*/