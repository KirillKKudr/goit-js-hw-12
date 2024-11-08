import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


export const showNoResultsMessage = () => {
  iziToast.info({
    title: 'No Results',
    message: 'Sorry, there are no images matching your search query. Please try again!'
  });
};


export const renderImages = (images, container) => {
  const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
    return `
      <li class="gallery-item">
        <a href="${largeImageURL}">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        </a>
        <div class="info">
          <p><b>Likes:</b> ${likes}</p>
          <p><b>Views:</b> ${views}</p>
          <p><b>Comments:</b> ${comments}</p>
          <p><b>Downloads:</b> ${downloads}</p>
        </div>
      </li>
    `;
  }).join('');
  container.innerHTML = markup;  
};

