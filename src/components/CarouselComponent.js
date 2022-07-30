import React from 'react';
import {Link} from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';
import styles from "./CarouselComponent.module.css";

import noImageFound from "../assets/No_Image.png";

const CarouselComponent = (props) => {

  if(props.items.length===0){
    return (
      <Carousel controls={false} indicators={false}>
        <Carousel.Item style={{border:"2px solid white"}}>
          <img className="d-block w-100" src={noImageFound} alt="No Images Available"/>
        </Carousel.Item>
      </Carousel>
    );
  }

  if(props.items.length === 1){
    return (
      <Carousel controls={false} indicators={false}>
        <Carousel.Item style={{border:"2px solid white"}}>
          <img className="d-block w-100" src={`https://image.tmdb.org/t/p/original${props.items[0].file_path}`} alt="No Images Available"/>
        </Carousel.Item>
      </Carousel>
    );
  }

  
  return (
    <Carousel> 
      {
        props.items.map((movie)=>(
            <Carousel.Item key={movie.id || movie.file_path} style={{position: 'relative', border:"2px solid white"}}>
              {movie.id && 
                <Link to={`/movie/${movie.id}`}>
                  <img
                      className="d-block w-100"
                      src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                      alt={movie.id}
                  />
                  <Carousel.Caption>
                    <span className={styles.captionTitle}>{movie.title}&nbsp;<br /></span>
                    <p className={styles.caption}>{movie.overview}</p>
                  </Carousel.Caption>
                  <div className={styles.rating}>
                    <h5><i className="fa-solid fa-star" style={{color:"goldenrod"}}/>&nbsp;{movie.vote_average}</h5>
                  </div>
                </Link>
              }
              {!movie.id && 
                <img
                    className="d-block w-100"
                    src={movie.file_path?`https://image.tmdb.org/t/p/original${movie.file_path}`:"https://user-images.githubusercontent.com/10515204/56117400-9a911800-5f85-11e9-878b-3f998609a6c8.jpg"}
                    alt={movie.file_path}
                />
              }
            </Carousel.Item>
        ))
      }
    </Carousel>
  )
}

export default CarouselComponent;