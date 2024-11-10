
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

export const showNoResultsMessage = () => {
  iziToast.info({
    title: 'No Results',
    message: 'Sorry, there are no images matching your search query. Please try again!'
  });
};

export const showEndOfResultsMessage = () => {
  iziToast.info({
    title: 'End of Results',
    message: "We're sorry, but you've reached the end of search results."
  });
};

export const renderImages = (images, container) => {
  const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
    return `
      <li class="gallery-item">
        <a href="${largeImageURL}">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" width="360" height="200" />
        </a>
        <div class="info">
          <p class="info-text"><b>Likes:</b> ${likes}</p>
          <p class="info-text"><b>Views:</b> ${views}</p>
          <p class="info-text"><b>Comments:</b> ${comments}</p>
          <p class="info-text"><b>Downloads:</b> ${downloads}</p>
        </div>
      </li>
    `;
  }).join('');
  container.insertAdjacentHTML('beforeend', markup);
};


