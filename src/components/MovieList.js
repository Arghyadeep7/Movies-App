import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import SingleComponent from "./SingleComponent";

const MovieList = (props) => {

    if(props.items.length===0){
        return (
            <h2 style={{margin:"15px auto"}}>
                No movies found!
            </h2>
        )
    }

    return (
    <Row>
    {
        props.items.map((movie) =>(
            <Col xs={4} sm={3} lg={2} key={movie.id}>
                
                    <SingleComponent movie={movie} />
                
            </Col>
        ))
    }
    </Row>
    );
}

export default MovieList