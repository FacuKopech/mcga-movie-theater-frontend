import React, { useState } from 'react';
import '../../styles/addFilmPopup.css';
import { useLoading } from '../../context/loadingContext';
import ResultPopup from './resultPopup';

const AddFilmPopup = ({ closePopup }: { closePopup: () => void }) => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [estrellas, setEstrellas] = useState(0);
  const [duracion, setDuracion] = useState('');
  const [genero, setGenero] = useState('');
  const [errorMessage, setMessageError] = useState('');
  const { setLoading } = useLoading();
  const [showResultPopup, setShowResultPopup] = useState(false);
  const [resultMessage, setResultMessage] = useState('');

  const handleTituloChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitulo(event.target.value);
  };

  const handleDescripcionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescripcion(event.target.value);
  };

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const stars = parseInt(event.target.value);
    setEstrellas(stars);
  };

  const handleDuracionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDuracion(event.target.value);
  };

  const handleGeneroChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGenero(event.target.value);
  };


  const submitMovie = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (titulo === '' || descripcion === '' || estrellas === 0 || duracion === '' || genero === '') {
        setMessageError('All fields are required');
        setLoading(false);
      } else {
        const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/api/add-movie`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ titulo, descripcion, estrellas, duracion, genero }),
          credentials: 'include',
        });

        if (!response.ok && response.status == 400) {
          response.json().then(data => {
            setResultMessage(data.message);
          });
        } else if (!response.ok) {
          response.status == 401 ? setMessageError('Access Denied') : setMessageError('');
          throw new Error('Failed to load movie');
        }
        setLoading(false);
        setResultMessage('Movie uploaded successfully');
        setShowResultPopup(true);
      }
    } catch (error) {
      setLoading(false);
      console.error('Error during movie upload:', error);
      setResultMessage('Error during movie upload');
      setShowResultPopup(true);
    }
  }

  return (
    <div className="popup-overlay">
      <div className="add-film-popup-content">
        <h2>Add Movie</h2>
        <p className='p-error-message'>{errorMessage}</p>
        <form action="" method='post'>
          <div className="div-input">
            <label htmlFor="">Titulo</label>
            <input type="text"
              id="titulo"
              name="titulo"
              value={titulo}
              onChange={handleTituloChange} />
          </div>
          <div className="div-input">
            <label htmlFor="">Descripcion</label>
            <textarea id="descripcion"
              name="descripcion"
              value={descripcion}
              onChange={handleDescripcionChange} />
          </div>
          <div className="div-input-rating">
            <label htmlFor="">Estrellas</label>
            <div className="rating">
              <input value="5" name="rating" id="star5" type="radio" onChange={handleRatingChange}></input>
              <label htmlFor="star5"></label>
              <input value="4" name="rating" id="star4" type="radio" onChange={handleRatingChange}></input>
              <label htmlFor="star4"></label>
              <input value="3" name="rating" id="star3" type="radio" onChange={handleRatingChange}></input>
              <label htmlFor="star3"></label>
              <input value="2" name="rating" id="star2" type="radio" onChange={handleRatingChange}></input>
              <label htmlFor="star2"></label>
              <input value="1" name="rating" id="star1" type="radio" onChange={handleRatingChange}></input>
              <label htmlFor="star1"></label>
            </div>
          </div>
          <div className="div-input">
            <label htmlFor="">Duracion</label>
            <input type="text"
              id="duracion"
              name="duracion"
              value={duracion}
              onChange={handleDuracionChange} />
          </div>
          <div className="div-input">
            <label htmlFor="">Genero/s</label>
            <select name="genero" id="genero" value={genero} onChange={handleGeneroChange}>
              <option value="">Select an option</option>
              <option value="Action">Action</option>
              <option value="Adventure">Adventure</option>
              <option value="Crime">Crime</option>
              <option value="Comedy">Comedy</option>
              <option value="Drama">Drama</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Horror">Horror</option>
              <option value="Mystery">Mystery</option>
              <option value="Romance">Romance</option>
              <option value="Thriller">Thriller</option>
              <option value="Western">Western</option>
            </select>
          </div>
          <div className="action-buttons">
            <button onClick={closePopup} title='Close'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className='close-svg-icon'>
                <path className='icon-path' d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
            <button title='Update' onClick={submitMovie}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className='add-svg-icon'>
                <path className='icon-path' d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>

            </button>
          </div>
        </form>
      </div>
      {showResultPopup && <ResultPopup resultMessage={resultMessage} closePopup={closePopup} />}
    </div>
  );
}

export default AddFilmPopup;
