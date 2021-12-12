import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  RadioGroup,
  FormLabel,
  Radio,
  Snackbar,
  Slide,
  Alert,
} from '@mui/material';
import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { GENDER } from 'constants/gender';
import { WATCH_VIDEO_TIMEFRAMES } from 'constants/watch-video-timeframes';

interface SignUpForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  agreeTermsAndConditions: boolean;
  watchVideoTimeframe: string;
  emailSubscription: boolean;
}

const SIGN_UP_DEFAULT_VALUE: SignUpForm = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  gender: '',
  agreeTermsAndConditions: false,
  watchVideoTimeframe: '',
  emailSubscription: false,
};

const schema = yup.object().shape({
  firstName: yup.string().required('Firstname is required'),
  lastName: yup.string().required('Lastname is required'),
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
  confirmPassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
  gender: yup
    .string()
    .required('Gender is required')
    .test('noHelicopter', 'Are you serious?', (value) => {
      return value?.toLocaleLowerCase() !== 'helicopter';
    }),
  watchVideoTimeframe: yup.string().required('Please select an option'),
  agreeTermsAndConditions: yup
    .bool()
    .oneOf([true], 'You must agree with terms and conditions')
    .required(),
  emailSubscription: yup.bool(),
});

export default function SignUp() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isOpenSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    defaultValues: SIGN_UP_DEFAULT_VALUE,
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<SignUpForm> = (data) => {
    setLoading(true);
    fetch('/api/register', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        reset(SIGN_UP_DEFAULT_VALUE);
        setLoading(false);
        setOpenSnackbar(true);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
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
          Sign up
        </Typography>
        <Box
          component='form'
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register('firstName')}
                name='firstName'
                required
                fullWidth
                autoFocus
                size='small'
                id='firstName'
                label='First Name'
                margin='dense'
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register('lastName')}
                name='lastName'
                required
                fullWidth
                size='small'
                id='lastname'
                label='Last Name'
                margin='dense'
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register('email')}
                name='email'
                required
                fullWidth
                type='email'
                size='small'
                id='email'
                label='Email'
                margin='dense'
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register('password')}
                margin='dense'
                size='small'
                fullWidth
                id='password'
                label='Password'
                type='password'
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register('confirmPassword')}
                name='confirmPassword'
                type='password'
                size='small'
                fullWidth
                required
                margin='dense'
                id='confirmPassword'
                label='Confirm Password'
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name='gender'
                control={control}
                render={({ field }) => (
                  <FormControl
                    error={!!errors.gender}
                    fullWidth
                    size='small'
                    required
                  >
                    <InputLabel id='gender-label'>Gender</InputLabel>
                    <Select
                      {...field}
                      labelId='gender-label'
                      id='select-gender'
                      renderValue={(value) =>
                        `${value.charAt(0).toUpperCase()}${value.slice(1)}`
                      }
                      displayEmpty
                      fullWidth
                      label='Gender'
                      aria-describedby='gender-error'
                      size='small'
                    >
                      {GENDER.map((gender) => (
                        <MenuItem key={gender.value} value={gender.value}>
                          {gender.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.gender && (
                      <FormHelperText id='gender-error'>
                        {errors.gender.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl
                component='fieldset'
                error={!!errors.watchVideoTimeframe}
              >
                <FormLabel component='legend'>
                  How often do you watch music videos?
                </FormLabel>
                <RadioGroup
                  name='watch-video-timeframe'
                  aria-label='watch video timeframe'
                  aria-describedby='timeframe-error-text'
                >
                  {WATCH_VIDEO_TIMEFRAMES.map((timeframe) => (
                    <FormControlLabel
                      key={timeframe.value}
                      value={timeframe.value}
                      label={timeframe.label}
                      control={
                        <Controller
                          name='watchVideoTimeframe'
                          control={control}
                          render={({ field }) => (
                            <Radio
                              {...field}
                              checked={field.value === timeframe.value}
                              onChange={() => field.onChange(timeframe.value)}
                              size='small'
                            />
                          )}
                        />
                      }
                    />
                  ))}
                </RadioGroup>
                {errors.watchVideoTimeframe && (
                  <FormHelperText id='timeframe-error-text'>
                    {errors.watchVideoTimeframe.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl
                error={!!errors.agreeTermsAndConditions}
                size='small'
              >
                <FormControlLabel
                  control={
                    <Controller
                      name='agreeTermsAndConditions'
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          {...field}
                          onChange={(_, checked) => field.onChange(checked)}
                          checked={field.value ?? false}
                          color='primary'
                          size='small'
                          inputProps={{
                            'aria-describedby':
                              'terms-and-condition-error-text',
                          }}
                        />
                      )}
                    />
                  }
                  label='I agree to the terms and conditions'
                />
                {errors.agreeTermsAndConditions && (
                  <FormHelperText
                    sx={{ mt: 0 }}
                    id='terms-and-condition-error-text'
                  >
                    {errors.agreeTermsAndConditions?.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Controller
                    name='emailSubscription'
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
                label='Yes, please use e-mail to send me information about other offerings'
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 2, mb: 1 }}
            size='small'
            disabled={isLoading}
          >
            Sign Up
          </Button>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Button component={Link} to='/sign-in'>
                Already have an account? Sign in
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
          Welcome!
        </Alert>
      </Snackbar>
    </Container>
  );
}
