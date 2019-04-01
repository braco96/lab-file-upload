const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configuración de Cloudinary utilizando las variables de entorno
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

// Almacenamiento en Cloudinary para las imágenes subidas
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'irontumblr',
    allowedFormats: ['jpg', 'png', 'gif']
  }
});

// Middleware de multer que gestionará los archivos que subamos
const fileUploader = multer({ storage });

module.exports = fileUploader;
