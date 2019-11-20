'use strict'

// Pieces Types
var KING_WHITE = '♔';
var QUEEN_WHITE = '♕';
var ROOK_WHITE = '♖';
var BISHOP_WHITE = '♗';
var KNIGHT_WHITE = '♘';
var PAWN_WHITE = '♙';
var KING_BLACK = '♚';
var QUEEN_BLACK = '♛';
var ROOK_BLACK = '♜';
var BISHOP_BLACK = '♝';
var KNIGHT_BLACK = '♞';
var PAWN_BLACK = '♟';

// The Chess Board
var gBoard;
var gSelectedElCell = null;

function restartGame() {
    gBoard = buildBoard();
    renderBoard(gBoard);
}

function buildBoard() {
    var board = [];
    for (let i = 0; i < 8; i++) {
        board.push([]);
        for (let j = 0; j < 8; j++) {
            board[i][j] = {
                piece: '',
                marked: false,
                seleted: false
            };
            if (i === 1) board[i][j].piece = PAWN_BLACK;
            if (i === 6) board[i][j].piece = PAWN_WHITE;
        }

    }
    board[0][0].piece = board[0][7].piece = ROOK_BLACK
    board[0][1].piece = board[0][6].piece = KNIGHT_BLACK
    board[0][2].piece = board[0][5].piece = BISHOP_BLACK
    board[0][3].piece = QUEEN_BLACK
    board[0][4].piece = KING_BLACK


    board[7][0].piece = board[7][7].piece = ROOK_WHITE;
    board[7][1].piece = board[7][6].piece = KNIGHT_WHITE;
    board[7][2].piece = board[7][5].piece = BISHOP_WHITE;
    board[7][3].piece = QUEEN_WHITE;
    board[7][4].piece = KING_WHITE;
    return board;

}

function renderBoard(board) {
    var strHtml = '';
    for (var i = 0; i < board.length; i++) {
        var row = board[i];
        strHtml += '<tr>';
        for (var j = 0; j < row.length; j++) {
            var cell = row[j];
            // TODO: figure class name
            var className = ((j + i) % 2 === 0) ? 'white' : 'black';
            var tdId = 'cell-' + i + '-' + j;

            strHtml += `<td data-id="${tdId}" 
                            onclick="cellClicked(this)"
                            class="${className}"> ${cell.piece}</td>`;
        }
        strHtml += '</tr>';
    }
    var elMat = document.querySelector('.game-board');
    elMat.innerHTML = strHtml;
}


function cellClicked(elCell) {

    // TODO: if the target is marked - move the piece!
    if (elCell.classList.contains('mark')) {
        movePiece(gSelectedElCell, elCell);
        cleanBoard();
        return;
    }
    cleanBoard();

    elCell.classList.add('selected');
    gSelectedElCell = elCell;

    // console.log('elCell.id: ', elCell.id);
    var cellCoord = getCellCoord(elCell.dataset.id);
    var cell = gBoard[cellCoord.i][cellCoord.j]; //{piece:''}

    var possibleCoords = [];
    switch (cell.piece) {
        case ROOK_BLACK:
        case ROOK_WHITE:
            possibleCoords = getAllPossibleCoordsRook(cellCoord);
            break;
        case BISHOP_BLACK:
        case BISHOP_WHITE:
            possibleCoords = getAllPossibleCoordsBishop(cellCoord);
            break;
        case KNIGHT_BLACK:
        case KNIGHT_WHITE:
            possibleCoords = getAllPossibleCoordsKnight(cellCoord);
            break;
        case PAWN_BLACK:
        case PAWN_WHITE:
            possibleCoords = getAllPossibleCoordsPawn(cellCoord, cell.piece === PAWN_WHITE);
            break;
        case KING_BLACK:
        case KING_WHITE:
            possibleCoords = getAllPossibleCoordsKing(cellCoord)
            break;
        case QUEEN_BLACK:
        case QUEEN_WHITE:
            possibleCoords = getAllPossibleCoordsRook(cellCoord)
            possibleCoords.push(...getAllPossibleCoordsBishop(cellCoord))
            break;

    }
    markCells(possibleCoords);
}

