import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MovieComponent from "./components/MovieComponent";
import MovieDetail from "./components/MovieDetail";
import Container from "react-bootstrap/Container";

import SearchQuery from "./components/SearchQuery";

function App() {

  return (
    <Container>
      <Header/>
      <Routes>
        <Route
          path="/"
          element={<Navigate replace to="/movies/now_playing" />}
        />
        <Route path="/movies/now_playing" element={<MovieComponent type="now_playing"/>} />
        <Route path="/movies/upcoming" element={<MovieComponent type="upcoming"/>} />
        <Route path="/movies/popular" element={<MovieComponent type="popular"/>} />
        <Route path="/movies/top_rated" element={<MovieComponent type="top_rated"/>} />
        <Route path="/movies/trending" element={<MovieComponent type="trending"/>} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/search/:query" element={<SearchQuery />} />
        <Route path="*" element={<h1>Error, this page doesnot exist !</h1>} />
      </Routes>
      <Footer />
    </Container>
  );
}

export default App;
