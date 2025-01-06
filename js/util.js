const HASH_LENGTH = 20;
const HASH_AMOUNT = 5;
const DESCRIPTION_LENGTH = 140;
const DEBOUNCE_DELAY = 500;
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const form = document.querySelector('.img-upload__form');
const hashtagsInput = form.querySelector('.text__hashtags');
const descriptionInput = form.querySelector('.text__description');

// Функция закрытия полноразмерного фото
const closeFullsizePhoto = (bigPictureContainer, body) => {
  bigPictureContainer.classList.add('hidden');
  body.classList.remove('modal-open');
};


const isEscapeKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

// Функция добавления обработчиков закрытия окна
const setupPhotoCloseHandlers = (bigPictureContainer, closeButton, body) => {
  const handlePhotoClose = () => closeFullsizePhoto(bigPictureContainer, body);

  closeButton.addEventListener('click', handlePhotoClose);
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      handlePhotoClose();
    }
  });
};

// Инициализация Pristine
const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'has-error',
  successClass: 'has-success',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p',
  errorTextClass: 'form-error'
});

// Функция для разделения строки на очищенные хэштеги
const parseHashtags = (value) =>
  value
    .split(/\s+/) // Разделение по пробелам
    .filter(Boolean) // Убираем пустые элементы
    .map((hashtag) => hashtag.trim()); // Убираем пробелы в начале и конце

// Функция проверки на невалидный хэштег
const isInvalidHashtag = (hash) => {
  const rules = [
    (hashtag) => hashtag.startsWith('#'), // Начинается с #
    (hashtag) => hashtag.length > 1, // Не только #
    (hashtag) => /^[a-zA-Z0-9]+$/.test(hashtag.slice(1)), // Состоит из букв и цифр
    (hashtag) => hashtag.length <= HASH_LENGTH, // Максимальная длина 20 символов
  ];
  return !rules.every((rule) => rule(hash));
};

// Функция проверки на количество хэштегов
const isExceedingHashtagsCount = (hashtags) => hashtags.length > HASH_AMOUNT;

// Функция проверки на уникальность хэштегов
const hasDuplicateHashtags = (hashtags) => {
  const uniqueHashtags = new Set(hashtags.map((tag) => tag.toLowerCase()));
  return uniqueHashtags.size !== hashtags.length;
};

// Валидация: есть ли невалидные хэштеги
const validateInvalidHashtag = (value) => {
  if (!value) {
    return true;
  } // Пустая строка валидна
  const hashtags = parseHashtags(value);
  return !hashtags.some(isInvalidHashtag); // Возвращает true, если все хэштеги валидны
};

// Валидация: количество хэштегов
const validateHashtagCount = (value) => {
  if (!value) {
    return true;
  } // Пустая строка валидна
  const hashtags = parseHashtags(value);
  return !isExceedingHashtagsCount(hashtags);
};

// Валидация: уникальность хэштегов
const validateUniqueHashtags = (value) => {
  if (!value) {
    return true;
  } // Пустая строка валидна
  const hashtags = parseHashtags(value);
  return !hasDuplicateHashtags(hashtags);
};

// Валидация комментария
const validateDescriptionLength = (value) => value.length <= DESCRIPTION_LENGTH;

// Регистрация валидаторов в Pristine
pristine.addValidator(
  hashtagsInput,
  validateInvalidHashtag,
  'Введён невалидный хэш-тег. Убедитесь, что хэштеги начинаются с #, содержат только буквы и цифры, и длина не превышает 20 символов.'
);

pristine.addValidator(
  hashtagsInput,
  validateHashtagCount,
  'Превышено количество хэш-тегов. Максимум 5 хэштегов.'
);

pristine.addValidator(
  hashtagsInput,
  validateUniqueHashtags,
  'Хэштеги не должны повторяться.'
);

pristine.addValidator(
  descriptionInput,
  validateDescriptionLength,
  'Комментарий не может превышать 140 символов.'
);

// Функция для включения/отключения кнопки
const toggleSubmitButton = () => {
  const submitButton = document.querySelector('.img-upload__submit');
  const isValid = pristine.validate(); // Проверка всех валидаторов
  submitButton.disabled = !isValid;
};

// Обработчики ввода для динамической проверки
hashtagsInput.addEventListener('input', toggleSubmitButton);
descriptionInput.addEventListener('input', toggleSubmitButton);
form.addEventListener('input', toggleSubmitButton);


// Отключение закрытия формы при нажатии на Esc в полях ввода
[hashtagsInput, descriptionInput].forEach((input) => {
  input.addEventListener('keydown', (evt) => {
    if (isEscapeKey) {
      evt.stopPropagation();
    }
  });
});

const debounce = (callback, timeoutDelay = DEBOUNCE_DELAY) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { closeFullsizePhoto, isEscapeKey, setupPhotoCloseHandlers, form, hashtagsInput, descriptionInput, FILE_TYPES, pristine, debounce, DEBOUNCE_DELAY };
