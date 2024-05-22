import { Fullscreen } from '@mui/icons-material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

import image3 from '../assets/Image/35dd213d-89e6-489b-bdc9-875fa43c38ba (1).jpg';
import image1 from '../assets/Image/251f8a35-3b35-418b-bfc8-e5321b74b6be.jpg';
import image5 from '../assets/Image/732b26a7-9d6b-4aae-bfab-3bbaa9352fc8 (1).jpg';
import image6 from '../assets/Image/ca3a485a-2a6a-4eef-ab37-59cd87e81aa3.jpg';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    id: 1,
    imgPath: image1
  },
  {
    id: 2,
    imgPath: image3
  },
  {
    id: 3,
    imgPath: image5
  },
  {
    id: 4,
    imgPath: image6
  }
];

function CarouselHomePage() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  return (
    <div className='relative w-full'>
      <Box sx={{ maxWidth: 1440, flexGrow: 1 }}>
        <AutoPlaySwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {images.map((step, index) => (
            <div key={step.id}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Box
                  component='img'
                  sx={{
                    height: 200,
                    display: 'block',
                    maxWidth: 1440,
                    overflow: 'hidden',
                    width: '100%'
                  }}
                  src={step.imgPath}
                  alt={step.label}
                />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        <div className='absolute top-16  right-0'>
          <Button
            size='large'
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        </div>
        <div className='absolute top-16 left-0'>
          <Button size='large' onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
          </Button>
        </div>
        <MobileStepper
          // sx={{ color: 'gray', backgroundColor: ' rgb(31 41 55)' }}
          className='h-3 absolute  bottom-0 w-full '
          steps={maxSteps}
          position='static'
          activeStep={activeStep}
          nextButton={
            <Button
              size='small'
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            ></Button>
          }
          backButton={
            <Button
              size='small'
              onClick={handleBack}
              disabled={activeStep === 0}
            ></Button>
          }
        />
      </Box>
    </div>
  );
}

export default CarouselHomePage;