function movePiece(elFromCell, elToCell) {
    // TODO: use: getCellCoord to get the coords, move the piece
    var fromCoords = getCellCoord(elFromCell.dataset.id);
    var toCoords = getCellCoord(elToCell.dataset.id);

    gBoard[toCoords.i][toCoords.j].piece =
        gBoard[fromCoords.i][fromCoords.j].piece;

    gBoard[fromCoords.i][fromCoords.j].piece = '';

    renderBoard(gBoard);
    // update the MODEl, update the DOM
}

function markCells(coords) {
    for (var i = 0; i < coords.length; i++) {
        var coord = coords[i];
        var dataID = `cell-${coord.i}-${coord.j}`
        var elCell = document.querySelector(`[data-id="${dataID}"]`)
        elCell.classList.add('mark');
    }
    // TODO: query select them one by one and add mark 
}

// Gets a string such as:  'cell-2-7' and returns {i:2, j:7}
function getCellCoord(strCellId) {
    var parts = strCellId.split('-')
    var coord = { i: +parts[1], j: +parts[2] };

    return coord;
}

function cleanBoard() {
    var tds = document.querySelectorAll('.mark, .selected');
    for (var i = 0; i < tds.length; i++) {
        tds[i].classList.remove('mark', 'selected');
    }
}

function getSelector(coord) {
    return '#cell-' + coord.i + '-' + coord.j
}

function isEmptyCell(coord) {
    return gBoard[coord.i][coord.j].piece === ''
}


function getAllPossibleCoordsPawn(pieceCoord, isWhite) {
    var res = [];
    var cellDirection = isWhite ? -1 : 1;

    var option = {
        i: (pieceCoord.i + cellDirection),
        j: pieceCoord.j
    }
    // TODO : is the end of the board?!
    if (isEmptyCell(option)) {
        res.push(option)
        if ((pieceCoord.i === 6 && isWhite) || (pieceCoord.i === 1 && !isWhite)) {
            option = {
                i: (pieceCoord.i + (cellDirection * 2)),
                j: pieceCoord.j
            };
            if (isEmptyCell(option)) {
                res.push(option)
            }
        }
    }
    var diagOption = {
        i: pieceCoord.i + cellDirection,
        j: pieceCoord.j - 1
    };
    if (diagOption.j > 0 && diagOption.j > gBoard.length) { //if not out of bounds
        if (!isEmptyCell(diagOption)) res.push(diagOption);
        diagOption.j = pieceCoord.j + 1;
        if (!isEmptyCell(diagOption)) res.push(diagOption);
    }


    // TODO: PAWN eats diagnional! 

    // add check if cell taken diagnoal and add to options
    // TODO: handle PAWN
    return res;
}

function getAllPossibleCoordsRook(pieceCoord) {
    var res = [];
    for (let i = pieceCoord.i + 1; i < gBoard.length; i++) {
        var currCoord = { i: i, j: pieceCoord.j }
        if (isEmptyCell(currCoord)) res.push({ ...currCoord })
        else break;
    }
    for (let i = pieceCoord.i - 1; i >= 0; i--) {
        var currCoord = { i: i, j: pieceCoord.j }
        if (isEmptyCell(currCoord)) res.push({ ...currCoord })
        else break;
    }
    for (let j = pieceCoord.j + 1; j < gBoard.length; j++) {
        var currCoord = { i: pieceCoord.i, j: j }
        if (isEmptyCell(currCoord)) res.push({ ...currCoord })
        else break;
    }
    for (let j = pieceCoord.j - 1; j >= 0; j--) {
        var currCoord = { i: pieceCoord.i, j: j }
        if (isEmptyCell(currCoord)) res.push({ ...currCoord })
        else break;
    }
    return res;
}

