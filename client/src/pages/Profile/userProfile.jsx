import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { Box, Button, FormLabel, Typography } from '@mui/material';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import Link from '@mui/material/Link';
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import { ToastContainer, toast } from 'react-toastify';
import { UserProfiles, updateUserProfile } from "../../api-helpers/api-helpers";

const UserProfile = () => {
  const [state, setState] = useState({ user: {} });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await UserProfiles();
        setState(res);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
     const resData=  await updateUserProfile(state.user);
     if(resData){
        toast.success("Profile updated successfully");
        navigate('/profile')
     }
      
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile");
      navigate('/profile')
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState(prevState => ({
      ...prevState,
      user: {
        ...prevState.user,
        [name]: value
      }
    }));
  };

  return (
    <>
      <Header />
      <Box width={"100%"} height={"100%"} margin={"auto"} marginTop={2}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
          <Box sx={{ width: 500, height: 550, backgroundColor: '#eeeeee' }}>
            <Typography variant='h4' textAlign='center' marginTop={3}>
              <b>LOGIN</b>
            </Typography>
            <form onSubmit={handleSubmit}>
              <Box padding={6} display='flex' justifyContent='center' flexDirection='column' width={400} margin='auto'>
                <FormLabel sx={{ mt: 1, mb: 1 }}>Username</FormLabel>
                <TextField
                  value={state.user.name}
                  onChange={handleChange}
                  margin='normal'
                  variant='standard'
                  type='text'
                  name='name'
                />

                <FormLabel sx={{ mt: 1, mb: 1 }}>Email</FormLabel>
                <TextField
                  value={state.user.email}
                  onChange={handleChange}
                  margin='normal'
                  variant='standard'
                  type='email'
                  name='email'
                />

                <FormLabel sx={{ mt: 1, mb: 1 }}>Phone</FormLabel>
                <TextField
                  value={state.user.phone}
                  onChange={handleChange}
                  margin='normal'
                  variant='standard'
                  type='number'
                  name='phone'
                />

                <Button sx={{ mt: 8, borderRadius: 10, bgcolor: '#2b2d42' }} type='submit' fullWidth variant='contained'>
                  <b>Update</b>
                </Button>
              </Box>
            </form>
          </Box>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </Box>
      </Box>
    </>
  )
}

export default UserProfile;
