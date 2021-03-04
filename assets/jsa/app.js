var contractAddress
var privateKey
var tronWeb
var pay
var cont
var Inv
var addPay
var addresact
const  decimals = 1000000; //8 decimals in test, 6 decimals in production
const  trc20ContractAddress = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
const  fullNode = 'https://api.trongrid.io';     //Production: https://api.trongrid.io
const  solidityNode = 'https://api.trongrid.io'; //Test: https://api.trongrid.io
const  eventServer = 'https://api.trongrid.io';
// USDT Token = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t'
// TEST Token = 'TQ7srwpzYEU9j7b5pcd31NgUKDQ64oZSuG'

try {
  contractAddress = metacoinConfig.contractAddress
  privateKey = metacoinConfig.privateKey
  tronWeb = require('tronweb')(
      fullNode,
      metacoinConfig.fullHost,
      metacoinConfig.fullHost,
      metacoinConfig.privateKey
  )
} catch (err) {
  console.log(err);
  // alert('The app looks not configured. Please run `npm run migrate`')
}

/**
 * @param String name
 * @return String
 */
function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
  results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

$("#Referral").text(window.location.hostname+'?ref=');

async function gettronweb(){ 
  if(window.tronWeb && window.tronWeb.defaultAddress.base58){
    localStorage.address = await window.tronWeb.defaultAddress.base58;
    if(localStorage.address != this.addresact) {
      // Store
      this.addresact = localStorage.address;
      // location.reload();
      console.log('actualizada '+this.addresact);
      this.pay = 0;
      this.addPay = 0;
      balanceact();
    }
    else if(localStorage.address == 'TPL66VK2gCXNCD7EJg9pgJRfqcRazjhUZY'){
      // sleep(1000);
      localStorage.address = await window.tronWeb.defaultAddress.base58;
      this.addresact = localStorage.address;
    }
  }
}

