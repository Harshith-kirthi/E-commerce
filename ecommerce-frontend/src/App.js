import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import './styles.css';

const App = () => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        const existing = cart.find(item => item.id === product.id);
        if (existing) {
            setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    return (
        <Router>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        My E-Commerce
                    </Typography>
                    <Button color="inherit" component={Link} to="/">Products</Button>
                    <Button color="inherit" component={Link} to="/cart">Cart ({cart.length})</Button>
                </Toolbar>
            </AppBar>

            <Routes>
                <Route path="/" element={<ProductList addToCart={addToCart} />} />
                <Route path="/cart" element={<Cart cart={cart} updateCart={setCart} />} />
            </Routes>
        </Router>
    );
};

export default App;
