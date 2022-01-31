import { Fragment } from 'react';
import {
  Typography,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

function PaymentForm() {
  return (
    <Fragment>
      <Typography variant='h6' gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id='cardName'
            label='Name on card'
            fullWidth
            size='small'
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id='cardNumber'
            label='Card number'
            fullWidth
            size='small'
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id='expDate'
            label='Expiry date'
            fullWidth
            size='small'
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id='cvv'
            label='CVV'
            helperText='Last three digits on signature strip'
            fullWidth
            size='small'
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                color='secondary'
                name='saveCard'
                value='yes'
                size='small'
              />
            }
            label='Remember credit card details for next time'
          />
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default PaymentForm;
