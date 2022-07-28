import {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";

import MovieList from './MovieList';

const SearchQuery = () => {

    const [movies, setMovies]= useState([]);
    const [count, setCount]= useState(1);
    const [loading, setLoading]=useState(false);
    const [total_pages, setTotalPages]= useState(1);

    const { query } =useParams();

    const nextPageHandler=()=>{
        setCount(count+1);
    }
    
    const previousPageHandler=()=>{
        setCount(count-1);
    };

    const countHandler=()=>{
        setCount(count+1);
    }

    const fetchSearch=async ()=>{

        console.log(query);

        setLoading(true);
        
        const searchData=await fetch(`https://api.themoviedb.org/3/search/movie?api_key=e43874a5a2c400ac2dd1d058b954f69f&language=en-US&include_adult=true&page=${count}&query=${query}`)
        .then(res => res.json());

        setMovies(searchData.results);

        setTotalPages(searchData.total_pages);

        setLoading(false); 

    };

    useEffect(() => {
        fetchSearch();
        // eslint-disable-next-line
    }, [count,query]);

    return (
        <Container>
            <h2><Badge bg="dark">{loading?"Searching":"Search"} results for "{query}"</Badge></h2>
            <h3><Badge pill bg="dark" style={{textTransform: "uppercase"}}>PAGE {count} / {total_pages}</Badge></h3>
            <MovieList items={movies} />
            <div style={{display:"flex",justifyContent: "center"}}>
            {count>1 && <Button onClick={previousPageHandler} variant="outline-warning" style={{margin:"20px"}} size="lg"><i className="fas fa-angle-double-left" />&nbsp;Previous</Button>}
            {count===1 && <Button onClick={previousPageHandler} variant="outline-warning" style={{margin:"20px"}} size="lg" disabled><i class="fas fa-times-circle"/>&nbsp;Previous</Button>}
            {count!==total_pages && <Button onClick={nextPageHandler} variant="outline-primary" style={{margin:"20px"}}  size="lg">Next&nbsp;<i className="fas fa-angle-double-right" /></Button>}
            {count===total_pages && <Button onClick={nextPageHandler} variant="outline-primary" style={{margin:"20px"}}  size="lg" disabled>Next&nbsp;<i class="fas fa-times-circle"/></Button>}
            </div>
        </Container>
    );
}

export default SearchQuery