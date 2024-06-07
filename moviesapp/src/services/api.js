// Author - Sandeep Guggilla

/**
 * Fetches movies from the TMDB API based on the specified filter.
 * @param {string} filterBy - The filter to apply to the movie search.
 * @returns {Promise} A promise that resolves to the movie data.
 */
import axios from "axios";
import { TMDB_BASE_URL, API_TOKEN } from "../configs/apiConfig";

export const fetchMovies = async (filterBy) => {
  try {
    const result = await axios.get(`${TMDB_BASE_URL}/movie/${filterBy}`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
    return result.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}; 

export const fetchPersons = async (id) => {
  try {
    const result = await axios.get(`${TMDB_BASE_URL}/persons/${id}`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
    return result.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchSearchResults = async (filterBy, query) => {
  try {
    const result = await axios.get(
      `${TMDB_BASE_URL}/search/${filterBy}?query="${encodeURI(query)}"`,
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      }
    );
    return result.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchTVShows = async (filterBy) => {
  try {
    const result = await axios.get(`${TMDB_BASE_URL}/tv/${filterBy}`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
    return result.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
