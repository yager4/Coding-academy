'use strict'

var MINE = '💣'
var gBoard
var gBoardMine
var EMPTY = ' ';
var FLAG = '🚩'
var smile = '😊'

var gStillClick;
var gInitialTime;
var gBoard;
var gMine;
var gTimer = null
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}
var gTimersObj = {
    id: 1,
    hour: 0,
    minutes: 0,
    seconds: 0,
}

var gBoardInformation = {
    minesAroundCount: 4,
    isShown: true,
    isMine: false,
    isMarked: true,
}

var gLevel = {
    SIZE: 4,
    MINES: 3
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
    var elLight = document.querySelector('.light')
    elLight.innerHTML = ''

    randerHint()
    gInitialTime = Date.now()
    clearInterval(gTimer)
    gTimersObj.seconds = 0
    gTimersObj.hour = 0
    gTimersObj.minutes = 0
    gBoard = creatBoard()
    renderBoard(gBoard, '.board-container')
    createMine(gBoard)
    MinesNegsCount(gBoard)
    gStillClick = true

}


function cellClicked(elCell, i, j) {


    if (gBoard[i][j].isMine && gStillClick) {

        gBoard[i][j].isMine = false
        gStillClick = false
        MinesNegsCount()

    }
    if (gStillClick === true) {
        gTimer = setInterval(checkTime, 100)
        gStillClick = false



    }

    gBoard[i][j].isShown = true
    if (!gBoard[i][j].isMine) {
        expandShown(gBoard, i, j)
        renderBoard(gBoard, '.board-container')

        if (victory(gBoard)) {

            document.querySelector('.board-container').style.display = 'none'
            document.querySelector('h3').style.display = 'block'
            clearInterval(gTimer)
            gTimer = null
        }


    } else GameOver()

}
function createMine(mat) {
    var numInclud = []
    var num;
    var size = mat.length
    for (var i = 0; i < gLevel.MINES; i++) {



        var randNumRow = getRandomIntInclusive(0, size - 1)
        var randNumCol = getRandomIntInclusive(0, size - 1)
        if (numInclud.length > 0) {

            if (ifTheNumIsIncludes(numInclud, randNumRow, randNumCol)) {
                i--
                continue
            }


        }

        num = {
            i: randNumRow,
            j: randNumCol
        }

        numInclud.push(num)


        mat[randNumRow][randNumCol].isMine = true

    }
}

function ifTheNumIsIncludes(mat, indexI, indexj) {

    for (let i = 0; i < mat.length; i++) {
        const element = mat[i];
        if (element.i === indexI && element.j === indexj) {
            return true
        }


    }
    return false


}



function renderBoard(mat, selector, pic = 'smile.png') {
    var strHTML = '<border="0"><tbody>';
    var strHTMLSmile = `<img src= ${pic} class="smile-picture" />`


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
                    var cellContect = MINE
                }

            } else if (cell.isMarked) {
                cellContect = FLAG
            }
            strHTML += `<td  class="${className}" oncontextmenu="setFlag(this,${i},${j})"  onclick="cellClicked(this,${i},${j})">${cellContect}</td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody>';
    var elSmile = document.querySelector('.smile');
    var elContainer = document.querySelector(selector);
    elContainer.innerHTML = strHTML;
    elSmile.innerHTML = strHTMLSmile

}




function expandShown(mat, posI, posJ, nonReveal = false) {
    debugger
    for (var i = posI - 1; i <= posI + 1; i++) {
        if (i < 0 || i >= mat.length) continue;

        for (var j = posJ - 1; j <= posJ + 1; j++) {
            if (j < 0 || j >= mat[i].length) continue;
            if (i === posI && j === posJ) continue;
            if (!nonReveal) {
                if (!mat[i][j].isMine) {
                    mat[i][j].isShown = true
                }

            } else {
                mat[i][j].isShown = false
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
    if (counter === 0) {

        counter = ''

    }
    return counter

}
function MinesNegsCount() {

    for (var i = 0; i < gBoard.length; i++)
        for (var j = 0; j < gBoard.length; j++) {
            gBoard[i][j].minesAroundCount = setMinesNegsCount(gBoard, i, j)


        }




}
function setFlag(elCell, i, j) {


    if (gBoard[i][j].isMarked) {
        gBoard[i][j].isMarked = false
        gGame.markedCount--


    } else {
        gGame.markedCount++
        gBoard[i][j].isMarked = true
    }
    renderBoard(gBoard, '.board-container')
    if (victory(gBoard)) {
        document.querySelector('.board-container').style.display = 'none'
        document.querySelector('h3').style.display = 'block'
        clearInterval(gTimer)
        gTimer = null

    }
}
function GameOver() {

    var elContainer = document.querySelector('.board-container')
    var deadFace = 'yourDead.png'
    renderBoard(gBoard, '.board-container', deadFace)

}
function startagain() {

    var elSmile = document.querySelector('.smile-picture').src;
    var len = 'smile.png'.length
    len = elSmile.length - len
    if (elSmile.substring(len) === 'smile.png')
        return

    document.querySelector('h3').style.display = 'none'

    intGame()


}
function chooseLevel(sizeMat, numberOfMine) {
    gLevel.SIZE = sizeMat
    gLevel.MINES = numberOfMine
    document.querySelector('.board-container').style.display = 'inline'
    gTimersObj.seconds = 0
    gTimersObj.hour = 0
    gTimersObj.minutes = 0
    document.querySelector('h3').style.display = 'none'
    renderTimer()
    intGame()


}


function victory(mat) {
    if (gGame.markedCount > gLevel.MINES) { return false }
    var isVictory;
    for (let i = 0; i < mat.length; i++) {
        for (let j = 0; j < mat.length; j++) {

            if (mat[i][j].isMine === mat[i][j].isMarked) {
                isVictory = true

            } else return false

        }
    }



    if (!countIsShown(mat)) {
        return false

    }

    return isVictory

}
function countIsShown(mat) {

    var counter = 0
    for (let i = 0; i < mat.length; i++) {
        for (let j = 0; j < mat.length; j++) {

            if (mat[i][j].isShown) {
                counter++
            }

        }
    }


    return (counter === (gLevel.SIZE * gLevel.SIZE) - 1 /*gLevel.MINES*/)
}

function hintIsClicked(elLight) {
    debugger

    if (elLight.src === 'lightBulbOff.jpg') {
        return
    }
    elLight.src = 'lightBulbOff.jpg'
    var CellReveal = {
        i: getRandomIntInclusive(0, gBoard.length - 1),
        j: getRandomIntInclusive(0, gBoard.length - 1)
    }

    if (!(gBoard[CellReveal.i][CellReveal.j].isShown)) {
        gBoard[CellReveal.i][CellReveal.j].isShown = true
    }
    expandShown(gBoard, CellReveal.i, CellReveal.j)
    renderBoard(gBoard, '.board-container')
    gBoard[CellReveal.i][CellReveal.j].isShown = false;
    expandShown(gBoard, CellReveal.i, CellReveal.j, true)
    setTimeout(function () { renderBoard(gBoard, '.board-container') }, 3000);
}
function randerHint() {

debugger
    var pic = 'lightbulpOn.jpg'

    var strHTML = `<img style="padding:10px" onclick="hintIsClicked(this)" src= ${pic} class="smile-picture" />`
    var elLight = document.querySelector('.light')

    for (var i = 0; i < 3; i++) {
        elLight.innerHTML += strHTML
    }
}


