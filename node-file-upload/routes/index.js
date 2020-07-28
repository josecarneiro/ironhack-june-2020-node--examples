'use strict';

const { Router } = require('express');
const router = new Router();

const multer = require('multer');
const cloudinary = require('cloudinary');
const multerStorageCloudinary = require('multer-storage-cloudinary');

// Saving files locally and use multer random name
// const upload = multer({ dest: 'uploads' });

// Save files locally and keep original name
// const storage = multer.diskStorage({
//   destination: (req, file, callback) => callback(null, 'uploads/'),
//   filename: (req, file, callback) => callback(null, file.originalname)
// });
// const upload = multer({ storage });

// Save files remotely
const storage = new multerStorageCloudinary.CloudinaryStorage({
  cloudinary: cloudinary.v2
});
const upload = multer({ storage });

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Hello World!' });
});

router.post('/contact', upload.single('attachment'), (req, res, next) => {
  const url = req.file.path;
  const { name, content } = req.body;
  console.log(name, content, url);
  res.redirect('/');
});

module.exports = router;
