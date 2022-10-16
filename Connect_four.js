var playerOne = prompt("Player One: Enter Your Name, you will be Blue");
var playerOneColor = "blue";
var playerTwo = prompt("Player Two: Enter Your Name, you will be Red");
var playerTwoColor = "red";

var table = $('table tr');

function playerText(player){
    $('h3').text(player + ": it is your turn, please pick a column to drop your blue chip.");
}

function colorReturn(row, col){
    return table.eq(row).find('td').eq(col).find('button').css('background-color')
}

function colorGive(row, col, color){
    return table.eq(row).find('td').eq(col).find('button').css('background-color', color)
}

function checkBottom(col){
    for(var row = 5;row > -1;row--){
        var colorReturned = colorReturn(row, col)
        if (colorReturned === "rgb(128, 128, 128)"){
            return row
        }
    }
}
function Matchcolor(one, two, three, four){
    return (one === two && one === three && one === four && one !== "rgb(128, 128, 128)" && one !== undefined);
}

function horWin(){
    for (var row=0;row<6;row++){
        for(var col=0;col<4; col++){
            if (Matchcolor(colorReturn(row,col), colorReturn(row,col+1), colorReturn(row,col+2), colorReturn(row,col+3))){
                return true
            }
            else{
                continue
            }
        }
    }
}

function verWin(){
    for (var col=0;col<7;col++) {
        for (var row = 0; row < 3; row++) {
            if (Matchcolor(colorReturn(row, col), colorReturn(row + 1, col), colorReturn(row + 2, col), colorReturn(row + 3, col))) {
                return true
            }
            else {
                continue
            }
        }
    }

}

function diagWin(){
    for (var row=0;row<=5;row++) {
        for (var col=0;col<=7;col++) {
            if (Matchcolor(colorReturn(row, col), colorReturn(row + 1, col + 1), colorReturn(row + 2, col + 2), colorReturn(row + 3, col + 3))) {
                console.log('diagonalWin')
                return true
            }
            else if ( Matchcolor(colorReturn(row, col), colorReturn(row - 1, col + 1), colorReturn(row - 2, col + 2), colorReturn(row - 3, col + 3))){
                return true
            }
            else {
                continue
            }
        }
    }
}

function gameEnd(winnersName){
    $('h3').fadeOut('fast');
    $('h2').fadeOut('fast');
    $('h1').text(winnersName+" has won! Refresh your browser to play again!").css("fontSize", "50px")
}

var currentPlayer = 1;
var currentName = playerOne;
var currentColor = playerOneColor;
playerText(currentName)

$('button').click(function () {
    var col = $(this).closest('td').index();

    var availableRow = checkBottom(col);

    colorGive(availableRow, col, currentColor)

    if (diagWin() || horWin() || verWin()) {
        gameEnd(currentName)
        console.log("We have a winner")
    }
    currentPlayer = currentPlayer * -1

    if (currentPlayer === 1) {
        currentName = playerOne;
        $('h3').text(currentName + ": it is your turn, please pick a column to drop your blue chip.");
        currentColor = playerOneColor;
    } else {
        currentName = playerTwo
        $('h3').text(currentName + ": it is your turn, please pick a column to drop your red chip.");
        currentColor = playerTwoColor;
    }


})
