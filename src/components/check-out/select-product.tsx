import { useState, useRef, Fragment } from 'react';
import {
  Box,
  Autocomplete,
  TextField,
  CircularProgress,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from '@mui/material';
import { debounce } from 'lodash';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}

export default function Checkout() {
  const [isLoading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const requestRef = useRef(
    debounce((search) => {
      fetch(`/api/products?search=${search}`)
        .then((res) => res.json())
        .then((res) => {
          setProducts(res.items);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    }, 500)
  );

  const onInputChange = async (search: string) => {
    setLoading(true);
    requestRef.current(search);
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant='h6' gutterBottom>
            Select a product
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            id='select-product'
            fullWidth
            options={products}
            getOptionLabel={(product) => product.title}
            loading={isLoading}
            onInputChange={(_, newInputValue, reason) => {
              if (reason === 'input') {
                onInputChange(newInputValue);
              }
            }}
            onChange={(_, value) => {
              setSelectedProduct(value);
            }}
            value={selectedProduct}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                size='small'
                label='Product'
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <Fragment>
                      {isLoading ? (
                        <CircularProgress color='inherit' size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </Fragment>
                  ),
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ display: 'flex' }}>
            <CardContent sx={{ flex: 1 }}>
              <Typography component='h2' variant='h5'>
                {selectedProduct
                  ? `${selectedProduct.title.substring(0, 45)}...`
                  : '-'}
              </Typography>
              <Typography variant='subtitle1' color='text.secondary'>
                {selectedProduct ? `$${selectedProduct.price}` : '-'}
              </Typography>
              <Typography variant='subtitle1' paragraph>
                {selectedProduct
                  ? `${selectedProduct.description.substring(0, 125)}...`
                  : '-'}
              </Typography>
            </CardContent>
            <CardMedia
              component='img'
              sx={{ width: 160, display: { sm: 'block' } }}
              image={selectedProduct?.image}
              alt={selectedProduct?.title}
            />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
