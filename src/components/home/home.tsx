import { Container, Box, Button } from '@mui/material';

import { Link } from 'react-router-dom';

function Home() {
  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
        }}
      >
        <Button variant='text' component={Link} to='/sign-up'>
          Go to sign-up
        </Button>
        <Button variant='text' component={Link} to='/sign-in'>
          Go to Sign-in
        </Button>
        <Button variant='text' component={Link} to='/autocomplete-product'>
          Go to Autocomplete
        </Button>
        <Button variant='text' component={Link} to='/checkout'>
          Go to checkout
        </Button>
      </Box>
    </Container>
  );
}

export default Home;
