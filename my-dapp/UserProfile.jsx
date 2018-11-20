import React, { Component } from "react";
import { Grid } from "material-ui";

import {
  ProfileCard,
  RegularCard,
  Button,
  CustomInput,
  ItemGrid
} from "/Users/mac/Desktop/my-dapp/src/components";


//加入圖片連結
import avatar from "/Users/mac/Desktop/my-dapp/src/assets/img/faces/Xubo.jpg";

//加入ethereum web3指令
import Web3 from 'web3';
const web3 = new Web3();
window.web3 = web3
const eth = web3.eth;
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545')); //指定為RPC server的位置



class UserProfile extends Component {
  
  constructor() {
    super();
    this.state = {
      accounts: '',
      blockHeight: '',
      blocks: [],
      currentAddress: '',
      message: '',
    }
  }

  //部署智能合約的發送交易
  submitTransaction() {
    this.setState({ sending: true });
    try {
      if (!this.state.accountB || !this.state.accountC || !this.state.accountD || !this.state.accountE) {
        alert('請將*輸入完整再送出。');
        window.location.reload();
        return
      }

      let transactionmessage = {
        //私有鏈第一個帳號作為發送者
        from: web3.eth.accounts[0],
        //填入智能合約部署的data
        data: '0x608060405234801561001057600080fd5b50604051608080610b2c833981016040908152815160208301519183015160609093015160008054600160a060020a0319908116331790915560018054600160a060020a0394851690831617815560028054958516958316959095179094556003805495841695821695909517909455600480549290911691909316179091556006819055600781905560088190556009819055600a55610a76806100b66000396000f3006080604052600436106100ef5763ffffffff7c0100000000000000000000000000000000000000000000000000000000600035041662b36376811461046d57806306867f7d1461049e5780631865c57d146104b3578063263629ef146104ec578063319ad105146105135780633f25a1b5146105285780636fa08131146105c857806375bbcff314610633578063844669b3146106485780638640dbff1461065d578063b5f1d4dd14610675578063bafebd9e1461068a578063defd6c5f1461069f578063e5bfa3bf146106b4578063ecb6af21146106c9578063ee980bf6146106de578063eec98675146106f3575b6000600a600d5460ff16600a81111561010457fe5b141561010f57600080fd5b600054600160a060020a03163314801561013a57506000600d5460ff16600a81111561013757fe5b14155b801561015757506001600d5460ff16600a81111561015457fe5b14155b1561016157600080fd5b600154600160a060020a03163314801561018c57506002600d5460ff16600a81111561018957fe5b14155b80156101a957506003600d5460ff16600a8111156101a657fe5b14155b156101b357600080fd5b600254600160a060020a0316331480156101de57506004600d5460ff16600a8111156101db57fe5b14155b80156101fb57506005600d5460ff16600a8111156101f857fe5b14155b1561020557600080fd5b600354600160a060020a03163314801561023057506006600d5460ff16600a81111561022d57fe5b14155b801561024d57506007600d5460ff16600a81111561024a57fe5b14155b1561025757600080fd5b600454600160a060020a03163314801561028257506008600d5460ff16600a81111561027f57fe5b14155b801561029f57506009600d5460ff16600a81111561029c57fe5b14155b156102a957600080fd5b6000600d5460ff16600a8111156102bc57fe5b14156102db57600d80546001919060ff191682805b021790555061046a565b6001600d5460ff16600a8111156102ee57fe5b141561030857600d80546002919060ff19166001836102d1565b6002600d5460ff16600a81111561031b57fe5b141561033557600d80546003919060ff19166001836102d1565b6003600d5460ff16600a81111561034857fe5b141561036257600d80546004919060ff19166001836102d1565b6004600d5460ff16600a81111561037557fe5b141561038f57600d80546005919060ff19166001836102d1565b6005600d5460ff16600a8111156103a257fe5b14156103bc57600d80546006919060ff19166001836102d1565b6006600d5460ff16600a8111156103cf57fe5b14156103e957600d80546007919060ff19166001836102d1565b6007600d5460ff16600a8111156103fc57fe5b141561041657600d80546008919060ff19166001836102d1565b6008600d5460ff16600a81111561042957fe5b141561044357600d80546009919060ff19166001836102d1565b6009600d5460ff16600a81111561045657fe5b141561046a57600d805460ff1916600a1790555b50005b34801561047957600080fd5b50610482610758565b60408051600160a060020a039092168252519081900360200190f35b3480156104aa57600080fd5b50610482610767565b3480156104bf57600080fd5b506104c8610776565b6040518082600a8111156104d857fe5b60ff16815260200191505060405180910390f35b3480156104f857600080fd5b50610501610780565b60408051918252519081900360200190f35b34801561051f57600080fd5b50610482610786565b34801561053457600080fd5b50610549600160a060020a0360043516610795565b6040518083815260200180602001828103825283818151815260200191508051906020019080838360005b8381101561058c578181015183820152602001610574565b50505050905090810190601f1680156105b95780820380516001836020036101000a031916815260200191505b50935050505060405180910390f35b3480156105d457600080fd5b50604080516020600460443581810135601f8101849004840285018401909552848452610631948235600160a060020a031694602480359536959460649492019190819084018382808284375094975061084f9650505050505050565b005b34801561063f57600080fd5b506105016108e6565b34801561065457600080fd5b506104826108ec565b34801561066957600080fd5b506104826004356108fb565b34801561068157600080fd5b50610501610923565b34801561069657600080fd5b50610501610929565b3480156106ab57600080fd5b5061050161092f565b3480156106c057600080fd5b50610501610935565b3480156106d557600080fd5b5061048261093b565b3480156106ea57600080fd5b5061050161094a565b3480156106ff57600080fd5b50610708610950565b60408051602080825283518183015283519192839290830191858101910280838360005b8381101561074457818101518382015260200161072c565b505050509050019250505060405180910390f35b600354600160a060020a031681565b600054600160a060020a031681565b600d5460ff165b90565b60085481565b600454600160a060020a031681565b600160a060020a0381166000908152600b602090815260408083208054600191820180548451600294821615610100026000190190911693909304601f8101869004860284018601909452838352606094919390929183919083018282801561083f5780601f106108145761010080835404028352916020019161083f565b820191906000526020600020905b81548152906001019060200180831161082257829003601f168201915b5050505050905091509150915091565b600160a060020a0383166000908152600b60209081526040909120838155825190916108829160018401918501906109b2565b5050600c80546001810182556000919091527fdf6966c971051c3d54ec59162606531493a51404a002842f56009d7e5cf4a8c701805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0394909416939093179092555050565b60095481565b600254600160a060020a031681565b600c80548290811061090957fe5b600091825260209091200154600160a060020a0316905081565b60075481565b600a5481565b60055481565b600c5490565b600154600160a060020a031681565b60065481565b6060600c8054806020026020016040519081016040528092919081815260200182805480156109a857602002820191906000526020600020905b8154600160a060020a0316815260019091019060200180831161098a575b5050505050905090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106109f357805160ff1916838001178555610a20565b82800160010185558215610a20579182015b82811115610a20578251825591602001919060010190610a05565b50610a2c929150610a30565b5090565b61077d91905b80821115610a2c5760008155600101610a365600a165627a7a72305820e87be61cdede61d20d71d830fdf22579a43c69e1b8471607e27d717239c17ec60029',
        gas: 4700000,
        //如何增加Input資料？ 移除上方的`data`部署智能合約會失敗，修改為下面的`data`智能合約部署之後會出現`gas`不足
        //data: '0x54686973206f726465722069732067656e65726174656420627920736d61727420636f6e74726163742e',
      };
      
      // 需要修改- 發送交易的帳號 2018.08.01

      // 解鎖發送交易的帳號
      web3.personal.unlockAccount(web3.eth.coinbase, this.state.pass1); // 如有設帳號密碼須於第二個參數輸入
      // 智能合約ABI
      var tradehandlerContract = web3.eth.contract([{"constant":true,"inputs":[],"name":"accountD","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"accountA","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getState","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"accountCFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"accountE","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"ins","type":"address"}],"name":"getoperator","outputs":[{"name":"","type":"uint256"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"},{"name":"_ID","type":"uint256"},{"name":"_Pstate","type":"string"}],"name":"setoperator","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"accountDFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"accountC","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"operatorAccounts","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"accountBFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"accountEFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"purchasePrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"CountOperators","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"accountB","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"accountAFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getoperators","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_accountB","type":"address"},{"name":"_accountC","type":"address"},{"name":"_accountD","type":"address"},{"name":"_accountE","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"}]);
      // 發送交易(智能合約部署)
      var tradehandler = tradehandlerContract.new(
        //智能合約部署前的前置設定，共四個工站帳戶 B, C, D, E,
        this.state.accountB,
        this.state.accountC,
        this.state.accountD,
        this.state.accountE,
        transactionmessage, function (err, result){
        if (err) {
          alert(err);
          window.location.reload();
          return
        }
        alert(`交易完成送出，交易序號: ${tradehandler.transactionHash}`);
        // 將序號轉QRcode彈出網頁
        // const transcationhash = 'http://chart.apis.google.com/chart?cht=qr&chl=' + `${tradehandler.contract}` + '&chs=300x300';
        //window.open(transcationhash)
        // 網頁刷新
        window.location.reload();
      });
    } catch (err) {
      alert(err)
      window.location.reload();
    }
  }

  

