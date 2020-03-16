let fs= require('fs');
let path= require('path');
let express= require('express');

let app=express();

app.set('views',path.join(__dirname,'/views'))
app.set('view engine','ejs');

app.use(express.static(path.join(__dirname,'public')));


app.get('/',(request,response)=>{
    response.render('index',{title:'Index'});
})

app.listen(3000,()=>{});
console.log("Server created with 3000!");