// getting nickname and printing it to the browser
var getNickname = document.getElementById('nickname');
var blockInput = false;

var NICKNAME_ALERT = 'Please enter your nickname to play luckZone';

function showAlert(message) {
    var alertMe = document.getElementById('alert');
    alertMe.textContent = message;
    alertMe.style.display = 'block';
}

function submitNickname() {
    if (blockInput) {
        document.getElementById('blockUsername').textContent = 'You can not set username more than once';
    } else if (getNickname.value === '') {
        showAlert(NICKNAME_ALERT);
    } else {
        var welcomeUser = document.getElementById('welcomeNickname');
        welcomeUser.textContent = 'Welcome to LuckZone ' + getNickname.value + '!';

        // remove input error message
        var alertMe = document.getElementById('alert');
        alertMe.textContent = '';
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
        showAlert(NICKNAME_ALERT);
    } else if (document.getElementById('instruction').style.display !== 'block') {
        showAlert('Please press submit button');
    } else {
        document.getElementById('alert').style.display = 'none';
        // display playLuckOZne div
        var startPlay = document.getElementById('playLuckZone');
        startPlay.style.display = 'flex';
        document.getElementById('nickname').readOnly = true;
        blockInput = true;
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

var SOLDIER_COUNT = 4;
var BEST_TIME_STORAGE_KEY = 'luckZoneBestRemainingSeconds';
var timerInterval = null;
var timerRemainingSeconds = null;
var locked = [false, false, false, false];
var moveButtons = [];
var soldiers = [];
var tds = document.getElementsByTagName('td');

for (var i = 1; i <= SOLDIER_COUNT; i++) {
    soldiers.push(document.getElementById('img' + i));
    moveButtons.push(document.getElementById('button' + i));
}

var buttonLabels = ['move first soldier', 'move second soldier', 'move third soldier', 'move fourth soldier'];
moveButtons.forEach(function(button, index) {
    button.textContent = buttonLabels[index];
});

function stopClock() {
    if (timerInterval !== null) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function disableMoveButtons() {
    moveButtons.forEach(function(button) {
        button.disabled = true;
    });
}

function allLocked() {
    return locked.every(function(isLocked) {
        return isLocked;
    });
}

function soldierInOwnCell(index) {
    var cell = document.getElementById('image' + (index + 1));
    return soldiers[index].parentNode === cell;
}

function formatMinutesSeconds(totalSeconds) {
    var minutes = parseInt(totalSeconds / 60, 10);
    var seconds = parseInt(totalSeconds % 60, 10);
    seconds = seconds < 10 ? '0' + seconds : String(seconds);
    return minutes + ':' + seconds;
}

function readStoredBestRemainingSeconds() {
    var raw = localStorage.getItem(BEST_TIME_STORAGE_KEY);
    if (raw === null) {
        return null;
    }
    var parsed = parseInt(raw, 10);
    return isNaN(parsed) ? null : parsed;
}

function renderBestTime() {
    var bestEl = document.getElementById('bestTime');
    var stored = readStoredBestRemainingSeconds();
    if (stored === null) {
        bestEl.textContent = 'Best: none yet';
    } else {
        bestEl.textContent = 'Best: ' + formatMinutesSeconds(stored);
    }
}

function maybeStoreBestTimeOnWin(remainingSeconds) {
    var stored = readStoredBestRemainingSeconds();
    if (stored === null || remainingSeconds > stored) {
        localStorage.setItem(BEST_TIME_STORAGE_KEY, String(remainingSeconds));
        renderBestTime();
    }
}

function showGuru() {
    if (timerRemainingSeconds !== null) {
        maybeStoreBestTimeOnWin(timerRemainingSeconds);
    }
    document.getElementById('congrats').textContent =
        'congratulations ' + getNickname.value + ', you are the new luckZone Guru!!!';
}

renderBestTime();

function endRoundOnTimeout() {
    stopClock();
    disableMoveButtons();
    var anyOutside = soldiers.some(function(soldier, index) {
        return !soldierInOwnCell(index);
    });
    if (anyOutside) {
        document.getElementById('congrats').textContent =
            'game over ' + getNickname.value + ', time is up and a soldier is outside its cell. You lose this round.';
    }
}

// countdown timer
function startTimer(duration, display) {
    var remaining = duration;

    function render() {
        timerRemainingSeconds = remaining;
        var minutes = parseInt(remaining / 60, 10);
        var seconds = parseInt(remaining % 60, 10);
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        display.textContent = minutes + ':' + seconds;
    }

    stopClock();
    render();
    timerInterval = setInterval(function() {
        remaining--;
        render();
        if (remaining <= 0) {
            endRoundOnTimeout();
        }
    }, 1000);
}

function cellHoldsSoldier(cell) {
    return cell.getElementsByTagName('img').length > 0;
}

function landingSpots() {
    var spots = [];
    for (var i = 0; i < tds.length; i++) {
        if (!cellHoldsSoldier(tds[i])) {
            spots.push(tds[i]);
        }
    }
    return spots;
}

function moveSoldier(index) {
    if (locked[index] || timerInterval === null) {
        return;
    }
    var spots = landingSpots();
    if (spots.length === 0) {
        return;
    }
    var cell = spots[Math.floor(Math.random() * spots.length)];
    cell.appendChild(soldiers[index]);

    if (soldierInOwnCell(index)) {
        locked[index] = true;
        moveButtons[index].disabled = true;
        moveButtons[index].textContent = 'locked';
        if (allLocked()) {
            stopClock();
            showGuru();
        }
    }
}

moveButtons.forEach(function(button, index) {
    button.addEventListener('click', function() {
        moveSoldier(index);
    }, false);
});
