function log(...args) {
    console.log(...args);
}

const videoFile = document.getElementById('file-video');
const logFile = document.getElementById('file-logtxt');
const video = document.getElementById('video');
const output = document.getElementById('output');
const currentTime = document.getElementById('current-time');
const txtTimeoffset = document.getElementById('txt-timeoffset');

const btnSeekBack = document.getElementById('btn-seek-back');
const btnSeekForward = document.getElementById('btn-seek-forward');

const btnSeekNextLog = document.getElementById('btn-seek-next-log');
const btnSeekPrevLog = document.getElementById('btn-seek-prev-log');


window.timeoffset = parseInt(txtTimeoffset.value);

videoFile.addEventListener('change', (e) => {
    const file = e.target.files[0];
    console.log(file);
    const media = URL.createObjectURL(file);
    video.src = media;
    video.style.display = "block";
    video.play();
})


logFile.addEventListener('change', (e) => {
    const file = e.target.files[0];
    console.log(file);
    var fr = new FileReader();
    fr.onload = function () {
        parser(fr.result, output);
    }

    fr.readAsText(file);
})

let lastActiveItem = document.querySelector('.active');
video.addEventListener('timeupdate', (event) => {
    const time = Math.floor(event.target.currentTime);
    currentTime.innerText = time;
    const logSec = document.getElementById(time);
    if (logSec) {
        if (lastActiveItem) {
            lastActiveItem.classList.remove('active');
        }
        lastActiveItem = logSec;
        logSec.classList.add('active');
        logSec.scrollIntoView();
    }
});

txtTimeoffset.addEventListener('change', (e) => {
    const time = parseInt(e.target.value);
    if (!isNaN(time)) {
        window.timeoffset = time;
    }
})

btnSeekBack.addEventListener('click', (e) => {
    video.currentTime -= 1;
});
btnSeekForward.addEventListener('click', (e) => {
    video.currentTime += 1;
});

btnSeekNextLog.addEventListener('click', (e) => {
    const logSec = document.querySelector('.active');
    if (logSec) {
        const nextLogSec = logSec.nextElementSibling;
        if (nextLogSec) {
            logSec.classList.remove('active');
            nextLogSec.classList.add('active');
            nextLogSec.scrollIntoView();
            video.currentTime = nextLogSec.id;
        } else {
            console.log('no next log');
        }
    }
} );

btnSeekPrevLog.addEventListener('click', (e) => {
    const logSec = document.querySelector('.active');
    if (logSec) {
        const prevLogSec = logSec.previousElementSibling;
        if (prevLogSec) {
            logSec.classList.remove('active');
            prevLogSec.classList.add('active');
            prevLogSec.scrollIntoView();
            video.currentTime = prevLogSec.id;
        } else {
            console.log('no prev log');
        }
    }
});