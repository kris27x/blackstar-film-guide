import React from 'react';
import './SearchBar.css';

const SearchBar = ({ tags, onTagFilter, selectedTag }) => {
  const handleTagClick = (tag) => {
    onTagFilter(tag);
  };

  const clearFilter = () => {
    onTagFilter(null); // Reset to show all films
  };

  return (
    <div className="search-bar">
      <div className="tag-list">
        <button onClick={clearFilter} className={`tag-button ${!selectedTag ? 'active' : ''}`}>
          All
        </button>
        {tags.map((tag) => (
          <button
            key={tag.id}
            onClick={() => handleTagClick(tag)}
            className={`tag-button ${selectedTag?.id === tag.id ? 'active' : ''}`}
          >
            {tag.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;