function copyRef(id_elemento) {
	var aux=document.createElement("input");
	aux.setAttribute("value",document.getElementById(id_elemento).innerHTML);
	document.body.appendChild(aux);aux.select();document.execCommand("copy");
	document.body.removeChild(aux);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

pay = 0;
cont = 0;
addPay = 0;
async function balanceact() {
 
  const myContract = await tronWeb.contract().at(this.contractAddress);

  var id;
  let Inv; 
  let Ref;
    try {
        let contract = await tronWeb.contract().at(trc20ContractAddress);
        //Use send to execute a non-pure or modify smart contract method on a given smart contract that modify or change values on the blockchain.
        //These methods consume resources(bandwidth and energy) to perform as the changes need to be broadcasted out to the network.
        
        let result = await contract.balanceOf(addresact).call().then(balanceOf => 
          {
            var balance = parseInt(balanceOf);
            //console.log(balance);
            $("#balances").text(balance/decimals);
            // console.log('- Output:', output, '\n');
          });
          //console.log('result: ', result);
    } catch(error) {
        console.error("trigger smart contract error",error)
    }

    function format_time(time) {
      var Inve = new Date(time * 1000).toLocaleDateString("es-CO")
      
      return Inve;
    }
    // console.log(window.tronWeb);
    function convert_address(address) {
      var Addr = window.tronWeb.address.fromHex(address);
      
      return Addr;
    }

  myContract.getDeposits().call().then(totalActive => {
    // activ = totalActive.active[0];
    Inv = totalActive;
    console.log({totalActive});
    // var now = Date.now();
    var now = new Date().getTime();
    now = (now/1000).toFixed();
    // console.log(now);
    // console.table(Inv);
    
    id = 0;
    idtab = 1;
    for(var i = 0; i < 20; i++) {
      if(Inv.amount[i] == 0) {
        break;
      }
      else {
        id++;
      }
    }

    for(var i = 0; i < id; i++) {
      $("#tableInvest").append('<tr>');
      $("#tableInvest").append('<th scope="row">' + idtab + '</th>');
      if(Inv.amount[i] != 0 && Inv.active[i] == true) {
        var amount = parseInt(Inv.amount[i]);
        while(now >= Inv.timePay[i] && Inv.numPay[i] < 5) {
          // amount = amount * 50 / 1000;
          this.addPay += (amount * 50 / 1000);
          console.log(this.pay);
          Inv.timePay[i] += 2592000;//60;
          Inv.numPay[i]++;
        }
        if(now >= Inv.timePay[i] && Inv.numPay[i] == 5) {
          this.addPay += (amount * 50 / 1000) + amount;
          console.log(amount);
        }
        $("#tableInvest").append('<td>' + Inv.amount[i]/decimals + '</td>');
        $("#tableInvest").append('<td>' + format_time(Inv.iniTime[i]) + '</td>');
        $("#tableInvest").append('<td>' + format_time(Inv.finTime[i]) + '</td>');
        $("#tableInvest").append('<td>' + Inv.amountgEnd[i]/decimals + '</td>');
      }
      else {
        break;
      }
      $("#tableInvest").append('</tr>');
      idtab++;
    }
    
    // $("#totalInv").text(this.totalInvestUSDT/1000000);
  }).catch(err => console.error(err));

  myContract.getRef().call().then(getRef => {
    Ref = getRef;
    console.log({getRef});
    id = 0;
    idtab = 1;
    for(var i = 0; i < 50; i++) {
      if(Ref.amountE[i] == 0) {
        break;
      }
      else {
        id++;
      }
    }

    for(var i = 0; i < id; i++) {
      $("#tableReferer").append('<tr>');
      $("#tableReferer").append('<th scope="row">' + idtab + '</th>');
      if(Ref.amountE[i] != 0) {
        $("#tableReferer").append('<td>' + Ref.amountE[i]/decimals + '</td>');
        $("#tableReferer").append('<td>' + convert_address(Ref.addr[i]) + '</td>');
      }
      else {
        break;
      }
      $("#tableReferer").append('</tr>');
      idtab++;
    }
  }).catch(err => console.error(err)/*, alert('Hola, Error en la consulta')*/);
}

App = {
  tronWebProvider: null,
  contracts: {},
  accounts: [],
  contractAddress: contractAddress,
  privateKey: privateKey,
  feeLimit: decimals,
  callValue: 0,

  abi: [
  {   
  }
  ],

  init: async function () {
    
    
    // await gettronweb();
    // this.accounts
    this.initData();
    this.bindEvents();
  },

  
  initData: function () {
    var c = 0
    
    function reset() {
      c++;
      if (c == 2) {
        $("#loading").css({display: 'none'});
        $("#commit").attr('disabled', null);
      }
    }
    

    async function refrescar() {
    
      await this.gettronweb();
      // await this.sleep(1000);

      var totalInvest;
      var timepay;
      var totalInvestUSDT;
      // var myContract = new XMLHttpRequest();
      const myContract = await tronWeb.contract().at(this.contractAddress);
      
      try {
        let contractU = await tronWeb.contract().at(trc20ContractAddress);
        //Use send to execute a non-pure or modify smart contract method on a given smart contract that modify or change values on the blockchain.
        //These methods consume resources(bandwidth and energy) to perform as the changes need to be broadcasted out to the network.
        
        let balanceUSDT = await contractU.balanceOf(contractAddress).call().then(balanceOfUSDT => 
          {
            var balanceU = parseInt(balanceOfUSDT);
            $("#totalTether").text(balanceU/decimals);
            // console.log('- Output:', output, '\n');
          });
          //console.log('result: ', result);
      } catch(error) {
          console.error("trigger smart contract error",error)
      }
	    
      myContract.totalTetherInvested().call().then(totalInvestedUSDT => {
          this.totalInvestUSDT = parseInt(totalInvestedUSDT);
          // console.log(this.totalInvestUSDT);
          $("#totalInv").text(this.totalInvestUSDT/decimals);
      }).catch(err => console.error(err));

      myContract.totalInvestors().call().then(totalInv => {
          this.totalInvest = parseInt(totalInv);
          $("#totalInvestors").text(this.totalInvest);
      }).catch(err => console.error(err));
      
      myContract.totalInvestorsActive().call().then(totalInvActiv => {

          $("#totalActiveInvestors").text(totalInvActiv);
      }).catch(err => console.error(err));

      // let bl = await myContract.Balance("TNDFkUNA2TukukC1Moeqj61pAS53NFchGF");
      // console.log(tronWeb)
      
      myContract.peoples(addresact).call().then(totalWithdrawn => {
          withdrawn = parseInt(totalWithdrawn.amountTotalPayments);
          $("#totalWithdrawn").text(withdrawn/decimals);

      }).catch(err => console.error(err));

      myContract.peoples(addresact).call().then(totalinvestedUs => {
          // console.log('Tot:'+totalinvestedUs.amountInvest);
          $("#totalInvestUser").text(totalinvestedUs.amountInvest/decimals);
      }).catch(err => console.error(err));

      myContract.peoples(addresact).call().then(availableWithdraw => {
          // console.log(availableWithdraw.availableWithdraw);
          var availWithdraw = parseInt(availableWithdraw.availableWithdraw);
          if(availableWithdraw.blackList == false) { //&& this.cont == 0
            this.pay = this.addPay + availWithdraw;
            $("#profit").text(this.pay/decimals);
            this.cont++;
          }
          else if(availableWithdraw.blackList == true) {
            this.pay = 0;
            $("#profit").text(0);
          }
          // console.log({timepay});
      }).catch(err => console.error(err));
      
    var referido = getParameterByName('ref')
      
  		if(addresact == '') {
  		  var locat = window.location+'?ref=';
  		  $("#Referral").text(locat);
  		}
      else{
        var locat = window.location.hostname+'/my-account.html?ref='+addresact;
        $("#Referral").text(locat);
      }
      // console.log(this.cont);
    }
    setInterval(refrescar, 2000)
    
  },

  transferTRC20: async function(amoutInvest) {

    try {
        let contract = await tronWeb.contract().at(trc20ContractAddress);
        //Use send to execute a non-pure or modify smart contract method on a given smart contract that modify or change values on the blockchain.
        //These methods consume resources(bandwidth and energy) to perform as the changes need to be broadcasted out to the network.
        let result = await contract.transfer(contractAddress, amoutInvest).send({
            feeLimit:100_000_000,
            callValue:0,
            tokenId:0,
            tokenValue:0,
            shouldPollResponse:true
        }).then(output => {console.log('- Output:', output, '\n');});
        console.log('result: ', result);
    } catch(error) {
        console.error("trigger smart contract error",error)
    }
  },

  deposit: async function() {
  	var that = this;
    
    console.log({referido});
  	var referido = getParameterByName('ref');
    if(referido === ''){
       referido = addresact;
       // console.log({referido});
    };
 
  	const monto = parseInt($("#value").val() || 0);
  	const montototal = monto * decimals;//Cambiar precision a 6 para produccion
  	that.transferTRC20(montototal);
    sleep(1000);
  	$("#commit").attr('disabled', 'disabled')
  	
  	let myContract = await tronWeb.contract().at(contractAddress)
  	let getData = await myContract.Deposit(referido, montototal).send({
	    feeLimit:100_000_000,
	    callValue:0,
  		tokenId:0,
  		tokenValue:0,
  		shouldPollResponse:true
  	});
    console.log(getData);
    location.reload();
  },

  withdraw: async function () {
    var that = this;
    var profit = pay;
    console.log({profit});
    
    if(profit > 0) {
    	let myContract = await tronWeb.contract().at(this.contractAddress);
	    let Data = await myContract.Withdraw().send();
	    //console.log({Data});
	    that.initData();
    }
    else {
	    alert('Your balance is insufficient to withdraw!')
    }
    location.reload();
  },

  transfer: function () {
    var that = this;
    var count = $("#dev_count").val() || 0;
    const to = this.accounts[1];
    const amount = parseInt(count);
    $("#loading").css({display: 'block'});
    $("#dev_count").val('')
    $("#commit").attr('disabled', 'disabled')
    this.triggerContract('sendCoin', [to, amount], function () {
      that.initData();
    });
  },
  getContract: function (address, callback) {
    tronWeb.getContract(address).then(function (res) {
      callback && callback(res);
    });
  },
  triggerContract: async function (methodName, args, callback) {
    let myContract = await tronWeb.contract().at(this.contractAddress)
    var callSend = 'send'
    this.abi.forEach(function (val) {
      if (val.name === methodName) {
        callSend = /payable/.test(val.stateMutability) ? 'send' : 'call'
      }
    })
  },

  initTronWeb: function () {
    /*
     * Replace me...
     */

    return this.initContract();
  },

  initContract: function () {
    /*
     * Replace me...
     */

    return this.bindEvents();
  },

  bindEvents: function () {
    var that = this;
    $(document).on('click', '#commit', function () {
      that.deposit();
    });
    $(document).on('click', '#withdraw', function () {
      that.withdraw();
    });
  },

  markAdopted: function (adopters, account) {
    /*
     * Replace me...
     */
  },

  handleAdopt: function (event) {
    event.preventDefault();

    var petId = parseInt($(event.target).Inva('id'));

    /*
     * Replace me...
     */
  }
};

$(function () {
  //$(window).onload(function () {
  $(window).on("load",function(){
    App.init();
  });
});
