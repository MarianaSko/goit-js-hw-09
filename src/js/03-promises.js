import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');

const delayEl = formEl.querySelector(('[name="delay"]'));
const stepEl = formEl.querySelector(('[name="step"]'));
const amountEl = formEl.querySelector(('[name="amount"]'));


formEl.addEventListener('submit', onFormElementSubmit);


function onFormElementSubmit(event) {
  event.preventDefault();

  if (delayEl.valueAsNumber < 0 || stepEl.valueAsNumber < 0 || amountEl.valueAsNumber <= 0) {
    Notify.warning('Please enter valid values!');
    return;
  }

  for (let i = 0; i < amountEl.valueAsNumber; i += 1) {
    formEl.lastElementChild.disabled = true;

    const promiseDelay = delayEl.valueAsNumber + i * stepEl.valueAsNumber;

    const promise = createPromise(i + 1, promiseDelay);

    promise.then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      })

  }

  setTimeout(() => {
    formEl.lastElementChild.disabled = false;
  }, delayEl.valueAsNumber + amountEl.valueAsNumber * stepEl.valueAsNumber)
}


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }

    }, delay);
  })
}
