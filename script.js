// add javascript here

const enteredname = prompt("Enter your name.");
const playername = enteredname.charAt(0).toUpperCase() + enteredname.slice(1).toLowerCase();

let guess = 0;
let guessCount = 0;
let answer = 0;
let range = 0;
let startTime = 0;
const times = [];
const scores = [];

const months = ["January", "February","March","April","May","June", "July","August","September","October","November","December"];

function getDaySuffix(day){
    if (day >= 11 && day <= 13) return "th";
    if (day % 10 === 1) return "st";
    if (day % 10 === 2) return "nd";
    if (day % 10 === 3) return "rd";
    return "th";
}

function time(){
    const today = new Date();
    const month = months[today.getMonth()];
    const day = today.getDate();
    const suffix = getDaySuffix(day)
    const year = today.getFullYear();
    let hours = today.getHours();
    const mins  = String(today.getMinutes()).padStart(2,"0");
    const sec  = String(today.getSeconds()).padStart(2,"0");
    const amorpm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${month} ${day}${suffix}, ${year} | ${hours}:${mins}:${sec} ${amorpm}`;
}

document.getElementById("date").textContent = time();
setInterval(function () {
    document.getElementById("date").textContent = time();
}, 1000);

document.getElementById("playBtn").addEventListener("click",play);
document.getElementById("guessBtn").addEventListener("click", makeGuess);
document.getElementById("giveUpBtn").addEventListener("click", giveUp);
document.getElementById("guess").addEventListener("keydown", function(e){
    if(e.key === "Enter" && !guessBtn.disabled){
        makeGuess();
    }
});

function play(){
    range = 0;
    let levels = document.getElementsByName("level");
    for (let i=0; i<levels.length; i++){
        if(levels[i].checked){
            range = parseInt(levels[i].value);
    }
    levels[i].disabled = true;
}
        document.getElementById("msg").textContent = "Hi" + playername + ", Guess a number 1-" + range;
    answer = Math.floor(Math.random()*range) +1;
    guessCount = 0;

    guessBtn.disabled = false;
    giveUpBtn.disabled = false
    playBtn.disabled = true;
    startTime = new Date().getTime();

}

function makeGuess(){
    let guess = parseInt(document.getElementById("guess").value);

    if(isNaN(guess)){
        msg.textContent = "Please enter a valid number";
        return;
    }

    if (guess < 1 || guess > range){
        msg.textContent = "Enter a number between 1 and " + range + ".";
        return; 
    }

    guessCount++;

    if (guess == answer){
        let quality = "";
        if (guessCount === 1) quality = "Amazing!";
        else if(guessCount <= 5) quality = "Great!";
        else if(guessCount <= 10) quality = "Good!";
        else quality = "Keep practicing!";

        msg.textContent = "Correct " + playername + "! It took you " + guessCount + " tries." + quality;
        updateTimers(new Date().getTime());
        updateScore(guessCount);
        resetGame();
    }

    else if (guess < answer){
        const diff = Math.abs(guess-answer);
        if (diff <= 2) msg.textContent = "Hot. You are too low.";
        else if (diff <=5) msg.textContent = "Warm. You are too low.";
        else msg.textContent = "Cold. You are too low.";
    }
    else{
        const diff = Math.abs(guess-answer);
        if (diff <= 2) msg.textContent = "Hot. You are too high.";
        else if (diff <=5) msg.textContent = "Warm. You are too high.";
        else msg.textContent = "Cold. You are too high.";
    }
}

    
function updateScore(score){
    scores.push(score);
    wins.textContent = "Total wins:" + scores.length;
    let sum = 0;
    for(let i = 0; i < scores.length; i++){
        sum += scores[i]; 
    }
    avgScore.textContent = "Average Score: " + (sum/scores.length).toFixed(1);

    scores.sort(function(a,b){return a-b;});

    let lb = document.getElementsByName("leaderboard");
    for(let i =0; i< lb.length; i++){
        if(i < scores.length){
            lb[i].textContent = scores[i];
        }
    }

}

function updateTimers(endtime){
    const elapsed = Math.round((endtime - startTime) / 1000);
    times.push(elapsed);
    const fastest = Math.min(...times);
    document.getElementById("fastest").textContent = "Fastest Game: " + fastest + " seconds";
    const avgtime = (times.reduce((a,b) => a + b,0) / times.length).toFixed(1);
    document.getElementById("avgTime").textContent = "Average Time: " + avgtime + "seconds";
}

function giveUp(){
    msg.textContent = playername + ". The answer was " + answer + ". Your score is set to " + range + ".";
    updateScore(range);
    guessBtn.disabled = true;
    giveUpBtn.disabled = true;
    playBtn.disabled = false;
    e.disabled = false;
    m.disabled = false;
    h.disabled = false;
    updateTimers(new Date().getTime());
}

function resetGame(){
    document.getElementById("guess").value= "";
    guessBtn.disabled = true;
    giveUpBtn.disabled = true;
    playBtn.disabled = false;
    e.disabled = false;
    m.disabled = false;
    h.disabled = false;
}


