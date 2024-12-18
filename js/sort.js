import { debounce } from './util.js';

const RANDOM_PHOTOS_COUNT = 10;
const DEBOUNCE_DELAY = 500;

// Сортировка по умолчанию
const getDefaultPhotos = (photos) => photos;

// Сортировка случайных фотографий
const getRandomPhotos = (photos) => {
  const shuffled = photos.slice().sort(() => Math.random() - 0.5);
  return shuffled.slice(0, RANDOM_PHOTOS_COUNT);
};

// Сортировка по количеству комментариев
const getDiscussedPhotos = (photos) => photos.slice().sort((a, b) => b.comments.length - a.comments.length);

// Настройка фильтров
const setupFilters = (photoData, renderPictures, clearPictures) => {
  const imgFilters = document.querySelector('.img-filters');
  const filterButtons = imgFilters.querySelectorAll('.img-filters__button');

  // Показать фильтры
  imgFilters.classList.remove('img-filters--inactive');

  // Добавить обработчики фильтров
  filterButtons.forEach((button) => {
    button.addEventListener(
      'click',
      debounce((evt) => {
        filterButtons.forEach((btn) => btn.classList.remove('img-filters__button--active'));
        evt.target.classList.add('img-filters__button--active');

        clearPictures();

        let sortedPhotos = [];
        if (evt.target.id === 'filter-default') {
          sortedPhotos = getDefaultPhotos(photoData);
        } else if (evt.target.id === 'filter-random') {
          sortedPhotos = getRandomPhotos(photoData);
        } else if (evt.target.id === 'filter-discussed') {
          sortedPhotos = getDiscussedPhotos(photoData);
        }

        renderPictures(sortedPhotos);
      }, DEBOUNCE_DELAY)
    );
  });
};

export{ setupFilters };
