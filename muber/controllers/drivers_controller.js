module.exports = {
  create(req, res) {
    const driverProps = req.body;
    console.log('In drivers controller', driverProps);

    res.send({ hi: 'there' });
  }
};
