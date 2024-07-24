const express = require('express');

//mongodb
const conn = require('./DB/conn');
const cors = require("cors"); 


//routes 
const alertroute = require('./routes/alertRoutes')
const approuter =require('./routes/appRoutes')

const app = express();


//feacting data

const { startWeatherDataFetching } = require('./services/weatherService');

app.use(cors({
    credentials: true,
    origin: true
  })); 
app.use(express.json());

require('dotenv').config();
const cookie = require('cookie-parser');
const { create } = require('./modal/alert');


app.use('/api/alert' , alertroute )
app.use('/api/weather' , approuter)
app.use(cookie())

app.get('/' ,(req,res)=>{
    res.send("Hello this main route");
})

// these id the url help
// api/alert/create post
//  api/alert/   get
// api/alert/delete/:id  

// api/weather/
// api/report/:date/:city



//data ... 
startWeatherDataFetching();

app.listen(3001, (err)=>{
    conn();
    if(err)console.log(err);
    else console.log("Server is working")
})
