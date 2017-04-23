module.exports = (req, res, next) => {
  //check if there is a direct request
  if (!req.ip.match(/192\.168\.161\.128/g)) next(); else res.redirect('http://127.0.0.1');
};
