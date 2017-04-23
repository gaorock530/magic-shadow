//require configuration file / SETUP env veriables
require('./config/config');
/*
*============================================
*         CONSTs Setup & Plug-ins
*============================================
*/
//express / app
const express = require('express');
const app = express();
const hbs = require('hbs');

//register HBS partials
hbs.registerPartials(__dirname + '/views/partials');

//other plug-ins
const bodyParser = require('body-parser');
const ClientIp = require('./middleware/userinfo');
const Colors = require('colors'); //colorize console.log

//Directories
const publicFolder = __dirname + '/public';
const mp3Directory = __dirname + '/media/mp3/';

//PORT and other env.veriables
const port = process.env.PORT;

//Global veribles

/*
*============================================
*         View engine Setup
*============================================
*/
app.set('view engine', 'hbs');

/*
*============================================
*         Middleware Setup
*============================================
*/
app.use(express.static(publicFolder));
app.use(bodyParser({keepExtensions: true}));
app.use(ClientIp); //check client and get info

app.use((req, res, next) => {
  res.setHeader('Server', 'ShadowPlay');
  res.setHeader('X-Powered-By', 'Magic');
  //get Clients Info
  let nowTime = new Date();
  console.log(`${nowTime.getHours()}:${nowTime.getMinutes()}:${nowTime.getSeconds()}`.red, `Real IP : ${req.realIP}`.yellow, `- Request IP : ${req.clientIP}`.blue, `- User Agent : ${req.clientAgent}`.green);
  //--------------------------
  //console.log(Date.now());
  next();
});
/*
*============================================
*         Routes Setup
*============================================
*/
//static pages
require('./routes/static')(app);
//mp3 API
require('./routes/mp3Serving')(app, mp3Directory);


/*
*============================================
*         Listening on PORT and Serving the app
*============================================
*/
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is running on PORT: ${port}`);
  }
});

