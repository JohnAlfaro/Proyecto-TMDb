import React, { useState, useEffect } from "react";
import {
  fetchGenre,
  fetchMovieByGenre,
} from "../../service";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

export function Generos() {
  const [genres, setGenres] = useState([]);
  const [movieByGenre, setMovieByGenre] = useState([]);


  useEffect(() => {
    const fetchAPI = async () => {
      setGenres(await fetchGenre());
      setMovieByGenre(await fetchMovieByGenre(28));
    };

    fetchAPI();
  }, []);

  const handleGenreClick = async (genre_id) => {
    setMovieByGenre(await fetchMovieByGenre(genre_id));
  };

 




  const genreList = genres.map((item, index) => {
    return (
      <li className="list-inline-item" key={index}>
        <button
          type="button"
          className="btn btn-outline-info"
          onClick={() => {
            handleGenreClick(item.id);
          }}
        >
          {item.name}
        </button>
      </li>
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
      
      <br />
      
      <div className="genreList">
        <div className="col">
          <ul>{genreList}</ul>
        </div>
      </div>

      <div className="title">
        <div>
          <p>
          LISTA DE PELÍCULAS
          </p>
        </div>
      </div>

      <div className="row mt-3">{movieList}</div>

    



    </div>
  );
}