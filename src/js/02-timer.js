'use strict';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const inputFlatpickr = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const timerChange = document.querySelector('.timer');
const daysTimer = document.querySelector('[data-days]');
const hoursTimer = document.querySelector('[data-hours]');
const minutesTimer = document.querySelector('[data-minutes]');
const secondsTimer = document.querySelector('[data-seconds]');

let timerId = 1;

/*flatpickr*/
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

flatpickr(inputFlatpickr, options);

/*event for button start */
startBtn.addEventListener('click', () => {
  const selectedDate = new Date(inputFlatpickr.value);
  if (selectedDate < new Date()) {
    window.alert('Please choose a date in the future');
    return;
  }

  timerId = setInterval(() => {
    const remainingTime = selectedDate - new Date();
    if (remainingTime <= 0) {
      clearInterval(timerId);
    } else {
      const countdown = convertMs(remainingTime);
      daysTimer.textContent = addLeadingZero(countdown.days);
      hoursTimer.textContent = addLeadingZero(countdown.hours);
      minutesTimer.textContent = addLeadingZero(countdown.minutes);
      secondsTimer.textContent = addLeadingZero(countdown.seconds);
    }
  }, 1000);
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(timeUnit) {
  return timeUnit.toString().padStart(2, '0');
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
