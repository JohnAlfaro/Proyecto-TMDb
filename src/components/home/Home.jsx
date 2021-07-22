import React, { useState, useEffect } from "react";
import {
  fetchMovies,
  fetchMovieByGenre,
  fetchTopratedMovie,
} from "../../service";
import RBCarousel from "react-bootstrap-carousel";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

export function Home() {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [movieByGenre, setMovieByGenre] = useState([]);
  const [topRated, setTopRated] = useState([]);


  useEffect(() => {
    const fetchAPI = async () => {
      setNowPlaying(await fetchMovies());
      setMovieByGenre(await fetchMovieByGenre(28));
      setTopRated(await fetchTopratedMovie());
    };

    fetchAPI();
  }, []);

  

  const movies = nowPlaying.slice(0, 6).map((item, index) => {
    return (
      <div style={{ height: 400, width: "100%" }} key={index}>
        <Link to={`/movie/${item.id}`}>
        <div className="carousel-center">
          <img style={{ height: 500 }} src={item.backPoster} alt={item.title} />
        </div>
          </Link>
        <div
          className="carousel-caption"
          style={{ textAlign: "center", fontSize: 35 }}
        >
          {item.title}
        </div>
      </div>
    );
  });




  

  const movieList = movieByGenre.slice(0, 4).map((item, index) => {
    return (
      <div className="col-md-3 col-sm-6 card-content" key={index}>
        <div className="card">
          <Link to={`/movie/${item.id}`}>
            <img className="img-fluid" src={item.poster} alt={item.title}></img>
          </Link>
        </div>

       
        
        <div className="puntuacion">
          <p >{item.title}</p>
          <p>Calificación: {item.rating}</p>
          <ReactStars 
            count={item.rating}
            size={20}
            color1={"#f4c10f"}
          ></ReactStars>
        </div>
      </div>
    );
  });



  const topRatedList = topRated.slice(0, 4).map((item, index) => {
    return (
      <div className="col-md-3 col-sm-6 card-content" key={index}>
        <div className="card">
          <Link to={`/movie/${item.id}`}>
            <img className="img-fluid" src={item.poster} alt={item.title}></img>
          </Link>
        </div>
        <div className="puntuacion">
          <p style={{ fontWeight: "bolder" }}>{item.title}</p>
          <p>Calificacion: {item.rating}</p>
          <ReactStars
            count={item.rating}
            size={20}
            color1={"#f4c10f"}
          ></ReactStars>
        </div>
      </div>
    );
  });



  return (
    <div className="container">
       <div>
      <Link to={`/`}>
          <button>Ir a Home</button>
          </Link>
      </div>
      <div>
      <Link to={`/tendencia`}>
          <button>Ir a Tendencia</button>
          </Link>
      </div>
      <div>
      <Link to={`/generos`}>
          <button>Ir a Generos</button>
          </Link>
      </div>

      <div className="row mt-2">
        <div className="col">
          <RBCarousel
            autoplay={true}
            pauseOnVisibility={true}
            slidesshowSpeed={5000}
            version={4}
            indicators={false}
          >
            {movies}
          </RBCarousel>
        </div>
      </div>

<br />

      <div className="title">
        <div>
          <p>
          LISTA DE PELÍCULAS
          </p>
        </div>
      </div>

      <div className="row mt-3">{movieList}</div>


      <div className="title">
        <div>
          <p>
          PELÍCULAS MEJOR CLASIFICADAS
          </p>
        </div>
      </div>

      <div className="row mt-3">{topRatedList}</div>

      <hr />



    </div>
  );
}