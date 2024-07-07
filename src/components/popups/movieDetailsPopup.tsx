import  { useState } from 'react';
import '../../styles/movieDetailsPopup.css';
import Star from '../star';
import ConfirmDeletePopup from './confirmDeletePopup';
import { useLocation } from 'react-router';
import ResultPopup from './resultPopup';
import UpdatePopup from './updatePopup';

const MovieDetailsPopup = ({ movie, image, closePopup }: { movie: any, image: string, closePopup: () => void }) => {
  const [showConfirmDeletePopup, setShowConfirmDeletePopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const [showResultPopup, setShowResultPopup] = useState(false);
  const location = useLocation();
  const name = location.state ? location.state.name : '';
  if (!movie) return null;

  const openConfirmDeletePopup = () => {
    setShowConfirmDeletePopup(true);
  };

  const closeConfirmDeletePopup = () => {
    setShowConfirmDeletePopup(false);
  };

  const openUpdatePopup = () => {
    setShowUpdatePopup(true);
  };

  const closeUpdatePopup = () => {
    setShowUpdatePopup(false);
  };

  const handleResult = (message: string) => {
    setResultMessage(message);
    setShowResultPopup(true);
  };

  const renderStars = (rating: number) => {
    const totalStars = 5;
    return (
      <p className="stars">
        {[...Array(totalStars)].map((_, index) => (
          <Star key={index} filled={index < rating} />
        ))}
      </p>
    );
  };

  return (
    <div className="popup-overlay">
      <div className="movie-details-popup-content">
        <h2>Movie Details</h2>
        <div className='movie-details-container'>
          <div className='div-movie-image'>
            <img src={image} alt="" />
          </div>
          <div className='div-movie-details'>
            <h3><strong>{movie.titulo}</strong></h3>
            <div className='div-detailed-info'>
              <div className='div-stars'>{renderStars(movie.estrellas)}</div>
              <p className='p-duration'>{movie.duracion}</p>
            </div>
            <p className='p-genre'>{movie.genero}</p>
            <p className='p-description'>{movie.descripcion}</p>
          </div>
        </div>
        <div className='div-action-btns'>
          <button onClick={closePopup} title='Close'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className='close-svg-icon'>
              <path className='icon-path' d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
          <button title='Update' onClick={openUpdatePopup} className={name.length > 0 ? "div_button_display" : "div_button_no_display"}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className='update-svg-icon'>
              <path className='icon-path' d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
            </svg>
          </button>
          <button title='Delete' onClick={openConfirmDeletePopup} className={name.length > 0 ? "div_button_display" : "div_button_no_display"}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className='delete-svg-icon'>
              <path className='icon-path' d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
          </button>
        </div>
      </div>
      {showConfirmDeletePopup && (
        <ConfirmDeletePopup
          movieId={movie._id}
          closePopup={closeConfirmDeletePopup}
          onResult={handleResult}
        />
      )}
      {showUpdatePopup && (
        <UpdatePopup
          movie={movie}
          closePopup={closeUpdatePopup}
          onResult={handleResult}
        />
      )}
      {showResultPopup ? <div className='div-result-popup'>
        {showResultPopup && <ResultPopup resultMessage={resultMessage} closePopup={closePopup} />}
      </div> : null}
    </div>
  );
}

export default MovieDetailsPopup;
