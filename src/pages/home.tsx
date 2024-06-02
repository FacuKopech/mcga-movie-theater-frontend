import React from 'react'
import '../styles/home.css'
import Navbar from '../components/navbar'
import Carousel from '../components/carousel';
import { mostPopularMovies } from '../components/carouselData';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const location = useLocation();
  const name = location.state ? location.state.name : '';

  return (
    <div className="home_container">
      <Navbar name={name}></Navbar>
      <main>
        <div className="home_carousel">
          <h2 className='home_carousel_title'>Most Popular Films</h2>
          <Carousel images={mostPopularMovies} />
        </div>
      </main>
    </div> 
  );
}

export default Home