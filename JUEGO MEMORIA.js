

let dificultad = 0;
function setDifficulty(number) {
  dificultad = number;
}


function namePlayers() {
  let player1Name = document.getElementById("player-1-name").value;
  let player2Name = document.getElementById("player-2-name").value;
  
  document.getElementById("counter1").setAttribute("name", player1Name);
  document.getElementById("counter2").setAttribute("name", player2Name);

  document.getElementById("visible-name-1").innerHTML = player1Name;
  document.getElementById("visible-name-2").innerHTML = player2Name;
}


function hideDetails() {
  let details = document.getElementById("details");
  details.hidden = true;
}


function showGame() {
  document.getElementById("board-game").style.visibility = "inherit";
}


function starGame(event) {
  event.preventDefault();
  restart();
  namePlayers(); 


  let number = []; 
  let cards = document.getElementById("cards"); 

  for (let i = 3, b = 1; i <= dificultad + 2; i++) {
    number.push(
      `<button class="card" name="${b}" id="${i}" onclick="check(${i})")><p id="card${i}">${b}<p></button>`
    );

    if (i % 2 == 0) {
      b++;
    }
  }
  number.sort(function () { return Math.random() - 0.5; }); 
  cards.innerHTML = number.join(" "); 

  hideDetails();
  showGame();
}


function restart() {
  let restart = document.getElementById("details");
  restart.hidden = false;
  let tablero = document.getElementById("cards");
  tablero.innerHTML = "";
  usedCardsArray = [];
  arr = [];
  value1 = null;
  value2 = null;
  card1 = null;
  card2 = null;
  document.getElementById("counter1").value = null; 
  document.getElementById("counter2").value = null; 
  document.getElementById("board-game").style.visibility = "hidden"; 
  points1 = 0;
  points2 = 0;
  count = 1;
  ColorPlayers()
}




let arr = [];
let count; 
let card1; 
let card2; 
let usedCardsArray = []; // va a ir guardando todas las cartas levantadas
let points1;
let points2;
let value1 = null;
let value2 = null;


function setPoints() {
  if (count % 2 != 0) {
    points1++;
    document.getElementById("counter1").value = points1;
  } else {
    points2++;
    document.getElementById("counter2").value = points2;
  }
}

function ColorPlayers(){
  if (count % 2 != 0) {
    document.getElementById("visible-name-1").style.backgroundColor = "#78E87C";
    document.getElementById("visible-name-2").style.backgroundColor = "#fff";
  } else {
    document.getElementById("visible-name-1").style.backgroundColor = "#fff";
    document.getElementById("visible-name-2").style.backgroundColor= "#78E87C";
  }
}


function winningCondition() {
  if (usedCardsArray.length == dificultad) {
    let winner;

    if (points1 > points2) {
      winner = document.getElementById("counter1").name;
      alert(`Acabó la partida y gana ${winner}`);
      
  
    } else if (points1 < points2) {
      winner = document.getElementById("counter2").name;
      alert(`Acabó la partida y gana ${winner}`);
      
    } else {
      alert("Empate");
    }
  }
}


function check(id) {
  let currentCard = document.getElementById(id);
  let currentValue = document.getElementById("card" + id);
  arr.push(currentValue.innerHTML);

  if (arr.length == 1) {
    value1 = currentValue;
    card1 = currentCard;

    card1.disabled = true;
    value1.style.display = "block";
  }

  if (arr.length == 2) {
    value2 = currentValue;
    card2 = currentCard;

    card2.disabled = true; 
    value2.style.display = "block";


    setTimeout(() => {
      if (arr[0] == arr[1]) {
        arr = [];
        setPoints();

        usedCardsArray.push(card1);
        usedCardsArray.push(card2);
        winningCondition();
        
      } else {
        arr = [];
        count++;
        card1.disabled = false;
        card2.disabled = false;
        ColorPlayers()
        
        setTimeout(() => {
          value1.style.display = "none";
          value2.style.display = "none";
        }, 1000);
      }
    }, 1000);
  }
}




