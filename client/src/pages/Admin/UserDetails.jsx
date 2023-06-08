import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import axios from 'axios';
import BaseURL from '../../config';
import Header from '../../components/AdminHeader';
import { getUsers } from '../../api-helpers/api-helpers';

const UserDetails = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(1);

  useEffect(() => {
    getUsers()
      .then((data) => setUsers(data.users))
      .catch((err) => console.log(err));
  }, []);

  const changeUserStatus = async (index) => {
    try {
      const userId = users[index]._id;
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

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const getPaginatedUsers = () => {
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    return users.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(users.length / perPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <>
      <Header />
      <Box width="100%" height="100%" margin="auto"></Box>
      <Box margin="auto" marginTop={4}>
        <Typography variant="h3" padding={2} textAlign="center" bgcolor="#900C3F" color="white">
          <b>All Users</b>
        </Typography>

        <Box width={'80%'} margin={'auto'} marginTop={'80px'}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            padding={2}
            marginTop={2}
            marginBottom={'50px'}
            height={'150px'}
          >
            <Typography variant="h4">
              <b>Name</b>
            </Typography>
            <Typography variant="h4">
              <b>Phone</b>
            </Typography>
            <Typography variant="h4">
              <b>Email</b>
            </Typography>
            <Typography variant="h4">
              <b>Actions</b>
            </Typography>
          </Box>

          {getPaginatedUsers().map((user, index) => (
            <Box
              key={index}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              padding={2}
              marginTop={2}
              marginBottom={'80px'}
              bgcolor="#f5f5f5"
              height={'150px'}
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

          <Box display="flex" justifyContent="center" marginTop={4}>
            <Button variant="contained" onClick={handlePreviousPage} disabled={currentPage === 1}>
              Previous Page
            </Button>
            {pageNumbers.map((pageNumber) => (
              <Button
                key={pageNumber}
                variant="outlined"
                onClick={() => setCurrentPage(pageNumber)}
                disabled={pageNumber === currentPage}
                style={{ marginLeft: '10px' }}
              >
                {pageNumber}
              </Button>
            ))}
            <Button
              variant="contained"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              style={{ marginLeft: '10px' }}
            >
              Next Page
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UserDetails;
