import React, { useEffect, useState } from 'react';
import {Box} from "@mui/system";
import { Typography } from '@mui/material';
import { getAllMovies } from '../../api-helpers/api-helpers';
import MovieItems from './MovieItems';

const Movies = () => {
  const [movies,setMovies] =useState();
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Box margin={"auto"} marginTop={4}>
      <Typography variant='h4' padding={2} textAlign={"center"} bgcolor={"#900C3F"} color={"white"}> <b>All Movies</b> </Typography>
      <Box width={"100%"} margin={"auto"} display={"flex"} justifyContent={"flex-start"} flexWrap={"wrap"}  >
         {movies && movies.map((movie,index)=> <MovieItems key={index} postedUrl ={movie.postedUrl} title={movie.title} language={movie.language} description={movie.description} releaseDate={movie.releaseDate}  />)}
      </Box>

    </Box>
  )
}

export default Movies
