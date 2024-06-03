import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { createAccount } from '../redux/slices/authSlice.js';
const defaultTheme = createTheme();

export default function SignUp() {
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);
    try {
      const userdata = {
        email: data.get('email').trim(),
        password: data.get('password').trim(),
        fullName:
          data.get('firstName').trim() + '' + data.get('lastName').trim()
      };
      if (
        userdata.email === '' ||
        userdata.password === '' ||
        userdata.fullName === ''
      ) {
        setLoading(false);
        return toast.error('Please fill all the fields');
      }
      console.log('userdata', userdata);
      const response = await dispatch(createAccount(userdata));
      if (response.payload?.success === true) {
        setLoading(false);
        navigate('/user/email-verification', {
          state: { email: userdata.email }
        });
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log('error', error);
      setLoading(false);
    }
  };

  return !loading ? (
    <div className='w-full items-center justify-center h-screen'>
      <ThemeProvider theme={defaultTheme}>
        <Container component='main' maxWidth='xs'>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex-column',
              flexDirection: 'column',
              alignItems: 'center'
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
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete='given-name'
                    name='firstName'
                    required
                    fullWidth
                    id='firstName'
                    label='First Name'
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id='lastName'
                    label='Last Name'
                    name='lastName'
                    autoComplete='family-name'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id='email'
                    label='Email Address'
                    name='email'
                    autoComplete='email'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name='password'
                    label='Password'
                    type='password'
                    id='password'
                    autoComplete='new-password'
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value='allowExtraEmails' color='primary' />
                    }
                    label='I accept the Privacy Policy and the Terms of Service.'
                  />
                </Grid>
              </Grid>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent='flex-end'>
                <Grid item>
                  <Link href='/signin' variant='body2'>
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  ) : (
    <div className='h-screen text-center flex items-center justify-center text-xl lg:text-3xl'>
      Please Wait...
    </div>
  );
}
