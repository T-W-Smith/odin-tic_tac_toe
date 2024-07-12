//Creates players
function createPlayer(name, marker) {
    return {name, marker};
}

const player1 = createPlayer("Player 1", "X");
const player2 = createPlayer("Player 2", "O");

//Gameboad Object
const gameboard = (function() {
    //Creates gameboard array
    const board = ['', '', '', '', '', '', '', '', ''];

    //Sets and Gets gameboard values
    const setBoard = (index, val) => (board[index] = val);
    const getBoard = () => board;

    return {board, setBoard, getBoard};
})();

//Game Object
const game = (function() {
    let pOne = document.getElementById("playerOne");
    let pTwo = document.getElementById("playerTwo");
    document.getElementById('dialog').showModal();
    document.querySelector('#form').addEventListener("submit", function(e) {
        e.preventDefault();
        player1.name = pOne.value;
        player2.name = pTwo.value;
        document.getElementById("players").innerHTML = player1.name + " VS " + player2.name;
        document.getElementById("turn").innerHTML = player1.name + "'s turn!"
        pOne.value = "";
        pTwo.value = "";
        dialog.close();
    })
})();

// Handles checking for a winner
const checkWinner = (function() {
    const winningCondition = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    let winner = false;
    const getWinner = () => winner;

    let winnerName = "";
    const setWinner = (w) => {
        winnerName = w;
    }
    
    function validateWinner() {
        for (let i = 0; i <= 7; i++) {
            const condition = winningCondition[i];
            let zero = gameboard.getBoard()[condition[0]];
            let one = gameboard.getBoard()[condition[1]];
            let two = gameboard.getBoard()[condition[2]];
            if (zero === '' || one === '' || two === '') {
                continue;
            }

            if (zero === one && one === two) {
                winner = true;
                displayController.displayWinner(winnerName);
                winner = false;
                break;
            }

            function checkTie(tie) {
                return tie !== '';
            }

            if (gameboard.getBoard().every(checkTie)) {
                displayController.displayDraw();
                break;
            }
        }
    }
    return {validateWinner, getWinner, setWinner};
})();

//Handles the display
const displayController = (function() {
    const displayEle = document.getElementById("turn");
    function displayTurn(name) {
        displayEle.innerHTML = name + "'s turn!";
    }

    function displayWinner(name) {
        displayEle.innerHTML = name + " is the winner!";
        reset();
    }

    function displayDraw() {
        displayEle.innerHTML = "It's a draw! Play again!"
    }

    return {displayTurn, displayWinner, displayDraw};
})();

//Handles input
const input = (function() {
    let i = 0;
    let tick = 0;
    function clickSpot(e) {
        if (!checkWinner.getWinner()) {
            if (tick %= 2){
                displayController.displayTurn(player1.name);
                gameboard.setBoard(e.target.getAttribute("id"), player2.marker);
                e.target.innerHTML = player2.marker;
                tick++;
                checkWinner.setWinner(player2.name);
            }
            else {
                displayController.displayTurn(player2.name);
                gameboard.setBoard(e.target.getAttribute("id"), player1.marker);
                e.target.innerHTML = player1.marker;
                tick++;
                checkWinner.setWinner(player1.name);
            }
        }
        checkWinner.validateWinner();
    }

    function addClickSpot() {
        document.querySelectorAll(".spot").forEach((spot) => {
            spot.addEventListener('click', clickSpot, {once:true});
            spot.setAttribute("id", i);
            i++;
        })
    }
    function removeClickSpot() {
        document.querySelectorAll(".spot").forEach((spot) => {
            spot.removeEventListener('click', clickSpot);
            spot.setAttribute("id", '');
            i = 0;
            tick = 0;
        })
    }
    addClickSpot();
    return{addClickSpot, removeClickSpot};
})();

// Handles resetting the game
function reset() {
    for (let i = 0; i < gameboard.getBoard().length; i++){
        gameboard.setBoard(i, ''); 
    }
    document.querySelectorAll(".spot").forEach((spot) => {
        gameboard.setBoard(spot.getAttribute("id"), '');
        spot.innerHTML = '';
    })
    input.removeClickSpot();
    input.addClickSpot();
}