import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

function Cards({ button1, button2, image, imageTitle, title, data }) {
  return (
    <div className='flex items-center justify-center'>
      <Card
        sx={{ maxWidth: 445 }}
        className='object-cover items-center justify-center flex flex-col border border-black-200 shadow-lg hover:shadow-2xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105'
      >
        <CardMedia
          component='img'
          sx={{
            height: 150,
            width: 150,
            objectFit: 'cover',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          image={image}
          title={imageTitle}
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {title}
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
