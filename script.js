let cards = document.getElementsByClassName('card');
let gameOverNode = document.getElementById('game-over');

// initilisiere Liste mit Paaren
let pairs = [];
for (let i = 1; i <= cards.length / 2; i++) {
    pairs.push('pair-' + i); 
    pairs.push('pair-' + i); 
}

// mische Liste mit Paaren naiv
pairs.sort((a, b) => 0.5 - Math.random());

for (let i = 0; i < cards.length; i++) {
    cards[i].classList.add(pairs.pop());
}

let turnCounter = 0;
let counter = 0;
let lock = false;
let openCard = '';
let foundPairs = [];

const hideCards = function() {
    for (let i = 0; i < cards.length; i++) {
        if (foundPairs.includes(cards[i].classList[1])) {
        } else {
            cards[i].classList.add('is-hidden');
        }
    }
    lock = false;
}
// Wenn die erste Karte aufgedeckt wurde -> merken wir uns pair-x
// Wenn die zweite Karte aufgedeckt wurde -> vergleichen wir mit der Ersten
// Wenn beide verschieden, dann setzen wir zurueck
// Wenn beide gleich, dann sollen die Karten aufgedeckt bleiben

// for ( starte mit i = 0; mache weiter solange i < cards.length; erhoehe nach jedem Durchlauf i um 1 )
for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', (element) => {
        // falls die class is-hidden vorhanden ist, class entfernen
        // schaue ob is-hidden am element als class steht, wenn ja =>
        if (cards[i].classList.contains('is-hidden')) {
            if (lock == false) {
                // die erste Karte wurde geklickt
                if (counter == 0) {
                    openCard = element.target.classList[2];
                    counter = counter + 1;
                }
                // die zweite Karte wurde geklickt
                else {
                    turnCounter = turnCounter + 1; 
                    if (openCard == element.target.classList[2]) {
                        // foundPairs beinhaltet die gefunden Paare
                        foundPairs.push(openCard);
                        // pruefe, ob foundPairs alle Paare beinhaltet
                        if (foundPairs.length == cards.length / 2) {
                            gameOverNode.innerHTML = "Game Over: You took " + turnCounter + " turns.";
                        }
                    } else {
                        lock = true;
                        setTimeout(hideCards, 2000);
                    }
                    counter = 0;
                }
                cards[i].classList.remove('is-hidden');
            }
        }
    });
}
