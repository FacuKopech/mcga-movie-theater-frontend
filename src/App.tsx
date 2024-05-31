import { useState, useEffect } from 'react';
import './App.css';
import './pages/home';
import './interfaces/movie';
import axios from 'axios';

function App() {
  const [data, setData] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await axios.get('/api/get-movies').then((response) => {
        if (!response.statusText) {
          setError('Failed to fetch data: ' + response);
          console.error('Failed to fetch data:', response);
          setLoading(false);
          throw new Error('Failed to fetch data');
        }
        return response.data;
      }).then((data) => {
        if (!data) {
          throw new Error('No data received');
        }
        setData(data);
      });
    } catch (error) {
      setError('Error fetching data: ' + error);
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : data.length > 0 ? (
        data.map((movie) => (
          <div key={movie._id}>
            <h3>{movie.nombre}</h3>
            <p>{movie.descripcion}</p>
            <p>Estrellas: {movie.estrellas}</p>
            <p>Duración: {movie.duracion}</p>
            <p>Género: {movie.genero}</p>
          </div>
        ))
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}

export default App;
