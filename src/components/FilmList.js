import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './FilmList.css';
import { fetchFilms } from '../services/api'; // Assuming this is your API fetch function

const FilmList = () => {
  const [films, setFilms] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // To track if there are more films to load

  useEffect(() => {
    // Fetch films on component mount and when the page changes
    const loadFilms = async () => {
      try {
        setLoading(true);
        const filmsData = await fetchFilms(9, page); // Fetch 9 films per page
        if (filmsData.length === 0) {
          setHasMore(false); // No more films to load
        } else {
          setFilms(prevFilms => [...prevFilms, ...filmsData]);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error loading films:', error);
        setLoading(false);
      }
    };

    loadFilms();
  }, [page]);

  const getImageSrc = (film) => {
    const coverImageTag = film.acf?.cover_image;
    const imageSrc = coverImageTag?.match(/src="([^"]+)"/)?.[1]; // Extract the src value
    return imageSrc || 'default-image-url.jpg'; // Fallback image if no cover image found
  };

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      setPage(prevPage => prevPage + 1); // Increase the page count to load more films
    }
  };

  return (
    <div className="film-list-container">
      <h1 className="film-list-title">Films A-Z</h1>
      <div className="film-grid">
        {films.map(film => (
          <div key={film.id} className="film-card">
            <Link to={`/film/${film.id}`} className="film-card-link">
              <img
                src={getImageSrc(film)}
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

      {loading && <p>Loading...</p>}

      {!loading && hasMore && (
        <button className="load-more" onClick={handleLoadMore}>
          Load more
        </button>
      )}

      {!hasMore && <p>No more films to load.</p>}
    </div>
  );
};

export default FilmList;