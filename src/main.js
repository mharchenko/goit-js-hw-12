//import { fetchImages, resetPage, getCurrentPage } from './js/pixabay-api.js';
// import { renderImages, clearGallery } from './js/render-functions.js';
// import iziToast from 'izitoast';
// import 'izitoast/dist/css/iziToast.min.css';
// import 'loaders.css/loaders.css';

// const searchForm = document.querySelector('#search-form');
// const loader = document.querySelector('.loader');
// const loadMoreButton = document.querySelector('.load-more');

// let currentQuery = '';
// let isLoading = false;
// let totalHits = 0;
// let throttleTimeout = null;

// function showLoader() {
//   loader.classList.remove('hidden');
// }

// function hideLoader() {
//   loader.classList.add('hidden');
// }

// function showLoadMoreButton() {
//   loadMoreButton.classList.remove('hidden');
// }

// function hideLoadMoreButton() {
//   loadMoreButton.classList.add('hidden');
// }

// async function loadImages() {
//   if (isLoading) return;
//   isLoading = true;
//   showLoader();

//   try {
//     const { images, totalHits: newTotalHits } = await fetchImages(currentQuery);
//     hideLoader();
//     isLoading = false;

//     if (newTotalHits !== undefined) {
//       totalHits = newTotalHits;
//     }

//     if (images.length === 0 || getCurrentPage() * 15 >= totalHits) {
//       hideLoadMoreButton();
//       iziToast.info({
//         title: 'Info',
//         message: "We're sorry, but you've reached the end of search results.",
//       });
//     } else {
//       renderImages(images);

//       if (getCurrentPage() * 15 < totalHits) {
//         showLoadMoreButton();
//       } else {
//         hideLoadMoreButton();
//       }
//     }
//   } catch (error) {
//     hideLoader();
//     isLoading = false;
//     iziToast.error({
//       title: 'Error',
//       message: 'Something went wrong. Please try again later!',
//     });
//   }
// }
// function handleScroll() {
//   if (throttleTimeout) return;

//   throttleTimeout = setTimeout(() => {
//     throttleTimeout = null;

//     if (
//       window.innerHeight + window.scrollY >=
//         document.documentElement.scrollHeight - 100 &&
//       !isLoading
//     ) {
//       loadImages();
//     }
//   }, 2000);
// }
// searchForm.addEventListener('submit', async event => {
//   event.preventDefault();
//   const query = event.currentTarget.elements.query.value.trim();

//   if (!query) {
//     iziToast.error({ title: 'Error', message: 'Please enter a search term!' });
//     return;
//   }

//   currentQuery = query;
//   clearGallery();
//   resetPage();
//   hideLoadMoreButton();
//   showLoader();

//   try {
//     const { images, totalHits: newTotalHits } = await fetchImages(currentQuery);
//     hideLoader();

//     if (newTotalHits !== undefined) {
//       totalHits = newTotalHits;
//     }

//     if (images.length === 0) {
//       iziToast.info({
//         title: 'Info',
//         message:
//           'Sorry, there are no images matching your search query. Please try again!',
//       });
//     } else {
//       renderImages(images);

//       if (images.length < totalHits) {
//         showLoadMoreButton();
//       }
//     }
//   } catch (error) {
//     hideLoader();
//     iziToast.error({
//       title: 'Error',
//       message: 'Something went wrong. Please try again later!',
//     });
//   }
// });
// loadMoreButton.addEventListener('click', loadImages);
// window.addEventListener('scroll', handleScroll);

// -----------------------зміни-------------------------------

import { fetchImages, resetPage, getCurrentPage } from './js/pixabay-api.js';
import { renderImages, clearGallery } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import 'loaders.css/loaders.css';

const searchForm = document.querySelector('#search-form');
const loader = document.querySelector('.loader');
const loadMoreButton = document.querySelector('.load-more');

let currentQuery = '';
let totalHits = 0;
let isFirstLoad = true;

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