  accountTransaction() {
    this.setState({ sending: true });
    try {
      if (!this.state.senderAddress || !this.state.receiverAddress || !this.state.message || !this.state.pass) {
        alert('請輸入完再按確認。');
        window.location.reload();
        return
      }   
      let transaction = {
        from: this.state.senderAddress,
        to: this.state.receiverAddress,
        value: 1,
        data: web3.fromUtf8(this.state.message),
        gas: 221000 //因為要在交易中放入Data,因此要讓它自動判斷這交易應該要給多少的gas,可以透過web3指令去判斷交易應該多少gas,所以先把值設定很高
      };
      if (!web3.isAddress(this.state.senderAddress)
        || !web3.isAddress(this.state.receiverAddress)) {
        alert("地址格式不正確");
        window.location.reload();
        return
      }
      // 解鎖發送交易的帳號
      web3.personal.unlockAccount(this.state.senderAddress, this.state.pass); // 如有設帳號密碼須於第二個參數輸入
      // 發送交易
      eth.sendTransaction(transaction, function (err, result) {
        if (err) {
          alert(err);
          window.location.reload();
          return
        }
        alert(`交易成功，${result}`);
        window.location.reload();
      })
    } catch (err) {
      alert(err)
      window.location.reload();
    }
  }
  
  // 偵測目前私有鏈上帶交易量，並執行挖礦（尚未完成有bug)
    checkWork() {
    this.setState({ sending: true });
    if (eth.getBlock("pending").transactions.length > 0) {
        if (eth.mining) return;
        web3.miner.start(1);
    } else {
        web3.miner.stop(0);  // This param means nothing
      } 
  }  

