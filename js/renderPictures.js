import { renderFullsizePhoto } from './fullsizePhoto.js';
import { getData } from './api.js';
import { showErrorModal } from './message.js';
import { setupFilters } from './sort.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.getElementById('picture').content;

// Функция для очистки контейнера с миниатюрами
const clearPictures = () => {
  picturesContainer.querySelectorAll('.picture').forEach((picture) => picture.remove());
};

// Функция для отрисовки миниатюр
const renderPictures = (photoData) => {
  const fragment = document.createDocumentFragment();

  photoData.forEach((photo) => {
    const pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = photo.url;
    pictureElement.querySelector('.picture__img').alt = photo.description;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;

    pictureElement.querySelector('.picture').addEventListener('click', () => {
      renderFullsizePhoto(photo);
    });

    fragment.appendChild(pictureElement);
  });

  picturesContainer.appendChild(fragment);
};

// Основная функция для загрузки и отрисовки данных
const initializeGallery = async () => {
  try {
    const photoData = await getData();
    renderPictures(photoData);

    // Настройка фильтров через модуль sort.js
    setupFilters(photoData, renderPictures, clearPictures);
  } catch (error) {
    showErrorModal();
  }
};

export { initializeGallery };
