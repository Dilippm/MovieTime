import React, { useState } from 'react';
import { AppBar, Toolbar, Tabs, Tab } from '@mui/material';

import { Box } from '@mui/system';

import { Link } from 'react-router-dom';

import logo from '../assets/logo.png';

const Header = () => {
  const [value, setValue] = useState(0);


 

  return (
    <AppBar position="sticky" sx={{ bgcolor: '#2b2d42' }}>
      <Toolbar>
        <Box width={'8%'}>
        <Link to="/" style={{ textDecoration: 'none' }}>
            <img src={logo} alt="logo" style={{ width: '100%', height: 'auto' }} />
          </Link>
        </Box>
      
        <Box display="flex" >
          <Tabs
            textColor="inherit"
            indicatorColor="secondary"
            value={value}
            onChange={(e, val) => setValue(val)}
          >
            <Tab LinkComponent={Link} to="/movies" label="Movies" />
          
            <Tab LinkComponent={Link} to="/login" label="User" />
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
