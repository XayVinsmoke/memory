let cards = document.getElementsByClassName('card');
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
                    openCard = element.target.classList[1];
                    counter = counter + 1;
                }
                // die zweite Karte wurde geklickt
                else {
                    if (openCard == element.target.classList[1]) {
                        foundPairs.push(openCard);
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
