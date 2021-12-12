import React from 'react';
import { Typography, List, ListItem, ListItemText, Grid } from '@mui/material';

const products = [
  { name: 'Product 1', desc: 'A nice thing', price: '$9.99' },
  { name: 'Product 2', desc: 'Another thing', price: '$3.45' },
  { name: 'Product 3', desc: 'Something else', price: '$6.51' },
  { name: 'Product 4', desc: 'Best thing of all', price: '$14.11' },
  { name: 'Shipping', desc: '', price: 'Free' },
];
const addresses = [
  '1 Material-UI Drive',
  'Reactville',
  'Anytown',
  '99999',
  'USA',
];
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];

function Review() {
  return (
    <React.Fragment>
      <Typography variant='h6' gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem key={product.name}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant='body2'>{product.price}</Typography>
          </ListItem>
        ))}
        <ListItem>
          <ListItemText primary='Total' />
          <Typography variant='subtitle1'>$34.06</Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant='h6' gutterBottom>
            Shipping
          </Typography>
          <Typography gutterBottom>John Smith</Typography>
          <Typography gutterBottom>{addresses.join(', ')}</Typography>
        </Grid>
        <Grid item container direction='column' xs={12} sm={6}>
          <Typography variant='h6' gutterBottom>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Review;
