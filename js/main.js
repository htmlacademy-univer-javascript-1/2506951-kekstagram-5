// Массивы для имен и комментариев
const WORDS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = ['Артём', 'Иван', 'Мария', 'Екатерина', 'Дмитрий', 'Ольга', 'Сергей', 'Наталья', 'Алексей', 'Юлия', 'Александра'];

// Генерация случайного числа в диапазоне от min до max
const generationInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Генерация одного комментария
const generateComment = () => ({
  id: generationInt(1, 1000), // maxId - допустим, максимум 1000
  avatar: `img/avatar-${generationInt(1, 6)}.svg`, // maxAvatar - всего 6 аватарок
  message: WORDS[generationInt(0, WORDS.length - 1)],
  name: NAMES[generationInt(0, NAMES.length - 1)],
});

// Генерация одной фотографии
const generatePhoto = () => ({
  id: generationInt(1, 25), // maxId - допустим, максимум 25 фотографий
  url: `photos/${generationInt(1, 25)}.jpg`, // maxUrl - всего 25 фотографий
  description: 'Описание объекта', // Пример описания
  likes: generationInt(15, 200), // Случайное количество лайков
  comments: Array.from({ length: generationInt(0, 30) }, generateComment) // Случайное количество комментариев
});

// Создание массива объектов фотографий
const arrayObjects = (quantityObjects) => Array.from({ length: quantityObjects }, generatePhoto);

// Генерация массива из 25 объектов
arrayObjects(25);
