import { arrayObjects } from './data.js';
import { renderFullsizePhoto } from './fullsizePhoto.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.getElementById('picture').content;

const renderPictures = (photoData) => {
  const fragment = document.createDocumentFragment();

  photoData.forEach((photo) => {
    const pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = photo.url;
    pictureElement.querySelector('.picture__img').alt = photo.description;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;

    // Открытие полноразмерного изображения при клике
    pictureElement.querySelector('.picture').addEventListener('click', () => {
      renderFullsizePhoto(photo);
    });

    fragment.appendChild(pictureElement);
  });

  picturesContainer.appendChild(fragment);
};

const generatedPhotos = arrayObjects(25);
renderPictures(generatedPhotos);
