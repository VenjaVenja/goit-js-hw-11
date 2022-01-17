import axios from 'axios';

const API_KEY = '21994966-77efd84e81d037cb6b64d4ef6';
const BASE_URL = 'https://pixabay.com/api/'


export default class ImagesApiFetch {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }
    
    async fetchPixabayImages() {
        const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`

        const response = await axios.get(url);
        const data = await (response.data);
        return data;
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQwery) {
        this.searchQuery = newQwery;
    }
};