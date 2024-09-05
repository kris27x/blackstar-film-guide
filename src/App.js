import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import FilmList from './components/FilmList';
import FilmDetail from './components/FilmDetail';
import SearchBar from './components/SearchBar';
import { fetchFilms, fetchTags } from './services/api';

function App() {
  const [films, setFilms] = useState([]);
  const [tags, setTags] = useState([]);
  const [filteredFilms, setFilteredFilms] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch films and tags on component mount
  useEffect(() => {
    const loadFilmsAndTags = async () => {
      try {
        setLoading(true);
        const filmsData = await fetchFilms();
        const tagsData = await fetchTags();
        setFilms(filmsData);
        setTags(tagsData);
        setFilteredFilms(filmsData); // Set all films initially
        setLoading(false);
      } catch (err) {
        console.error("Error loading films or tags:", err);
        setError(err);
        setLoading(false);
      }
    };

    loadFilmsAndTags();
  }, []);

  // Filter films by selected tag
  const handleTagFilter = (tag) => {
    setSelectedTag(tag);
    if (tag) {
      setFilteredFilms(films.filter(film => film.tags.includes(tag.id)));
    } else {
      setFilteredFilms(films); // Reset to all films
    }
  };

  // Conditional rendering based on loading and error states
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <Router>
      <div className="App">
        <Header />
        <SearchBar tags={tags} onTagFilter={handleTagFilter} selectedTag={selectedTag} />
        <Routes>
          <Route path="/film/:id" element={<FilmDetail films={films} />} />
          <Route path="/" element={<FilmList films={filteredFilms} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
