let playing = false;
var score;
let timeRemaining;
let correctResult;
let tick;

// INITIAL STATE
// click on the start/reset 
document.getElementById('startReset').onclick = function(){
    //if playing
    if (playing == true) {
        document.getElementById('startReset').innerText = "Start Game";
        // reload the page
        location.reload();
    } else { // if not playing.
        hide('gameOver');
        // change play mode
        playing = true;
        // set score to 0 and time remaining.
        score = 0;
        timeRemaining = 60;
        // show coundown box
        document.getElementById('score').innerText = score;
        document.getElementById('timeRemaining').innerText = timeRemaining;
        show('time');
        // change button to "reset"
        document.getElementById('startReset').innerText = "Reset Game";

        // strat countdown
        startCountdown();

        // generate new Q&A
        generateQA();
    }
}

// FUNCTIONS

// start counter
function startCountdown() {
    // reduce time by 1 sec in loop
    tick = setInterval(function(){ 
        timeRemaining--;
        document.getElementById('timeRemaining').innerText = timeRemaining;
        // timeleft ?
        if(timeRemaining === 0){ // no -> gameover
            clearInterval(tick);
            show('gameOver');
            // Set text to the Game Over box and the score
            document.getElementById('gameOver').innerHTML = ("<p>Game Over!</p><p>Your Score is " + score + ".</p>");
            hide('time');
            hide('correct');
            hide('tryAgain');
            clearInterval(tick);
            playing = false;
            document.getElementById('startReset').innerText = "Start Game";
        }
    }, 1000);
}

// show elements in UI
function show(id){
    document.getElementById(id).style.display = 'block';
}
// hide elements from UI    
function hide(id){
    document.getElementById(id).style.display = 'none';
}
// generate Q&A
function generateQA() {
    const x = Math.floor(Math.random() * 10) + 1;
    const y = Math.floor(Math.random() * 10) + 1;
    correctResult = x * y;
    
    document.getElementById('qustion').innerHTML = ( x + 'x' + y);
    
    let randPosition = Math.floor(Math.random()*4) + 1;
    document.getElementById('box' + randPosition).innerText = correctResult;

    let answeres = [correctResult];
    let wrongAnswere;

    for (let i = 1; i < 5; i++) {
        if (i !== randPosition) {
            do {
                wrongAnswere = (Math.floor(Math.random() * 10) + 1) * (Math.floor(Math.random() * 10) + 1);
            } while (answeres.includes(wrongAnswere))
            document.getElementById('box' + i).innerText = wrongAnswere;
            answeres.push(wrongAnswere);
        }
    }
}

function checkValue(box){
    const res = document.getElementById(box).innerHTML;
    if (res == correctResult){
        score++;
        show('correct');
        document.getElementById('score').innerText = score;
        tick = setInterval(function(){
            hide('correct');
        }, 1000);
        generateQA();
    } else {
        show('tryAgain');
        tick = setInterval(function(){
            hide('tryAgain');
        }, 1000);
    }
}
