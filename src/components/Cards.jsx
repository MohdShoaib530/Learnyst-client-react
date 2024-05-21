import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import React from 'react';

function Cards({ button1, button2, image, imageTitle, heading, data }) {
  return (
    <div>
      <Card sx={{ maxWidth: 445 }}>
        <CardMedia sx={{ height: 140 }} image={image} title={imageTitle} />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {heading}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {data}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size='small'>{button1}</Button>
          <Button size='small'>{button2} </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default Cards;
