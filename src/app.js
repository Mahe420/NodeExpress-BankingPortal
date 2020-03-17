let fs= require('fs');
let path= require('path');
let express= require('express');

let app=express();

app.set('views',path.join(__dirname,'/views'))
app.set('view engine','ejs');

app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));

const accountData=fs.readFileSync("src/json/accounts.json","utf8");
const accounts=JSON.parse(accountData);

const userData=fs.readFileSync("src/json/users.json","utf8");
const users=JSON.parse(userData);


app.get('/',(request,response)=>{
    response.render('index',{title:'Account Summary',
    accounts: accounts});
})

app.get('/savings',(request,response)=>{
    response.render('account',{account:accounts.savings});
})
app.get('/checking',(request,response)=>{
    response.render('account',{account:accounts.checking});
})
app.get('/credit',(request,response)=>{
    response.render('account',{account:accounts.credit});
})

app.get('/transfer',(request,response)=>{
    response.render('transfer');
})

app.get('/profile',(request,response)=>{
    response.render('profile',{user:users[0]});
})

app.post('/transfer',(request,response)=>{
    var from=request.body.from;
    var to=request.body.to;
    var amount=request.body.amount;

    accounts[from].balance-=amount;
    accounts[to].balance+=parseInt(amount,10);

    let accountsJSON=JSON.stringify(accounts);
    fs.writeFileSync(path.join(__dirname,'json/accounts.json'),accountsJSON,'utf8');

    response.render('transfer',{message: "Transfer Completed"});
});

app.get('/payment',(request,response)=>{
    response.render('payment',{account:accounts.credit});
})
app.post('/payment',(request,response)=>{
    
    var amount=request.body.amount;

    accounts.credit.balance-=amount;
    accounts.credit.available=parseInt(accounts.credit.available)+parseInt(amount);

    let accountsJSON=JSON.stringify(accounts);
    fs.writeFileSync(path.join(__dirname,'json','accounts.json'),accountsJSON,'utf8');

response.render('payment',{ message: "Payment Successful", account: accounts.credit });

})

app.listen(3000,()=>{ console.log('PS Project Running on port 3000!') });
