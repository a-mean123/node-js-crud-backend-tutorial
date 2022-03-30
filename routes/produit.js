const express = require('express');

const router = express.Router();

const Produit = require('../models/produit.js');


router.post( '/createp' , ( req , res )=>{
    let dataFromPostman = req.body;
    let prod = new Produit( dataFromPostman );
    prod.save()
          .then(
              (savedProd)=>{
                  
                  res.send(savedProd);
              }
          )
          .catch(
              (error)=>{
                  console.log(error);
                  res.send(error)
              }
          )
  } );
  
  
  router.get( '/allp' , (req, res)=>{
     
      Produit.find()
          .then(
              (allprod)=>{
                  res.send(allprod);
              }
          )
          .catch(
              (error)=>{
                  res.send(error);
              }
          )
  
  } )
  
  
  router.get('/getpbyid/:id' , (req, res)=>{
  
      let myid = req.params.id;
  
      Produit.findOne({ _id: myid })
                  .then(
                      (prod)=>{
                          res.send(prod);
                      }
                  )
                  .catch(
                      (err)=>{
                          res.send(err)
                      }
                  )
  
  })
  
  
  router.delete( '/supprimerp/:id' , (req , res)=>{
  
       let id = req.params.id;
       
       Produit.findByIdAndDelete( { _id: id } )
          .then(
              (deletedP)=>{
                  res.send(deletedP);
              }
          )
          .catch(
              (err)=>{
                  res.send(err);
              }
          )
  
  } )
  
  router.put( '/updatep/:id' , (req , res)=>{
      let id = req.params.id;
      let newData = req.body;
      Produit.findOneAndUpdate( 
          { _id: id },
          newData
      ) .then(
          (updatedp)=>{
              res.send(updatedp)
          }
      )
      .catch(
          (err)=>{
              res.send(err)
          }
  
      )
  } )
  



module.exports = router;