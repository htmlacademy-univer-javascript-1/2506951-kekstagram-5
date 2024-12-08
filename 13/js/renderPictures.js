import { renderFullsizePhoto } from './fullsizePhoto.js';
import { getData } from './api.js'; // Подключаем модуль для работы с API
import { showErrorModal } from './message.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.getElementById('picture').content;

// Функция для отрисовки миниатюр
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

// Основная функция для загрузки и отрисовки данных
export const initializeGallery = async () => {
  try {
    const photoData = await getData(); // Используем getData из API модуля
    renderPictures(photoData);
  } catch (error) {
    showErrorModal();// Логируем ошибку для отладки
    // Здесь можно вызвать функцию отображения модального окна ошибки
  }
};
