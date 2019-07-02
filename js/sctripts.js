var handsPlayed = 0;
var Play = [];
var PlayerCards = [];
var usedCards = [];
var actionToPerform = gameDefinitions.CardType.Backet;

Array.prototype.mapToCardObjects = function () {
    return this.map((x, i) => { return { Number: gameDefinitions.cardNumbers.find(y => y.text == x[0]).number, Suit: x[1], FullCard: x }; })
        .sort((a, b) => (a.Suit > b.Suit) ? 1 : -1)
        .sort((a, b) => (a.Number > b.Number) ? 1 : -1);
};

Array.prototype.getUnique = function (comp) {
    const unique = this
        .map(e => e[comp])
        .map((e, i, array) => array.indexOf(e) === i && i)
        .filter(e => this[e]).map(e => this[e]);

    return unique;
}

Array.prototype.removeAfterSelection = function (comp) {
    const unique = this
        .map(e => e[comp])
        .map((e, i, array) => array.indexOf(e) === i && i)
        .filter(e => this[e]).map(e => this[e]);

    return unique;
}

Array.prototype.checkdifference = function () {
    var count = 0;
    var array = [];
    // Aces check
    if(this.find(x => x.Number == 14) != null)
    {
        array.push({Number: 1, Suit: this.find(x => x.Number == 14).Suit, FullCard: this.find(x => x.Number == 14).FullCard})
    }
    array = array.concat(this);

    for(var i=1;i<array.length;i++){
        if(count == 4)
            return count;
        if(array[i].Number-array[i-1].Number == 1)
            count++;
        else
            count = 0;
    }

    return count >= 4;
}



function setRandomCard(arraySize) {
    var RandomBacket = [];
    for (var i = 0; i < arraySize; i++) {
        var pickSuit = gameDefinitions.cardSuits[Math.floor(Math.random() * cardSuits.length)].toString();
        var pickCardNumber = gameDefinitions.cardNumbers[Math.floor(Math.random() * gameDefinitions.cardNumbers.length)].text;
        var usedCard = pickCardNumber + pickSuit;
        if (usedCards.length != 0) {
            // Ensuring no duplicates
            while (usedCards.map(x => x == usedCard).filter(x => x== true).length > 0) {
                pickSuit = gameDefinitions.cardSuits[Math.floor(Math.random() * cardSuits.length)].toString();
                pickCardNumber = gameDefinitions.cardNumbers[Math.floor(Math.random() * gameDefinitions.cardNumbers.length)].text;
                usedCard = pickCardNumber + pickSuit;
            }
        }
        RandomBacket.push(usedCard);
        usedCards.push(usedCard);
    }

    return RandomBacket;
}

function setCardImages(elements, items, nextActionToPerform) {
    for (var i = 0; i < items.length; i++) {
        var card = frames.frames.filter(x => x.filename.indexOf(items[i]) == 0)[0];
        elements[i].style.background = "url('Images/cards.png') no-repeat -" + card.frame.x + "px -" + card.frame.y + "px";
        elements[i].style.width = card.frame.w + "px";
        elements[i].style.height = card.frame.h + "px";
        elements[i].classList.remove('initial-card');

       if (card.rotated == true) {
            elements[i].style.width = card.frame.h + "px";
            elements[i].style.height = card.frame.w + "px";
            elements[i].classList.add('rotate-card');
        }

        elements[i].style.display = "inline-block";
        actionToPerform = nextActionToPerform;
        if (nextActionToPerform != gameDefinitions.CardType.Flop)
            Play.push(items[i]);
    }
}

var design = {
    addRotation: function () {
        for (var i = 0; i < document.querySelectorAll('.card-position img').length; i++) {
            document.querySelectorAll('.card-position img')[i].classList.add('rotated-image');
        }

        document.getElementById('redeal-cards').classList.add('rotated-image');
    },
    deleteRotation: function () {
        for (var i = 0; i < document.querySelectorAll('.card-position img').length; i++) {
            document.querySelectorAll('.card-position img')[i].classList.remove('rotated-image');
        }
        document.getElementById('redeal-cards').classList.remove('rotated-image');
    },
    setText: function (Text) {
        document.getElementById('result').innerHTML = Text;
    }
}


