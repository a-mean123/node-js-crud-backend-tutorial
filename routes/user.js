const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post( '/register' , (req, res )=>{

    let data = req.body;
    let usr = new User(data);
    let key = bcrypt.genSaltSync(10);
    let cryptedPass = bcrypt.hashSync(  data.password , key  );

    usr.password = cryptedPass;
    
    usr.save()
        .then(
            (savedUser)=>{
                res.send(savedUser)
            }
        )
        .catch(
            (err)=>{ res.send(err)  }
        )

} )

router.post( '/login' , (req, res)=>{
    let data = req.body;
    User.findOne({ email: data.email })
        .then(
            (fuser)=>{
                let valide = bcrypt.compareSync( data.password , fuser.password );
                if(!valide){
                    res.send('email or pass invalid');
                }else{
                    let payload = {
                        email: fuser.email,
                        _id: fuser._id
                    }
                    let token = jwt.sign( payload , 'sekretkey123' );

                    res.send({ myToken: token });
                }
            }
        )
        .catch(
            (err)=>{
                res.send(err)
            }
        )


} )




module.exports = router;