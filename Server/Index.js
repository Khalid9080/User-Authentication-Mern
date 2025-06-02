const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

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
    await client.connect();
    const userCollection = client.db("UserAuthDB").collection("users");

    // Register without hashing password (not secure!)
    app.post('/api/signup', async (req, res) => {
      const { username, email, password, shop } = req.body;
      const userExists = await userCollection.findOne({ email });
      if (userExists) return res.status(409).send('User already exists');
      await userCollection.insertOne({ username, email, password, shop }); // store password as plain text
      res.send({ success: true });
    });

    // Login without password hashing
    app.post('/api/signin', async (req, res) => {
      const { username, password } = req.body;
      const user = await userCollection.findOne({ username });
      if (!user) return res.status(401).send('User not found');
      if (user.password !== password) return res.status(401).send('Incorrect password');
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
