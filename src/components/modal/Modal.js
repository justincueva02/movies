import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { BsXCircle } from "react-icons/bs";
import { Oval } from "react-loader-spinner";

import useFetch from "../../hooks/useFetch";
import "../../styles/Modal/Modal.css";
import "../../styles/Modal/Overlay.css";

const Modal = () => {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const { error, isLoading, movieData } = useFetch(
    `https://imdb-api.com/en/API/Wikipedia/k_yg2kd715/${movieId}`
  );

  return ReactDOM.createPortal(
    <React.Fragment>
      <div className="overlay" onClick={() => navigate("/")} />
      <div className="modal">
        <div className="container--relative">
          <span className="modal__icon--X" onClick={() => navigate("/")}>
            <BsXCircle />
          </span>
          {isLoading && (
            <div className="loading-spinner--modal">
              <Oval height="100" width="100" color="#fff" ariaLabel="loading" />
            </div>
          )}
          {error && (
            <React.Fragment>
              <label className="error-label">Error</label>
              <p className="modal-error">{error.message}</p>
            </React.Fragment>
          )}
          {movieData && (
            <React.Fragment>
              <h2 className="heading--modal">
                <span>{movieData.title}</span>
                <span className="heading--year">{movieData.year}</span>
              </h2>
              <p className="movie-plot">{movieData.plot}</p>
            </React.Fragment>
          )}
        </div>
      </div>
    </React.Fragment>,
    document.querySelector("#modal")
  );
};

const mapStateToProps = (state) => {
  return { movieModal: state.movieModal };
};

export default connect(mapStateToProps)(Modal);
