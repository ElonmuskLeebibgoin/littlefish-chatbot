const https = require('https');
const fs = require('fs');
const path = require('path');

const images = [
  {
    url: 'https://source.unsplash.com/1920x1080/?technology',
    filename: 'slide1.jpg'
  },
  {
    url: 'https://source.unsplash.com/1920x1080/?coding',
    filename: 'slide2.jpg'
  },
  {
    url: 'https://source.unsplash.com/400x400/?profile',
    filename: 'profile.jpg'
  },
  {
    url: 'https://source.unsplash.com/40x40/?avatar',
    filename: 'avatar.jpg'
  }
];

const downloadImage = (url, filename) => {
  const filepath = path.join(__dirname, '../public/images', filename);
  
  https.get(url, (response) => {
    const fileStream = fs.createWriteStream(filepath);
    response.pipe(fileStream);

    fileStream.on('finish', () => {
      fileStream.close();
      console.log(`Downloaded ${filename}`);
    });
  }).on('error', (err) => {
    console.error(`Error downloading ${filename}:`, err.message);
  });
};

// Create images directory if it doesn't exist
const imagesDir = path.join(__dirname, '../public/images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Download all images
images.forEach(image => {
  downloadImage(image.url, image.filename);
}); 