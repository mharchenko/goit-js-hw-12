import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryElement = document.querySelector('.gallery');

export function clearGallery() {
  galleryElement.innerHTML = '';
}

export function renderImages(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <a href="${largeImageURL}" class="gallery__item">
        <img class="gallery-link" src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
          <p class="text-item"><b>Likes:</b> ${likes}</p>
          <p class="text-item"><b>Views:</b> ${views}</p>
          <p class="text-item"><b>Comments:</b> ${comments}</p>
          <p class="text-item"><b>Downloads:</b> ${downloads}</p>
        </div>
      </a>
    `
    )
    .join('');

  galleryElement.insertAdjacentHTML('beforeend', markup);
  new SimpleLightbox('.gallery a').refresh();
}
