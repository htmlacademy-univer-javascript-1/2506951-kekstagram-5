import { debounce, DEBOUNCE_DELAY } from './util.js';

const RANDOM_PHOTOS_COUNT = 10;

const imgFilters = document.querySelector('.img-filters');
const filterButtons = imgFilters.querySelectorAll('.img-filters__button');

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
  // Показать фильтры
  imgFilters.classList.remove('img-filters--inactive');

  // Переменная для хранения последнего выбранного фильтра
  let lastFilterId = 'filter-default';

  // Отрисовка с устранением дребезга
  const debouncedRender = debounce(() => {
    clearPictures();

    let sortedPhotos = [];
    if (lastFilterId === 'filter-default') {
      sortedPhotos = getDefaultPhotos(photoData);
    } else if (lastFilterId === 'filter-random') {
      sortedPhotos = getRandomPhotos(photoData);
    } else if (lastFilterId === 'filter-discussed') {
      sortedPhotos = getDiscussedPhotos(photoData);
    }

    renderPictures(sortedPhotos);
  }, DEBOUNCE_DELAY);

  // Обработчики кликов на кнопках фильтров
  filterButtons.forEach((button) => {
    button.addEventListener('click', (evt) => {
      // Удалить активный класс у всех кнопок
      filterButtons.forEach((btn) => btn.classList.remove('img-filters__button--active'));

      // Добавить активный класс выбранной кнопке
      evt.target.classList.add('img-filters__button--active');

      // Запомнить последний выбранный фильтр
      lastFilterId = evt.target.id;

      // Запустить отрисовку (с дебаунсом)
      debouncedRender();
    });
  });
};

export { setupFilters };
