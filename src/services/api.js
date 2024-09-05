import axios from 'axios';

const API_BASE_URL = 'https://wp.blackstarfest.org/wp-json/wp/v2';
const YEAR = 2024; // Define a constant for the year filter

/**
 * Fetches films from the API.
 * @param {number} perPage - The number of films to fetch per page.
 * @param {number} page - The page number to fetch.
 * @param {Array} tags - (Optional) Array of tag IDs for filtering films.
 * @returns {Promise<Array>} - A promise that resolves to an array of films.
 */
export const fetchFilms = async (perPage = 9, page = 1, tags = []) => {
  const params = {
    per_page: perPage,
    page,
    _year: YEAR,
    rich: 1,
    not_hidden: 1,
  };

  if (tags.length) {
    params['eventive-tag'] = tags.join(',');
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/festival-film`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching films:', error);
    throw error; // Re-throw to handle in the calling function
  }
};

/**
 * Fetches all available tags from the API.
 * @returns {Promise<Array>} - A promise that resolves to an array of tags.
 */
export const fetchTags = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/eventive-tag`, {
      params: { per_page: 99, _year: YEAR },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching tags:', error);
    throw error;
  }
};