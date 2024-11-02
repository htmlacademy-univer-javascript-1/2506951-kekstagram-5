const bigPictureContainer = document.querySelector('.big-picture');
const bigPictureImage = bigPictureContainer.querySelector('.big-picture__img img');
const likesCount = bigPictureContainer.querySelector('.likes-count');
const commentsCount = bigPictureContainer.querySelector('.comments-count');
const socialComments = bigPictureContainer.querySelector('.social__comments');
const socialCaption = bigPictureContainer.querySelector('.social__caption');
const commentCountBlock = bigPictureContainer.querySelector('.social__comment-count');
const commentsLoader = bigPictureContainer.querySelector('.comments-loader');
const closeButton = bigPictureContainer.querySelector('.big-picture__cancel');

// Функция для отрисовки полноразмерного изображения
const renderFullsizePhoto = ({ url, likes, comments, description }) => {
  bigPictureImage.src = url;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  socialCaption.textContent = description;

  // Очистка и добавление комментариев
  socialComments.innerHTML = '';
  comments.forEach(({ avatar, message, name }) => {
    const commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');
    commentElement.innerHTML = `
      <img class="social__picture" src="${avatar}" alt="${name}" width="35" height="35">
      <p class="social__text">${message}</p>
    `;
    socialComments.appendChild(commentElement);
  });

  // Скрытие ненужных элементов
  commentCountBlock.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  document.body.classList.add('modal-open');
  bigPictureContainer.classList.remove('hidden');
};

// Закрытие окна
const closeFullsizePhoto = () => {
  bigPictureContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

// Обработчик закрытия по кнопке и по ESC
closeButton.addEventListener('click', closeFullsizePhoto);
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    closeFullsizePhoto();
  }
});

export { renderFullsizePhoto };
