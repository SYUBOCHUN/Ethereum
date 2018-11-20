import React from "react";
import { Grid } from "material-ui";
import List, { ListItem, ListItemIcon, ListItemText, ListSubheader } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import { ExpandLess, ExpandMore, MoveToInbox as InboxIcon, SwapHoriz, Person, Layers, LocalAtm, AccessTime, Textsms } from 'material-ui-icons';
import Collapse from 'material-ui/transitions/Collapse';
import { RegularCard, Table, ItemGrid, CustomInput, Button } from "/Users/mac/Desktop/my-dapp/src/components";
import Modal from 'react-modal';



//智能合約部署以後icon為綠色
//import變數後面數字為狀態
import contractstateicon0G from '/Users/mac/Desktop/my-dapp/src/assets/img/checkG.png'; //買家下訂單 -> 0
//接下來的狀態由黑(B)轉綠(G)，B->黑 G->綠 R->紅
import contractstateicon1B from '/Users/mac/Desktop/my-dapp/src/assets/img/checkB.png'; //買家支付訂金給智能合約 4 ether -> 1
import contractstateicon2B from '/Users/mac/Desktop/my-dapp/src/assets/img/checkB.png'; //賣家支付訂金給智能合約 1 ether -> 2
import contractstateicon3B from '/Users/mac/Desktop/my-dapp/src/assets/img/checkB.png'; //賣家出貨支付智能合約通知費用 0.000000000000000001 ether -> 3
import contractstateicon4B from '/Users/mac/Desktop/my-dapp/src/assets/img/checkB.png'; //快遞1收貨，支付智能合約通知收貨費用 0.000000000000000001 ether -> 4
import contractstateicon5B from '/Users/mac/Desktop/my-dapp/src/assets/img/checkB.png'; //快遞1到貨，支付智能合約通知到會費用 0.000000000000000001 ether -> 5
import contractstateicon6B from '/Users/mac/Desktop/my-dapp/src/assets/img/checkB.png'; //快遞2收貨，支付智能合約通知收貨費用 0.000000000000000001 ether -> 6
import contractstateicon7B from '/Users/mac/Desktop/my-dapp/src/assets/img/checkB.png'; //快遞2到貨，支付智能合約通知到會費用 0.000000000000000001 ether -> 7
import contractstateicon8B from '/Users/mac/Desktop/my-dapp/src/assets/img/checkB.png'; //買家確認收到貨，支付智能合約收貨通知費用0.000000000000000001 ether -> 8
import contractstateicon9B from '/Users/mac/Desktop/my-dapp/src/assets/img/checkB.png'; 
import contractstateicon10B from '/Users/mac/Desktop/my-dapp/src/assets/img/checkB.png'; 

//綠(G)
import contractstateicon1G from '/Users/mac/Desktop/my-dapp/src/assets/img/checkG.png'; //買家支付訂金給智能合約 4 ether -> 1
import contractstateicon2G from '/Users/mac/Desktop/my-dapp/src/assets/img/checkG.png'; //賣家支付訂金給智能合約 1 ether -> 2
import contractstateicon3G from '/Users/mac/Desktop/my-dapp/src/assets/img/checkG.png'; //賣家出貨支付智能合約通知費用 0.000000000000000001 ether -> 3
import contractstateicon4G from '/Users/mac/Desktop/my-dapp/src/assets/img/checkG.png'; //快遞1收貨，支付智能合約通知收貨費用 0.000000000000000001 ether -> 4
import contractstateicon5G from '/Users/mac/Desktop/my-dapp/src/assets/img/checkG.png'; //快遞1到貨，支付智能合約通知到會費用 0.000000000000000001 ether -> 5
import contractstateicon6G from '/Users/mac/Desktop/my-dapp/src/assets/img/checkG.png'; //快遞2收貨，支付智能合約通知收貨費用 0.000000000000000001 ether -> 6
import contractstateicon7G from '/Users/mac/Desktop/my-dapp/src/assets/img/checkG.png'; //快遞2到貨，支付智能合約通知到會費用 0.000000000000000001 ether -> 7
import contractstateicon8G from '/Users/mac/Desktop/my-dapp/src/assets/img/checkG.png'; //買家確認收到貨，支付智能合約收貨通知費用0.000000000000000001 ether -> 8
import contractstateicon9G from '/Users/mac/Desktop/my-dapp/src/assets/img/checkG.png'; 
import contractstateicon10G from '/Users/mac/Desktop/my-dapp/src/assets/img/checkG.png'; 

