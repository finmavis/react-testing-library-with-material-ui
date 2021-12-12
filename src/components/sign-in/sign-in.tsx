import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Container,
  CssBaseline,
  Avatar,
  Typography,
  TextField,
  Box,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  Snackbar,
  Alert,
  Slide,
} from '@mui/material';
import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material';

interface SignInForm {
  email: string;
  password: string;
  keepSignedIn: boolean;
}

const SIGN_IN_DEFAULT_VALUE: SignInForm = {
  email: '',
  password: '',
  keepSignedIn: false,
};

const signInSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
  keepSignedIn: yup.bool(),
});

function SignIn() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignInForm>({
    defaultValues: SIGN_IN_DEFAULT_VALUE,
    resolver: yupResolver(signInSchema),
  });
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isOpenSnackbar, setOpenSnackbar] = useState<boolean>(false);

  const onSubmit: SubmitHandler<SignInForm> = (data) => {
    setLoading(true);
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(() => {
        reset(SIGN_IN_DEFAULT_VALUE);
        setLoading(false);
        setOpenSnackbar(true);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <Box component='form' onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register('email')}
            variant='outlined'
            margin='normal'
            size='small'
            fullWidth
            id='email'
            type='email'
            label='Email Address'
            autoComplete='email'
            autoFocus
            error={!!errors.email}
            helperText={errors.email?.message}
            aria-invalid={errors.email ? 'true' : 'false'}
          />
          <TextField
            {...register('password')}
            variant='outlined'
            margin='normal'
            size='small'
            fullWidth
            id='password'
            label='Password'
            type='password'
            error={!!errors.password}
            helperText={errors.password?.message}
            aria-invalid={errors.password ? 'true' : 'false'}
          />
          <FormControlLabel
            control={
              <Controller
                name='keepSignedIn'
                control={control}
                render={({ field }) => (
                  <Checkbox
                    {...field}
                    onChange={(_, checked) => field.onChange(checked)}
                    checked={field.value ?? false}
                    color='primary'
                    size='small'
                  />
                )}
              />
            }
            label='Remember me'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            sx={{ mt: 1, mb: 1 }}
            size='small'
            disabled={isLoading}
          >
            Sign In
          </Button>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Button size='small' component={Link} to='/sign-up'>
                Don't have an account? Sign Up
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Snackbar
        open={isOpenSnackbar}
        autoHideDuration={10000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        TransitionComponent={(props) => <Slide {...props} direction='up' />}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity='success'
          sx={{ width: '100%' }}
          variant='filled'
        >
          Welcome back!
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default SignIn;
