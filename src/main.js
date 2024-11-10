import { fetchImages } from './js/pixabay-api';
import { renderImages, showNoResultsMessage, showEndOfResultsMessage } from './js/render-functions';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.querySelector('.search-form');
const galleryContainer = document.querySelector('.gallery-list');
const loadMoreButton = document.querySelector('.load-more'); 
const perPage = 15;
let currentPage = 1;
let currentQuery = '';
let totalHits = 0;
let lightbox = new SimpleLightbox('.gallery-list a');

loadMoreButton.style.display = 'none';

const showLoader = () => {
  const loader = document.querySelector('.loader');
  if (loader) loader.classList.add('show');
};

const hideLoader = () => {
  const loader = document.querySelector('.loader');
  if (loader) loader.classList.remove('show');
};

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  galleryContainer.innerHTML = '';
  loadMoreButton.style.display = 'none';
  currentQuery = event.currentTarget.elements.search.value.trim();
  currentPage = 1;

  if (currentQuery === '') {
    showNoResultsMessage();
    return;
  }

  await loadImages(); 
});

loadMoreButton.addEventListener('click', async () => {
  currentPage += 1;
  await loadImages();
});

async function loadImages() {
  showLoader();
  try {
    const { hits, totalHits: fetchedTotalHits } = await fetchImages(currentQuery, currentPage, perPage);
    hideLoader();

    if (currentPage === 1) totalHits = fetchedTotalHits;

    if (hits.length === 0) {
      showNoResultsMessage();
      loadMoreButton.style.display = 'none'; 
    } else {
      renderImages(hits, galleryContainer);
      lightbox.refresh();

      
      if (currentPage > 1) {
        smoothScroll();
      }

      if (currentPage * perPage >= totalHits) {
        loadMoreButton.style.display = 'none';
        showEndOfResultsMessage();
      } else {
        loadMoreButton.style.display = 'block'; 
      }
    }
  } catch (error) {
    hideLoader();
    console.error('Error processing images:', error);
    iziToast.error({ title: 'Error', message: 'Failed to load images' });
  }
}

function smoothScroll() {
  const cardHeight = document.querySelector('.gallery-item').getBoundingClientRect().height;
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

