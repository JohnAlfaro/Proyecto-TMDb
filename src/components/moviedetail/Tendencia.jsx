import React, { useState, useEffect } from "react";
import {
  fetchMovies,
  fetchGenre,
  fetchMovieByGenre,
  fetchTopratedMovie,
} from "../../service";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

export function Tendencia() {
  const [topRated, setTopRated] = useState([]);


  useEffect(() => {
    const fetchAPI = async () => {
      setTopRated(await fetchTopratedMovie());
    };

    fetchAPI();
  }, []);

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
      
      <br />
      


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