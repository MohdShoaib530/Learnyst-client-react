import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { loginAccount } from '../redux/slices/authSlice.js';

const defaultTheme = createTheme();

function SignIn() {
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const data = new FormData(event.currentTarget);
      const userdata = {
        email: data.get('email').trim(),
        password: data.get('password').trim()
      };
      if (userdata.email === '' || userdata.password === '') {
        setLoading(false);
        return toast.error('Please fill all the fields');
      }
      const response = await dispatch(loginAccount(userdata));
      console.log('response', response);
      if (response.payload?.success === true) {
        setLoading(false);
        navigate('/');
      } else if (response.payload?.message === 'userEmail is not verified') {
        setLoading(false);
        navigate('/user/email-verification', {
          state: { email: userdata.email }
        });
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log('error in login', error);
      setLoading(false);
    }
  };

  return !loading ? (
    <div>
      <ThemeProvider theme={defaultTheme}>
        <Grid
          container
          component='main'
          sx={{ height: '100vh', width: '100vw' }}
        >
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                'url(https://source.unsplash.com/random?wallpapers)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light'
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component='h1' variant='h5'>
                Sign in
              </Typography>
              <Box
                component='form'
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  autoFocus
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='current-password'
                />
                <FormControlLabel
                  control={<Checkbox value='remember' color='primary' />}
                  label='Remember me'
                />
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href='/forgot-password' variant='body2'>
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href='signup' variant='body2'>
                      Don &apos; t have an account? Sign Up
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  ) : (
    <div className='h-screen text-center flex items-center justify-center text-xl lg:text-3xl'>
      Please Wait...
    </div>
  );
}

export default SignIn;
