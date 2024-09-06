import React from 'react';
import { useParams } from 'react-router-dom';
import './FilmDetail.css';

const FilmDetail = ({ films }) => {
  const { id } = useParams();
  const film = films.find(film => film.id === parseInt(id));

  if (!film) {
    return <div className="film-detail">Film not found.</div>;
  }

  // Extract the image URL from the cover_image HTML string if it's not null
  const getImageSrc = (film) => {
    const coverImageTag = film.acf?.cover_image;
    const imageSrc = coverImageTag?.match(/src="([^"]+)"/)?.[1]; // Extract the src value from the cover_image string
    return imageSrc || 'default-image-url.jpg'; // Provide a fallback if the image isn't found
  };

  // Extract the director, genre, and year from the film's ACF fields
  const director = film.acf?.credits?.find(credit => credit.type === "Director")?.name || 'N/A';
  
  const year = 2024; 
  
  const genre = film.eventive_tag?.map(tag => tag.name).join(', ') || 'N/A'; 

  return (
    <div className="film-detail">
      <div className="film-detail-header">
        <h1>{film.title.rendered}</h1>
        <img src={getImageSrc(film)} alt={film.title.rendered} className="film-detail-image" />
      </div>
      <div className="film-detail-info">
        <p><strong>Genre:</strong> {genre}</p>
        <p><strong>Year:</strong> {year}</p>
        <p><strong>Description:</strong> <span dangerouslySetInnerHTML={{ __html: film.content.rendered }} /></p>
        <p><strong>Director:</strong> {director}</p>
        
        {/* Updated to link trailer instead of embedding it */}
        {film.acf.trailer_url && (
          <div className="film-trailer">
            <h2>Watch Trailer:</h2>
            <a href={film.acf.trailer_url} target="_blank" rel="noopener noreferrer">
              Click here! <span role="img" aria-label="popcorn emoji">🍿</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilmDetail;