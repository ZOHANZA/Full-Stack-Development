//https://expressjs.com/en.starter.hello-world
const express = require('express');
const app = express();
const urlprefix = '/api'
const mongoose = require('mongoose')
const Car = require('./models/car')
const fs =require('fs');
const cert = fs.readFileSync('keys/certificate.pem');
const options ={
    server:{ sslCA: cert }};




const connstring = "mongodb+srv://zohan:Bonosisa889@cluster0.nxl6tby.mongodb.net/carDatabase?retryWrites=true&w=majority";
//const connstring = 'mongodb+srv://zohan:Bonosisa889@cluster0.nxl6tby.mongodb.net/carDatabase?retryWrites=true&w=majority'

const carRoutes = require('./routes/car');
const userRoutes= require('./routes/user');


const { url } = require('inspector');




mongoose.connect(connstring)
.then(() =>
{
    console.log('Connected')
})
.catch(()=>
{
    console.log('NOT connected' )
}, options);



app.use(express.json())
app.use((reg,res,next)=>
{
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');
 res.setHeader('Access-Control-Allow-Methods', '*');
 next();
});



app.use(urlprefix + '/car',carRoutes)
app.use(urlprefix + '/users',userRoutes)



module.exports = app;