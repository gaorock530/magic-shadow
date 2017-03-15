module.exports = (req, res, next) => {
  //check if there is a direct request
  if (!req.headers.cookie) next(); else res.redirect('http://127.0.0.1');
};
