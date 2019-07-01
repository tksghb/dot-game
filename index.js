var minDiameter = 10; //px
var maxDiameter = 100; //px
var speed = 0;
var intervalSpeed = 0;
var intervalDot = 1000; //ms
var colors = ['#e5abbe', '#bbc8e6', '#fef263', '#a8c97f', '#ffffff'];
var windowX = document.documentElement.clientWidth;
var windowY = document.documentElement.clientHeight;
var headerHight = document.getElementById('header').offsetHeight;
var playingAreaElement = document.getElementById('playingArea');
var scoreElement = document.getElementById('score');
var sliderElement = document.getElementById('slider');
var speedElement = document.getElementById('speed');

window.onload = function() {
    setSpeed();
    createDots();
};

window.onresize = function() {
    window.location.reload(true);
};

function createDot() {
    var dot = document.createElement('div');
    dot.classList.add('dot');
    dot.addEventListener('click', clickDot);

    return dot;
}

function createDots() {
    setTimeout(function() {
        var dot = createDot();

        var diameter = Math.floor(Math.random() * (maxDiameter - minDiameter + 1)) + minDiameter; //randam diameter
        dot.style.width = diameter + 'px';
        dot.style.height = diameter + 'px';

        var positionX = Math.floor(Math.random() * (windowX - diameter)); //random horizontal position
        dot.style.left = positionX + 'px';

        dot.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]; //random color

        playingAreaElement.appendChild(dot);

        moveDots(dot);

        createDots();
    }, intervalDot);
}

function moveDots(dot, positionY = headerHight) {
    setTimeout(function() {
        if (positionY > windowY) {
            if (playingAreaElement.contains(dot)) { //check if dot exists (not clicked)
                removeDot(dot);
            }
        } else {
            positionY++;
            dot.style.top = positionY + 'px';

            moveDots(dot, positionY);
        }
    }, intervalSpeed)
}

function addDot(dot) {
    setTimeout(function() {
        var newDot = createDot();

        newDot.style.width = dot.style.width;
        newDot.style.height = dot.style.height;
        newDot.style.left = dot.style.left;
        newDot.style.backgroundColor = dot.style.backgroundColor;

        playingAreaElement.appendChild(newDot);

        moveDots(newDot);
    }, intervalDot);
}

function removeDot(dot) {
    playingAreaElement.removeChild(dot);
}

function setScore(dot) {
    var diameter = parseInt(dot.style.width.replace('px', ''));
    var point = 11 - Math.round(diameter * 0.1);
    var currentScore = parseInt(scoreElement.innerHTML);
    scoreElement.innerHTML = currentScore + point;
}

function setSpeed() {
    speed = sliderElement.value;
    intervalSpeed = Math.floor(intervalDot / speed); //to move by 1px
    speedElement.innerHTML = speed;
}

function clickDot() {
    var dot = this;
    setScore(dot);
    removeDot(dot);
    addDot(dot);
}
