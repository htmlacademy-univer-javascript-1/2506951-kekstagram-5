import { setupPhotoCloseHandlers } from './util.js';

const bigPictureContainer = document.querySelector('.big-picture');
const bigPictureImage = bigPictureContainer.querySelector('.big-picture__img img');
const likesCount = bigPictureContainer.querySelector('.likes-count');
const commentsCount = bigPictureContainer.querySelector('.comments-count');
const socialComments = bigPictureContainer.querySelector('.social__comments');
const socialCaption = bigPictureContainer.querySelector('.social__caption');
const commentCountBlock = bigPictureContainer.querySelector('.social__comment-count');
const commentsLoader = bigPictureContainer.querySelector('.comments-loader');
const closeButton = bigPictureContainer.querySelector('.big-picture__cancel');

// Установка обработчиков закрытия окна
setupPhotoCloseHandlers(bigPictureContainer, closeButton, document.body);

let commentsData = [];
let currentCommentsShown = 0;
const COMMENTS_PER_LOAD = 5;

// Функция для отрисовки комментариев
const renderComments = () => {
  const nextComments = commentsData.slice(currentCommentsShown, currentCommentsShown + COMMENTS_PER_LOAD);

  nextComments.forEach(({ avatar, message, name }) => {
    const commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');
    commentElement.innerHTML = `
      <img class="social__picture" src="${avatar}" alt="${name}" width="35" height="35">
      <p class="social__text">${message}</p>
    `;
    socialComments.appendChild(commentElement);
  });

  currentCommentsShown += nextComments.length; // Обновляем количество показанных комментариев
  commentCountBlock.textContent = `${currentCommentsShown} из ${commentsData.length} комментариев`; // Обновляем счетчик комментариев

  // Скрываем кнопку "Загрузить ещё", если все комментарии показаны
  if (currentCommentsShown >= commentsData.length) {
    commentsLoader.classList.add('hidden');
  }
};

// Функция для отрисовки полноразмерного изображения
const renderFullsizePhoto = ({ url, likes, comments, description }) => {
  bigPictureImage.src = url;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  socialCaption.textContent = description;

  // Сохранение данных комментариев
  commentsData = comments;
  currentCommentsShown = 0; // Сбрасываем количество показанных комментариев

  // Очистка и добавление первых 5 комментариев
  socialComments.innerHTML = '';
  renderComments();

  // Показываем блоки с количеством комментариев и кнопкой загрузки
  commentCountBlock.classList.remove('hidden');

  if (commentsData.length > 5) {
    commentsLoader.classList.remove('hidden');
  }
  document.body.classList.add('modal-open');

  bigPictureContainer.classList.remove('hidden');
};

// Обработчик загрузки дополнительных комментариев
commentsLoader.addEventListener('click', renderComments);

export { renderFullsizePhoto };
