var userAddress = '';
const urlQueryString = window.location.search;
    const urlParams = new URLSearchParams(urlQueryString);

    var refWallet = (urlParams.get('ref'));

    var userReferer = refWallet;
var basicPercentRate = 1;
var contractBalanceRate = 0;
var userPercentRate = 0;
var holdPercentRate = 0;
var userAvailable = 0;
var userTotalDeposits = 0;
var userTotalWithdrawn = 0;
var userAmountOfDeposits = 0;
var userLastDepositTime = 0;
var userRbackPerc = 0;
var userReferrerRbackPerc = 0;
var userRefsEarned = 0;
var userRefsLevel1 = 0;
var userRefsLevel2 = 0;
var userRefsLevel3 = 0;
var userRefsLevel4 = 0;
var userRefsLevel5 = 0;
var userRefsLevel6 = 0;
var userRefsLevel7 = 0;
var userRefsLevel8 = 0;
var userRefsLevel9 = 0;
var userRefsLevel10 = 0;
var FEE_LIMIT = 1e8;
var TOKEN_ID = 1002000;

function getFormattedDate(date)
{
  let hour = ('0' + date.getUTCHours()).slice(-2);
  let minute = ('0' + date.getUTCMinutes()).slice(-2);
  let day = ('0' + date.getUTCDate()).slice(-2);
  let month = ('0' + (date.getUTCMonth() + 1)).slice(-2);
  let year = date.getUTCFullYear();
  return hour + ':' + minute + ' ' + day + '.' + month + '.' + year
}

