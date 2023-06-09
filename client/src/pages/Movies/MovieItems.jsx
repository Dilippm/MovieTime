import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';

const MovieItems = ({ title, releaseDate,language, postedUrl, id, description }) => {
    return (
      <Card className='poster-box' sx={{ width: 300, height: 370, borderRadius: 5, ":hover": { boxShadow: "10px 10px 20px #ccc" }, margin: 5, backgroundImage: `url(${postedUrl})`, backgroundSize: 'cover',  }}>
        <CardActionArea>
          <CardContent sx={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 10,marginTop: '200px' }}>
            <div>
              <Typography gutterBottom variant="h5" component="div" color="#ff9800">
               <b> {title}</b>
              </Typography>
           
            </div>
            <Typography variant="body2" color="#ff9800">
                <b>{language}</b>
              
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
  <Button
    variant="contained"
    sx={{
      "&:hover": {
        backgroundColor: '#e91e63' // Change the color here
      }
    }}
  >
    Book Ticket
  </Button>
</CardContent>

      </Card>
    );
  }
  
  export default MovieItems;
  
  

  
  
  


