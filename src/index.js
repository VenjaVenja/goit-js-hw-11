import './sass/main.scss';
import './style.css'
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import getPixabayPics from './js/fetchPictures';
import gallaryMarkup from './handelbars/gallaryMarkup.hbs'


const searchBoxEl = document.querySelector('#search-form');
// const loadeMoreEl = document.querySelector('.load-more');
// const searchField = document.querySelector('#search-form input');
const galleryEl = document.querySelector('.gallery');

// loadeMoreEl.disabled = true;

// let formAsk = null;

searchBoxEl.addEventListener('submit', onFormSubmit);

let searchingData = "";
let page = 0;
let totalHits = 0;

function onFormSubmit(event) {
    event.preventDefault();

    searchingData = event.currentTarget.searchQuery.value;
    page = 1;
    if (searchingData.trim() === '') {
        Notify.failure('Please enter your search data.');
        return;
    };
}

getPixabayPics(searchingData, page)
    .then(res => {
        if (res.totalHits === 0) {
            galleryEl.innerHTML = '';
            Notify.failure('Sorry, there are no images matching your search query. Please try again!');
        }
        if (res.totalHits > 0) {
            Notify.info(`Hooray! We found ${response.totalHits} images`);
            galleryEl.innerHTML = '';
            renderCard(res.hits);
        }
    });


function renderCard(array){
 const cardMarkup = array.map(item => gallaryMarkup(item)).join('');
 refs.gallery.insertAdjacentHTML('beforeend', cardMarkup);
lightbox();
}
function lightbox(){
    let lightbox = new SimpleLightbox('.gallery a', { 
        captions: true,
        captionsData: 'alt',
        captionPosition: 'bottom',
        captionDelay: 250,
    });
    lightbox.refresh();
}
// searchBoxEl.addEventListener('submit', onFormSubmit);

// function onInputChange(event) {
//     let formAsk = searchBoxEl.value;
//     console.log(searchBoxEl.value);
// };
   

    // console.dir(FormData)
// }
