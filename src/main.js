import { fetchImages, resetPage, getCurrentPage } from './js/pixabay-api.js';
import { renderImages, clearGallery } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import 'loaders.css/loaders.css';

const searchForm = document.querySelector('#search-form');
const loader = document.querySelector('.loader');
const loadMoreButton = document.querySelector('.load-more');

let currentQuery = '';
let isLoading = false;
let totalHits = 0;
let throttleTimeout = null;

function showLoader() {
  loader.classList.remove('hidden');
}

function hideLoader() {
  loader.classList.add('hidden');
}

function showLoadMoreButton() {
  loadMoreButton.classList.remove('hidden');
}

function hideLoadMoreButton() {
  loadMoreButton.classList.add('hidden');
}

async function loadImages() {
  if (isLoading) return;
  isLoading = true;
  showLoader();

  try {
    const { images, totalHits: newTotalHits } = await fetchImages(currentQuery);
    hideLoader();
    isLoading = false;

    if (newTotalHits !== undefined) {
      totalHits = newTotalHits;
    }

    if (images.length === 0 || getCurrentPage() * 15 >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      renderImages(images);

      if (getCurrentPage() * 15 < totalHits) {
        showLoadMoreButton();
      } else {
        hideLoadMoreButton();
      }
    }
  } catch (error) {
    hideLoader();
    isLoading = false;
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later!',
    });
  }
}
function handleScroll() {
  if (throttleTimeout) return;

  throttleTimeout = setTimeout(() => {
    throttleTimeout = null;

    if (
      window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100 &&
      !isLoading
    ) {
      loadImages();
    }
  }, 2000);
}
searchForm.addEventListener('submit', async event => {
  event.preventDefault();
  const query = event.currentTarget.elements.query.value.trim();

  if (!query) {
    iziToast.error({ title: 'Error', message: 'Please enter a search term!' });
    return;
  }

  currentQuery = query;
  clearGallery();
  resetPage();
  hideLoadMoreButton();
  showLoader();

  try {
    const { images, totalHits: newTotalHits } = await fetchImages(currentQuery);
    hideLoader();

    if (newTotalHits !== undefined) {
      totalHits = newTotalHits;
    }

    if (images.length === 0) {
      iziToast.info({
        title: 'Info',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    } else {
      renderImages(images);

      if (images.length < totalHits) {
        showLoadMoreButton();
      }
    }
  } catch (error) {
    hideLoader();
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later!',
    });
  }
});
loadMoreButton.addEventListener('click', loadImages);
window.addEventListener('scroll', handleScroll);
