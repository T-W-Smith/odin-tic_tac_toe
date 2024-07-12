//Creates players
function createPlayer(name, marker) {
    return {name, marker};
}

// Players
const player1 = createPlayer("Player 1", "X");
const player2 = createPlayer("Player 2", "O");

//Gameboad Object
const gameboard = (function() {
    //Creates gameboard array
    const board = ['', '', '', '', '', '', '', '', ''];

    //Sets and Gets gameboard values
    const setBoard = (index, val) => (board[index] = val);
    const getBoard = () => board;

    return {setBoard, getBoard};
})();

//Game Object handles the start of the game
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

// Winner check handles checking for a winner
const checkWinner = (function() {
    // Winning conditions
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
    const checkWinner = () => winner;
    const resetWinner = () => winner = false;

    let winnerName = "";
    const setWinnerName = (w) => {
        winnerName = w;
    }
    // Validates if there is a winner or if there is a draw
    function validateWinner() {
        for (let i = 0; i <= 7; i++) {
            // Compares the winning condtions with the gameboard
            // to see if there is a winner
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
                break;
            }

            // Checks for a draw
            function checkDraw(draw) {
                return draw !== '';
            }
            if (gameboard.getBoard().every(checkDraw)) {
                displayController.displayDraw();
                break;
            }
        }
    }
    return {validateWinner, checkWinner, resetWinner, setWinnerName};
})();

//Handles the display
const displayController = (function() {
    const displayEle = document.getElementById("turn");
    // Displays whos turn it is
    function displayTurn(name) {
        displayEle.innerHTML = name + "'s turn!";
    }
    // Displays the winner
    function displayWinner(name) {
        displayEle.innerHTML = name + " is the winner!";
    }
    // Displays if there is a draw
    function displayDraw() {
        displayEle.innerHTML = "It's a draw! Play again!"
    }

    return {displayTurn, displayWinner, displayDraw};
})();

//Handles input for the game
const input = (function() {
    // i sets each spot's value corrisponding to the gameboard array
    let i = 0;
    // tick handles each players turn
    let tick = 0;
    // Controls turns, input on the board, and checks for a winner
    function clickSpot(e) {
        if (!checkWinner.checkWinner()) {
            if (tick %= 2){
                displayController.displayTurn(player1.name);
                gameboard.setBoard(e.target.getAttribute("id"), player2.marker);
                e.target.innerHTML = player2.marker;
                tick++;
                checkWinner.setWinnerName(player2.name);
            }
            else {
                displayController.displayTurn(player2.name);
                gameboard.setBoard(e.target.getAttribute("id"), player1.marker);
                e.target.innerHTML = player1.marker;
                tick++;
                checkWinner.setWinnerName(player1.name);
            }
        }
        // Checks if there is a winner
        checkWinner.validateWinner();
    }

    // Adds an event listener to allow gameboard input
    function addClickSpot() {
        document.querySelectorAll(".spot").forEach((spot) => {
            spot.addEventListener('click', clickSpot, {once:true});
            spot.setAttribute("id", i);
            i++;
        })
    }
    // Resets the gameboard input
    function resetClickSpot() {
        document.querySelectorAll(".spot").forEach((spot) => {
            spot.removeEventListener('click', clickSpot);
            spot.setAttribute("id", '');
            gameboard.setBoard(spot.getAttribute("id"), '');
            spot.innerHTML = '';
            i = 0;
            tick = 0;
        })
    }
    addClickSpot();
    document.getElementById('resetButton').addEventListener('click', reset);
    return{addClickSpot, resetClickSpot};
})();

// Handles resetting the game
function reset() {
    for (let i = 0; i < gameboard.getBoard().length; i++){
        gameboard.setBoard(i, ''); 
    }
    displayController.displayTurn(player1.name);
    checkWinner.resetWinner();
    input.resetClickSpot();
    input.addClickSpot();
}