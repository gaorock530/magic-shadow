module.exports = (app) => {
  app.get('/', (req, res) => {
    res.render('home');
  });

  app.post('/', (req, res) => {
    //
  });
};
