import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const API_KEY = '21994966-77efd84e81d037cb6b64d4ef6';
const BASE_URL = 'https://pixabay.com/api/'


export default class ImagesApiFetch {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }
    
    fetchPixabayImages() {
        // console.log(this);
        const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`

        return fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.totalHits === 0) {
                    Notify.failure('Sorry, there are no images matching your search query. Please try again.');
                    return;
                }
                if (data.totalHits > 0) {
                    Notify.success(`Hooray! We found ${data.totalHits} images.`);
                    this.incrementPage();
                    return data;
                }
            });
                // console.log(data)
                // this.incrementPage();
                // // console.log(data.totalHits);
                // return data;
            // });
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