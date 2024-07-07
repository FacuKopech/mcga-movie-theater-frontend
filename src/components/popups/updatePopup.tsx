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
      } else {
        const movieId = movie._id;
        const response = await fetch('/api/update-movie', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({movieId, titulo, descripcion, estrellas, duracion, genero }),
          credentials: 'include',
        });

        if (!response.ok) {
          response.status == 401 ? setMessageError('Access Denied') : setMessageError('');
          throw new Error('Failed to load movie');
        }
        setLoading(false);
        onResult('Movie deleted successfully');
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
          <div className="div-input">
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
            <button onClick={closePopup}>Close</button>
            <button onClick={updateMovie}>Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdatePopup;
