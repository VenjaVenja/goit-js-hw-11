import './sass/main.scss';
import ImagesApiFetch from './js/fetch-api-server'
import './style.css'
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import getPixabayPics from './js/fetch-api-server';
import galleryTpl from './templates/gallaryMarkup.hbs'
// import { Notify } from 'notiflix';


const refs = {
    searchForm: document.querySelector('#search-form'),
    galleryWrap: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more')
};

const imagesApiFetch = new ImagesApiFetch();

// console.log(imagesApiFetch);

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);


function onSearch(event) {
    event.preventDefault();

    cleargalleryMarkup();
    imagesApiFetch.query = event.currentTarget.elements.searchQuery.value;

    if (imagesApiFetch.query.trim() === '') {
        Notify.warning('Rereject can`t be empty. Please enter the word!');
        return;
    }

    imagesApiFetch.resetPage();
    imagesApiFetch.fetchPixabayImages()
        .then(appendgalleryMarkup);

};

function onLoadMore() {
    imagesApiFetch.fetchPixabayImages()
        .then(appendgalleryMarkup);
};

function appendgalleryMarkup({ hits, totalHits }) {
    if (totalHits === 0) {
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        return;
    }
    if (totalHits > 0) {
        Notify.success(`Hooray! We found ${totalHits} images.`);
        refs.galleryWrap.insertAdjacentHTML('beforeend', galleryTpl(hits));
    }
    
}

function cleargalleryMarkup() {
    refs.galleryWrap.innerHTML = '';
}

// let lightBox = new SimpleLightbox('.gallery a', {
//     captionsData:"alt",
//     captionDelay:250,
//     navText:['←','→'],
//     captionPosition:'bottom',
// });

// function totalHitsWarning({ totalHits }) {
//     if (totalHits === 0) {
//         Notify.warning('Nothing was fiend!');
//         return;
//     }
//     if (totalHits > 0) {
//         Notify.info(`COOL! We fiend ${totalHits}`);
//     }
// };



































// searchBoxEl.addEventListener('submit', onFormSubmit);

// let searchingData = "";
// let page = 0;
// let totalHits = 0;

// function onFormSubmit(event) {
//     event.preventDefault();

//     searchingData = event.currentTarget.searchQuery.value;
//     page = 1;
//     if (searchingData.trim() === '') {
//         Notify.failure('Please enter your search data.');
//         return;
//     };
// }

// getPixabayPics(searchingData, page)
//     .then(res => {
//         if (res.totalHits === 0) {
//             galleryEl.innerHTML = '';
//             Notify.failure('Sorry, there are no images matching your search query. Please try again!');
//         }
//         if (res.totalHits > 0) {
//             Notify.info(`Hooray! We found ${response.totalHits} images`);
//             galleryEl.innerHTML = '';
//             renderCard(res.hits);
//         }
//     });


// function renderCard(array){
//  const cardMarkup = array.map(item => gallaryMarkup(item)).join('');
//  refs.gallery.insertAdjacentHTML('beforeend', cardMarkup);
// lightbox();
// }
// function lightbox(){
//     let lightbox = new SimpleLightbox('.gallery a', { 
//         captions: true,
//         captionsData: 'alt',
//         captionPosition: 'bottom',
//         captionDelay: 250,
//     });
//     lightbox.refresh();
// }
