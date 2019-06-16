# Memory Card -  Game Project

## Table of Contents

* [Instructions](#instructions)
* [Contributing](#contributing)

## Instructions

The starter project has some HTML and CSS styling to display a static version of the Memory Game project. You'll need to convert this project from a static project to an interactive one. This will require modifying the HTML and CSS files, but primarily the JavaScript file.

To get started, open `js/app.js` and start building out the app's functionality

For specific, detailed instructions, look at the project instructions in the [Udacity Classroom](https://classroom.udacity.com/me).

## Contributing

This repository is the starter code for _all_ Udacity students. Therefore, we most likely will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).

## Notes / Brainstorming

```
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
```



This code puts all cards in an array, which concludes 8 matching pairs.

```
let cardList = ['fa-diamond', 'fa-diamond', 'fa-paper-plane-o', 'fa-paper-plane-o',
                    'fa-anchor', 'fa-anchor', 'fa-bolt', 'fa-bolt',
                    'fa-cube', 'fa-cube', 'fa-leaf', 'fa-leaf',
                    'fa-bicycle', 'fa-bicycle', 'fa-bomb', 'fa-bomb'];

//This function generates adds the HTML element and class properties to each card.
function generateCards(card){
    return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
}
```



This starts or initializes the new game function

``` 
function newGame(){
    
    let cardDeck = document.querySelector('.deck');
    
    //This shuffles the cards in the map using the shuffle function
    let cardHTML = shuffle(cardList).map(function(card) {
        return generateCards(card);

    });
    //This adds the the html information to the cardList
    cardDeck.innerHTML = cardHTML.join('');
}
```



// Shuffle function from http://stackoverflow.com/a/2450976

```
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
```



Reset button function makes a new game and sets moves and total matches to 0
location.reload(); is the only way I know of or can find to get the shuffle to restart or else the cards do not function as buttons.

```
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
```



This is the game timer. It has styling so the seconds(secsT) turn to zero when it hits "59", and each 60 seconds increases the minsT by 1 so it looks like 1:00(minutes:seconds). The ID time-clock in the DOM is updated with the innerHTML property.

```
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

```



This closes cards that were clicked to open by removing the css class 'open' and 'show'. The console.log('array number ' + openCards.length); is for checking that the array does not go passed 2.

```
function closeCards() {
    setTimeout(function() {
        openCards.forEach(function(card) {
            card.classList.remove('open', 'show');
            console.log('array number ' + openCards.length);
        });
        openCards = [];
    }, 500);   
}
```



This keeps track of how many stars the player keeps by reading the playerMoves counter. The difficultySetting Variable is an array that has the move amount for keeping score.

```
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
```



Player Win function, display an alert box and displays message of how many stars earned via difficultySetting variable.

```
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
```



Flips cards and attaches an eventhandler on click and shows cards. The If statement checks if the card is 'open', 'show' and is a 'match'

```
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
