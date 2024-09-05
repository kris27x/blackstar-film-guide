import React from 'react';
import { Link } from 'react-router-dom';
import './FilmList.css';

const FilmList = ({ films }) => {
  return (
    <div className="film-list-container">
      <h1 className="film-list-title">Films A-Z</h1>
      <div className="film-grid">
        {films.map(film => (
          <div key={film.id} className="film-card">
            <Link to={`/film/${film.id}`} className="film-card-link">
              <img
                src={film.thumbnail_url}
                alt={film.title.rendered || 'Film Thumbnail'}
                className="film-thumbnail"
              />
              <div className="film-details">
                <h2 className="film-title">{film.title.rendered}</h2>
                <p className="film-meta">{film.runtime} minutes • {film.genre}</p>
                <div className="film-buttons">
                  <button className="btn btn-primary">Read More</button>
                  <button className="btn btn-secondary">Watch Trailer</button>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <button className="load-more">Load more</button>
    </div>
  );
};

export default FilmList;