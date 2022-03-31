const express = require('express');
const mongoose = require('./config/connect.js');

const articleRoute = require('./routes/article.js');
const produitRoute = require('./routes/produit.js');
const userRoute = require('./routes/user');

const app = express();

app.use(express.json());

//http://127.0.0.1:3000

app.use( '/article' , articleRoute );
app.use( '/produit' , produitRoute );
app.use( '/user' , userRoute);

app.use( '/getimage' , express.static('./upload')  );


app.listen(  
    3000 
    ,
    ()=>{
        console.log('server work !!!!');
    }
    
);