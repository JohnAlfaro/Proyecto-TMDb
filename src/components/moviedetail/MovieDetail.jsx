import React, { useState, useEffect } from "react";
import {
  fetchMovieDetail,
  fetchMovieVideos,
  fetchCasts,
} from "../../service";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import { Modal } from "react-bootstrap";
import ReactPlayer from "react-player";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

export function MovieDetail({ match }) {
  let params = match.params;
  let genres = [];
  const [isOpen, setIsOpen] = useState(false);
  const [detail, setDetail] = useState([]);
  const [video, setVideo] = useState([]);
  const [casts, setCasts] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setDetail(await fetchMovieDetail(params.id));
      setVideo(await fetchMovieVideos(params.id));
      setCasts(await fetchCasts(params.id));
    };

    fetchAPI();
  }, [params.id]);

  genres = detail.genres;

  const MoviePalyerModal = (props) => {
    const youtubeUrl = "https://www.youtube.com/watch?v=";
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >

        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{ color: "#000000", fontWeight: "bolder" }}
          >
            {detail.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#000000" }}>
          <ReactPlayer
            className="container-fluid"
            url={youtubeUrl + video.key}
            playing
            width="100%"
          ></ReactPlayer>
        </Modal.Body>
      </Modal>
    );
  };

  let genresList;
  if (genres) {
    genresList = genres.map((g, i) => {
      return (
        <li className="list-inline-item" key={i}>
          <p type="text" className="">
            {g.name} . 
            </p>
        </li>
      );
    });
  }

  const castList = casts.slice(0, 4).map((c, i) => {
    return (
      <div className="col-md-3 text-center" key={i}>
        <img
          className="img-fluid rounded-circle mx-auto d-block"
          src={c.img}
          alt={c.name}
        ></img>
        <p className="font-weight-bold text-center">{c.name}</p>
        <p
          className="font-weight-light text-center"
          style={{ color: "#000000" }}
        >
          {c.character}
        </p>
      </div>
    );
  });

  




  return (
    <div className="container">
      <div className="row mt-2">
        <MoviePalyerModal
          show={isOpen}
          onHide={() => {
            setIsOpen(false);
          }}
        ></MoviePalyerModal>
        <div className="col text-center" style={{ width: "60%" , height: "40%" }}>
          <img
            className="img-fluid"
            src={`http://image.tmdb.org/t/p/original/${detail.backdrop_path}`}
            alt={detail.title}
          ></img>
          <div className="carousel-center">
            <i
              onClick={() => setIsOpen(true)}
              className="far fa-play-circle"
              style={{ fontSize: 95, color: "#f4c10f", cursor: "pointer" }}
            ></i>
          </div>
          <div
            className="carousel-caption"
            style={{ textAlign: "center", fontSize: 35 }}
          >
            {detail.title}
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <p style={{ color: "#000000", fontWeight: "bolder" }}>GENERO</p>
          <ul className="list-inline-1">{genresList}</ul>
        </div>
      </div>

      

      <div className="row mt-3">
        <div className="col">
          <div className="text-center">
            <ReactStars
              count={detail.vote_average}
              size={20}
              color1={"#f4c10f"}
            ></ReactStars>
          </div>
          <div className="mt-3">
            <p style={{ color: "#000000", fontWeight: "bolder" }}>SINOPSIS</p>
            {detail.overview}
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-3">
          <p style={{ color: "#000000", fontWeight: "bolder" }}>FECHA DE SALIDA</p>
          <p style={{ color: "#f4c10f" }}>{detail.release_date}</p>
        </div>
        <div className="col-md-3">
          <p style={{ color: "#000000", fontWeight: "bolder" }}>DURACION</p>
          <p style={{ color: "#f4c10f" }}>{detail.runtime} minutes</p>
        </div>
        <div className="col-md-3">
          <p style={{ color: "#000000", fontWeight: "bolder" }}>PRESUPUESTO</p>
          <p style={{ color: "#f4c10f" }}>$ {detail.budget}</p>
        </div>
       
      </div>

      <div className="row mt-3">
        <div className="col">
          <p style={{ color: "#5a606b", fontWeight: "bolder" }}>CASTS</p>
        </div>
      </div>
      <div className="row mt-3">{castList}</div>


      <hr className="mt-5" style={{ borderTop: "1px solid #5a606b" }}></hr>

      <div className="row mt-3 mb-5">
        <div className="col-md-8 col-sm-6" style={{ color: "#5a606b" }}>
          
        </div>
      </div>
    </div>
  );
}