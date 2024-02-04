const http = require('http');
const fs = require('fs');
const multer = require('multer');


// Configure storage for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); 
  },
});

const upload = multer({ storage: storage });

const requestHandler = (req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('This is Home Page');
  } else if (req.url === '/about' && req.method === 'GET') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('This is About Page');
  } else if (req.url === '/contact' && req.method === 'GET') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('This is Contact Page');
  } else if (req.url === '/file-write' && req.method === 'GET') {
    fs.writeFile('demo.txt', 'hello world', (err) => {
      if (err) {
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Error writing file');
      } else {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('File has been written');
      }
    });
  } else if (req.url.startsWith('/upload') && req.method === 'POST') {
    // Handle file upload
    upload.single('file')(req, res, (err) => {
      if (err) {
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('File upload error');
      } else {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('File uploaded successfully');
      }
    });
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Page Not Found');
  }
};

const server = http.createServer(requestHandler);

server.listen(5500, () => {
  console.log('Server is listening on port 5500');
});
