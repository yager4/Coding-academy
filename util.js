
function getRandomColor() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


function printMat(mat, selector) {
  var strHTML = '<table border="0"><tbody>';
  for (var i = 0; i < mat.length; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < mat[0].length; j++) {
      var cell = mat[i][j];
      var className = 'cell cell' + i + '-' + j;

      strHTML += `<td class="${className}" onclick="cellClicked(this,${i},${j})">${cell}</td>`
    }
    strHTML += '</tr>'
  }
  strHTML += '</tbody></table>';


  var elContainer = document.querySelector(selector);
  elContainer.innerHTML = strHTML;
}

function renderCell(location, value) {

  // Select the elCell and set the value
  var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
  elCell.innerHTML = value;
}
function checkCell(board, value) {
  var valueCell = []
  for (var i = 0; i < board.length; i++) {
    var cell = board[i]
    for (var j = 0; j < board.length; j++) {
      if (cell[j] === value) {
        var location= {
          i: i,
          j: j
        }
        valueCell.push(location)

      }

    }
  }
  return valueCell
}



/*
var datas= [
  ["aaa", "bbb"],
  ["ddd", "eee"]
];

function exists(arr, search) {
    return arr.some(row => row.includes(search));
}

console.log(exists(datas, 'ddd'));
console.log(exists(datas, 'xxx'));*/