//deck holder of all cards for this game
let deck = document.querySelector('.deck');

//define variable for restart icon
const restart = document.getElementsByClassName('restart')[0];
restart.addEventListener('click', function() {location.reload();});
//define variables for score section
let moves = 0;
let count = document.querySelector('.moves');
const stars = document.getElementsByClassName('fa-star');

//define delay time to show unamtched cards
let delayTime = 400;

//define array to hold selected cards when user plays
let openedCards = [];

//define variables for modal result dialog
let modal = document.getElementById('overlay');
let close = modal.getElementsByClassName('close')[0];
let playAgain = document.getElementById('playAgain');

//get HTMLCollection objects of class 'card'
let cardHTML = deck.getElementsByClassName('card');

// covert HTMLCollection to JS array
/* 1st way:*/
let cards = Array.from(cardHTML);
/* 2nd way:
let cards = Array.prototype.slice.call(cardHTML); */
/* 3rd way:
let cards = [...cardHTML]; */

//shuffle cards by calling shuffle function
let shuffledCards = shuffle(cards);
//get HTMLCollection objects that have class 'open'
let openedHTML = deck.getElementsByClassName('open');

//empty deck after shuffle
while (deck.firstElementChild) {
  deck.removeChild(deck.firstElementChild);
}

//reset moves
moves = 0;
count. innerText= moves;

//loop shuffled cards into deck and on html, add event
for (let i = 0; i < shuffledCards.length; i++) {
  shuffledCards[i].classList.remove('match', 'open');
  shuffledCards[i].addEventListener('click', play);
  shuffledCards[i].addEventListener('click', alertResult);
  deck.appendChild(shuffledCards[i]);
}

//define function whenever a card is clicked
function play() {
  this.classList.add('open');
  if (openedHTML.length === 1) { //if there is only one card selected
    openedCards.push(this);
    openedHTML[0].classList.toggle('disabled'); //avoid reselecting on the same card
  } else if (openedHTML.length === 2) { //if user has selected another card
    openedCards.push(this);
    countMoves();
    openedHTML[0].classList.remove('disabled');
    openedHTML[1].classList.remove('disabled');
    //check if the guesses are matched
    if (openedCards[0].innerHTML === openedCards[1].innerHTML) {
      matchedCards();
    } else {
      unmatchedCards();
    }
  }

}

//if guesses are matched
function matchedCards() {
  openedCards[0].classList.add('match', 'disabled');
  openedCards[1].classList.add('match', 'disabled');
  //remove class 'open'
  openedCards[0].classList.toggle('open');
  openedCards[1].classList.toggle('open');
  openedCards = []; //clear the array
}

//if guesses are not matched
function unmatchedCards() {
  openedCards[0].classList.add('unmatched');
  openedCards[1].classList.add('unmatched');
  setTimeout(function() {
    //remove class 'open' and replace 'unmatched'
    openedCards[0].classList.remove('open', 'unmatched');
    openedCards[1].classList.remove('open', 'unmatched');
    openedCards = []; //clear the array
  }, delayTime);
}

//count moves and rate stars according to the moves
function countMoves() {
  moves++;
  count.innerText = moves;

  if (moves > 8 && moves <= 12) {
    for (let s = 0; s < stars.length; s++) {
      if (s > 1) {
        stars[s].style.visibility = 'collapse';
      }
    }
  } else if (moves > 12) {
    for (let s = 0; s < stars.length; s++) {
      if (s > 0) {
        stars[s].style.visibility = 'collapse';
      }
    }
  }
}

//if all cards are matched to finish the game
function alertResult() {
  if (deck.querySelectorAll('.match').length == 16) {
    modal.style.visibility = 'visible';
    close.onclick = function() {
    modal.style.visibility = 'hidden';};
    playAgain.onclick = function() {
      location.reload();
    }
    //show final moves and star rating
    document.getElementById('moves').innerHTML = moves;
    document.getElementById('starRating').innerHTML = document.querySelector('.stars').innerHTML;
  }
}

//define function shuffle (from http://stackoverflow.com/a/2450976)
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
