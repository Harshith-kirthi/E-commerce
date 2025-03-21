import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Button, Container, Typography, TextField, Card, CardContent, Grid } from '@mui/material';
import '../styles.css';

const Cart = ({ cart, updateCart }) => {
    const [form, setForm] = useState({ firstName: '', lastName: '', address: '' });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handlePlaceOrder = () => {
        if (!form.firstName || !form.lastName || !form.address) {
            alert("Please fill all required fields!");
            return;
        }

        axios.post('http://localhost:5000/api/order', { cart, ...form })
            .then(() => {
                alert("Order placed successfully!");
                updateCart([]); // Clear cart after order
                setForm({ firstName: '', lastName: '', address: '' });
            })
            .catch(error => console.error("Order error:", error));
    };

    return (
        <Container>
            <Typography variant="h4" className="page-title">Shopping Cart</Typography>
            {cart.length === 0 ? <Typography variant="h6">Your cart is empty.</Typography> :
                <>
                    <Grid container spacing={3}>
                        {cart.map((item, index) => (
                            <Grid item xs={12} sm={6} key={index}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6">{item.name} - ₹{item.price} x {item.quantity}</Typography>
                                        <Button 
                                            variant="outlined" 
                                            color="secondary" 
                                            onClick={() => updateCart(cart.filter((_, i) => i !== index))}
                                        >
                                            Remove
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    <Typography variant="h5" className="total-price">
                        Total: ₹{cart.reduce((total, item) => total + item.price * item.quantity, 0)}
                    </Typography>

                    <Typography variant="h5">Enter Your Details</Typography>
                    <TextField label="First Name" name="firstName" fullWidth value={form.firstName} onChange={handleChange} required />
                    <TextField label="Last Name" name="lastName" fullWidth value={form.lastName} onChange={handleChange} required />
                    <TextField label="Address" name="address" fullWidth value={form.address} onChange={handleChange} required />

                    <Button variant="contained" color="primary" fullWidth onClick={handlePlaceOrder}>
                        Place Order
                    </Button>
                </>
            }
        </Container>
    );
};

export default Cart;