function getFormattedNumber(num)
{
  var num = num + '';
  var value = Number(num);
  var res = num.split('.');
  if (res[0].length <= 2)
  {
    return value.toFixed(6)
  }
  else if (res[0].length == 3)
  {
    return value.toFixed(5)
  }
  else if (res[0].length == 4)
  {
    return value.toFixed(4)
  }
  else if (res[0].length == 5)
  {
    return value.toFixed(3)
  }
  else if (res[0].length == 6)
  {
    return value.toFixed(2)
  }
  else if (res[0].length == 7)
  {
    return value.toFixed(1)
  }
  else if (res[0].length >= 8)
  {
    return value.toFixed(0)
  }
}
var abi = [
	{
		"constant": true,
		"inputs": [],
		"name": "PERCENTS_DIVIDER",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "referrer",
				"type": "address"
			}
		],
		"name": "invest",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "userAddress",
				"type": "address"
			}
		],
		"name": "getUserAvailable",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "userAddress",
				"type": "address"
			}
		],
		"name": "getUserPercentRate",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "MAX_CONTRACT_PERCENT",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getSiteStats",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "WITHDRAW_MIN_AMOUNT",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getCurrentDayWithdrawLimit",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getCurrentHalfDayWithdrawTurnover",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "userAddress",
				"type": "address"
			}
		],
		"name": "getUserReferralsStats",
		"outputs": [
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "uint64"
			},
			{
				"name": "",
				"type": "uint64"
			},
			{
				"name": "",
				"type": "uint64"
			},
			{
				"name": "",
				"type": "uint24[10]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "TIME_STEP",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "DAY_LIMIT_STEPS",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "projectAddress",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getCurrentInvestLimit",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "MAX_HOLD_PERCENT",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "userAddress",
				"type": "address"
			},
			{
				"name": "last",
				"type": "uint256"
			},
			{
				"name": "first",
				"type": "uint256"
			}
		],
		"name": "getUserDeposits",
		"outputs": [
			{
				"name": "",
				"type": "uint256[]"
			},
			{
				"name": "",
				"type": "uint256[]"
			},
			{
				"name": "",
				"type": "uint256[]"
			},
			{
				"name": "",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "PROJECT_FEE",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalWithdrawn",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "userAddress",
				"type": "address"
			}
		],
		"name": "getUserStats",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalInvested",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getCurrentHalfDayWithdrawAvailable",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "REFERRAL_PERCENTS",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "BASE_PERCENT",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "rbackPercent",
				"type": "uint16"
			}
		],
		"name": "setRefback",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "CONTRACT_BALANCE_STEP",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getContractBalance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalDeposits",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "INVEST_MAX_AMOUNT",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "contractCreation",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "userAddress",
				"type": "address"
			}
		],
		"name": "getUserTotalDeposits",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getCurrentHalfDayWithdraw",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getCurrentDayLimit",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "contractPercent",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "userAddress",
				"type": "address"
			}
		],
		"name": "isActive",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "marketingAddress",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "userAddress",
				"type": "address"
			}
		],
		"name": "getUserAmountOfDeposits",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "DEPOSITS_MAX",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "MARKETING_FEE",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getCurrentHalfDayAvailable",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "DAY_LIMIT_WITHDRAW",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "userAddress",
				"type": "address"
			}
		],
		"name": "getUserHoldRate",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "INVEST_MIN_AMOUNT",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getCurrentHalfDayTurnover",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getCurrentHalfDay",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "INVEST_MAX_AMOUNT_STEP",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "userAddress",
				"type": "address"
			}
		],
		"name": "getUserTotalWithdrawn",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "marketingAddr",
				"type": "address"
			},
			{
				"name": "projectAddr",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "user",
				"type": "address"
			}
		],
		"name": "Newbie",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "NewDeposit",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Withdrawn",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "referrer",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "referral",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "level",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "RefBonus",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "referrer",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "referral",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "RefBack",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "totalAmount",
				"type": "uint256"
			}
		],
		"name": "FeePayed",
		"type": "event"
	}
];
$(function()
{
  function setUserAddress(address)
  {
    $('.trxWallet').val(address);
    $('.trxWalletTa125').html('<a href="https://techbtt.site/?ref=' + address + '"><img src="https://techbtt.site/img/125.gif" width="125" height="125" alt="techbtt.site | Get +200% up to your deposit right now. Safe and legit!"></a>');
    $('.trxWalletTa468').html('<a href="https://techbtt.site/?ref=' + address + '"><img src="https://techbtt.site/img/468.gif" width="468" height="60" alt="techbtt.site | Get +200% up to your deposit right now. Safe and legit!"></a>');
    $('.trxWalletTa728').html('<a href="https://techbtt.site/?ref=' + address + '"><img src="https://techbtt.site/img/728.gif" width="728" height="90" alt="techbtt.site | Get +200% up to your deposit right now. Safe and legit!"></a>');
    $('.reflink').html('https://techbtt.site/?ref=' + address);
    $('#reflink').val('https://techbtt.site/?ref=' + address)
  }
  var obj = setInterval(async () =>
  {
    if (window.tronWeb && window.tronWeb.defaultAddress.base58)
    {
      clearInterval(obj);
      userAddress = window.tronWeb.defaultAddress.base58;
      $('.authFalse').hide();
      $('.authTrue').attr('style', 'display:block !important');
      setUserAddress(userAddress);
      userStatsUpdate();
      setTimeout(function()
      {
        var accountInterval = setInterval(async () =>
        {
          if (window.tronWeb.defaultAddress.base58 !== userAddress)
          {
            userAddress = window.tronWeb.defaultAddress.base58;
            setUserAddress(userAddress);
            userStatsUpdate()
          }
        }, 100)
      }, 500)
    }
  }, 10);
  async function invest(n)
  {
    var amount = parseFloat($('.trxAmount' + n).val().replace(',', '.'));
    if (!amount)
    {
      $('.trxAmountError' + n + '1').show()
    }
    else if (amount < 2000)
    {
      $('.trxAmountError' + n + '2').show()
    }
    else
    {
      amount = Math.floor(amount * 1000000);
      if (!tronWeb.isAddress(userReferer))
      {
        userReferer = refererDefault
      }
      try
      {
        let instance = await tronWeb.contract(abi, contractAddress);
        let res = await instance.invest(userReferer).send(
        {
          tokenValue:amount,
					tokenId:TOKEN_ID,
					feeLimit: FEE_LIMIT,
					callValue: 0,
          shouldPollResponse:false
        });
        userLastDepositTime = Math.ceil(new Date().getTime() / 1000);
        userLastDepositTimeFormatted = getFormattedDate(new Date(userLastDepositTime * 1000));
        $('.userLastDepositTime').html(userLastDepositTimeFormatted);
        if (!$('div[data-remodal-id="wallet"]').is(':visible'))
        {
          $('#goToWallet').trigger('click')
        }
      }
      catch (error)
      {}
    }
  }
  $(".investButton1").click(function(e)
  {
    e.preventDefault();
    invest(1);
    return false
  });
  $(".investButton2").click(function(e)
  {
    e.preventDefault();
    invest(2);
    return false
  });
  $('.trxAmount1').on('input', function()
  {
    $('.trxAmountError11').hide();
    $('.trxAmountError12').hide()
  });
  $('.trxAmount2').on('input', function()
  {
    $('.trxAmountError21').hide();
    $('.trxAmountError22').hide()
  });
  async function withdraw()
  {
    try
    {
      let instance = await tronWeb.contract(abi, contractAddress);
      let res = await instance.withdraw().send(
      {
        feeLimit: FEE_LIMIT,
					callValue: 0,
          shouldPollResponse:false
      });
      if (!$('div[data-remodal-id="wallet"]').is(':visible'))
      {
        $('#goToWallet').trigger('click')
      }
    }
    catch (error)
    {}
  }
$(".withdrawButton").click(function(e) {
    e.preventDefault();
    withdraw();
    return false
});
async function refback() {
    var amount = parseFloat($('.rbackPerc').val().replace(',', '.'));
    if ((amount != 0 && !amount) || amount < 0 || amount > 100) {
        $('.rbackPercError').show()
    } else {
        amount = Math.floor(amount * 100);
        if (!tronWeb.isAddress(userReferer)) {
            userReferer = refererDefault
        }
        try {
            let instance = await tronWeb.contract(abi, contractAddress);
            let res = await instance.setRefback(amount).send({
                callValue: 0
            });
            if (!$('div[data-remodal-id="wallet"]').is(':visible')) {
                $('#goToWallet').trigger('click')
            }
        } catch (error) {}
    }
}
$(".refbackButton").click(function(e) {
    e.preventDefault();
    refback();
    return false
});
$('.rbackPerc').on('input', function() {
    $('.rbackPercError').hide()
});
async function getUserStats() {
    let instance = await tronWeb.contract(abi, contractAddress);
    let res = await instance.getUserStats(userAddress).call();
    userPercentRate = tronWeb.toDecimal(res[0]);
    userAvailable = tronWeb.toDecimal(res[1]);
    userTotalDeposits = tronWeb.toDecimal(res[2]);
    userAmountOfDeposits = tronWeb.toDecimal(res[3]);
    userTotalWithdrawn = tronWeb.toDecimal(res[4]);
    holdPercentRate = tronWeb.toDecimal(res[5]);
    holdPercentRate = holdPercentRate /100;
    userPercentRate = userPercentRate / 100;
    userPercentRate = parseFloat(userPercentRate.toFixed(2));
    $('.userPercentRate').html('+' + userPercentRate + '%');
    //holdPercentRate = userPercentRate - usercontractRate;
    holdPercentRate = parseFloat(holdPercentRate.toFixed(2));
    $('.holdPercentRate').html('+' + holdPercentRate + '%');
    var userAvailableTrx = userAvailable / 1000000;
    userAvailableTrx = parseFloat(getFormattedNumber(userAvailableTrx));
    $('.userAvailable').html(userAvailableTrx);
    var userTotalDepositsTrx = userTotalDeposits / 1000000;
    userTotalDepositsTrx = parseFloat(getFormattedNumber(userTotalDepositsTrx));
    $('.userTotalDeposits').html(userTotalDepositsTrx);
    $('.userAmountOfDeposits').html(userAmountOfDeposits);
    var userTotalWithdrawnTrx = userTotalWithdrawn / 1000000;
    userTotalWithdrawnTrx = parseFloat(getFormattedNumber(userTotalWithdrawnTrx));
    $('.userTotalWithdrawn').html(userTotalWithdrawnTrx);
    var userTotalEarnedTrx = (userTotalWithdrawn + userAvailable) / 1000000;
    userTotalEarnedTrx = parseFloat(getFormattedNumber(userTotalEarnedTrx));
    $('.userEarned').html(userTotalEarnedTrx);
    $('.userReferer').html(userReferer);
    if (userAmountOfDeposits > 0) {
        $('.withdrawButton').prop('disabled', false);
        $('.withdrawButton').css('cursor', 'pointer');
        $('.withdrawButton').attr('title', '');
        $('.refbackButton').prop('disabled', false);
        $('.refbackButton').css('cursor', 'pointer');
        $('.refbackButton').attr('title', '')
    } else {
        $('.withdrawButton').prop('disabled', true);
        $('.withdrawButton').css('cursor', 'not-allowed');
        $('.withdrawButton').attr('title', 'Please make deposit first!');
        $('.refbackButton').prop('disabled', true);
        $('.refbackButton').css('cursor', 'not-allowed');
        $('.refbackButton').attr('title', 'Please make deposit first!')
    }
    var page = $('.userDepositsPage').html();
    await getUserDeposits(page)
}
async function getUserDeposits(page) {
    if (userAmountOfDeposits == 0) {
        $('.userLastDepositTime').html('no deposits');
        $('.userDeposits').html('<tr><td colspan="4">no deposits</td></tr>')
    } else {
        var perPage = 5;
        if (userAmountOfDeposits < perPage + 1) {
            var pages = 0;
            var first = userAmountOfDeposits;
            var last = 0
        } else {
            var total = userAmountOfDeposits;
            var pages = Math.ceil(total / perPage);
            var first = total - (page - 1) * perPage;
            var last = first - perPage;
            if (last < 0) {
                last = 0
            }
        }
        let instance = await tronWeb.contract(abi, contractAddress);
        let res = await instance.getUserDeposits(userAddress, last, first).call();
        var table;
        var index;
        for (index = 0; index < res[0].length; index += 1) {
            if (page == 1 && index == 0) {
                userLastDepositTime = tronWeb.toDecimal(res[3][index]);
                userLastDepositTimeFormatted = getFormattedDate(new Date(userLastDepositTime * 1000));
                $('.userLastDepositTime').html(userLastDepositTimeFormatted)
            }
            table += '<tr>';
            table += '<td>' + getFormattedDate(new Date(tronWeb.toDecimal(res[3][index]) * 1000)) + '</td>';
            table += '<td><img src="img/trx.svg" alt=""> ' + parseFloat(getFormattedNumber(tronWeb.toDecimal(res[0][index]) / 1000000)) + '</td>';
            table += '<td><img src="img/trx.svg" alt=""> ' + parseFloat(getFormattedNumber(tronWeb.toDecimal(res[1][index]) / 1000000)) + '</td>';
            table += '<td><img src="img/trx.svg" alt=""> ' + parseFloat(getFormattedNumber(tronWeb.toDecimal(res[2][index]) / 1000000)) + '</td>';
            table += '</tr>'
        }
        $('.userDeposits').html(table);
        if (pages > 0) {
            var pagination = '';
            var liClass = '';
            var aClass = '';
            pagination += '<ul class="pagination">';
            var index;
            for (index = 1; index <= pages; index += 1) {
                if (page == index) {
                    liClass = 'active';
                    aClass = 'current'
                } else {
                    liClass = '';
                    aClass = ''
                }
                pagination += '<li class="paginate_button page-item ' + liClass + '"><a href="#" class="page-link ' + aClass + '" onclick="$(\'.userDepositsPage\').html(' + index + '); $(\'.userDeposits\').html( \'...\' ); return false;">' + index + '</a></li>'
            }
            pagination += '</ul>';
            $('.userDepositsPagination').html(pagination)
        } else {
            $('.userDepositsPagination').html('')
        }
    }
}
async function getUserReferralsStats() {
    let instance = await tronWeb.contract(abi, contractAddress);
    let res = await instance.getUserReferralsStats(userAddress).call();
    userRbackPerc = tronWeb.toDecimal(res[1]);
    userReferrerRbackPerc = tronWeb.toDecimal(res[2]);
    userRefsEarned = tronWeb.toDecimal(res[3]);
    userRefsLevel1 = tronWeb.toDecimal(res[4][0]);
    userRefsLevel2 = tronWeb.toDecimal(res[4][1]);
    userRefsLevel3 = tronWeb.toDecimal(res[4][2]);
    userRefsLevel4 = tronWeb.toDecimal(res[4][3]);
    userRefsLevel5 = tronWeb.toDecimal(res[4][4]);
    userRefsLevel6 = tronWeb.toDecimal(res[4][5]);
    userRefsLevel7 = tronWeb.toDecimal(res[4][6]);
    userRefsLevel8 = tronWeb.toDecimal(res[4][7]);
    userRefsLevel9 = tronWeb.toDecimal(res[4][8]);
    userRefsLevel10 = tronWeb.toDecimal(res[4][9]);
    var userRbackPercVal = userRbackPerc / 100;
    userRbackPercVal = parseFloat(userRbackPercVal.toFixed(2));
    $('.userRbackPerc').html(userRbackPercVal + '%');
    if (!$('.rbackPerc').is(":focus")) {
        $('.rbackPerc').val(userRbackPercVal)
    }
    var userReferrerRbackPercVal = userReferrerRbackPerc / 100;
    userReferrerRbackPercVal = parseFloat(userReferrerRbackPercVal.toFixed(2));
    $('.userReferrerRbackPerc').html(userReferrerRbackPercVal + '%');
    userRefsEarnedTrx = userRefsEarned / 1000000;
    userRefsEarnedTrx = parseFloat(getFormattedNumber(userRefsEarnedTrx));
    $('.userRefsEarned').html(userRefsEarnedTrx);
    $('.userRefsLevel1').html(userRefsLevel1);
    $('.userRefsLevel2').html(userRefsLevel2);
    $('.userRefsLevel3').html(userRefsLevel3);
    $('.userRefsLevel4').html(userRefsLevel4);
    $('.userRefsLevel5').html(userRefsLevel5);
    $('.userRefsLevel6').html(userRefsLevel6);
    $('.userRefsLevel7').html(userRefsLevel7);
    $('.userRefsLevel8').html(userRefsLevel8);
    $('.userRefsLevel9').html(userRefsLevel9);
    $('.userRefsLevel10').html(userRefsLevel10)
}
  /*async function getContractBalance() {
    let instance = await tronWeb.contract(abi, contractAddress);
    let res = await instance.getContractBalance().call();
    contractBalance = tronWeb.toDecimal(res);
    var contractBalance = contractBalance / 1000000;
    contractBalance = parseFloat(contractBalance.toFixed(2));
    /*$('.contractBalance').data('max', contractBalanceN);
    $('.contractBalance').html(contractBalance);
}*/
/*async function getSiteStats()
  {
    let instance = await tronWeb.contract(abi, contractAddress);
    let res = await instance.getSiteStats().call();
    totalInvested = tronWeb.toDecimal(res[0]);
    totalUsers = tronWeb.toDecimal(res[1]);
    contractBalance = tronWeb.toDecimal(res[2]);
    contractBalanceRate = tronWeb.toDecimal(res[3]);
    limitAvailable = tronWeb.toDecimal(res[4]);

    var totalInvested = totalInvested /1000000;
    totalInvested = parseFloat(totalInvested.toFixed(0));
    $('.totalInvested').html(totalInvested);

    var totalUsers = totalUsers;
    totalUsers = parseFloat(totalUsers.toFixed(0));
    $('.totalUsers').html(totalUsers);

    var contractBalance = contractBalance / 1000000;
    contractBalance = parseFloat(contractBalance.toFixed(0));
    $('.contractBalance').html(contractBalance);

    var contractBalanceRate = (contractBalanceRate / 100)- basicPercentRate;
    contractBalanceRate = parseFloat(contractBalanceRate.toFixed(2));
    $('.contractBalanceRateMain').html(contractBalanceRate)
    $('.contractBalanceRate').html('+' + contractBalanceRate + '%')
    
    var limitAvailable = limitAvailable;
    limitAvailable = parseFloat(limitAvailable.toFixed(0));
    $('.limitAvailable').html(limitAvailable);
  }*/
  async function userStatsUpdate()
  {
    /*await getSiteStats();*/
    await getUserStats();
    await getUserReferralsStats()
    
  }
  
  async function getSiteStats()
  {
    //let instance = await tronWeb.contract(abi, contractAddress);
	//let res = await instance.getSiteStats().call();
	let instance = await tronWeb.contract(abi, contractAddress);
	let rea = await instance.totalInvested().call();
	let reb = await instance.totalDeposits().call();
	let rec = await instance.getContractBalance().call();
	let red = await instance.contractPercent().call();
	let ree = await instance.getCurrentHalfDayAvailable().call();
	//let ref = await instance.getCurrentHalfDayWithdrawAvailable().call();
    let reg = await instance.getCurrentInvestLimit().call();
    totalInvested = tronWeb.toDecimal(rea);
    totalUsers = tronWeb.toDecimal(reb);
    contractBalance = tronWeb.toDecimal(rec);
    contractBalanceRate = tronWeb.toDecimal(red);
    limitAvailable = tronWeb.toDecimal(ree);
    //WalimitAvailable = tronWeb.toDecimal(ref);
    MaxInvestAvaliable = tronWeb.toDecimal(reg);
    
    var totalInvested = totalInvested /1000000;
    totalInvested = parseFloat(totalInvested.toFixed(0));

    var totalUsers = totalUsers;
    totalUsers = parseFloat(totalUsers.toFixed(0));

    var contractBalance = contractBalance / 1000000;
    contractBalance = parseFloat(contractBalance.toFixed(0));

    var contractBalanceRate = (contractBalanceRate / 100) - basicPercentRate;
    contractBalanceRate = parseFloat(contractBalanceRate.toFixed(2));
    
    var limitAvailable = limitAvailable / 1000000;
    limitAvailable = parseFloat(limitAvailable.toFixed(0));

    //var WalimitAvailable = WalimitAvailable / 1000000;
    //WalimitAvailable = parseFloat(WalimitAvailable.toFixed(0));

    var MaxInvestAvaliable = MaxInvestAvaliable / 1000000;
    MaxInvestAvaliable = parseFloat(MaxInvestAvaliable.toFixed(0));
    
     
        $('.contractBalance').html(contractBalance);
        $('.totalInvested').html(totalInvested);
        $('.totalUsers').html(totalUsers);
        //contractBalanceRate = parseFloat(parseFloat(data[3]).toFixed(2));
        $('.contractBalanceRateMain').html(contractBalanceRate);
        if ($('.contractBalanceRate').length > 0)
        {
          $('.contractBalanceRate').html('+' + contractBalanceRate + '%')
        }
        if (limitAvailable < 2000)
        {
          $('.limitAvailable').html('0 BTT');
          //$('.WalimitAvailable').html(WalimitAvailable + ' BTT');
          $('.MaxInvestAvaliable').html(MaxInvestAvaliable + ' BTT');
          $('.investButton1,.investButton2').prop('disabled', true);
          $('.limitAvailableTrue').hide();
          $('.limitAvailableFalse').show()
        }
        else
        {
          $('.limitAvailable').html(limitAvailable + ' BTT');
          //$('.WalimitAvailable').html(WalimitAvailable + ' BTT');
          $('.MaxInvestAvaliable').html(MaxInvestAvaliable + ' BTT');
          $('.investButton1,.investButton2').prop('disabled', false);
          $('.limitAvailableFalse').hide();
          $('.limitAvailableTrue').show()
        }
        //animateNumbers()       
  }
  setInterval(function()
  {
    getSiteStats();
    if (userAddress)
    {
      getSiteStats()
    }
  }, 500);
  
  /*function siteStatsUpdate()
  {
    var contractBalance = $('.contractBalance').data('max');
    $.ajax(
    {
      url: "/ajax",
      type: "POST",
      data:
      {
        type: "1"
      },
      dataType: "json",
      success: function(data)
      {
        $('.contractBalance').data('max', data[2]);
        $('.totalInvested').data('max', data[0]);
        $('.totalUsers').data('max', data[1]);
        contractBalanceRate = parseFloat(parseFloat(data[3]).toFixed(2));
        $('.contractBalanceRateMain').html(contractBalanceRate);
        if ($('.contractBalanceRate').length > 0)
        {
          $('.contractBalanceRate').html('+' + contractBalanceRate + '%')
        }
        if (data[4] < 100)
        {
          $('.limitAvailable').html('0 TRX');
          $('.investButton1,.investButton2').prop('disabled', true);
          $('.limitAvailableTrue').hide();
          $('.limitAvailableFalse').show()
        }
        else
        {
          $('.limitAvailable').html(data[4] + ' TRX');
          $('.investButton1,.investButton2').prop('disabled', false);
          $('.limitAvailableFalse').hide();
          $('.limitAvailableTrue').show()
        }
        animateNumbers()
      }
    })
  }*/
  /*setInterval(function()
  {
    siteStatsUpdate();
    if (userAddress)
    {
      userStatsUpdate()
    }
  }, 500) */
  var clipboard = new ClipboardJS('.buttoncopy');
  $(".langwrap").click(function(e)
  {
    e.preventDefault();
    var classes = $(this).attr('class').split(" ").toString();
    var lang = classes.substr(classes.length - 2);
    if (language != lang && lang.match(/^[a-z]{2}$/))
    {
      $.ajax(
      {
        type: "post",
        url: "/language/set",
        data:
        {
          language: lang
        },
        success: function(data)
        {
          window.location.reload(false)
        }
      })
    }
    return false
  });
  $(".numbers").on("keypress keyup blur", function(event)
  {
    $(this).val($(this).val().replace(/[^0-9\.|\,]/g, ''));
    if (event.which == 44)
    {
      return true
    }
    if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57))
    {
      event.preventDefault()
    }
  });

  function calc()
  {
    var calcDepositAmount = parseFloat($(".calcDepositAmount").val().replace(',', '.'));
    var calcContractBonus = parseFloat($(".calcContractBonus").val().replace(',', '.'));
    $('.calcInputedAmount').html(calcDepositAmount);
    if (!isNaN(calcDepositAmount) && calcDepositAmount >= 2000 && !isNaN(calcContractBonus) && calcContractBonus >= 0)
    {
      if (calcContractBonus > 20)
      {
        calcContractBonus = 20;
        $(".calcContractBonus").val(10)
      }
      var day = 1;
      var perc = 0;
      var bonus = 0;
      var amount = perc * calcDepositAmount / 100;
      var data = '';
      while (amount < calcDepositAmount * 1.5)
      {
        perc = 1 + calcContractBonus + bonus / 10;
        amount = amount + (perc * calcDepositAmount / 100);
        if (amount > calcDepositAmount * 1.5)
        {
          amount = calcDepositAmount * 1.5
        }
        data += '<span>' + day + ') +' + perc.toFixed(1) + '% = ' + amount.toFixed(1) + ' TRX</span>';
        day += 1;
        bonus += 1;
        if (bonus > 40)
        {
          bonus = 40
        }
      }
    }
    else
    {
      data = '<br>Please enter correct amount and contract balance bonus percent!'
    }
    $('.calculations').html(data)
  }
  $(".calcDepositAmount,.calcContractBonus").on('keyup change', function()
  {
    calc()
  });
  if ($(".calcDepositAmount").length > 0)
  {
    calc()
  }

 /* function getNextLimitData()
  {
    $.ajax(
    {
      url: "/ajax",
      type: "POST",
      data:
      {
        type: "2"
      },
      dataType: "json",
      success: function(data)
      {
        clearInterval(limitTimerInterval);
        limitTimer = data[1];
        $('.limitNext').html(data[0] + ' TRX');
        display = document.querySelector('#limitCountdown');
        startTimer(limitTimer, display)
      }
    })
  }
  setInterval(function()
  {
    getNextLimitData()
  }, 30000);
*/
async function getCurrentDayLimit()
{
  let instance = await tronWeb.contract(abi, contractAddress);
    let res = await instance.getCurrentDayLimit().call();
    limitNext = tronWeb.toDecimal(res);
    var limitNext = limitNext /1000000;
    limitNext = parseFloat(limitNext.toFixed(0));
    $('.limitNext').html(limitNext + ' BTT');
    {
      //clearInterval(limitTimerInterval);
        //display = document.querySelector('#limitCountdown');
        //startTimer(limitTimer, display)
        var duration=450200;
        display = document.querySelector('#limitCountdown');
        startTimer(duration, display)
    }
}
setInterval(function()
{
  getCurrentDayLimit()
}, 2500);
function startTimer(duration, display) {
        

  var start = Date.now(), diff, hours, minutes, seconds;
  function timer() {
      var d = new Date();
      var hour= d.getHours();
      var minute= d.getMinutes();
      var second= d.getSeconds();
      var all=hour*60*60+minute*60+second;
      //if(hour>12){hour=hour-12}
      if(all>=44880){
          diff = 88080-(all);
      }
      else{
          diff = 44880-(all);
      }
      //diff = duration - (((Date.now() - start) / 1000) | 0);
      hours = (Math.floor(diff / 3600)) | 0;
      minutes = (Math.floor(diff % 3600 / 60)) | 0;
      seconds = (diff % 60) | 0;
      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      display.textContent = hours + ":" + minutes + ":" + seconds;
      if (diff <= 0)
      {
        getCurrentDayLimit()
      }
    };
    timer();
    limitTimerInterval = setInterval(timer, 1000)
  }
  window.onload = function()
  {
    getCurrentDayLimit();
  }
});