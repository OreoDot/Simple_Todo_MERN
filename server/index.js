require('dotenv').config();
const express = require('express');
const { connectToMongoDB } = require('./database');
const path = require('path');

const app = express();
app.use(express.json()); // this is a middleware that allows us to parse the body of the request

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "build")));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "build/index.html"));
})


/*app.get('/hello', (req, res) => {
  res.status(200).json({ msg: 'Hello World'});
});*/

const router = require('./routes');
app.use('/api', router);

const port = process.env.PORT || 5000;  // 5000 is the default port if PORT is not set, used 4000 to test

async function startServer() {
  await connectToMongoDB();
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}
startServer();