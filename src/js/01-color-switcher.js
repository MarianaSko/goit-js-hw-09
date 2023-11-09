const startBtnEl = document.querySelector('[data-start]')
const stopBtnEl = document.querySelector('[data-stop]')

stopBtnEl.disabled = true;

const onStartBtnClick = () => {

    startBtnEl.disabled = true;
    stopBtnEl.disabled = false;

    const onStartId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000)

    stopBtnEl.addEventListener('click', () => {
        startBtnEl.disabled = false;
        stopBtnEl.disabled = true;
        clearInterval(onStartId)
    })
}


function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

startBtnEl.addEventListener('click', onStartBtnClick)

