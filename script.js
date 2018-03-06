// getting nickname and printing it to the browser
var getNickname = document.getElementById('nickname');
var blockInput = false
var disableBtn1 = false;
var disableBtn2 = false;
var disableBtn3 = false;
var disableBtn4 = false;

function submitNickname() {
    if (blockInput) {
        document.getElementById('blockUsername').textContent = 'You can not set username more than once';
    } else if (getNickname.value === '') {
        var startPlay = document.getElementById('playLuckZone');
        startPlay.style.display = 'none';
        var alertMe = document.getElementById('alert');
        alertMe.textContent = 'Please enter your nickname to play luckZone';
    } else {
        var welcomeUser = document.getElementById('welcomeNickname');
        welcomeUser.textContent = 'Welcome to LuckZone ' + getNickname.value + '!';

        // remove input error message
        var alertMe = document.getElementById('alert');
        alertMe.style.display = 'none';

        // make the instruction tab visible
        var instruction = document.getElementById('instruction');
        instruction.style.display = 'block';
    }
}

var submitNick = document.getElementById('submit');
submitNick.addEventListener('click', submitNickname, false);

// when play is clicked to start the game this function is called(dice roll input)
function startLuckZone() {
    if (getNickname.value === '') {
        var startPlay = document.getElementById('playLuckZone');
        startPlay.style.display = 'none';
        var alertMe = document.getElementById('alert');
        alertMe.textContent = 'Please enter your nickname to play luckZone';
    } else if (instruction.style.display != 'block') {
        var alertMe = document.getElementById('alert');
        alertMe.textContent = 'Please press submit button';
    } else {
        // display playLuckOZne div
        var startPlay = document.getElementById('playLuckZone');
        startPlay.style.display = 'flex';
        document.getElementById('nickname').readOnly = true;
        blockInput = true
            // timer countdown
        var twoMinutes = 60 * 2,
            display = document.querySelector('#time');
        startTimer(twoMinutes, display);
        // display countdown div
        var showTimeCountdown = document.getElementById('countDown');
        showTimeCountdown.style.display = 'block';
        document.getElementById('play').textContent = 'luckZone started!!!';
        document.getElementById('play').disabled = true;
    }
}

var onPlay = document.getElementById('play');
onPlay.addEventListener('click', startLuckZone, false);

// countdown timer
function startTimer(duration, display) {
    var timer = duration,
        minutes, seconds;
    setInterval(function() {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer <= 0 && seconds <= 00) {
            var gameOver = document.getElementById('countDown');
            gameOver.textContent = "game Over";

            document.getElementById('button1').disabled = true;
            document.getElementById('button2').disabled = true;
            document.getElementById('button3').disabled = true;
            document.getElementById('button4').disabled = true;
            disableBtn1 = true;
            disableBtn2 = true;
            disableBtn3 = true;
            disableBtn4 = true;
        }
    }, 1000);
}


// object responsible for soldiers moving around
var img1 = document.getElementById("img1");
var img2 = document.getElementById("img2");
var img3 = document.getElementById("img3");
var img4 = document.getElementById("img4");
var tds = document.getElementsByTagName("td");


// variables for button locked when soldier is moved into position
// first image button 1
var firstImage = document.getElementById('firstImage');
var firstImagePosition = document.getElementById('image1');
// second image button 2
var secondImage = document.getElementById('secondImage');
var secondImagePosition = document.getElementById('image2');
// third image button 3
var thirdImage = document.getElementById('thirdImage');
var thirdImagePosition = document.getElementById('image3');
// fourth image button 4
var fourthImage = document.getElementById('fourthImage');
var fourthImagePosition = document.getElementById('image4');

var button1 = document.getElementById('button1').textContent = 'move first soldier';
button1 = false;
var button2 = document.getElementById('button2').textContent = 'move second soldier';
button2 = false;
var button3 = document.getElementById('button3').textContent = 'move third soldier';
button3 = false;
var button4 = document.getElementById('button4').textContent = 'move fourth soldier';
button4 = false;


var moveImage = {
    moveImage1: function() {
        if (button1 && button2 && button3 && button4) {
            document.getElementById('congrats').textContent =
                'congratulations ' + getNickname.value + ', you are the new luckZone Guru!!!';
            var gameOver = document.getElementById('countDown');
            gameOver.textContent = "";
        } else if (firstImage.innerHTML === firstImagePosition.innerHTML) {
            button1 = true;
        } else {
            var randomNumber = Math.floor(Math.random() * tds.length);
            tds[randomNumber].appendChild(img1);
        }
    },
    moveImage2: function() {
        if (button1 && button2 && button3 && button4) {
            document.getElementById('congrats').textContent =
                'congratulations ' + getNickname.value + ', you are the new luckZone Guru!!!';
            var gameOver = document.getElementById('countDown');
            gameOver.textContent = "";
        } else if (secondImage.innerHTML === secondImagePosition.innerHTML) {
            button2 = true
        } else {
            var randomNumber = Math.floor(Math.random() * tds.length);
            tds[randomNumber].appendChild(img2);
        }
    },
    moveImage3: function() {
        if (button1 && button2 && button3 && button4) {
            document.getElementById('congrats').textContent =
                'congratulations ' + getNickname.value + ', you are the new luckZone Guru!!!';
            var gameOver = document.getElementById('countDown');
            gameOver.textContent = "";
        } else if (thirdImage.innerHTML === thirdImagePosition.innerHTML) {
            button3 = true;
        } else {
            var randomNumber = Math.floor(Math.random() * tds.length);
            tds[randomNumber].appendChild(img3);
        }
    },
    moveImage4: function() {
        if (button1 && button2 && button3 && button4) {
            document.getElementById('congrats').textContent =
                'congratulations ' + getNickname.value + ', you are the new luckZone Guru!!!';
            var gameOver = document.getElementById('countDown');
            gameOver.textContent = "";
        } else if (fourthImage.innerHTML === fourthImagePosition.innerHTML) {
            button4 = true;
        } else {
            var randomNumber = Math.floor(Math.random() * tds.length);
            tds[randomNumber].appendChild(img4);
        }
    }
};

var buttonOne = document.getElementById('button1');
buttonOne.addEventListener('click', moveImage.moveImage1, false);
var buttonTwo = document.getElementById('button2');
buttonTwo.addEventListener('click', moveImage.moveImage2, false);
var buttonThree = document.getElementById('button3');
buttonThree.addEventListener('click', moveImage.moveImage3, false);
var buttonFour = document.getElementById('button4');
buttonFour.addEventListener('click', moveImage.moveImage4, false);