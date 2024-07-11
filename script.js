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
    //Indexing for gameboard spots
    let index = 0;
    const getIndex = () => index;
    const increaseIndex = () => index++;
    const resetIndex = () => index = 0;
    return {board, getIndex, increaseIndex, resetIndex, setBoard, getBoard};

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
    //Handles player turns
    let tick = 0;
    const getTick = () => tick;
    const increaseTick = () => tick++;
    const resetTick = () => tick = 0;
    return {getTick, increaseTick, resetTick};
})();

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

                break
            }
        }
    }
    return {validateWinner, getWinner, setWinner};
})();

const displayController = (function() {
    function displayTurn(name) {
        document.getElementById("turn").innerHTML = name + "'s turn!";
    }

    function displayWinner(name) {
        document.getElementById("turn").innerHTML = name + " is the winner!";
    }

    return {displayTurn, displayWinner};
})();

//Handles input
document.querySelectorAll(".spot").forEach((spot) => {
    spot.addEventListener('click', clickSpot, {once:true});
    spot.setAttribute("id", gameboard.getIndex());
    gameboard.increaseIndex();

    function clickSpot() {
        if (!checkWinner.getWinner()) {
            let temp = game.getTick();
            if (temp %= 2){
                displayController.displayTurn(player1.name);
                gameboard.setBoard(spot.getAttribute("id"), player2.marker);
                spot.innerHTML =player2.marker;
                game.increaseTick();
                checkWinner.setWinner(player2.name);
            }
            else {
                displayController.displayTurn(player2.name);
                gameboard.setBoard(spot.getAttribute("id"), player1.marker);
                spot.innerHTML = player1.marker;
                game.increaseTick();
                checkWinner.setWinner(player1.name);
            }
        }

        checkWinner.validateWinner();
    }
})

const reset = (function() {
    
})();