'use strict';

var MINE = 'o'
var gBoard
var gBoardMine
var EMPTY = ' ';

var gBoard;
var gMine;

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

var gBoardInformation = {
    minesAroundCount: 4,
    isShown: true,
    isMine: false,
    isMarked: true,
}

var gLevel = {
    SIZE: 4,
    MINES: 2
}

if (document.addEventListener) {
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
    }, false);
} else {
    document.attachEvent('oncontextmenu', function () {
        window.event.returnValue = false;
    });
}


function creatBoard() {
    var board = []
    var num = 0
    for (var i = 0; i < gLevel.SIZE; i++) {
        board.push([]);
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = { isMarked: false, isMine: false, isShown: false, minesAroundCount: 0 }
        }

    }
    return board
}




function intGame() {
    gBoard = creatBoard()

    renderBoard(gBoard, '.board-container')
    createMine()
    MinesNegsCount(gBoard)




}
function cellClicked(elCell, i, j) {
    gBoard[i][j].isShown = true
    if (!gBoard[i][j].isMine) {
        expandShown(gBoard, i, j)
    } else expandShown(gBoard, i, j)

    renderBoard(gBoard, '.board-container')
}
function createMine() {
    gBoard[0][0].isMine = true

    gBoard[0][1].isMine = true
    gBoard[0][2].isMine = true


}


function renderBoard(mat, selector) {
    var strHTML = '<table border="0"><tbody>';
    for (var i = 0; i < mat.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < mat[0].length; j++) {
            var cell = mat[i][j];
            var className = 'cell'
            var cellContect = ''

            if (cell.isShown) {
                className = 'cell-mine'
                cellContect = gBoard[i][j].minesAroundCount
                if (cell.isMine) {
                    var cellContect = '0'
                }

            }
            strHTML += `<td  class="${className}" oncontextmenu="setFlag(this,${i},${j})"  onclick="cellClicked(this,${i},${j})">${cellContect}</td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector(selector);
    elContainer.innerHTML = strHTML;
}



function expandShown(mat, posI, posJ) {
    for (var i = posI - 1; i <= posI + 1; i++) {
        if (i < 0 || i >= mat.length) continue;

        for (var j = posJ - 1; j <= posJ + 1; j++) {
            if (j < 0 || j >= mat[i].length) continue;
            if (i === posI && j === posJ) continue;
            if (!mat[i][j].isMine) {
                mat[i][j].isShown = true
            }
        }
    }
}
function setMinesNegsCount(mat, posI, posJ) {
    var counter = 0
    if (mat[posI][posJ].isMine) return 0
    for (var i = posI - 1; i <= posI + 1; i++) {
        if (i < 0 || i >= mat.length) continue;

        for (var j = posJ - 1; j <= posJ + 1; j++) {
            if (j < 0 || j >= mat[i].length) continue;
            if (i === posI && j === posJ) continue;
            if (mat[i][j].isMine) {

                counter++

            }
        }
    }
    return counter

}
function MinesNegsCount() {

    for (var i = 0; i < gBoard.length; i++)
        for (var j = 0; j < gBoard.length; j++)
            gBoard[i][j].minesAroundCount = setMinesNegsCount(gBoard, i, j)
}
function setFlag(elCell, i, j) {

    console.log(i + ' ' + j)

    console.log('hello')

    return false
}

