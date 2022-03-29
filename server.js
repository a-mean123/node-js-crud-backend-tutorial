const express = require('express');
const mongoose = require('./config/connect.js');

const Article = require('./models/article.js');

const app = express();

app.use(express.json());

//http://127.0.0.1:3000


app.post( '/create' , ( req , res )=>{
  let dataFromPostman = req.body;
  let art = new Article( dataFromPostman );
  art.save()
        .then(
            (savedArticle)=>{
                console.log(savedArticle);
                res.send(savedArticle);
            }
        )
        .catch(
            (error)=>{
                console.log(error);
                res.send(error)
            }
        )
} );


app.get( '/all' , (req, res)=>{
   
    Article.find()
        .then(
            (allarticles)=>{
                res.send(allarticles);
            }
        )
        .catch(
            (error)=>{
                res.send(error);
            }
        )

} )


app.get('/getbyid/:id' , (req, res)=>{

    let myid = req.params.id;

    Article.findOne({ _id: myid })
                .then(
                    (art)=>{
                        res.send(art);
                    }
                )
                .catch(
                    (err)=>{
                        res.send(err)
                    }
                )

})


app.delete( '/supprimer' , (req , res)=>{

    console.log('delete work');

} )

app.put( '/update' , (req , res)=>{

    console.log('update work');

} )








app.listen(  
    3000 
    ,
    ()=>{
        console.log('server work !!!!');
    }
    
);