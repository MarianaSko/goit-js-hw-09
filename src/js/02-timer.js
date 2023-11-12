import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('[data-start]');

startBtn.disabled = true;
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    refs: {
        days: document.querySelector('[data-days'),
        hours: document.querySelector('[data-hours]'),
        minutes: document.querySelector('[data-minutes]'),
        seconds: document.querySelector('[data-seconds]')
    },

    onClose(selectedDates) {
        const deadline = selectedDates[0];

        if (deadline < Date.now()) {
            return Notify.failure('Please choose a date in the future');
        }

        startBtn.disabled = false;

        startBtn.addEventListener('click', () => {
            startBtn.disabled = true;

            const intervalID = setInterval(() => {

                const diff = deadline - Date.now();

                if (diff < 0) {
                    clearInterval(intervalID);
                    return;
                }

                const { days, hours, minutes, seconds } = options.convertMs(diff);

                options.refs.days.textContent = options.addLeadingZero(days);
                options.refs.hours.textContent = options.addLeadingZero(hours);
                options.refs.minutes.textContent = options.addLeadingZero(minutes);
                options.refs.seconds.textContent = options.addLeadingZero(seconds);

            }, 1000)
        });


    },
    convertMs(ms) {
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
    },

    addLeadingZero(value) {
        return String(value).padStart(2, '0');
    }
};


flatpickr("#datetime-picker", options);

