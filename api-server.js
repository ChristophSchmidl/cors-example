/*
*   Imports
*/ 
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const port = 3000;

const app = express();
app.use(cookieParser());
app.use(express.json());

// Enable CORS for one trusted origin only
app.use(cors({
  origin: 'http://localhost:4000', //  allow only your legit frontend
  //origin: ['http://localhost:4000', 'http://localhost:5000'], //  allow only your legit frontend
  credentials: true // Accept credentials (cookies) sent by the client
}));

/*
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
*/

app.post('/login', (req, res) => {
  res.cookie('session', 'abc123', {
    httpOnly: false, // set to false for demo (so you can observe it)
    sameSite: 'Lax',
    secure: false // allow over HTTP for local testing
  });
  res.json({ message: 'Logged in!' });
});

app.get('/userdata', (req, res) => {
  const session = req.cookies.session;
  if (session === 'abc123') {
    res.json({ secret: '42 is the answer to life.' });
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

app.listen(3000, () => console.log(`API server running on http://localhost:${port}`));