async function onLoadMore() {
  loadMoreButton.disabled = true;

  try {
    const { images, totalHits: newTotalHits } = await fetchImages(currentQuery);

    if (newTotalHits !== undefined) {
      totalHits = newTotalHits;
    }

    renderImages(images);

    if (getCurrentPage() * 15 >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      showLoadMoreButton();
    }

    const card = document.querySelector('.gallery .gallery__item');
    if (card) {
      const cardHeight = card.getBoundingClientRect().height;
      window.scrollBy({
        left: 0,
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later!',
    });
  } finally {
    loadMoreButton.disabled = false;
  }
}

function scrollOnLoad() {
  if (isFirstLoad) {
    const cardGallery = document.querySelector('.gallery');
    if (cardGallery) {
      const cardGalleryHeight = cardGallery.getBoundingClientRect().height;
      window.scrollBy({
        top: cardGalleryHeight * 2,
        behavior: 'smooth',
      });
      isFirstLoad = false;
    }
  }
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
      scrollOnLoad();
    }
  } catch (error) {
    hideLoader();
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later!',
    });
  }
});

loadMoreButton.addEventListener('click', onLoadMore);

// ---------------infinite scroll-------------------------------

// import { fetchImages, resetPage, getCurrentPage } from './js/pixabay-api.js';
// import { renderImages, clearGallery } from './js/render-functions.js';
// import iziToast from 'izitoast';
// import 'izitoast/dist/css/iziToast.min.css';
// import 'loaders.css/loaders.css';

// const searchForm = document.querySelector('#search-form');
// const loader = document.querySelector('.loader');
// const sentinel = document.createElement('div');
// sentinel.classList.add('sentinel');
// document.querySelector('main').appendChild(sentinel);

// let currentQuery = '';
// let totalHits = 0;

// function showLoader() {
//   loader.classList.remove('hidden');
// }

// function hideLoader() {
//   loader.classList.add('hidden');
// }

// async function loadImages() {
//   try {
//     const { images, totalHits: newTotalHits } = await fetchImages(currentQuery);

//     if (newTotalHits !== undefined) {
//       totalHits = newTotalHits;
//     }

//     renderImages(images);

//     if (getCurrentPage() * 15 >= totalHits) {
//       observer.unobserve(sentinel);
//       iziToast.info({
//         title: 'Info',
//         message: "We're sorry, but you've reached the end of search results.",
//       });
//     } else {
//       const card = document.querySelector('.gallery .gallery__item');
//       if (card) {
//         const cardHeight = card.getBoundingClientRect().height;
//         window.scrollBy({
//           left: 0,
//           top: cardHeight * 2,
//           behavior: 'smooth',
//         });
//       }
//     }
//   } catch (error) {
//     iziToast.error({
//       title: 'Error',
//       message: 'Something went wrong. Please try again later!',
//     });
//   }
// }

// function handlePagination(entries, observer) {
//   entries.forEach(entry => {
//     if (entry.isIntersecting) {
//       loadImages();
//     }
//   });
// }

// const observer = new IntersectionObserver(handlePagination, {
//   root: null,
//   rootMargin: '300px',
//   threshold: 0,
// });

// searchForm.addEventListener('submit', async event => {
//   event.preventDefault();
//   const query = event.currentTarget.elements.query.value.trim();

//   if (!query) {
//     iziToast.error({ title: 'Error', message: 'Please enter a search term!' });
//     return;
//   }

//   currentQuery = query;
//   clearGallery();
//   resetPage();
//   hideLoader();
//   showLoader();

//   try {
//     const { images, totalHits: newTotalHits } = await fetchImages(currentQuery);
//     hideLoader();

//     if (newTotalHits !== undefined) {
//       totalHits = newTotalHits;
//     }

//     if (images.length === 0) {
//       iziToast.info({
//         title: 'Info',
//         message:
//           'Sorry, there are no images matching your search query. Please try again!',
//       });
//     } else {
//       renderImages(images);
//       observer.observe(sentinel);
//     }
//   } catch (error) {
//     hideLoader();
//     iziToast.error({
//       title: 'Error',
//       message: 'Something went wrong. Please try again later!',
//     });
//   }
// });
