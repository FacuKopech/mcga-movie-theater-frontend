import { useEffect, useState } from 'react'
import '../styles/home.css'
import Navbar from '../components/navbar'
import MostPopularCarousel from '../components/mostPopularCarousel';
import AddButton from '../components/addButton';
import { mostPopularMovies } from '../components/carouselData';
import { useLocation } from 'react-router-dom';
import AddFilmPopup from '../components/popups/addFilmPopup';
import MoviesCarousel from '../components/moviesCarousel';
import { useLoading } from '../context/loadingContext';
import { useUpdate } from '../context/updateContext';
import MovieDetailsPopup from '../components/popups/movieDetailsPopup';
import { Genre } from '../interfaces/genre';
import { MoviesWithImages } from '../interfaces/MoviesWithImages';
import {VITE_APP_BACKEND_URL} from '../config/config'

const Home = () => {
  const location = useLocation();
  const name = location.state ? location.state.name : '';
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isMovieDetailsPopupOpen, setIsMovieDetailsPopupOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedMovieImage, setSelectedMovieImage] = useState('');
  const [genres, setGenres] = useState<Genre[]>([]);
  const [moviesWithImages, setMoviesWithImages] = useState<MoviesWithImages>({});
  const { setLoading } = useLoading();
  const { update } = useUpdate();

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  }

  const toggleMovieDetailsPopup = (movie = null, image = '') => {
    setSelectedMovie(movie);
    setSelectedMovieImage(image);
    setIsMovieDetailsPopupOpen(!isMovieDetailsPopupOpen);
  }

  useEffect(() => {
    const fetchGenres = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${VITE_APP_BACKEND_URL}/api/get-genres`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch genres');
        }

        const data = await response.json();
        const sortedGenres: Genre[] = data.genres.sort((a: Genre, b: Genre) => a.genre.localeCompare(b.genre));
        setGenres(sortedGenres);
        fetchMovieImages(sortedGenres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    const fetchMovieImages = async (genres: Genre[]) => {
      try {
        const movieTitles = genres.flatMap(genre => genre.movies.map((movie: Movie) => movie.titulo));
        const response = await fetch('/api/get-movie-posters', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ movieTitles })
        });

        if (!response.ok) {
          throw new Error('Failed to fetch movie images');
        }
        
        const data = await response.json();        
        setMoviesWithImages(data.moviesWithImages);
      } catch (error) {
        console.error('Error fetching movie images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, [update]);

  return (
    <div className="home_container">
      <Navbar name={name}></Navbar>
      <main>
        <div className="home_carousel">
          <h2 className='home_carousel_title'>Most Popular Films</h2>
          <MostPopularCarousel images={mostPopularMovies} />
        </div>
        <div className={name.length > 0 ? "div_add_button" : "div_add_button_no_display"}>
          <AddButton onClick={togglePopup} />
        </div>
        {isPopupOpen && <AddFilmPopup closePopup={togglePopup} />}
        {isMovieDetailsPopupOpen && <MovieDetailsPopup movie={selectedMovie} image={selectedMovieImage} closePopup={toggleMovieDetailsPopup} />}
        <div className='div-movies-carousels-container'>
          {genres.map((genre, index) => (
            <div key={index} className="movie-carousel">
              <h2 className="genre-title">{genre.genre}</h2>
              <hr className='line-separator' />
              <MoviesCarousel
                slides={genre.movies.map(movie => ({
                  image: moviesWithImages[movie.titulo] || '',
                  movie: movie
                }))}
                onSlideClick={toggleMovieDetailsPopup}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Home;