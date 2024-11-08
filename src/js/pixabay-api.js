import axios from 'axios';

const API_KEY = '46807099-cbb80e6feaa2f2d0498acb57e';
const BASE_URL = 'https://pixabay.com/api/';

let page = 1;
let query = '';

export async function fetchImages(searchQuery) {
  query = searchQuery;
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true&per_page=15&page=${page}`;

  try {
    const response = await axios.get(url);
    page++;
    return {
      images: response.data.hits,
      totalHits: response.data.totalHits,
    };
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}

export function resetPage() {
  page = 1;
}

export function getCurrentPage() {
  return page;
}
