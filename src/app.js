let fs= require('fs');
let path= require('path');
let express= require('express');

let app=express();

app.set('views',path.join(__dirname,'/views'))
app.set('view engine','ejs');

app.use(express.static(path.join(__dirname,'public')));

const accountData=fs.readFileSync("src/json/accounts.json","utf8");
const accounts=JSON.parse(accountData);

const userData=fs.readFileSync("src/json/users.json","utf8");
const users=JSON.parse(userData);


app.get('/',(request,response)=>{
    response.render('index',{title:'Account Summary',
    accounts: accounts});
})

app.get('/savings',(resquest,response)=>{
    response.render('account',{account:accounts.savings});
})
app.get('/checking',(resquest,response)=>{
    response.render('account',{account:accounts.checking});
})
app.get('/credit',(resquest,response)=>{
    response.render('account',{account:accounts.credit});
})

app.get('/profile',(request,response)=>{
    response.render('profile',{user:users[0]});
})

app.listen(3000,()=>{ console.log('PS Project Running on port 3000!') });
