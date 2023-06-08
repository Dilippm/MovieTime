import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';

import Header from '../../components/AdminHeader';

const UserDetails = () => {
  // Sample user data
  const users = [
    { name: 'John Doe', phone: '123-456-7890', email: 'john@example.com', status: 'active' },
    { name: 'Jane Smith', phone: '987-654-3210', email: 'jane@example.com', status: 'inactive' },
    // Add more user objects as needed
  ];

  const changeUserStatus = (index) => {
    // Implement logic to change user status here
  };

  return (
    <>
      <Header />
      <Box width="100%" height="100%" margin="auto" ></Box>
      <Box margin="auto" marginTop={4} >
        <Typography variant="h3" padding={2} textAlign="center" bgcolor="#900C3F" color="white" >
          <b>All Users</b>
        </Typography>
      <Box width={"80%"} margin={"auto"} marginTop={"80px"}>
      {users.map((user, index) => (
          <Box
            key={index}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            padding={2}
            marginTop={2}
            marginBottom={"80px"}
            
            bgcolor="#f5f5f5"
            height={"150px"}
          >
            <Typography variant="h4">{user.name}</Typography>
            <Typography variant="h4">{user.phone}</Typography>
            <Typography variant="h4">{user.email}</Typography>
            <Button variant="outlined" onClick={() => changeUserStatus(index)}>
              {user.status === 'active' ? 'Deactivate' : 'Activate'}
            </Button>
          </Box>
        ))}

      </Box>
      
      </Box>
    </>
  );
};

export default UserDetails;
