import { fetchImages } from './js/pixabay-api';
import { renderImages, showNoResultsMessage } from './js/render-functions';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.search-form');
const galleryContainer = document.querySelector('.gallery-list');
const perPage = 12;
let currentPage = 1;
let lightbox = new SimpleLightbox('.gallery-list a');


const showLoader = () => {
  const loader = document.querySelector('.loader');
  if (loader) loader.classList.add('show');
};

const hideLoader = () => {
  const loader = document.querySelector('.loader');
  if (loader) loader.classList.remove('show');
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const query = event.currentTarget.elements.search.value.trim();

  if (query === '') {
    showNoResultsMessage();
    return;
  }

  showLoader(); 
  galleryContainer.innerHTML = ''; 

  fetchImages(query, currentPage, perPage)
    .then(images => {
      hideLoader(); 
      if (images.length === 0) {
        showNoResultsMessage();
      } else {
        renderImages(images, galleryContainer);
        lightbox.refresh(); 
      }
      form.reset(); 
    })
    .catch(error => {
      hideLoader(); 
      console.error('Error processing images:', error);
      iziToast.error({ title: 'Error', message: 'Failed to load images' });
    });
});
