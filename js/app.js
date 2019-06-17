// Memory Game - v1.01
// Playable card matching game with 3 Star Score system

// Variables
const starList = document.querySelector('.stars');
// Creates an li element
let starGen = document.createElement('li');
// Timer Boolean, runs when true
let activateTimer = false;
// Deck class
let cardDeck = document.querySelector('.deck');
// timer element in HTML
let totalTime = document.getElementById('time-clock').innerHTML;

// Set the amount of playerMoves to earn each star. index 0 = 3 Stars, index 1 = 2 star2, and index 2 = 1 star
const difficultySetting = [22, 26, 30];


// Shuffle the list of cards using the provided "shuffle" method below

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// List of cards in an Array
let cardList = ['fa-diamond', 'fa-diamond', 'fa-paper-plane-o', 'fa-paper-plane-o',
                    'fa-anchor', 'fa-anchor', 'fa-bolt', 'fa-bolt',
                    'fa-cube', 'fa-cube', 'fa-leaf', 'fa-leaf',
                    'fa-bicycle', 'fa-bicycle', 'fa-bomb', 'fa-bomb'];

// Generates the cards properties
function generateCards(card){
    return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
}

// This shuffles the cards in the map using the above shuffle function
let cardHTML = shuffle(cardList).map(function(card) {
    return generateCards(card);
});

// Starts a new game or initialization 
function newGame(){
    starGen.innerHTML = '<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>';
    starList.appendChild(starGen);
    cardHTML;

    document.getElementById('time-clock').innerHTML = 0 + ':' + 0;

    cardDeck.innerHTML = cardHTML.join('');
    activateTimer = true;
    //console.log(cardList);
}

// Run the game
newGame();

// Grab all cards with class '.card'
const allCards = document.querySelectorAll('.card');
// Open cards array to keep track of which cards are open, max is 2
let openCards = [];
// How many moves the player used, could be divided by 2 in a function
let playerMoves = document.querySelector('.moves');
// how many matches, total is 16
let totalMatches = 0;
// sets the html class as a clickable reset button
let resetButton = document.querySelector('.restart');

// Restart button makes a new game and sets moves and total matches to 0
resetButton.addEventListener('click', function() {
    location.reload();
    console.log('Clicked!');
    playerMoves.innerText = 0;
    totalMatches = 0;
    cardHTML;
    openCards = [];
    // removes all properties of match open and show
    for (i = 0; i < allCards.length; i++) {
        allCards[i].classList.remove('match');
        allCards[i].classList.remove('open');
        allCards[i].classList.remove('show');
        activateTimer = true;
    }

    newGame();
});

// Game Timer
function gameTimer() {
    
    if (activateTimer) {
        let totalTime = document.getElementById('time-clock').innerHTML;
        let timerSep = totalTime.split(':');
        let minsT = timerSep[0];
        let secsT = timerSep[1];

    
        if (secsT == 59) {
            minsT++;
            if (minsT < 10) minsT = '0' + minsT;
            secsT = 0;
        }else {
            secsT++;
            if (secsT < 10) secsT = '0' + secsT;
        }
            document.getElementById('time-clock').innerHTML = minsT + ':' + secsT;
            setTimeout(gameTimer, 1000);
            //console.log(totalTime, secsT, minsT);
    }
}

gameTimer();

//Hides or closes cards function
function closeCards() {
    setTimeout(function() {
        openCards.forEach(function(card) {
            card.classList.remove('open', 'show');
            console.log('array number ' + openCards.length);
        });
        openCards = [];
    }, 500);   
}

// Star Counter for player Score
function starCounter() {

    starGen.innerHTML = '<i class="fa fa-star"></i>';
    starList.appendChild(starGen);

    if (playerMoves.innerText <= difficultySetting[0]) {
        starGen.innerHTML = '<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>';
        starList.appendChild(starGen);
    }else if (playerMoves.innerText <= difficultySetting[1]) {
        starGen.innerHTML = '<i class="fa fa-star"></i><i class="fa fa-star"></i>';
        starList.appendChild(starGen);
    }else if (playerMoves.innerText >= difficultySetting[2]) {
        starGen.innerHTML = '<i class="fa fa-star"></i>';
        starList.appendChild(starGen);
    }
    console.log(starList);
    console.log(starGen);

}


// Player Wins function
function playerWin() {
    console.log('YOU WON!!!');
    console.log(playerMoves);
    if (playerMoves.innerText <= difficultySetting[0]) {
        alert('Congratulations, you earned 3 STARS!!!');
    }else if (playerMoves.innerText <= difficultySetting[1]) {
        alert('Congratulations, you earned 2 STARS!!!');
    }else if (playerMoves.innerText >= difficultySetting[2]) {
        alert('You earned 1 STAR, please try for a higher score!');
    }
    activateTimer = false;
}

//Flips card and shows
    allCards.forEach(function(card) {
        card.addEventListener('click', function(e){

            // If cards are open or showing they will not do anything
            if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
                
                openCards.push(card);
                card.classList.add('open', 'show');
                playerMoves.innerText++;
                console.log(playerMoves);
                starCounter();
                
                
                // If more than 2 cards are showing, hide them
                if (openCards.length == 2) {
                    if (openCards[0].dataset.card == openCards[1].dataset.card) { //This looks for the data property "data-card" from the html
                        console.log('Match!');
                        openCards[0].classList.add('match');
                        openCards[0].classList.add('open');
                        openCards[0].classList.add('show');

                        openCards[1].classList.add('match');
                        openCards[1].classList.add('open');
                        openCards[1].classList.add('show');

                        totalMatches++;
                        console.log(totalMatches);

                        openCards = [];

                        if (totalMatches == 8) {
                            playerWin();
                        }

                    } else {

                    //Hide Cards running this function
                    closeCards();
                }
            }
        }
    });
});
