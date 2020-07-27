const app = require('./app');
const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost:27017/basic-authentication-example', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(3000);
  })
  .catch(error => {
    console.log('There was an error connecting to MongoDB.', error);
  });
