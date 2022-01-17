import './sass/main.scss';
import ImagesApiFetch from './js/fetch-api-server'
import './style.css'
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import galleryTpl from './templates/gallaryMarkup.hbs';
import scroll from './js/smooth-scroll'


const refs = {
    searchForm: document.querySelector('#search-form'),
    galleryWrap: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more')
};

const imagesApiFetch = new ImagesApiFetch();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

// ====================================onSearch========================================

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

function cleargalleryMarkup() {
    refs.galleryWrap.innerHTML = '';
}

// ====================================onLoadMore========================================

function onLoadMore() {
    imagesApiFetch.fetchPixabayImages()
        .then(appendgalleryMarkup)
        .then(scroll);
};

function appendgalleryMarkup({ hits }) {
    
        refs.galleryWrap.insertAdjacentHTML('beforeend', galleryTpl(hits));
        lightnBox();


    // refs.galleryWrap.insertAdjacentHTML('beforeend', galleryTpl(hits));
    // lightnBox();
    
    if (hits < 40) {
        Notify.warning("We're sorry, but you've reached the end of search results.");
    }
}

// ====================================lightnBox========================================


function lightnBox() {
    let lightBox = new SimpleLightbox('.gallery a', {
    caption: true,
    captionsData:"alt",
    captionDelay:250,
    navText:['←','→'],
    captionPosition:'bottom',
    });

    lightBox.refresh();
};
