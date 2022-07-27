import noPosterFound from "../assets/No_Poster.jpg";

import styles from "./SingleComponent.module.css";

const SingleComponent = (props) => {
  return (
    <a href={`/movie/${props.movie.id}`} className={styles.card_link}>
        <div className={styles.card}>
            <img
                className={`d-block w-100 ${styles.card_img}`}
                src={props.movie.poster_path?`https://image.tmdb.org/t/p/original${props.movie.poster_path}`:noPosterFound}
                alt={props.movie.title}
                style={{borderBottom:"2px solid white"}}
            />
            <div className={styles.rating}>
                <span><b><i className="fa-solid fa-star"/>&nbsp;{props.movie.vote_average}</b></span>
            </div>
            <h6 style={{margin:"5px"}}><b>{props.movie.title}</b></h6>
        </div>
    </a>
  )
}

export default SingleComponent