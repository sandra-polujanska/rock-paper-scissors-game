// scripts.js


// PRZYCISK
var newGameBtn = document.getElementById('js-newGameButton');

newGameBtn.addEventListener('click', newGame);

// PRZYCISKI WYBORU GRACZA

var pickRock = document.getElementById('js-playerPick_rock'),
     pickPaper = document.getElementById('js-playerPick_paper'),
     pickScissors = document.getElementById('js-playerPick_scissors');

pickRock.addEventListener('click', function() { playerPick('rock') });
pickPaper.addEventListener('click', function() { playerPick('paper') });
pickScissors.addEventListener('click', function() { playerPick('scissors') });

// WARTOŚCI POCZĄTKOWE

var gameState = 'notStarted',  //started // ended
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    };
// WYŚWIETLANIE ELEMENTÓW GRY

var newGameElem = document.getElementById('js-newGameElement'),
    pickElem = document.getElementById('js-playerPickElement'),
    resultsElem = document.getElementById('js-resultsTableElement'),
    winnerElem = document.getElementById('js-winnerElem');

function setGameElements() {
  switch(gameState) {
    case 'started':
        newGameElem.style.display = 'none';
        pickElem.style.display = 'block';
        resultsElem.style.display = 'block';
        winnerElem.style.display = 'none';
      break;
    case 'ended':
        newGameBtn.innerText = 'Play again!';
    case 'notStarted':
    default:
        newGameElem.style.display = 'block';
        pickElem.style.display = 'none';
        resultsElem.style.display = 'none';
        winnerElem.style.display = 'block';
  }
}

setGameElements();

// ROZPOCZĘCIE GRY

var playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints');


function newGame() {
    
    swal({
            title: "Hello!",
            text: "Please, enter your name:",
            type: "input",
            showCancelButton: true,
            closeOnConfirm: false,
            animation: "slide-from-top",
            inputPlaceholder: "player's name",
        },
        function (inputValue) {
            if (inputValue === false) return false;

            if (inputValue === "") {
                swal.showInputError("You must type your name!");
                return false;
            }
            swal("Let's play!", "Good luck, " + inputValue, "success");
            player.name = inputValue;


            if (player.name) {
                player.score = computer.score = 0;
                gameState = 'started';
                setGameElements();

                playerNameElem.innerHTML = player.name;
                setGamePoints();
            }
        });
}
    




// LOSOWANIE WYBORU KOMPUTERA

function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors'];
    return possiblePicks[Math.floor(Math.random()*3)];
}

var playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult');



// LOGIKA GRY I PRZYZNAWANIE PUNKTÓW

function checkRoundWinner(playerPick, computerPick) {
  playerResultElem.innerHTML = computerResultElem.innerHTML = '';

  var winnerIs = 'player';

    if (playerPick == computerPick) {
        winnerIs = 'noone'; // remis
    } else if (
        (computerPick == 'rock' &&  playerPick == 'scissors') ||
        (computerPick == 'scissors' &&  playerPick == 'paper') ||
        (computerPick == 'paper' &&  playerPick == 'rock')) {

        winnerIs = 'computer';
    }

    if (winnerIs == 'player') {
        playerResultElem.innerHTML = "Win!";
        player.score++;
    } else if (winnerIs == 'computer') {
        computerResultElem.innerHTML = "Win!";
        computer.score++;
    }
    setGamePoints();
    endGame();
  
}


function playerPick(playerPick) {
    var computerPick = getComputerPick();

    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;

    checkRoundWinner(playerPick, computerPick);
}

function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score; 
    
}

function endGame() {
    
    if (computer.score == 10) {
        gameState = 'ended';
        setGameElements();
        winnerElem.innerHTML = "You lost! :(";
    } 
   else if (player.score == 10) {
       gameState = 'ended';
        setGameElements();
        winnerElem.innerHTML = "You win! :)";
    }
   
}