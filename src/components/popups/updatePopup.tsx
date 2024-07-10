import React, { useEffect, useState } from 'react';
import '../../styles/updatePopup.css';
import { useLoading } from '../../context/loadingContext';

const UpdatePopup: React.FC<UpdatePopupProps> = ({ movie, closePopup, onResult }) => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [estrellas, setEstrellas] = useState(0);
  const [duracion, setDuracion] = useState('');
  const [genero, setGenero] = useState('');
  const [errorMessage, setMessageError] = useState('');
  const { setLoading } = useLoading();

  useEffect(() => {
    setTitulo(movie.titulo);
    setDescripcion(movie.descripcion);
    setEstrellas(movie.estrellas);
    setDuracion(movie.duracion);
    setGenero(movie.genero);
  }, [movie]);

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


  const updateMovie = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (titulo === '' || descripcion === '' || estrellas === 0 || duracion === '' || genero === '') {
        setMessageError('All fields are required');
        setLoading(false);
      } else if(titulo == movie.titulo && descripcion == movie.descripcion && estrellas == movie.estrellas && duracion == movie.duracion && genero == movie.genero){
        setMessageError('Change at least one field to update');
        setLoading(false);
      } else{
        const movieId = movie._id;
        const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/api/update-movie`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ movieId, titulo, descripcion, estrellas, duracion, genero }),
          credentials: 'include',
        });

        if (!response.ok && response.status == 400) {
          response.json().then(data => {
            onResult(data.message);
          });
        } else if (!response.ok) {
          response.status == 401 ? setMessageError('Access Denied') : setMessageError('');
          throw new Error('Failed to update movie');
        }
        setLoading(false);
        onResult('Movie updated successfully');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error during movie update:', error);
      onResult('Error during movie update');
    }
  }

  return (
    <div className="update-popup-overlay">
      <div className="update-popup-content">
        <h2>Update Movie</h2>
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
          <div className="div-input div-input-textarea">
            <label htmlFor="">Descripcion</label>
            <textarea id="descripcion"
              name="descripcion"
              value={descripcion}
              onChange={handleDescripcionChange} />
          </div>
          <div className="div-input-rating">
            <label htmlFor="estrellas">Estrellas</label>
            <div className="rating">
              {[...Array(5)].map((_, index) => (
                <React.Fragment key={index}>
                  <input
                    type="radio"
                    id={`star${5 - index}`}
                    name="rating"
                    value={5 - index}
                    checked={estrellas === 5 - index}
                    onChange={handleRatingChange}
                  />
                  <label htmlFor={`star${5 - index}`}></label>
                </React.Fragment>
              ))}
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
            <button title='Update' onClick={updateMovie}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className='update-svg-icon'>
                <path className='icon-path' d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdatePopup;
