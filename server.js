const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');

const server = http.createServer(app);
const port = process.env.PORT || 5000;
const mongoUri = 'mongodb://USERNAME@PASSWORD@node-docdb.cluster-cx1sxzhnitmv.us-east-1.docdb.amazonaws.com:27017/chat_app_db?tls=true&tlsCAFile=global-bundle.pem&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false';

mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    server.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
