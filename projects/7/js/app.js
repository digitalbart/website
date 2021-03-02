/**
 *
 *  ----------------------------
 *  APP.JS 
 *  This script is a clone of the
 *  wheel of fortune game. We use 5 randomly selected
 *  phrases and will have 5 chances per round to solve
 *  the puzzle before the game resets...
 *  ----------------------------
 *
 */

// get dom elements for later use
var qwerty = document.getElementById("qwerty");
var phrase = document.getElementById("phrase");
var overlay = document.getElementById("overlay");

// game started has game begun
var game_started = 0;
// count missed guess total
var missed = 0;
// reset button for new game or to start game
var reset_game = document.getElementsByClassName('btn__reset')[0];

var phrases = ["A YULE LOG BURNING IN THE FIREPLACE",
    "AN AIR CONDITIONER RUNNING FULL BLAST",
    "CHEST OF DRAWERS WITH ANTIQUE MIRROR",
    "COMPACT FLUORESCENT LIGHT BULBS",
    "MAGAZINE SUBSCRIPTION RENEWAL CARDS"
];


/**
 * [getRandomPhraseAsArray will return a random 
 * phrase from array passed to it]
 * @param  {[array]} arr [description]
 * @return {[type]}     [description]
 */
function getRandomPhraseAsArray(arr) {
    var randomPhraseNumber = getRandomInt(5);
    var randomPhrase = phrases[randomPhraseNumber];
    return randomPhrase;
}

/**
 * [addPhraseToDisplay appends a phrase 
 * to the screen by seperating each character indivdually
 * into an array of letter or characters and then appending
 * each into the dom]
 * @param {[type]} selectedPhrase [description]
 */
function addPhraseToDisplay(phraseArray) {

    var totalPhraseCharacters = phraseArray.length;
    var phraseHTML = '';

    for (var i = 0; i < phraseArray.length; i++) {
        //console.log(phraseArray[i]);
        if (phraseArray[i] != ' ') {
            // now we need to add class of letter since this is not 
            phraseHTML += "<li class=\"letter\">" + phraseArray[i] + "</li>";
        } else {
            phraseHTML += "<li class=\"space\">" + phraseArray[i] + "</li>";
        }
    }
    // display phrase on screen
    phrase.innerHTML = phraseHTML;
}

/**
 * [checkLetter description]
 * @param  {[type]} argument [description]
 * @return {[type]}          [description]
 */
function checkLetter(letterGuessed) {

    var letterArray = document.getElementsByClassName("letter");
    var matchFound = 0;

    for (var i = 0; i < letterArray.length; i++) {
        var letter = letterArray[i].innerHTML.toUpperCase();
        // normalize data
        letterGuessed = letterGuessed.toUpperCase();
        // console.log(letterGuessed);
        if (letter === letterGuessed) {
            //console.log('add show class to letter == ' + letterGuessed);
            letterArray[i].className += ' show';
            matchFound = 1;
        }
    }

    // return matched letter
    if (matchFound) {
        return letter;
    } else {
        return null;
    }
}

/**
 * [checkWin 
 *   compare number of letter classes to number of show classes
 *   if number is equal show win screen or if misses equals
 *   five or more show lose screen
 *  ]
 * @return {[type]} [description]
 */
function checkWin() {

    var numberOfLetters = document.getElementsByClassName("letter").length;
    var numberOfLettersVisbile = document.getElementsByClassName("show").length;

    if (numberOfLetters === numberOfLettersVisbile) {
        // show win screen        
        overlay.className = 'win';
        overlay.style.opacity = 1;
        overlay.style.height = '100%';
        game_over = 1;
    } else if (missed == 5) {
        // show lose screen        
        overlay.style.opacity = 1;
        overlay.style.height = '100%';
        overlay.className = 'lose';
        game_over = 1;
    }
}

/**
 * [resetGame to allow for new game plays without 
 * browser reloading page]
 * @return {[type]} [description]
 */
function resetGame() {
    var buttons = document.getElementsByTagName("button");
    //console.log(buttons.length);
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("chosen");
        buttons[i].disabled = false;
    }
    // reset lifes
    var lifes = document.getElementsByClassName("tries");
    for (var z = 0; z < lifes.length; z++) {
        document.getElementsByClassName("tries")[z].firstChild.src = "images/liveHeart.png";
    }
    // reset missed counter to 1 goes to 5
    missed = 0;
}

/**
 * [getRandomInt returns a random number 
 * will not go higher than max parameter provided ]
 * @param  {[type]} max [description]
 * @return {[type]}     [description]
 */
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

/**
 * =============================
 *  setup the Event Listeners
 * ============================= 
 */

// start a new game when clicked
reset_game.addEventListener('click', function(event) {
    // load game board
    overlay.style.opacity = 0;
    // clear out state of previous game
    resetGame();
    // build new game board
    const phraseArray = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseArray);
    // reset game state
    game_over = 0;
});

/** callback when overlay is done */
overlay.addEventListener('transitionend', function(event) {
    // prevent showing before game starts
    if (game_over === 0) {
        overlay.style.height = 0;
    }
});

/**
 * [description]
 * @param  {[type]} e) { var letterPressed [description]
 * @return {[type]}    [description]
 */
qwerty.addEventListener('click', function(e) {
    // set button to cache requests
    var button = e.target;
    // check to make sure row is not clicked
    if (button.className !== "keyrow") {
        var letterPressedValue = button.innerHTML;
        // prevent same letter being played twice
        button.disabled = true;
        button.className += ' chosen';
        // check if the letter is in the phrase
        letterFound = checkLetter(letterPressedValue);
        // check if no matches
        if (letterFound === null) {
            document.getElementsByClassName("tries")[missed].firstChild.src = "images/lostHeart.png";
            missed++;
        }
        // determine if player won or lost
        checkWin();
    }
});