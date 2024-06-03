import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  changePassword,
  refreshAccessToken
} from '../../redux/slices/authSlice.js';
const defaultTheme = createTheme();

export default function ChangePassword() {
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);
    try {
      const userdata = {
        oldPassword: data.get('oldPassword').trim(),
        newPassword: data.get('newPassword').trim()
      };
      if (userdata.oldPassword === '' || userdata.newPassword === '') {
        setLoading(false);
        return toast.error('Please fill all the fields');
      }
      const response = await dispatch(changePassword(userdata));
      console.log('response', response);
      if (response.payload?.success === true) {
        setLoading(false);
        navigate('/user/profile');
      } else if (
        response?.payload?.message === 'jwt expired' ||
        response.payload === 'jwt malformed'
      ) {
        const res = await dispatch(refreshAccessToken());
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log('error', error);
      setLoading(false);
    }
  };

  return !loading ? (
    <div className='w-full items-center justify-center min-h-screen '>
      <ThemeProvider theme={defaultTheme}>
        <Container component='main' maxWidth='xs'>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 17,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxHeight: '100vh',
              justifyContent: 'center',
              alignContent: 'center'
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Change Password
            </Typography>
            <Box
              component='form'
              noValidate
              onSubmit={handleSubmit}
              sx={{ display: 'flex', flexDirection: 'column' }}
            >
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12}
                  sx={{ display: 'flex', flexDirection: 'column' }}
                >
                  <TextField
                    autoComplete='old-password'
                    type='password'
                    name='oldPassword'
                    required
                    fullWidth
                    id='oldPassword'
                    label='Old Password'
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type='password'
                    id='newPassword'
                    label='New Password'
                    name='newPassword'
                    autoComplete='new-password'
                  />
                </Grid>
              </Grid>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                Change Password
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      <Link
        to={'/user/profile'}
        className='flex flex-row items-center justify-center gap-2'
      >
        <button onClick={() => navigate('/user/profile')}>
          <ArrowBackIcon />
          Go back to profile
        </button>
      </Link>
    </div>
  ) : (
    <div className='h-screen text-center flex items-center justify-center text-xl lg:text-3xl'>
      Please Wait...
    </div>
  );
}
