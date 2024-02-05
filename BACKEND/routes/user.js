const express = require('express')
const router = express.Router();
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const express = require('express');
const ExpressBrute = require('express-brute');
const RedisStore = require('express-brute-redis');
const app = express();
const store = new RedisStore(); // Use an appropriate store
const bruteforce = new ExpressBrute(store);

const express = require('express');
const helmet = require('helmet');

const express = require('express');
const morgan = require('morgan');

app.use(morgan('dev'));

app.use(helmet());

router.post('/signup', (req,res) => {
   bcrypt.hash(req.body.password,10)
   .then(hash => {
    const user = new User ({
        username: req.body.username,
        password: hash
    });

    user.save()
    .then(result => {
        res.status(201).json({
            message: 'User Created',
            result:result
        });
   })
   .catch(err =>{
    res.status(500).json({
        error: err
      });
    }); 
   });
    
})


router.post('/login', bruteforce.prevent, (req, res)=>{
    let fetchedUser;
    User.findOne({username:req.body.username})
    .then(user=>{
        if(!user)
        {
            return res.status(401).json(
                {
                    message: "Authentication Failure1"
                } );
        }
        fetchedUser= user;
        return bcrypt.compare(req.body.password,user.password)
    })
    .then(result=>{
        if(!result)
        {
            return res.status(401).json(
                {
                   message: "Authentication Failure2"
                });
        }
        
       
        const token = jwt.sign({username:fetchedUser.username,userid:fetchedUser._id },
            'secret_this_should_be_longer_than_it_is',
            {expiresIn: '1h'});

        res.status(200).json({token:token});
        })
      .catch(err =>{
      return res.status(401).json({
        message: "Authentication Failure3 " 
        
      });
     }) 
})




module.exports = router