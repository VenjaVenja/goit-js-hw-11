import './sass/main.scss';
import ImagesApiFetch from './js/fetch-api-server'
// import './style.css'
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import galleryTpl from './templates/gallaryMarkup.hbs';
import scroll from './js/smooth-scroll';
import LoadMoreBtn from './js/load-more-btn';


const refs = {
    searchForm: document.querySelector('#search-form'),
    galleryWrap: document.querySelector('.gallery'),
    messageEl: document.querySelector('.end-collection-message')
    // loadMoreBtn: document.querySelector('.load-more')
};

refs.messageEl.classList.add('is-hidden');

const loadMoreBtn = new LoadMoreBtn({
    selector: '.load-more',
    hidden: true,
});

const imagesApiFetch = new ImagesApiFetch();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

console.log(loadMoreBtn)

// ====================================onSearch========================================

function onSearch(event) {
    event.preventDefault();

    cleargalleryMarkup();

    imagesApiFetch.query = event.currentTarget.elements.searchQuery.value;

    if (imagesApiFetch.query.trim() === '') {
        Notify.warning('Rereject can`t be empty. Please enter the word!');
        return;
    }

    loadMoreBtn.show();
    loadMoreBtn.disable();
    // loadMoreBtn.enable();
    imagesApiFetch.resetPage();
    imagesApiFetch.fetchPixabayImages().then(data => {
            
            if (data.totalHits === 0) {
                Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            }
            if (data.totalHits > 0) {
                Notify.success(`Hooray! We found ${data.totalHits} images.`);

                appendgalleryMarkup(data.hits);
                loadMoreBtn.enable();
        };
        });
    
};

// ====================================onLoadMore========================================

function onLoadMore() {
    imagesApiFetch.incrementPage();
    imagesApiFetch.fetchPixabayImages()
        .then(data => {
            appendgalleryMarkup(data.hits);
            scroll()
        
            if (data.hits.length < 40) {
                Notify.warning("We're sorry, but you've reached the end of search results.");
                refs.messageEl.classList.remove('is-hidden');
                loadMoreBtn.hide()
            }
        })
};

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
