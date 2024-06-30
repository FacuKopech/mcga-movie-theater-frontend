import React from 'react';
import '../../styles/movieDetailsPopup.css';
import Star from '../star';

const MovieDetailsPopup = ({ movie, image, closePopup }: { movie: any, image: string, closePopup: () => void }) => {
  if (!movie) return null;

  const renderStars = (rating: number) => {
    const totalStars = 5;
    return (
      <div className="stars">
        {[...Array(totalStars)].map((_, index) => (
          <Star key={index} filled={index < rating} />
        ))}
      </div>
    );
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Movie Details</h2>
        <div className='movie-details-container'>
          <div className='div-movie-image'>
            <img src={image} alt="" />
          </div>
          <div className='div-movie-details'>
            <h3><strong>{movie.titulo}</strong></h3>
            <div className='div-detailed-info'>
              <p className='p-stars'>{renderStars(movie.estrellas)}</p>
              <p className='p-duration'>{movie.duracion}</p>
            </div>
            <p className='p-genre'>{movie.genero}</p>
            <p className='p-description'>{movie.descripcion}</p>
          </div>
        </div>
        <div className='div-action-btns'>
          <button onClick={closePopup}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default MovieDetailsPopup;
