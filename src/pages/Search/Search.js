import React, { useState } from "react";
import "./Search.css";

export const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="search-page">
      <div className="search-container">
        <form className="search-form" onSubmit={handleSearchSubmit}>
          <div className="search-input-wrapper">
            <input
              type="text"
              className="search-input"
              placeholder="Введіть назву страви або напою..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button type="submit" className="search-button">
              <svg
                className="search-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </form>

        {searchQuery && (
          <div className="search-results">
            <h2 className="search-results-title">
              Результати пошуку для: "{searchQuery}"
            </h2>
            <div className="search-results-content">
              <p className="search-no-results">
                Функція пошуку буде реалізована пізніше
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
