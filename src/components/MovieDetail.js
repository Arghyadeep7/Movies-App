import axios from "axios";
import {useState, useEffect} from 'react';
import {useParams, useNavigate} from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import noPosterFound from "../assets/No_Poster.jpg";
import CarouselComponent from "./CarouselComponent";
import CastCarousel from "./CastCarousel";
import MovieList from "./MovieList";

import styles from "./MovieDetail.module.css";

const MovieDetail = () => {
    const [movie, setMovie] = useState([]);
    const [images, setImages] = useState([]);
    const [count, setCount]= useState(1);
    const [similar, setSimilar] = useState([]);
    const [loading, setLoading]=useState(true);
    const [cast, setCast]=useState([]);
    const [videos, setVideos]=useState("");
    const [trailer, setTrailer] = useState("");
    const { id } = useParams();

    const navigate=useNavigate();

    const countHandler=()=>{
        setCount(count+1);
    }

    const Undefined=()=>{
        navigate("/error");
    };

    const fetchMovies=async()=>{

        if(count===1){

            setLoading(true);

            try{
                const data=await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=images,videos,credits,similar`)
                .then(res => res.data);

                setMovie(data);

                setImages(data.images.backdrops);

                const actorData=data.credits.cast.filter((cast)=>{
                    return cast.known_for_department.toLowerCase()==="acting";
                });

                setCast(actorData);

                setVideos(data.videos.results);

                if(data.videos.results.length > 0){

                    const trailerData=data.videos.results.filter((trailer)=>{
                        return trailer.name.toLowerCase().includes("trailer");
                    });
                
                    if(trailerData.length > 0) {
                        setTrailer(trailerData[0].key);
                    }
                }

                setSimilar(data.similar.results);

            }catch(error){
                console.log(error);

                Undefined();

                return;
            }

            setLoading(false);
        }else{
            try{

                const similarTvSeriesData=await axios.get(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.REACT_APP_API_KEY}&page=${count}`)
                .then(res => res.data);
    
                setSimilar(similar.concat(similarTvSeriesData.results));
    
            }catch(error){
                console.log(error);
    
                Undefined();
    
                return;
            }
        }
    };

    useEffect(()=>{
        fetchMovies();
        // eslint-disable-next-line
    },[count]);

    return (
        <Row style={{marginTop:"10px"}}>
            {
                loading?
                <h3><i className="fas fa-hourglass-half" />&nbsp;Loading...</h3>
                :
                <>
                    <Row style={{justifyContent:"center"}}>
                        <Col md={4} className={styles.poster}>
                            <img
                                className="d-block w-100"
                                src={movie.poster_path?`https://image.tmdb.org/t/p/original${movie.poster_path}`:noPosterFound}
                                alt={movie.id}
                                style={{border:"2px solid white"}}
                            />
                        </Col>
                        <Col md={8}>
                            {images && <CarouselComponent items={images}/>}

                            <div style={{display:"flex", justifyContent:"space-evenly", marginTop:"40px"}}>

                                {trailer && <Button href={`https://www.youtube.com/watch?v=${trailer}`} target="_blank" variant="danger" style={{marginRight:"10px", backgroundColor:"red"}}><i className="fab fa-youtube" />&nbsp;Trailer</Button>}

                                {movie.homepage && <Button href={movie.homepage} variant="primary" target="_blank" style={{marginRight:"10px"}}><i className="fas fa-play-circle"></i>&nbsp;Website</Button>}
                                {!movie.homepage && <Button variant="primary" style={{marginRight:"10px"}} disabled><i className="fas fa-play-circle"></i>&nbsp;Website</Button>}

                                {movie.imdb_id && <Button href={`https://www.imdb.com/title/${movie.imdb_id}`} variant="warning" target="_blank"><i className="fa-solid fa-star" />&nbsp;IMDb</Button>}
                                {!movie.imdb_id && <Button variant="warning" disabled><i className="fa-solid fa-star"/>&nbsp;IMDb</Button>}

                                {videos.length>0 &&
                                    <DropdownButton
                                        variant="outline-danger"
                                        title="VIDEOS"
                                        id="input-group-dropdown-1"
                                    >
                                    {videos.map((video)=>(
                                        <Dropdown.Item key={video.key} target="_blank" href={`https://www.youtube.com/watch?v=${video.key}`}>{video.name}</Dropdown.Item>
                                    ))}
                                    </DropdownButton>
                                }
                                
                            </div>
                        </Col>
                    </Row>

                    <br />
                    
                    <Row>
                        <Col md={4}>
                            <h2><b className={styles.title}>{movie.title}</b></h2>
                            {movie.genres && 
                                <div>
                                    {    
                                        movie.genres.map( (genre) =>(
                                        <span key={genre.name}>
                                            <Badge pill bg="info">{genre.name}</Badge>&nbsp;&nbsp;
                                        </span>
                                        ))
                                    }
                                </div>
                            }  
                            {movie.genres.length===0 && <Badge pill bg="info">No genre Available</Badge>}          

                            {movie.spoken_languages &&
                                <div style={{marginTop:"10px"}}>
                                {
                                    movie.spoken_languages.map((lang)=>(
                                    <span key={lang.english_name}>
                                        <Badge style={{margin:"5px"}}>{lang.english_name}</Badge>&nbsp;&nbsp;
                                    </span>
                                    ))
                                }
                                </div>
                            }
                            {movie.spoken_languages.length===0 && <Badge>No language Available</Badge>}                        

                            {movie.release_date && <h5 className={styles.font_manager}>Released On : {movie.release_date}</h5>}
                            {!movie.release_date && <h5 className={styles.font_manager}>Release date not available!</h5>}
                        </Col>
                        <Col md={8}>
                            <Col xs={8} md={6} style={{display:"flex", justifyContent: "space-between"}}>
                                {movie.vote_average!==0 && <h5 className={styles.font_manager} style={{color:"goldenrod"}}><i className="fa-solid fa-star" />&nbsp;{movie.vote_average}&nbsp;&nbsp;({movie.vote_count} votes)</h5>}
                                {movie.vote_average===0 && <h5 className={styles.font_manager} style={{color:"goldenrod"}}><i className="fa-solid fa-star" />&nbsp;{movie.vote_average}&nbsp;&nbsp;({movie.vote_count} votes)</h5>}

                                {movie.runtime!==0 && <h5 className={styles.font_manager}><i className="fas fa-clock" />&nbsp;{movie.runtime} mins.</h5>}
                                {movie.runtime===0 && <h5 className={styles.font_manager}><i className="fas fa-clock" />&nbsp;{movie.runtime} mins.</h5>}
                            </Col>
                            {movie.tagline!=="" && <h5 className={styles.font_manager}><i><b>"{movie.tagline}"</b></i></h5>}
                            {movie.tagline==="" && <h5 className={styles.font_manager}><i><b>No tagline available</b></i></h5>}

                            {movie.overview!=="" && <h5 className={styles.font_manager}>{movie.overview}</h5>}
                            {movie.overview==="" && <h5 className={styles.font_manager}>No overview available</h5>}
                        </Col>
                    </Row>
                    <Row>
                    </Row>
                    {cast.length>0 &&
            
                        <>
                            <h3><Badge bg="secondary">Movie Cast</Badge>&nbsp;&nbsp;</h3>
                            <CastCarousel cast={cast} />
                        </>
                    }
                    {cast.length===0 && <h3>Movie Cast data not available!</h3>}
                    <Row>
                        <h3><Badge pill bg="primary" style={{textTransform: "uppercase"}}>Similar</Badge></h3>
                        <MovieList items={similar} />
                    </Row>
                    {similar.length > 0 && 
                        <div style={{display:"flex",justifyContent: "center"}}>
                            <Button onClick={countHandler} variant="outline-primary" style={{margin:"20px"}}  size="lg">Load More</Button>
                        </div>
                    }
                </>
            }
        </Row>
    )
}

export default MovieDetail;