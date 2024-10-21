// Генерация случайного числа в диапазоне от min до max
export const generationInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
