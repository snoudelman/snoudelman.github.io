
var dice1;
var dice2;
var temp;
var rolled = false;

var counter = -1;

var random = true;

const diceArray1 = [];
const diceArray2 = [];

var seed1 = xmur3("jon");
var seed2 = xmur3("stoplookingatmycode");
var rand1 = mulberry32(seed1());
var rand2 = mulberry32(seed2());

function choose(choice){
    user = choice;
}

document.addEventListener('DOMContentLoaded', function() {

    roll ();

    for (let i = 0; i < 10; i++ ) {
        document.getElementById(i).style.color="black"; 
    }

}, false);

function xmur3(str) {
    for(var i = 0, h = 1779033703 ^ str.length; i < str.length; i++) {
        h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
        h = h << 13 | h >>> 19;
    } return function() {
        h = Math.imul(h ^ (h >>> 16), 2246822507);
        h = Math.imul(h ^ (h >>> 13), 3266489909);
        return (h ^= h >>> 16) >>> 0;
    }
}

function roll() {
    
    if (rolled == false) {
        
        if (random) {
            // min = Math.ceil(1);
            // max = Math.floor(6);
        
            // dice1 = Math.floor(Math.random() * (max - min) + min);
            // dice2 = Math.floor(Math.random() * (max - min) + min);

            min = Math.ceil(1);
            max = Math.floor(6);
        
            dice1 = Math.floor(rand1() * (max - min) + min);
            dice2 = Math.floor(rand2() * (max - min) + min);

        } else {
            dice1 = diceArray1[counter];
            dice2 = diceArray2[counter];
        }
    
        $('#dice1').text(dice1);
        $('#dice2').text(dice2);

        document.getElementById("dice1Picture").src = dice1 + ".svg";
        document.getElementById("dice2Picture").src = dice2 + ".svg";

    } else {
        alert ("Must take an action or remove a number!")
        return;
    }

    rolled = true;
    counter++;
    $('#counter').text(counter);
}

function mulberry32(a) {
    return function() {
      var t = a += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

function remove (id) {
    if (document.getElementById(id).style.color == "black") {
        alert ("Number not valid to remove!")
        return;
    }
    document.getElementById(id).style.color="black";
    rolled=false;
    roll();
}

function swap () {
    temp = dice1;
    dice1 = dice2;
    dice2 = temp;

    document.getElementById("dice1Picture").src = dice1 + ".svg";
    document.getElementById("dice2Picture").src = dice2 + ".svg";
}

function verify (result) {

    if (rolled == false) {
        alert ("Must take an action or remove a number!")
        return;
    }

    if (!Number.isInteger(result)) {
        alert ("Must be a whole number!")
        return;
    }

    if (result < 0 || result > 9) {
        alert ("Result can't be greater than 9 or less than 0.");
        return;
    }

    if (document.getElementById(result).style.color == "red") {
        alert ("Number already taken!")
        return;
    }

    updateBoard(result);

    for (let i = 1; i < 10; i++) {
        if (document.getElementById(i).style.color == "black") {
            return;
        }
    }

    alert ("You won with a count of " + counter);
}

function add () {
    result = dice1 + dice2;
    verify (result);
}

function divide () {
    result = dice1 / dice2;
    verify (result);
}

function multiply () {
    result = dice1 * dice2;
    verify (result);
}

function subtract () {
    result = dice1 - dice2;
    verify (result);
}

function updateBoard (result) {
    document.getElementById(result).style.color="red";
    rolled = false;
    roll();
}

function mulberry32(a) {
    return function() {
      var t = a += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}