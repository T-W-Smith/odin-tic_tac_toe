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

})

//Handles input
document.querySelectorAll(".spot").forEach((spot) => {
    spot.addEventListener('click', clickSpot, {once:true})
    spot.setAttribute("id", gameboard.getIndex());
    gameboard.increaseIndex();

    function clickSpot() {
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

        console.log(gameboard.getBoard());
    }
})