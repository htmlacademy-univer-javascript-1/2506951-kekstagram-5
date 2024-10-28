import { arrayObjects } from './data.js';

const picturesContainer = document.querySelector('.pictures'); // Находим контейнер для фотографий
const pictureTemplate = document.getElementById('picture').content; // Получаем шаблон

// Функция для отрисовки миниатюр
const renderPictures = (photoData) => {
  const fragment = document.createDocumentFragment();

  photoData.forEach(({ url, description, likes, comments }) => {
    const pictureElement = pictureTemplate.cloneNode(true); // Клонируем шаблон

    // Заполняем данные в шаблоне
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;

    fragment.appendChild(pictureElement); // Добавляем элемент в фрагмент
  });

  picturesContainer.appendChild(fragment); // Вставляем все элементы в контейнер
};

// Генерируем массив фотографий и вызываем функцию отрисовки
const generatedPhotos = arrayObjects(25); // Генерация 25 объектов фотографий
renderPictures(generatedPhotos); // Вызов функции отрисовки
