const express = require('express');

const router = express.Router();

const Article = require('../models/article.js');

const multer = require('multer');

let filename = '';
const mystorage = multer.diskStorage(
    {
        destination: './upload',
        filename:( req , file , cb )=>{
            let date = Date.now();
            //53453535345.jpg
            // image/png
            // [ 'image', 'png' ]
            let fl = date + '.' + file.mimetype.split('/')[1];
            cb(null, fl);
            filename = fl;
        } 
    }
);

const upload = multer({ storage: mystorage })


router.post( '/create' , upload.any('image') , ( req , res )=>{
    let dataFromPostman = req.body;
    let art = new Article( dataFromPostman );
    art.image = filename;
    art.save()
          .then(
              (savedArticle)=>{
                  filename = '';
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
  
  
  router.get( '/all' , (req, res)=>{
     
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
  
  
  router.get('/getbyid/:id' , (req, res)=>{
  
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
  
  
  router.delete( '/supprimer/:id' , (req , res)=>{
  
       let id = req.params.id;
       
       Article.findByIdAndDelete( { _id: id } )
          .then(
              (deletedArticle)=>{
                  res.send(deletedArticle);
              }
          )
          .catch(
              (err)=>{
                  res.send(err);
              }
          )
  
  } )
  
  router.put( '/update/:id' , (req , res)=>{
      let id = req.params.id;
      let newData = req.body;
      Article.findOneAndUpdate( 
          { _id: id },
          newData
      ) .then(
          (updatedArticle)=>{
              res.send(updatedArticle)
          }
      )
      .catch(
          (err)=>{
              res.send(err)
          }
  
      )
  } )
  

module.exports = router;