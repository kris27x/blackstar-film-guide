import React from 'react';
import { useParams } from 'react-router-dom';
import './FilmDetail.css';

const FilmDetail = ({ films }) => {
  const { id } = useParams();
  const film = films.find(film => film.id === parseInt(id));

  if (!film) {
    return <div className="film-detail">Film not found.</div>;
  }

  return (
    <div className="film-detail">
      <div className="film-detail-header">
        <h1>{film.title.rendered}</h1>
        <img src={film.thumbnail_url} alt={film.title.rendered} className="film-detail-image" />
      </div>
      <div className="film-detail-info">
        <p><strong>Genre:</strong> {film.genre || 'N/A'}</p>
        <p><strong>Year:</strong> {film.year || 'N/A'}</p>
        <p><strong>Description:</strong> <span dangerouslySetInnerHTML={{ __html: film.content.rendered }} /></p>
        <p><strong>Director:</strong> {film.director || 'N/A'}</p>
        {film.trailer_url && (
          <p><strong>Watch Trailer:</strong> <a href={film.trailer_url} target="_blank" rel="noopener noreferrer">Click here</a></p>
        )}
      </div>
    </div>
  );
};

export default FilmDetail;