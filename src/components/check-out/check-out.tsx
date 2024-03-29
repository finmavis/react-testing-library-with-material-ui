import { useState, Fragment } from 'react';
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Box,
  Container,
} from '@mui/material';

import SelectProduct from './select-product';
import AddressForm from './address-form';
import PaymentForm from './payment-form';
import Review from './review';

const steps = [
  'Select product',
  'Shipping address',
  'Payment details',
  'Review your order',
];

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <SelectProduct />;
    case 1:
      return <AddressForm />;
    case 2:
      return <PaymentForm />;
    case 3:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}

export default function Checkout() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Container maxWidth='md'>
      <Box component='main' sx={{ p: 2 }}>
        <Paper sx={{ p: 2 }}>
          <Typography component='h1' variant='h4' align='center'>
            Checkout
          </Typography>
          <Stepper activeStep={activeStep}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Box sx={{ px: 1, py: 2 }}>
            {activeStep === steps.length ? (
              <Fragment>
                <Typography variant='h5' gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant='subtitle1'>
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </Fragment>
            ) : (
              <Fragment>
                {getStepContent(activeStep)}
                <div>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack}>Back</Button>
                  )}
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={handleNext}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </div>
              </Fragment>
            )}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