  render() {
    return (
    <div>
      <Grid container>
        <ItemGrid xs={12} sm={12} md={12}>
          <RegularCard
            headerColor="green" //設定抬頭顏色
            cardTitle="建立產品智能合約履歷"
            cardSubtitle="產品進入生產線建立在區塊鏈上的產品履歷模擬"
            content={
              <div>
                <Grid container>
                  <ItemGrid xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="工站2號人員帳戶地址"
                      id="company-disabled"
                      formControlProps={{
                        onChange: (e) => this.setState({ accountB: e.target.value }),
                        fullWidth: true
                      }}
                      /*讓表格停止動畫
                      inputProps={{
                        disabled: true
                      }}
                      */
                    />
                  </ItemGrid>
                  <ItemGrid xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="工站3號人員帳戶地址"
                      id="company-disabled"
                      formControlProps={{
                        onChange: (e) => this.setState({ accountC: e.target.value }),
                        fullWidth: true
                      }}
                    />
                  </ItemGrid>
                </Grid>
                <Grid container>
                  <ItemGrid xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="工站4號人員帳戶地址"
                      id="company-disabled"
                      formControlProps={{
                        onChange: (e) => this.setState({ accountD: e.target.value }),
                        fullWidth: true
                      }}
                    />
                  </ItemGrid>
                  <ItemGrid xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="工站5號人員帳戶地址"
                      id="company-disabled"
                      formControlProps={{
                        onChange: (e) => this.setState({ accountE: e.target.value }),
                        fullWidth: true
                      }}
                    />
                  </ItemGrid>
                  <ItemGrid xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="確認密碼(Address pass)"
                      id="company-disabled"
                      formControlProps={{
                        onChange: (e) => this.setState({ pass1: e.target.value }),
                        fullWidth: true
                      }}
                    />
                  </ItemGrid>
                </Grid>
              </div>
            }
            footer={<Button onClick={() => this.submitTransaction()} >送出訂單</Button>}
          />
        </ItemGrid>
        {/* 這是一個聯絡人字卡
        <ItemGrid xs={12} sm={12} md={4}>
          <ProfileCard
            avatar={avatar}
            subtitle="CEO / CO-FOUNDER"
            title="Xu Bo Chun"
            description="系統聯絡人 / 系統製作人"
            footer={
              <Button color="primary" round>
                聯絡
              </Button>
            }
          />
        </ItemGrid>
        */}
        <ItemGrid xs={12} sm={12} md={12}>
        <RegularCard
            headerColor="blue" //設定抬頭顏色        
            cardTitle="確認"
            cardSubtitle="生產線人員在產品進出工站確認機制模擬"
            content={
              <div>
                <Grid container>
                  <ItemGrid xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="確認人員(From)"
                      id="company-disabled"
                      formControlProps={{
                        onChange: (e) => this.setState({ senderAddress: e.target.value }),
                        fullWidth: true
                      }}
                    />
                  </ItemGrid>
                  <ItemGrid xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="履歷編號(To)"
                      id="company-disabled"
                      formControlProps={{
                        onChange: (e) => this.setState({ receiverAddress: e.target.value }),
                        fullWidth: true
                      }}
                    />
                  </ItemGrid>
                  <ItemGrid xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="訊息(Message)"
                      id="company-disabled"
                      formControlProps={{
                        onChange: (e) => this.setState({ message: e.target.value }),
                        fullWidth: true
                      }}
                    />
                  </ItemGrid>
                  <ItemGrid xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="確認密碼(Address pass)"
                      id="company-disabled"
                      formControlProps={{
                        onChange: (e) => this.setState({ pass: e.target.value }),
                        fullWidth: true
                      }}
                    />
                  </ItemGrid>
                </Grid>
              </div>                    
            }
            footer={<Button onClick={() => this.accountTransaction()} >{this.state.sending ? '請稍等...' : '發送'}</Button>}
          />
        </ItemGrid>
      </Grid>
    </div>
  );
  }
}

export default UserProfile;