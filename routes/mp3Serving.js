const fs = require('fs');
//const redirect = require('./../middleware/redirect');

module.exports = (app, dir) => {


  app.get('/music', (req, res) => {
    res.writeHead(200, {
      //create customize headers
      'Server': 'MagicMechine',
      'X-Powered-By': 'Magic',
      'X-Timestamp': Date.now(),
      'X-Sent': true,
      //requset header which allows to access this API, in this case 'http://127.0.0.1'
      'Access-Control-Allow-Origin': 'http://127.0.0.1',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Content-Type': 'audio/mpeg'
    });
    //create a readable stream with a buffer size of 128Kb (128 * 1024 betyes), then pipe to Response
    fs.createReadStream(dir + 'imagination_forest1' + '.mp3', {highWaterMark: 128 * 1024}).pipe(res);
  });
};
