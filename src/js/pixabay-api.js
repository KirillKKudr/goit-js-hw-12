import axios from 'axios';

const API_KEY = '46859410-d5a1b7b8d3c8579cf11d58e8b';
const BASE_URL = 'https://pixabay.com/api/';

export function fetchImages(query, page = 1, perPage = 12) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

  return axios.get(url)
    .then(response => response.data.hits)  
    .catch(error => {
      console.error('Error fetching images:', error);
      throw error;
    });
}