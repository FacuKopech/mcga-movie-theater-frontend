import React, { useEffect, useState } from 'react';
import '../styles/carousel.css';
import '../interfaces/CarouselProps'

const MostPopularCarousel: React.FC<CarouselProps> = ({ images }) => {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  let timeOut = null;

  const slideLeft = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  }

  const slideRight = () => {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  }

  useEffect(() => {
    timeOut = autoPlay && setTimeout(() => slideRight(), 2500);
  });
  
  return (
    <div className="carousel-container" onMouseEnter={() => setAutoPlay(false)} onMouseLeave={() => setAutoPlay(true)}>
      <div className="carousel_wrapper">
        {images.map((image, index) => (
          <div key={index} className={index == current ? "carousel_card carousel_card_active" : "carousel_card"}>
            <img className='card_image' src={image.image} alt="" />
            <div className="card_overlay">
              <h2 className="card_title">{image.title}</h2>
            </div>
          </div>
        ))}
        <div className="carousel_arrow_left" onClick={slideLeft}>&lsaquo;</div>
        <div className="carousel_arrow_right" onClick={slideRight}>&rsaquo;</div>
        <div className="carousel_pagination">
          {images.map((_, index) => {
            return (
              <div key={index} className={index == current ? "pagination_dot pagination_dot_active" : "pagination_dot"} onClick={() => setCurrent(index)}></div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default MostPopularCarousel;
