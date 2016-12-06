const mongoose = require('mongoose');

beforeEach((done) => {
  const { drivers } = mongoose.connection.collections;
  drivers.drop()
    .then(() => done());
});
