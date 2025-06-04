const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// app.use(cors({
//     origin: 'http://localhost:5173', // your frontend URL
//     credentials: true,
// }));

// , 'http://localhost:5173', 'http://freshmart.localhost:5173', 'http://techhub.localhost:5173', 'http://urbanwear.localhost:5173', 'http://booknest.localhost:5173', 'http://greenroots.localhost:5173', 'http://sweetbite.localhost:5173'
// 'https://musical-banoffee-8ca891.netlify.app',
app.use(cors({
  origin: ['https://user-authentication-mern-client.onrender.com'],
  credentials: true, // very important for cookies to work across domains
}));


app.use(express.json());

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
app.use(cookieParser());

function verifyToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).send('Unauthorized');

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).send('Invalid token');
    req.user = decoded; // { userId, username, shop, iat, exp }
    next();
  });
}

// Example protected route:
app.get('/api/dashboard', verifyToken, (req, res) => {
  res.send({ username: req.user.username, shop: req.user.shop });

});


// Replace with your own secure secret in .env
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fqi16.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // await client.connect();
    const userCollection = client.db("UserAuthDB").collection("users");

    // Register without hashing password (not secure!)
    // Signup route ----
    // app.post('/api/signup', async (req, res) => {
    //     const { username, password, shop } = req.body;
    //     // Check if username already exists
    //     const userExists = await userCollection.findOne({ username });
    //     if (userExists) return res.status(409).send('User already exists');

    //     await userCollection.insertOne({ username, password, shop }); // store password as plain text (consider hashing)
    //     res.send({ success: true });
    // });

    app.post('/api/signup', async (req, res) => {
      const { username, password, shop } = req.body;

      const userExists = await userCollection.findOne({ username });
      if (userExists) return res.status(409).send('User already exists');

      // Normalize shop to lowercase
      const normalizedShop = shop.toLowerCase().trim();

      // Check if shop already exists
      const shopExists = await userCollection.findOne({ shop: normalizedShop });
      if (shopExists) return res.status(409).send('Shop already taken');

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert with normalized shop
      await userCollection.insertOne({ username, password: hashedPassword, shop: normalizedShop });
      res.send({ success: true });
    });





    // Login without password hashing ---
    // app.post('/api/signin', async (req, res) => {

    //     const { username, password } = req.body;
    //     const user = await userCollection.findOne({ username });
    //     if (!user) return res.status(401).send('User not found');
    //     if (user.password !== password) return res.status(401).send('Incorrect password');
    //     res.send({ success: true });
    // });

    app.post('/api/signin', async (req, res) => {
      const { username, password, rememberMe } = req.body;

      const user = await userCollection.findOne({ username });
      if (!user) return res.status(401).send('User not found');

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) return res.status(401).send('Incorrect password');

      // Set token expiry based on rememberMe
      const expiresIn = rememberMe ? '7d' : '30m';

      const token = jwt.sign(
        { userId: user._id, username: user.username, shop: user.shop },
        JWT_SECRET,
        { expiresIn }
      );

      // Send JWT in HTTP-only cookie for security, with maxAge in ms
      //     res.cookie('token', token, {
      //         httpOnly: true,
      //         maxAge: rememberMe ? 7 * 24 * 60 * 60 * 1000 : 30 * 60 * 1000, // 7 days or 30 mins in ms
      //         secure: process.env.NODE_ENV === 'production', // use secure cookies in production
      //         sameSite: 'lax',
      //     });

      //     res.send({ success: true });
      res.cookie('token', token, {
        httpOnly: true,
        maxAge: rememberMe ? 7 * 24 * 60 * 60 * 1000 : 30 * 60 * 1000,
        secure: true,                     // must be true for HTTPS
        sameSite: 'none',                 // required for cross-site cookies
      });
      res.send({ success: true });
    });




    // Check if shop name exists
    app.get('/api/check-shop', async (req, res) => {
      const shop = req.query.shop?.trim();
      if (!shop) return res.status(400).send('Shop name required');

      const shopExists = await userCollection.findOne({ shop });
      if (shopExists) return res.send({ exists: true });
      res.send({ exists: false });
    });

    app.post('/api/logout', (req, res) => {
      res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        domain: '.localhost',
      });
      res.send({ success: true });
    });

    app.get('/', (req, res) => {
      res.send('Server is running');
    });

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
}
run().catch(console.dir);
