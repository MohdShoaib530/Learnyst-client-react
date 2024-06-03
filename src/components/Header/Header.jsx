import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { alpha, styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { logoutUser, refreshAccessToken } from '../../redux/slices/authSlice';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto'
  }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch'
      }
    }
  }
}));

function Header() {
  const dispatch = useDispatch();
  const { isLoggedIn, data } = useSelector((state) => state?.auth);
  const settings = [
    {
      name: 'Singup',
      slug: '/signup',
      active: !isLoggedIn
    },
    {
      name: 'Signin',
      slug: '/signin',
      active: !isLoggedIn
    },
    {
      name: 'My Profile',
      slug: '/user/profile',
      active: isLoggedIn
    },
    {
      name: 'My Courses',
      slug: '/my-courses',
      active: isLoggedIn
    },
    {
      name: 'Support',
      slug: '/support',
      active: isLoggedIn
    },
    {
      name: 'Logout',
      slug: '/logout',
      active: isLoggedIn
    },
    {
      name: 'Create Course',
      slug: '/course/create',
      active: isLoggedIn
    }
  ];
  const navItems = [
    {
      name: 'Home',
      slug: '/'
    },
    {
      name: ' Courses',
      slug: '/courses'
    },

    {
      name: ' About Us',
      slug: '/about-us'
    },
    {
      name: ' Contact Us',
      slug: '/contact-us'
    }
  ];
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (event) => {
    setAnchorElUser(null);
  };

  const logout = async () => {
    const res = await dispatch(logoutUser());
    console.log('res', res);
    if (res.payload.message === 'jwt expired') {
      await dispatch(refreshAccessToken());
    }
  };

  return (
    <div className='w-full relative z-50'>
      <AppBar
        position='fixed'
        className='fixed flex items-center w-full justify-between z-50 '
      >
        <Container>
          <Toolbar disableGutters>
            <Typography
              variant='h6'
              noWrap
              component='a'
              href='#app-bar-with-responsive-menu'
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none'
              }}
            >
              Learnyst
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleOpenNavMenu}
                color='inherit'
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left'
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' }
                }}
              >
                {navItems.map((navItem) => (
                  <MenuItem key={navItem.slug} onClick={handleCloseNavMenu}>
                    <Typography textAlign='center'>
                      <Link to={`${navItem.slug}`}>{navItem.name}</Link>
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {navItems.map((navItem) => (
                <Button
                  key={navItem.slug}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  <Link to={`${navItem.slug}`}>{navItem.name}</Link>
                </Button>
              ))}
            </Box>
            <Search className='lg:flex hidden mr-2'>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder='Courses...'
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title='Open settings'>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt='Remy Sharp'
                    src={
                      data?.avatar?.secure_url
                        ? data?.avatar?.secure_url
                        : 'https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg'
                    }
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id='menu-appbar'
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) =>
                  setting.active ? (
                    <MenuItem key={setting.slug} onClick={handleCloseUserMenu}>
                      <Typography textAlign='center'>
                        {setting.slug === '/logout' ? (
                          <button onClick={logout}>
                            <Link>{setting.name}</Link>{' '}
                          </button>
                        ) : (
                          <Link to={`${setting.slug}`}>{setting.name}</Link>
                        )}
                      </Typography>
                    </MenuItem>
                  ) : null
                )}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
export default Header;
