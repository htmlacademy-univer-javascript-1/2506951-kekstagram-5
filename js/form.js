import {pristine, form, hashtagsInput, descriptionInput, isEscapeKey} from './util.js';
import { sendData } from './api.js';
import { showMessage } from './message.js';


// Масштаб изображения
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const SCALE_STEP = 25;

// Ссылки на элементы
const uploadInput = document.querySelector('.img-upload__input');
const submitButton = document.querySelector('#upload-submit');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const uploadCancelButton = document.querySelector('.img-upload__cancel');
const imgPreview = document.querySelector('.img-upload__preview img');
const scaleValueField = document.querySelector('.scale__control--value');
const scaleSmallerButton = document.querySelector('.scale__control--smaller');
const scaleBiggerButton = document.querySelector('.scale__control--bigger');
const effectLevel = document.querySelector('.effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectRadioButtons = document.querySelectorAll('.effects__radio');
const sliderElement = document.querySelector('.effect-level__slider');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

// Обновление эффекта изображения
const updateImageEffect = (effect, value) => {
  switch (effect) {
    case 'chrome':
      imgPreview.style.filter = `grayscale(${value})`;
      break;
    case 'sepia':
      imgPreview.style.filter = `sepia(${value})`;
      break;
    case 'marvin':
      imgPreview.style.filter = `invert(${value}%)`;
      break;
    case 'phobos':
      imgPreview.style.filter = `blur(${value}px)`;
      break;
    case 'heat':
      imgPreview.style.filter = `brightness(${value})`;
      break;
    default:
      imgPreview.style.filter = '';
  }
};

// Настройка параметров слайдера в зависимости от эффекта
const setSliderOptions = (effect) => {
  let range;
  let start;

  switch (effect) {
    case 'chrome':
    case 'sepia':
      range = { min: 0, max: 1 };
      start = 1;
      break;
    case 'marvin':
      range = { min: 0, max: 100 };
      start = 100;
      break;
    case 'phobos':
      range = { min: 0, max: 3 };
      start = 3;
      break;
    case 'heat':
      range = { min: 1, max: 3 };
      start = 3;
      break;
    default:
      range = { min: 0, max: 0 };
      start = 0;
  }

  noUiSlider.create(sliderElement, {
    start: [start],
    connect: [true, false],
    range: range,
    step: 0.1
  });

  sliderElement.noUiSlider.on('update', (values) => {
    effectLevelValue.value = values[0];
    updateImageEffect(effect, values[0]);
  });
};

// Функция для переключения эффекта
const onEffectChange = (evt) => {
  const effect = evt.target.value;

  // Удаление старого слайдера, если он существует
  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.destroy();
  }

  if (effect === 'none') {
    imgPreview.style.filter = '';
    effectLevel.classList.add('hidden');
  } else {
    effectLevel.classList.remove('hidden');

    // Настройка нового слайдера в зависимости от эффекта
    setSliderOptions(effect);

    // Установка начального значения для текущего эффекта
    let initialValue;
    switch (effect) {
      case 'marvin':
        initialValue = 100; // Максимум для эффекта "Марвин"
        break;
      case 'phobos':
      case 'heat':
        initialValue = 3; // Максимум для эффектов "Фобос" и "Зной"
        break;
      default:
        initialValue = 1; // Для "Хром" и "Сепия"
    }

    effectLevelValue.value = initialValue;
    sliderElement.noUiSlider.set(initialValue); // Сбрасываем слайдер на начальное значение
    updateImageEffect(effect, initialValue);
  }
};

// Функция для возврата формы в исходное состояние
const resetFormState = () => {
  pristine.reset(); // Сбрасываем ошибки валидации
  document.querySelector('.effects__radio[value="none"]').checked = true;
  hashtagsInput.value = ''; // Очистка поля
  descriptionInput.value = '';
  imgPreview.style.filter = '';
  imgPreview.style.transform = 'scale(1)';
  scaleValueField.value = '100%';
  effectLevel.classList.add('hidden');
};

// Открытие формы редактирования
const openUploadForm = () => {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  resetFormState(); // Сбрасываем форму при открытии // Скрываем слайдер для дефолтного эффекта
};

uploadInput.addEventListener('change', () => {
  const file = uploadInput.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      imgPreview.src = event.target.result;
    };

    reader.readAsDataURL(file);
    submitButton.disabled = false;
  }

  openUploadForm();
});

// Функция закрытия формы редактирования
const closeUploadForm = () => {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  // Сброс значения поля выбора файла
  uploadInput.value = '';

  // Сброс других полей формы
  imgPreview.style.filter = '';
  scaleValueField.value = '100%';
  imgPreview.style.transform = 'scale(1)';
  document.querySelector('.effects__radio[value="none"]').checked = true;
  effectLevel.classList.add('hidden'); // Скрываем слайдер для дефолтного эффекта
  submitButton.disabled = false;
  hashtagsInput.value = ''; // Очистка поля
  descriptionInput.value = '';
  pristine.reset(); // Сброс всех ошибок
  pristine.validate(); // Повторная валидация
};

// Обработчик события для выбора файла
uploadInput.addEventListener('change', () => {
  openUploadForm();
});

// Обработчик события для кнопки закрытия формы
uploadCancelButton.addEventListener('click', closeUploadForm);

// Обработчик события для клавиши Esc
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    closeUploadForm();
  }
});

const onScaleChange = (value) => {
  imgPreview.style.transform = `scale(${value / 100})`;
  scaleValueField.value = `${value}%`;
};

scaleSmallerButton.addEventListener('click', () => {
  let scaleValue = parseInt(scaleValueField.value, 10);
  scaleValue -= SCALE_STEP;
  if (scaleValue < MIN_SCALE) {
    scaleValue = MIN_SCALE;
  }
  onScaleChange(scaleValue);
});

scaleBiggerButton.addEventListener('click', () => {
  let scaleValue = parseInt(scaleValueField.value, 10);
  scaleValue += SCALE_STEP;
  if (scaleValue > MAX_SCALE) {
    scaleValue = MAX_SCALE;
  }
  onScaleChange(scaleValue);
});

// Изначально установим эффект «Оригинал»
document.querySelector('.effects__radio[value="none"]').checked = true;
imgPreview.style.filter = ''; // Убираем фильтры
effectLevel.classList.add('hidden'); // Скрываем слайдер для дефолтного эффекта

effectRadioButtons.forEach((button) => {
  button.addEventListener('change', onEffectChange);
});

// Обработка отправки формы
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Отключаем стандартное поведение отправки формы

  if (pristine.validate()) { // Проверка валидности формы
    const formData = new FormData(form); // Сбор данных формы
    submitButton.disabled = true; // Блокируем кнопку отправки
    sendData(formData)
      .then(() => {
        closeUploadForm(); // Закрытие формы
        showMessage(successTemplate); // Успех
      })
      .catch(() => {
        showMessage(errorTemplate); // Ошибка
      })
      .finally(() => {
        submitButton.disabled = false; // Разблокируем кнопку
      });
  }
});

// Обработка кнопки сброса формы
const resetButton = document.querySelector('.img-upload__cancel');
resetButton.addEventListener('click', (evt) => {
  evt.preventDefault(); // Предотвращаем стандартное поведение кнопки сброса
  closeUploadForm(); // Закрываем и сбрасываем форму
});

// Обработка кнопки закрытия
uploadCancelButton.addEventListener('click', closeUploadForm);

// Обработка клавиши Escape
document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt) && !uploadOverlay.classList.contains('hidden')) {
    closeUploadForm();
  }
});
