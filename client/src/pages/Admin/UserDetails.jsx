import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import axios from 'axios';
import BaseURL from '../../config'
import Header from '../../components/AdminHeader';
import { getUsers } from '../../api-helpers/api-helpers';
const UserDetails = () => {
  const [users,setUsers] =useState([]);
  useEffect(() => {
    getUsers()
      .then((data) => setUsers(data.users))
      .catch((err) => console.log(err));
  }, []);

  const changeUserStatus = async (index) => {
    try {
      // Get the user ID based on the index
      const userId = users[index]._id;
  
      // Retrieve the token from localStorage
      const token = localStorage.getItem('admintoken');
  
      const response = await axios.post(`${BaseURL}admin/users/${userId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 200) {
        const updatedStatus = response.data.user.status; 
        setUsers((prevUsers) => {
          const updatedUsers = [...prevUsers];
          updatedUsers[index].status = updatedStatus; 
          return updatedUsers;
        });
      }
    } catch (error) {
      console.log(error);
    }
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
        <Box display="flex"
            alignItems="center"
            justifyContent="space-between"
            padding={2}
            marginTop={2}
            marginBottom={"50px"}
            height={"150px"}>
        <Typography variant="h4"> <b>Name</b> </Typography>
            <Typography variant="h4"><b>Phone</b></Typography>
            <Typography variant="h4"><b>Email</b></Typography>
           
            <Typography variant="h4"><b>Actions</b></Typography>
        </Box>
        {users && users.map((user, index) => (
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
    <Typography variant="h5">{user.name}</Typography>
    <Typography variant="h5">{user.phone}</Typography>
    <Typography variant="h5">{user.email}</Typography>
    
    <Button
  variant="outlined"
  onClick={() => changeUserStatus(index)}
  style={{
    backgroundColor: user.status ? 'green' : 'red',
    color: 'white',
  }}
>
  {user.status ? 'Active' : 'Inactive'}
</Button>

  </Box>
))}


      </Box>
      
      </Box>
    </>
  );
};

export default UserDetails;
