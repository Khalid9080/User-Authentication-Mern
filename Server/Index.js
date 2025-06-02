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
        // Signup route
        app.post('/api/signup', async (req, res) => {
            const { username, password, shop } = req.body;
            // Check if username already exists
            const userExists = await userCollection.findOne({ username });
            if (userExists) return res.status(409).send('User already exists');

            await userCollection.insertOne({ username, password, shop }); // store password as plain text (consider hashing)
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

        // Check if shop name exists
        app.get('/api/check-shop', async (req, res) => {
            const shop = req.query.shop?.trim();
            if (!shop) return res.status(400).send('Shop name required');

            const shopExists = await userCollection.findOne({ shop });
            if (shopExists) return res.send({ exists: true });
            res.send({ exists: false });
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
