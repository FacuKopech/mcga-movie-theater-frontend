import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/moviesCarousel.css";
import { Carousel } from 'primereact/carousel';

function MoviesCarousel({ slides, onSlideClick }: { slides: { image: string, data: any }[], onSlideClick: (movie: any, image: string) => void }) {

    const slideTemplate = (slide) => {
        return (
            <div className="slide-inner" onClick={() => onSlideClick(slide.data, slide.image)}>
                <img src={slide.image} alt={`slide`} className="carousel-image" />
            </div>
        );
    };

    return (
        <Carousel 
            value={slides} 
            numScroll={1} 
            numVisible={3} 
            itemTemplate={slideTemplate} 
            circular 
        />
    );
}

export default MoviesCarousel;
