//Gameboad Object
const gameboard = (function() {
    //Creates gameboard array
    let board = [];

    for (let i=0; i<9; i++) {
        board.push("");
    }
    //Sets and Gets gameboard values
    const setBoard = (index, val) => (board[index] = val);
    const getBoard = () => board;
    //Indexing for gameboard spots
    let index = 0;
    const getIndex = () => index;
    const increaseIndex = () => index++;
    const resetIndex = () => index = 0;
    return {getIndex, increaseIndex, resetIndex, setBoard, getBoard};

})();

//Game Object
const game = (function() {
    //Creates both players
    const playerOne = createPlayer("Player X", "X");
    const playerTwo = createPlayer("Player O", "O");
    //Handles player turns
    let tick = 0;
    const getTick = () => tick;
    const increaseTick = () => tick++;
    const resetTick = () => tick = 0;
    return {getTick, increaseTick, resetTick};
})();

//Creates players
function createPlayer(name, marker) {
    return {name, marker};
}

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
    
    function validateWinner() {
        for (let i = 0; i <= 7; i++) {
            const condition = winningCondition[i];
            let one = gameboard.getBoard()[condition[0]];
            let two = gameboard.getBoard()[condition[1]];
            let three = gameboard.getBoard()[condition[2]];
            if (one === '' || two === '' || three === '') {
                continue;
            }

            if (one === two && two === three) {
                winner = true;
                break
            }
        }
    }
    return {validateWinner, getWinner};
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
                    gameboard.setBoard(spot.getAttribute("id"), "O");
                    spot.innerHTML = "O";
                    game.increaseTick();
                }
                else {
                    gameboard.setBoard(spot.getAttribute("id"), "X");
                    spot.innerHTML = "X";
                    game.increaseTick();
                }
            }

        checkWinner.validateWinner();
    }
})