// Gameboad object
const gameboard = (function() {
    //create gameboard array
    let board = [];
    for (let i=0; i<9; i++) {
        board.push("");
    }
    // Indexing for gameboard spots
    let index = 0;
    const getIndex = () => index;
    const increaseIndex = () => index++;
    const resetIndex = () => index = 0;
    return {getIndex, increaseIndex, resetIndex};
})();

// Handles input
document.querySelectorAll(".spot").forEach((spot) => {
    spot.addEventListener('click', clickSpot, {once:true})
    spot.setAttribute("id", gameboard.getIndex());
    gameboard.increaseIndex();

    function clickSpot() {
        spot.innerHTML="CLICK";
    }
})