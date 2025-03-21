const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const products = require('./products');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.post('/api/order', (req, res) => {
    const { firstName, lastName, address, cart } = req.body;

    if (!firstName || !lastName || !address || cart.length === 0) {
        return res.status(400).json({ message: "All fields are required and cart cannot be empty." });
    }

    console.log("New Order:", { firstName, lastName, address, cart });
    res.json({ message: "Order placed successfully!" });
});

const PORT = 5000;
app.listen(PORT, () => console.log(` Server running on http://localhost:${PORT}`));
