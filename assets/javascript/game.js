//alphabet and including space and dash
var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", " ", "-"];

//create var for tennis terms
var tennis = ["ace", "advantage", "ad-court", "approach shot", "atp", "backspin", "break", "break point", "cross-court", "deep", "deuce", "deuce-court", "double bagel", "double fault", "doubles", "down the line", "error", "foot fault", "forced error", "groundstroke", "hold", "inside-out-forehand", "kick serve", "let", "match point", "mini-break", "moonball", "overhead", "racquet", "singles", "smash", "tiebreak", "underspin", "unforced error", "volley","wild card"];

var gameStarted = false;
var currentWord;
var wordAsDashes;
var guessesLeft;
var lettersGuessed;
var numWins = 0;
var numLosses = 0;
var getNewWord;
var wordPlace; 
var correctGuesses;
var wordAsArr = [];
var dashesArray = [];

function initialize() {
	gameStarted = true;
	lettersGuessed = [];
	correctGuesses = 0;
	wordPlace = Math.floor(Math.random() * 36);
	currentWord = tennis[wordPlace];
	//total you can guess deduct when wrong		
	guessesLeft = 25 - currentWord.length;
	wordAsDashes = makeIntoDashes(currentWord);
	wordAsArr = currentWord.split('');
	dashesArray = wordAsDashes.split('');
	document.getElementById("currentWord").innerHTML = wordAsDashes;
	document.getElementById("lettersGuessed").innerHTML = "--";
	document.getElementById("guessesLeft").innerHTML = guessesLeft;
}


function makeIntoDashes(word) {
	var dashes = "";
	for (i = 0; i < word.length - 1; i++) {
		dashes += "_ ";
	}
	dashes += "_";
	return dashes;
}


function playGame(letter) {
	var letter = letter.toLowerCase();

//key needs to be a letter
	if (alphabet.indexOf(letter) > -1) {
		if (wordAsArr.indexOf(letter) > -1) {
			correctGuesses++;
			displayLetter(letter);
		}
		else {
			if (lettersGuessed.indexOf(letter) > -1) {
				return;
			}
			else {
				guessesLeft--;
				document.getElementById("guessesLeft").innerHTML = guessesLeft;
				lettersGuessed.push(letter);
				document.getElementById("lettersGuessed").innerHTML = lettersGuessed.join('');
				if (guessesLeft == 0) {
					alert("Sorry! The correct tennis term is " + currentWord);
					initialize();
					numLosses++;
					document.getElementById("losses").innerHTML = numLosses;
				}
			}
		}
	}
}


function displayLetter(letter) {

	for (i = 0; i < currentWord.length; i++) {
		if (letter == wordAsArr[i]) {
			dashesArray[i * 2] = letter;
			console.log(dashesArray);
		}
	}
	document.getElementById("currentWord").innerHTML = dashesArray.join("");
	checkForWin();
}


function checkForWin() {
	if (dashesArray.indexOf("_") === -1) {
		alert("You got it! The correct answer is " + currentWord);
		numWins++;
		document.getElementById("wins").innerHTML = numWins;
		initialize();
	}
}

// document.onkeypress = function(keyPressed) {
// 	var keyPressed = keyPressed || window.event,
// 	  charCode = keyPressed.keyCode || keyPressed.which,
// 	  lettersGuessed = String.fromCharCode(charCode);
// }

document.onkeyup = function (event) {
	if (!gameStarted) {
		document.getElementById("letsPlay").innerHTML = "";
		initialize();
		document.getElementById("currentWord").innerHTML = wordAsDashes.split(",");
		console.log(currentWord);
		gameStarted = true;
	}
	else {
		playGame(event.key);
	}
}