import { generationInt } from './util.js';

const WORDS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = ['Артём', 'Иван', 'Мария', 'Екатерина', 'Дмитрий', 'Ольга', 'Сергей', 'Наталья', 'Алексей', 'Юлия', 'Александра'];

// Генерация одного комментария
export const generateComment = () => ({
  id: generationInt(1, 1000),
  avatar: `img/avatar-${generationInt(1, 6)}.svg`,
  message: WORDS[generationInt(0, WORDS.length - 1)],
  name: NAMES[generationInt(0, NAMES.length - 1)],
});

// Генерация одной фотографии
export const generatePhoto = () => ({
  id: generationInt(1, 25),
  url: `photos/${generationInt(1, 25)}.jpg`,
  description: 'Описание объекта',
  likes: generationInt(15, 200),
  comments: Array.from({ length: generationInt(0, 30) }, generateComment)
});

// Создание массива объектов фотографий
export const arrayObjects = (quantityObjects) => Array.from({ length: quantityObjects }, generatePhoto);
