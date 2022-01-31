import { Fragment, useState, useRef } from 'react';
import {
  Container,
  Box,
  Typography,
  Autocomplete,
  TextField,
  CircularProgress,
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

function AutocompleteProduct() {
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
        });
    }, 500)
  );

  const onInputChange = async (search: string) => {
    setLoading(true);
    requestRef.current(search);
  };

  return (
    <Container component='main' maxWidth='sm'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant='h6' gutterBottom>
          Select a product
        </Typography>
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
          onChange={(_, value, reason) => {
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
        <Box
          component='section'
          sx={{ mt: 2, textAlign: 'left', width: '100%' }}
        >
          <Typography sx={{ mb: 1 }}>
            Name: {selectedProduct?.title || '-'}
          </Typography>
          <Typography sx={{ mb: 1 }}>
            Description: {selectedProduct?.description || '-'}
          </Typography>
          <Typography sx={{ mb: 1 }}>
            Category: {selectedProduct?.category || '-'}
          </Typography>
          <Typography sx={{ mb: 1 }}>
            Price: {selectedProduct?.price || '-'}
          </Typography>
          <Typography sx={{ mb: 1 }}>
            Rating: {selectedProduct?.rating.rate || '-'}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default AutocompleteProduct;
