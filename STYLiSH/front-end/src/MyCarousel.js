import React from 'react';
import banner from './images/banner.jpg';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.css';

function MyCarousel() {
    
    return (
        <Carousel>
          <Carousel.Item interval={2000}>
          <img className="d-block w-100" src={banner} alt="First slide"/>
          </Carousel.Item>
          <Carousel.Item interval={1000}>
          <img className="d-block w-100" src={banner} alt="Second slide"/>
          </Carousel.Item>
          <Carousel.Item interval={2000}>
          <img className="d-block w-100" src={banner} alt="Third slide"/>
          </Carousel.Item>
        </Carousel>
      );

    }

export default MyCarousel;