import {
  P,
  Quote,
  Muted,
  Primary,
  Info,
  Success,
  Warning,
  Danger,
  Small
} from "/Users/mac/Desktop/my-dapp/src/components";

//加入ethereum web3指令
import Web3 from 'web3';
const web3 = new Web3();
window.web3 = web3
const eth = web3.eth;
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545')); //指定為RPC server的位置


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '55%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
  }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 760,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 350,
  },
});

class TableList extends React.Component {
  
  constructor() {
    super();
    this.state = {
      //智能合約的ABI
      abi: [{"constant":true,"inputs":[],"name":"accountD","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"accountA","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getState","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"accountCFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"accountE","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"ins","type":"address"}],"name":"getoperator","outputs":[{"name":"","type":"uint256"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"},{"name":"_ID","type":"uint256"},{"name":"_Pstate","type":"string"}],"name":"setoperator","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"accountDFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"accountC","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"operatorAccounts","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"accountBFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"accountEFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"purchasePrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"CountOperators","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"accountB","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"accountAFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getoperators","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_accountB","type":"address"},{"name":"_accountC","type":"address"},{"name":"_accountD","type":"address"},{"name":"_accountE","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"}],
      //針對第一的帳戶地址查詢的開關
      accountmodalIsOpen: false,
      //針對第二個合約地址查詢的開關
      modalIsOpen: false,

      //針對第一個的帳戶地址查詢所自訂的亂數值
      currentAddress:'0x04c2a4979f2593ebe741744907daa5b2b86f44c0',
      
      //針對第二個的智能合約地址查詢所自訂的亂數值
      receiptaddress:'0x0b76a66a968a756b87b15d7ef5013472f737f7d447c00ec3d94f66cef5a33b38',

      accounts: '',
      blockHeight: '',
      blocks: [],
      accountTransactions: [],
      
      //生產線狀態1~10
      contractstateicon1B: contractstateicon1B,
      contractstateicon2B: contractstateicon2B,
      contractstateicon3B: contractstateicon3B,
      contractstateicon4B: contractstateicon4B,
      contractstateicon5B: contractstateicon5B,
      contractstateicon6B: contractstateicon6B,
      contractstateicon7B: contractstateicon7B,
      contractstateicon8B: contractstateicon8B,
      contractstateicon9B: contractstateicon9B,
      contractstateicon10B: contractstateicon10B,

    };
    
    //針對第一個帳戶地址查詢
    this.openaccountModal = this.openaccountModal.bind(this);
    this.closeaccountModal = this.closeaccountModal.bind(this);
    //針對第二個帳戶地址查詢
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  

  //------------------------------------我是分隔線--------------------------------------------

  //針對第一個帳戶地址查詢的modal
  openaccountModal() {
    //判斷是否為正確帳戶地址
    if (!this.state.currentAddress || this.state.currentAddress==='0x04c2a4979f2593ebe741744907daa5b2b86f44c0') {
      alert('請先輸入正確帳戶地址。');
      window.location.reload();
      return
    }
    this.setState({accountmodalIsOpen: true});
    this.getTransactions(this.state.currentAddress);
    // 將序號轉QRcode彈出網頁
    //const transcationhash = 'http://chart.apis.google.com/chart?cht=qr&chl=' + `${this.state.receiptaddress}` + '&chs=300x300';
    //彈出網頁
    //window.open(transcationhash)
  }

  //針對第一個帳戶地址查詢的modal
  closeaccountModal() {
    this.setState({accountmodalIsOpen: false});
    window.location.reload();
  }

//------------------------------------我是分隔線--------------------------------------------
  
  //針對第二個合約地址查詢的modal
  openModal() {
    if (!this.state.receiptaddress || this.state.receiptaddress==='0x0b76a66a968a756b87b15d7ef5013472f737f7d447c00ec3d94f66cef5a33b38') {
      alert('請先輸入正確合約地址。');
      window.location.reload();
      return
    }
    this.setState({modalIsOpen: true});

    if (web3.eth.contract(this.state.abi).at(web3.eth.getTransactionReceipt(this.state.receiptaddress).contractAddress).getState().c == 1) {
      //=1，A站透過智能合約建立產品履歷
      this.state.contractstateicon1B = contractstateicon1G;
    } else if (web3.eth.contract(this.state.abi).at(web3.eth.getTransactionReceipt(this.state.receiptaddress).contractAddress).getState().c == 2) {
      //=2，B站in
      this.state.contractstateicon1B = contractstateicon1G;
      this.state.contractstateicon2B = contractstateicon2G;
    } else if (web3.eth.contract(this.state.abi).at(web3.eth.getTransactionReceipt(this.state.receiptaddress).contractAddress).getState().c == 3) {
      //=3，B站out
      this.state.contractstateicon1B = contractstateicon1G;
      this.state.contractstateicon2B = contractstateicon2G;
      this.state.contractstateicon3B = contractstateicon3G;
    } else if (web3.eth.contract(this.state.abi).at(web3.eth.getTransactionReceipt(this.state.receiptaddress).contractAddress).getState().c == 4) {
      //=4，C站in
      this.state.contractstateicon1B = contractstateicon1G;
      this.state.contractstateicon2B = contractstateicon2G;
      this.state.contractstateicon3B = contractstateicon3G;
      this.state.contractstateicon4B = contractstateicon4G;
    } else if (web3.eth.contract(this.state.abi).at(web3.eth.getTransactionReceipt(this.state.receiptaddress).contractAddress).getState().c == 5) {
      //=5，C站out
      this.state.contractstateicon1B = contractstateicon1G;
      this.state.contractstateicon2B = contractstateicon2G;
      this.state.contractstateicon3B = contractstateicon3G;
      this.state.contractstateicon4B = contractstateicon4G;
      this.state.contractstateicon5B = contractstateicon5G;
    } else if (web3.eth.contract(this.state.abi).at(web3.eth.getTransactionReceipt(this.state.receiptaddress).contractAddress).getState().c == 6) {
      //=6，D站in
      this.state.contractstateicon1B = contractstateicon1G;
      this.state.contractstateicon2B = contractstateicon2G;
      this.state.contractstateicon3B = contractstateicon3G;
      this.state.contractstateicon4B = contractstateicon4G;
      this.state.contractstateicon5B = contractstateicon5G;
      this.state.contractstateicon6B = contractstateicon6G;
    } else if (web3.eth.contract(this.state.abi).at(web3.eth.getTransactionReceipt(this.state.receiptaddress).contractAddress).getState().c == 7) {
      //=7，D站out
      this.state.contractstateicon1B = contractstateicon1G;
      this.state.contractstateicon2B = contractstateicon2G;
      this.state.contractstateicon3B = contractstateicon3G;
      this.state.contractstateicon4B = contractstateicon4G;
      this.state.contractstateicon5B = contractstateicon5G;
      this.state.contractstateicon6B = contractstateicon6G;
      this.state.contractstateicon7B = contractstateicon7G;
    } else if (web3.eth.contract(this.state.abi).at(web3.eth.getTransactionReceipt(this.state.receiptaddress).contractAddress).getState().c == 8) {
      //=8，E站in
      this.state.contractstateicon1B = contractstateicon1G;
      this.state.contractstateicon2B = contractstateicon2G;
      this.state.contractstateicon3B = contractstateicon3G;
      this.state.contractstateicon4B = contractstateicon4G;
      this.state.contractstateicon5B = contractstateicon5G;
      this.state.contractstateicon6B = contractstateicon6G;
      this.state.contractstateicon7B = contractstateicon7G;
      this.state.contractstateicon8B = contractstateicon8G;
    } else if (web3.eth.contract(this.state.abi).at(web3.eth.getTransactionReceipt(this.state.receiptaddress).contractAddress).getState().c == 9) {
      //=9，E站out
      this.state.contractstateicon1B = contractstateicon1G;
      this.state.contractstateicon2B = contractstateicon2G;
      this.state.contractstateicon3B = contractstateicon3G;
      this.state.contractstateicon4B = contractstateicon4G;
      this.state.contractstateicon5B = contractstateicon5G;
      this.state.contractstateicon6B = contractstateicon6G;
      this.state.contractstateicon7B = contractstateicon7G;
      this.state.contractstateicon8B = contractstateicon8G;
      this.state.contractstateicon9B = contractstateicon9G;
    } else if (web3.eth.contract(this.state.abi).at(web3.eth.getTransactionReceipt(this.state.receiptaddress).contractAddress).getState().c == 10) {
      //=10，完成生產線所有各站流程
      this.state.contractstateicon1B = contractstateicon1G;
      this.state.contractstateicon2B = contractstateicon2G;
      this.state.contractstateicon3B = contractstateicon3G;
      this.state.contractstateicon4B = contractstateicon4G;
      this.state.contractstateicon5B = contractstateicon5G;
      this.state.contractstateicon6B = contractstateicon6G;
      this.state.contractstateicon7B = contractstateicon7G;
      this.state.contractstateicon8B = contractstateicon8G;
      this.state.contractstateicon9B = contractstateicon9G;
      this.state.contractstateicon10B = contractstateicon10G;
    }
    // 將序號轉QRcode彈出網頁
    //const transcationhash = 'http://chart.apis.google.com/chart?cht=qr&chl=' + `${this.state.receiptaddress}` + '&chs=300x300';
    //彈出網頁
    //window.open(transcationhash)

    //新增在第二個查詢欄位中的data欄位，所以要加入第一個查詢欄位如何抓交易紀錄的方式拿來這裡使用
    this.getTransactions(web3.eth.getTransactionReceipt(this.state.receiptaddress).contractAddress);
  
  }

  //針對第二個合約地址查詢的modal
  closeModal() {
    this.setState({modalIsOpen: false});
    window.location.reload();
  }

//------------------------------------我是分隔線--------------------------------------------
  
  componentWillMount() {
    web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545')); //指定為RPC server的位置
    this.setState({ accounts: web3.eth.accounts });
    // 目前區塊高度
    let blockHeight = web3.eth.blockNumber;
    this.setState({ blockHeight });
    // 所有區塊資料
    let blocks = []
    for (let i = 0; i <= blockHeight; i++) {
      blocks.push(eth.getBlock(i, true));
    }
    this.setState({ blocks });
  }

  // 讀出特定地址之所有交易
  getTransactions(address) {
    let accountTransactions = [];
    this.state.blocks.forEach(block => {
      block.transactions.forEach(transaction => {
        if (transaction.from === address || transaction.to === address) {
          accountTransactions.push(transaction);
        }
      })
    })
    this.setState({ currentAddress: address })
    this.setState({ accountTransactions })
    return accountTransactions
  }


  render() {
    const { classes } = this.props;
    return(
    <div>
      <Grid container>
      測試帳號：0x4538799bdb707a9d644ce7794cdaeaa97ae0cfb9
      <ItemGrid xs={12} sm={12} md={12}>
          <RegularCard
            headerColor="green" //設定抬頭顏色
            cardTitle="帳戶查詢"
            cardSubtitle="透過帳戶地址查詢"
            content={  
              <CustomInput
                labelText="輸入帳戶地址"
                id="company-disabled"
                formControlProps={{
                  onChange: (e) => this.setState({ currentAddress: e.target.value.trim() }), 
                  fullWidth: true
                }}
              />
            }
            //footer頁尾, button功能要查詢智能合約內容
            footer={<Button onClick = {() => this.openaccountModal()}>查詢</Button>}
          />
        </ItemGrid>
        測試智能合約：0x39c879d12f24f1dbd9f4b4c6fc39aa56263b35d9d335d12a8c899c8795031966
        <ItemGrid xs={12} sm={12} md={12}>
          <RegularCard
            headerColor="green" //設定抬頭顏色
            cardTitle="訂單編號查詢(智能合約查詢)"
            cardSubtitle="透過合約地址進行查詢"
            content={  
              /* 表格
              <Table
                tableHeaderColor="primary"
                tableHead={["Name", "Country", "City", "Salary"]}
                tableData={[
                  ["Dakota Rice", "Niger", "Oud-Turnhout", "$36,738"],
                  ["Minerva Hooper", "Curaçao", "Sinaai-Waas", "$23,789"],
                  ["Sage Rodriguez", "Netherlands", "Baileux", "$56,142"],
                  ["Philip Chaney", "Korea, South", "Overland Park", "$38,735"],
                  ["Doris Greene", "Malawi", "Feldkirchen in Kärnten", "$63,542"],
                  ["Mason Porter", "Chile", "Gloucester", "$78,615"]
                ]}
              />
              */
              <CustomInput
                labelText="輸入訂單編號(智能合約地址)"
                id="company-disabled"
                formControlProps={{
                  onChange: (e) => this.setState({ receiptaddress: e.target.value.trim() }), 
                  fullWidth: true
                }}
                /*讓表格停止動畫
                inputProps={{
                disabled: true
                }}
              */
              />
            }
            //footer頁尾, button功能要查詢智能合約內容
            footer={<Button onClick = {() => this.openModal()}>查詢</Button>}
          />
        </ItemGrid>

        {
          //這是第一個查詢帳戶功能的Modal
        }   
        <Modal
          isOpen={this.state.accountmodalIsOpen}
          onRequestClose={this.closeaccountModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

        {/*         
          在這裡它是透過 web3.eth.getTransaction("contract address")=d 指令來查詢交易內容。
        */}

        {this.state.accountTransactions.length > 0
            ? <List className={classes.root}>
              {this.state.accountTransactions.map((d, idx) => (
                <div>  
                  <ListItem button onClick={() => this.setState({ [`open${idx}`]: !this.state[`open${idx}`] })}>
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText style={{ backgroundColor: "#BDBDBD"}} inset primary={`交易編號 NO.${d.blockNumber}`} />
                    {this.state[`open${idx}`] ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse component="li" in={this.state[`open${idx}`]} timeout="auto" unmountOnExit>                 
                    <List disablePadding>  
                      <div style={{ backgroundColor: "#CFD8DC"}}>
                      <ListItem>
                        <ListItemIcon>
                          <SwapHoriz />
                        </ListItemIcon>
                        <ListItemText inset primary={`交易地址(Contract Address): ${d.hash}`} />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <Person />
                        </ListItemIcon>
                        <ListItemText inset primary={`發送帳戶(From): ${d.from}`} />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <Person />
                        </ListItemIcon>
                        <ListItemText inset primary={`接收帳戶(To): ${d.to}`} />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <AccessTime />
                        </ListItemIcon>
                        <ListItemText inset primary={`時間戳(Timestamp): ${Date(web3.eth.getBlock(d.blockNumber).timestamp)}`} />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <Layers />
                        </ListItemIcon>
                        <ListItemText inset primary={`區塊位置(Block): ${d.blockNumber}`} />
                        <ListItemIcon>
                          <LocalAtm />
                        </ListItemIcon>
                        <ListItemText inset primary={`交易金額: ${web3.fromWei(d.value.toString())} 以太幣(ether)`} /> 
                      </ListItem>
                      {/* 由於智能合約被強制`data`無法修改，所以不顯示`data` */}
                      
                      <ListItem>
                        <ListItemIcon>
                          <Textsms />
                        </ListItemIcon>
                        <ListItemText inset primary={`訊息(Data): ${web3.toUtf8(d.input)}`} />
                      </ListItem>
                      
                      </div>
                    </List>
                  </Collapse>
                </div>
              ))}
            </List>
            : 'error model_1'}
            <div align="center">
              <Button onClick={this.closeaccountModal}>close</Button>
            </div>
        </Modal>

        {
          //這是第二個查詢智能合約地址的Modal
        }
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          
          {this.state.accountTransactions.length > 0
            ? <List className={classes.root}>
                <p>合約地址: {this.state.receiptaddress}</p>
                <p>合約帳戶: {web3.eth.getTransactionReceipt(this.state.receiptaddress).contractAddress}</p>
                <p>區塊位置: {web3.eth.getTransactionReceipt(this.state.receiptaddress).blockNumber}</p>
                <p>工站A: {web3.eth.getTransactionReceipt(this.state.receiptaddress).from}</p>
                <p>工站B: {web3.eth.contract(this.state.abi).at(web3.eth.getTransactionReceipt(this.state.receiptaddress).contractAddress).accountB()}</p>
                <p>工站C: {web3.eth.contract(this.state.abi).at(web3.eth.getTransactionReceipt(this.state.receiptaddress).contractAddress).accountC()}</p>
                <p>工站D: {web3.eth.contract(this.state.abi).at(web3.eth.getTransactionReceipt(this.state.receiptaddress).contractAddress).accountD()}</p>
                <p>工站E: {web3.eth.contract(this.state.abi).at(web3.eth.getTransactionReceipt(this.state.receiptaddress).contractAddress).accountE()}</p>

              {this.state.accountTransactions.map((d, idx) => (
                <div>  
                  <ListItem button onClick={() => this.setState({ [`open${idx}`]: !this.state[`open${idx}`] })}>
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText style={{ backgroundColor: "#BDBDBD"}} inset primary={`交易編號 NO.${d.blockNumber}`} />
                    {this.state[`open${idx}`] ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse component="li" in={this.state[`open${idx}`]} timeout="auto" unmountOnExit>                 
                    <List disablePadding>  
                      <div style={{ backgroundColor: "#CFD8DC"}}>

                      <ListItem>
                        <ListItemIcon>
                          <AccessTime />
                        </ListItemIcon>
                        <ListItemText inset primary={`時間戳(Timestamp): ${Date(web3.eth.getBlock(d.blockNumber).timestamp)}`} />
                      </ListItem>
                      
                      <ListItem>
                        <ListItemIcon>
                          <Textsms />
                        </ListItemIcon>
                        <ListItemText inset primary={`訊息(Data): ${web3.toAscii(d.input)}`} />
                      </ListItem>
                      
                      </div>
                    </List>
                  </Collapse>
                </div>
              ))}
            </List>
            : '目前產品履歷的智能合約已建立，狀態為：工站A確認。'}
            
          {
            //{console.log(web3.eth.contract(this.state.abi).at(web3.eth.getTransactionReceipt(this.state.receiptaddress).contractAddress).purchasePrice())}
          }
          {
            //<p>目前狀態狀態: {web3.eth.contract(this.state.abi).at(web3.eth.getTransactionReceipt(this.state.receiptaddress).contractAddress).getState().c}</p>
          }
          <Table
                //tableHeaderColor="success"
                tableHead={["進站", "工站Bin", "工站Bout", "工站Cin", "工站Cout", "工站Din", "工站Dout", "工站Ein", "工站Eout", "出貨"]}
                tableData={[
                  [<div align="center"><img src= { contractstateicon1G } width="48" height="48" /></div>,
                   <div align="center"><img src= { this.state.contractstateicon2B } width="48" height="48" /></div>,
                   <div align="center"><img src= { this.state.contractstateicon3B } width="48" height="48" /></div>,
                   <div align="center"><img src= { this.state.contractstateicon4B } width="48" height="48" /></div>,
                   <div align="center"><img src= { this.state.contractstateicon5B } width="48" height="48" /></div>,
                   <div align="center"><img src= { this.state.contractstateicon6B } width="48" height="48" /></div>,
                   <div align="center"><img src= { this.state.contractstateicon7B } width="48" height="48" /></div>,
                   <div align="center"><img src= { this.state.contractstateicon8B } width="48" height="48" /></div>,
                   <div align="center"><img src= { this.state.contractstateicon9B } width="48" height="48" /></div>,
                   <div align="center"><img src= { this.state.contractstateicon10B } width="48" height="48" /></div>
                  ]
                ]}
              />
          

          <div align="center"><Button onClick={this.closeModal}>close</Button></div>
        </Modal>
{/*
        <ItemGrid xs={12} sm={12} md={12}>
          <RegularCard
            plainCard
            cardTitle="Table on Plain Background"
            cardSubtitle="Here is a subtitle for this table"
            content={
              <Table
                tableHeaderColor="primary"
                tableHead={["ID", "Name", "Country", "City", "Salary"]}
                tableData={[
                  ["1", "Dakota Rice", "$36,738", "Niger", "Oud-Turnhout"],
                  ["2", "Minerva Hooper", "$23,789", "Curaçao", "Sinaai-Waas"],
                  ["3", "Sage Rodriguez", "$56,142", "Netherlands", "Baileux"],
                  [
                    "4",
                    "Philip Chaney",
                    "$38,735",
                    "Korea, South",
                    "Overland Park"
                  ],
                  [
                    "5",
                    "Doris Greene",
                    "$63,542",
                    "Malawi",
                    "Feldkirchen in Kärnten"
                  ],
                  ["6", "Mason Porter", "$78,615", "Chile", "Gloucester"]
                ]}
              />
            }
          />
        </ItemGrid>
*/}
      </Grid>
    </div>
    )
  };
}
export default withStyles(styles)(TableList);