const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  // title: String,
  title: {
    type: String,
    required: true
    // unique: true
  },
  // author: String,
  author: {
    type: String,
    maxlength: 50
  },
  // pages: Number,
  pages: {
    type: Number,
    min: 100,
    max: 1000
  },
  release: Date,
  available: {
    type: Boolean,
    // default: () => true
    default: true
  }
});

// When we tell mongoose the model is called "Book"
// it's always going to pluralize and lowercase the model name
// and take that as the collection name
const Book = mongoose.model('Book', bookSchema);

// CRUD operations
// C: Create
// R: Read
// U: Update
// D: Delete

mongoose
  .connect('mongodb://localhost:27017/node-mongoose-introduction', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('Connected to MongoDB');
    return mongoose.connection.dropDatabase();
  })
  .then(() => {
    console.log('MongoDB Database was cleaned');
    return Book.create({
      title: "Hitchhiker's Guide to the Galaxy",
      author: 'Douglas Adams',
      pages: 250,
      release: new Date(1979, 10, 5)
      // available: true
    });
  })
  .then(book => {
    console.log('Created book', book);
    return Book.find({ pages: { $gte: 280 } });
  })
  .then(books => {
    console.log('Found the following books', books);
    return Book.findById('5f199a6f3eaaec07ecccb5b7');
  })
  .then(book => {
    console.log('Found a single book by its id', book);
    return Book.findOne({ title: 'An Absolutely Remarkable Thing' });
  })
  .then(book => {
    console.log('Found a single book by its properties', book);
    return Book.findByIdAndUpdate('5f199764932cda07d00e3924', { title: 'Some' }, { new: true });
  })
  .then(data => {
    console.log('Book found by id was successfully updated', data);
    return Book.findOneAndUpdate({ author: 'Douglas Adams' }, { pages: 890 }, { new: true });
  })
  .then(data => {
    console.log('Book found by properties was successfully updated', data);
    // Book.findByIdAndDelete('') <= Deletes book by its id
    return Book.findOneAndDelete({ available: false });
  })
  .then(data => {
    console.log('Book was deleted', data);
    return mongoose.disconnect();
  })
  .then(() => {
    console.log('Disconnected from MongoDB');
  })
  .catch(error => {
    console.log('There was an error performing one of the operations above');
    console.log(error);
  });
