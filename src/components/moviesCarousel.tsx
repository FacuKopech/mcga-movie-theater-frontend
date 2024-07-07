import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/moviesCarousel.css";
import { Carousel } from 'primereact/carousel';
import { CarouselSlide } from "../interfaces/CarouselSlide";

function MoviesCarousel({ slides, onSlideClick }: { slides: CarouselSlide[], onSlideClick: (movie: any, image: string) => void }) {

    const slideTemplate = (slide: CarouselSlide) => {
        return (
            <div className="slide-inner" onClick={() => onSlideClick(slide.movie, slide.image)}>
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
