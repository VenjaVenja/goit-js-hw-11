import './sass/main.scss';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ImagesApiFetch from './js/fetch-api-server'
import galleryTpl from './templates/gallaryMarkup.hbs';
import LoadMoreBtn from './js/load-more-btn';
import scroll from './js/smooth-scroll';


const refs = {
    searchForm: document.querySelector('#search-form'),
    galleryWrap: document.querySelector('.gallery'),
    messageEl: document.querySelector('.end-collection-message')
};

refs.messageEl.classList.add('is-hidden');

const loadMoreBtn = new LoadMoreBtn({
    selector: '.load-more',
    hidden: true,
});

const imagesApiFetch = new ImagesApiFetch();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

// ====================================onSearch========================================

async function onSearch(event) {
    event.preventDefault();

    cleargalleryMarkup();

    imagesApiFetch.query = event.currentTarget.elements.searchQuery.value;

    if (imagesApiFetch.query.trim() === '') {
        Notify.warning('Rereject can`t be empty. Please enter the word!');
        return;
    }

    loadMoreBtn.show();
    loadMoreBtn.disable();
    imagesApiFetch.resetPage();

    try {
        const data = await imagesApiFetch.fetchPixabayImages();

        if (data.totalHits === 0) {
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        }

        if (data.totalHits > 0) {
            Notify.success(`Hooray! We found ${data.totalHits} images.`);

            appendgalleryMarkup(data.hits);
            loadMoreBtn.enable();
        }
    }
    catch (error) {
        console.log(error);
    }
};

// ====================================onLoadMore========================================

async function onLoadMore() {

    imagesApiFetch.incrementPage();
    
    try {
        const data = await imagesApiFetch.fetchPixabayImages();
        appendgalleryMarkup(data.hits);
        scroll()
        
        if (data.hits.length < 40) {
            Notify.warning("We're sorry, but you've reached the end of search results.");
            refs.messageEl.classList.remove('is-hidden');
            loadMoreBtn.hide()
        };

    } catch (error) {
        console.log(error)
    }
}

// ====================================appendgalleryMarkup=&=cleargalleryMarkup========================================

function cleargalleryMarkup() {
    refs.galleryWrap.innerHTML = '';
}

function appendgalleryMarkup(hits) {
    refs.galleryWrap.insertAdjacentHTML('beforeend', galleryTpl(hits));
    lightnBox();
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
