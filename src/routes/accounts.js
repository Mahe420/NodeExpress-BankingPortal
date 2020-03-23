let express=require('express');
let router=express.Router();
let accounts=require('../data.js');


router.get('/savings',(request,response)=>{
    response.render('account',{account:accounts.savings});
})
router.get('/checking',(request,response)=>{
    response.render('account',{account:accounts.checking});
})
router.get('/credit',(request,response)=>{
    response.render('account',{account:accounts.credit});
})


module.exports=router;