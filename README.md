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

1. Generate the cards so we can control or add randomization
2. Display the cards to they fit within a grid or table simulating a grid.
3. 


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

// Restart button makes a new game and sets moves and total matches to 0

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