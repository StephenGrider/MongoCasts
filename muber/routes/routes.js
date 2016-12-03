module.exports = (app) => {
  // Run this function whenever someone goes to
  // localhost:3050/
  app.get('/', (req, res) => {
    res.send({ hi: 'there' });
  });
};
