let express=require('express');
let router=express.Router();

const { accounts, writeJSON } = require('../data.js');


router.get('/transfer',(request,response)=>{
    response.render('transfer');
})



router.post('/transfer',(request,response)=>{
    var from=request.body.from;
    var to=request.body.to;
    var amount=request.body.amount;

    accounts[from].balance-=amount;
    accounts[to].balance+=parseInt(amount,10);

    
    writeJSON();
    response.render('transfer',{message: "Transfer Completed"});
});

router.get('/payment',(request,response)=>{
    response.render('payment',{account:accounts.credit});
})
router.post('/payment',(request,response)=>{
    
    var amount=request.body.amount;

    accounts.credit.balance-=amount;
    accounts.credit.available=parseInt(accounts.credit.available)+parseInt(amount);

    
    writeJSON();
response.render('payment',{ message: "Payment Successful", account: accounts.credit });

})

module.exports=router;
