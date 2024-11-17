// Генерация случайного числа в диапазоне от min до max
export const generationInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Функция закрытия полноразмерного фото
export const closeFullsizePhoto = (bigPictureContainer, body) => {
  bigPictureContainer.classList.add('hidden');
  body.classList.remove('modal-open');
};

// Функция добавления обработчиков закрытия окна
export const setupPhotoCloseHandlers = (bigPictureContainer, closeButton, body) => {
  const handlePhotoClose = () => closeFullsizePhoto(bigPictureContainer, body);

  closeButton.addEventListener('click', handlePhotoClose);
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      handlePhotoClose();
    }
  });
};

export const handleHashtagInput = (hashtagsInput) => () => {
  const hashtags = hashtagsInput.value
    .toLowerCase()
    .trim()
    .split(/\s+/) // Разделение по пробелам
    .filter((tag) => tag); // Убираем пустые строки

  const errors = [];

  if (hashtags.length > 5) {
    errors.push('Нельзя указать больше пяти хэш-тегов.');
  }

  const uniqueHashtags = new Set(hashtags);

  if (uniqueHashtags.size !== hashtags.length) {
    errors.push('Один и тот же хэш-тег не может быть использован дважды.');
  }

  hashtags.forEach((tag) => {
    if (tag[0] !== '#') {
      errors.push(`Хэш-тег "${tag}" должен начинаться с символа #.`);
    } else if (tag.length === 1) {
      errors.push('Хэш-тег не может состоять только из одной решётки.');
    } else if (!/^#[a-zа-яё0-9]+$/i.test(tag)) {
      errors.push(`Хэш-тег "${tag}" содержит недопустимые символы.`);
    } else if (tag.length > 20) {
      errors.push('Максимальная длина одного хэш-тега — 20 символов, включая решётку.');
    }
  });

  if (errors.length > 0) {
    hashtagsInput.setCustomValidity(errors.join('\n'));
  } else {
    hashtagsInput.setCustomValidity('');
  }

  hashtagsInput.reportValidity();
};

export const preventFormClosureOnEsc = (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
};

export const handleCommentInput = (commentInput) => () => {
  const maxLength = 140;

  if (commentInput.value.length > maxLength) {
    commentInput.setCustomValidity(`Длина комментария не может превышать ${maxLength} символов.`);
  } else {
    commentInput.setCustomValidity('');
  }

  commentInput.reportValidity();
};
