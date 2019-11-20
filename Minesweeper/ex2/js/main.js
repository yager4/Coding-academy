
'use strict';

// TODO: Support selecting a seat
// TODO: Only a single seat should be selected
// TODO: Support Unselecting a seat
// TODO: When seat is selected a popup is shown

// TODO: Popup shows the seat identier - e.g.: 3-5 or 7-15
// TODO: Popup should contain seat price (for now 4$ to all) and allow booking the seat
// TODO: Uplift your model - each seat should have its own price... 

// ITP: More...
// TODO: in seat details, show how many available seats around 
// TODO: Price is kept only for 10 seconds 

var gboard = createCinema();
var gSelectedSeatPos = null;

function init(){
    renderCinema();
}

function renderCinema() {
    var strHTML = '';
    for (var i = 0; i < gboard.length; i++) {
        strHTML += '<tr>\n'
        for (var j = 0; j < gboard[i].length; j++) {
            var cell = gboard[i][j];

            var className = (cell.type === 'EMPTY') ? '' : 'seat '
            className += (cell.taken) ? 'taken ' : '';
            className += (cell.selected) ? 'selected ' : '';

            strHTML += `\t<td
            data-i=${i}  data-j=${j}
            class="${className}" onclick="seatClicked(this, ${i}, ${j})"></td>\n`
        }
        strHTML += '</tr>\n'
    }

    // console.log(strHTML)
    var elSeats = document.querySelector('.seats');
    elSeats.innerHTML = strHTML;
}

function createCinema() {
    var cinema = [];

    for (var i = 0; i < 7; i++) {
        cinema[i] = [];
        for (var j = 0; j < 15; j++) {

            var cell = {
                type: 'SEAT',
                price: 4
            }
            if (j === 7) cell.type = 'EMPTY'
            if (i <= 1) cell.price = 5;

            cinema[i][j] = cell;
        }
    }
    return cinema;
}



function seatClicked(elSeat, seatI, seatJ) {

    var seat = gboard[seatI][seatJ];

    if (!seat.taken) {
        seat.selected = true;

        // If there is currently s selected seat - unselect it
        if (gSelectedSeatPos) {
            gboard[gSelectedSeatPos.i][gSelectedSeatPos.j].selected = false;
        }

        // if the clicked seat is the current - unselect it
        if (gSelectedSeatPos && seatI === gSelectedSeatPos.i && seatJ === gSelectedSeatPos.j) {
            gSelectedSeatPos =  null
        } else {
            // set the new selected seat
            gSelectedSeatPos = { i: seatI, j: seatJ };
        }
        
        renderCinema();
        if (gSelectedSeatPos) showSeatDetails(seatI, seatJ)
        else hideSeatDetails();
    }
}

function getNeighborsAvailableSeats(posI, posJ) {
    var counter = 0;
    for (var i = posI - 1; i <= posI + 1; i++) {
        if (i < 0 || i >= gboard.length) continue;

        for (var j = posJ - 1; j <= posJ + 1; j++) {
            if (j < 0 || j >= gboard[i].length) continue;
            if (i === posI && j === posJ) continue;

            if (!gboard[i][j].taken)
                counter++
        }
    }
    return counter;
}

function showSeatDetails(seatI, seatJ) {
    var seat = gboard[seatI][seatJ];

    var elPopup = document.querySelector('.popup');

    var elSeatNo = elPopup.querySelector('.location');
    elSeatNo.innerText = `${seatI + 1}-${seatJ + 1}`;

    var elPrice = elPopup.querySelector('.price');
    elPrice.innerText = seat.price;

    var elAvailable = elPopup.querySelector('.availables');
    elAvailable.innerText = getNeighborsAvailableSeats(seatI, seatJ)

    elPopup.hidden = false;
}

function hideSeatDetails() {
    var elPopup = document.querySelector('.popup');
    elPopup.hidden = true;
}


function buySeat() {
    var pos = gSelectedSeatPos;
    gboard[pos.i][pos.j].taken = true;
    gboard[pos.i][pos.j].selected = false;
    renderCinema();
    gSelectedSeatPos = null;
    hideSeatDetails();
}