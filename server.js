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

//other plug-ins
const bodyParser = require('body-parser');

//Directories
const publicFolder = __dirname + '/public';
const mp3Directory = __dirname + '/media/mp3/';

//PORT and other env.veriables
const port = process.env.PORT;

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
app.use((req, res, next) => {
  res.setHeader('Server', 'ShadowPlay');
  res.setHeader('X-Powered-By', 'Magic');
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
