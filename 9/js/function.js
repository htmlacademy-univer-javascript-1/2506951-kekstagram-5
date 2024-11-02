// Функция для преобразования времени (часы:минуты) в минуты с начала дня
const convertTimeToMinutes = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

// Основная функция для проверки времени встречи
const isMeetingInWorkHours = (workStart, workEnd, meetingStart, meetingDuration) => {
  const workStartMinutes = convertTimeToMinutes(workStart);
  const workEndMinutes = convertTimeToMinutes(workEnd);
  const meetingStartMinutes = convertTimeToMinutes(meetingStart);
  const meetingEndMinutes = meetingStartMinutes + meetingDuration;

  // Проверяем, помещается ли встреча в рабочие часы
  return meetingStartMinutes >= workStartMinutes && meetingEndMinutes <= workEndMinutes;
};

// Пример использования
isMeetingInWorkHours('9:00', '18:00', '10:30', 60); // true
isMeetingInWorkHours('9:00', '18:00', '17:30', 60); // false

