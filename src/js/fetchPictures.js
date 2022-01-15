import axios from 'axios';

export default function getPixabayPics() {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '21994966-77efd84e81d037cb6b64d4ef6';
  const PARAMS = `key=${API_KEY}&q=cat&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`
  return fetch(`${BASE_URL}?${PARAMS}`)
    .then(res => res.json())
};

// getPixabayPics();

// ${ data }
// &page=${page}
