import React from 'react';
import { Link } from 'react-router-dom';
import './FilmList.css';

const FilmList = ({ films }) => {
  const getImageSrc = (film) => {
    // Extract the 'src' from the 'acf.cover_image' if it's an HTML tag
    const coverImageTag = film.acf?.cover_image;
    const imageSrc = coverImageTag?.match(/src="([^"]+)"/)?.[1]; // Extract the src value
    return imageSrc || 'default-image-url.jpg'; // Fallback image if no cover image found
  };

  return (
    <div className="film-list-container">
      <h1 className="film-list-title">Films A-Z</h1>
      <div className="film-grid">
        {films.map(film => (
          <div key={film.id} className="film-card">
            <Link to={`/film/${film.id}`} className="film-card-link">
              <img
                src={getImageSrc(film)} // Use the helper function to get the image source
                alt={film.title.rendered || 'Film Thumbnail'}
                className="film-thumbnail"
              />
              <div className="film-details">
                <h2 className="film-title">{film.title.rendered}</h2>
                <p className="film-meta">{film.acf.runtime || 'N/A'} minutes • {film.acf.genre || 'Genre'}</p>
                <div className="film-buttons">
                  <button className="btn btn-primary">Read More</button>
                  {film.acf.trailer_url && (
                    <button className="btn btn-secondary">
                      <a href={film.acf.trailer_url} target="_blank" rel="noopener noreferrer">Watch Trailer</a>
                    </button>
                  )}
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