function getAllPossibleCoordsBishop(pieceCoord) {
    var res = [];
    var i = pieceCoord.i - 1;
    for (var idx = pieceCoord.j + 1; i >= 0 && idx < 8; idx++) {
        var coord = { i: i--, j: idx };
        if (!isEmptyCell(coord)) break;
        res.push(coord);
    }
    var i = pieceCoord.i - 1;
    for (var idx = pieceCoord.j - 1; i >= 0 && idx >= 0; idx--) {
        var coord = { i: i--, j: idx };
        if (!isEmptyCell(coord)) break;
        res.push(coord);
    }
    var i = pieceCoord.i + 1;
    for (var idx = pieceCoord.j - 1; i < 8 && idx >= 0; idx--) {
        var coord = { i: i++, j: idx };
        if (!isEmptyCell(coord)) break;
        res.push(coord);
    }
    var i = pieceCoord.i + 1;
    for (var idx = pieceCoord.j + 1; i < 8 && idx < 8; idx++) {
        var coord = { i: i++, j: idx };
        if (!isEmptyCell(coord)) break;
        res.push(coord);
    }
    return res;
}
function getAllPossibleCoordsKing(pieceCoord) {
    var res = [];
    for (let i = pieceCoord.i - 1; (i <= pieceCoord.i + 1) && (i < 8); i++) {
        if (i < 0) continue
        for (let j = pieceCoord.j - 1; j <= pieceCoord.j + 1 && j < 8; j++) {
            var cell = { i: i, j: j }
            if (isEmptyCell(cell)) res.push({ ...cell })
        }
    }
    return res;
}
function getAllPossibleCoordsKnight(cellCoord) {
    var res = []
    for (let i = cellCoord.i + 1; i <= cellCoord.i + 2 && i < 8; i++) {
        var currCell = { i: i, j: cellCoord.j }
        if (!isEmptyCell(currCell)) break;
        if (i === cellCoord.i + 2) {
            if ((currCell.j + 1) < 8 && isEmptyCell({ i: i, j: currCell.j + 1 })) res.push({ i: i, j: currCell.j + 1 })
            if ((currCell.j - 1) >= 0 && isEmptyCell({ i: i, j: currCell.j - 1 })) res.push({ i: i, j: currCell.j - 1 })
        }
    }
    for (let j = cellCoord.j + 1; j <= cellCoord.j + 2 && j < 8; j++) {
        var currCell = { i: cellCoord.i, j: j }
        if (!isEmptyCell(currCell)) break;
        if (j === cellCoord.j + 2) {
            if ((currCell.i + 1) < 8 && isEmptyCell({ i: currCell.i + 1, j: j })) res.push({ i: currCell.i + 1, j: j })
            if ((currCell.i - 1) >= 0 && isEmptyCell({ i: currCell.i - 1, j: j })) res.push({ i: currCell.i - 1, j: j })
        }
    }
    for (let i = cellCoord.i - 1; i >= cellCoord.i - 2 && i >= 0; i--) {
        var currCell = { i: i, j: cellCoord.j }
        if (!isEmptyCell(currCell)) break;
        if (i === cellCoord.i - 2) {
            if ((currCell.j + 1) < 8 && isEmptyCell({ i: i, j: currCell.j + 1 })) res.push({ i: i, j: currCell.j + 1 })
            if ((currCell.j - 1) >= 0 && isEmptyCell({ i: i, j: currCell.j - 1 })) res.push({ i: i, j: currCell.j - 1 })
        }
    }
    for (let j = cellCoord.j - 1; j >= cellCoord.j - 2 && j >= 0; j--) {
        var currCell = { i: cellCoord.i, j: j }
        if (!isEmptyCell(currCell)) break;
        if (j === cellCoord.j - 2) {
            if ((currCell.i + 1) < 8 && isEmptyCell({ i: currCell.i + 1, j: j })) res.push({ i: currCell.i + 1, j: j })
            if ((currCell.i - 1) >= 0 && isEmptyCell({ i: currCell.i - 1, j: j })) res.push({ i: currCell.i - 1, j: j })
        }
    }
    return res
}
