import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardMedia, CardContent, Typography, Button, Grid, Container } from '@mui/material';
import '../styles.css';

const ProductList = ({ addToCart }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/products')
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    return (
        <Container>
            <Typography variant="h4" className="page-title">Products</Typography>
            <Grid container spacing={3}>
                {products.map(product => (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                        <Card className="product-card">
                            <CardMedia
                                component="img"
                                height="200"
                                image={product.image}
                                alt={product.name}
                            />
                            <CardContent>
                                <Typography variant="h6">{product.name}</Typography>
                                <Typography variant="body2" color="textSecondary">{product.description}</Typography>
                                <Typography variant="h6" color="primary">₹{product.price}</Typography>
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    fullWidth 
                                    onClick={() => addToCart(product)}
                                >
                                    Add to Cart
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default ProductList;
