const mongoose = require('mongoose');

const app = require('./app');

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(process.env.PORT);
  })
  .catch(error => {
    console.log('There was an error connecting to MongoDB.', error);
  });
