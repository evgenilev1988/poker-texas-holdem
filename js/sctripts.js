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



var design = {
    addRotation: function () {
        for (var i = 0; i < document.querySelectorAll('.card-position img').length; i++) 
            document.querySelectorAll('.card-position img')[i].classList.add('rotated-image');

        document.getElementById('redeal-cards').classList.add('rotated-image');
    },
    deleteRotation: function () {
        for (var i = 0; i < document.querySelectorAll('.card-position img').length; i++) 
            document.querySelectorAll('.card-position img')[i].classList.remove('rotated-image');
        
        document.getElementById('redeal-cards').classList.remove('rotated-image');
    },
    setText: function (Text) {
        document.getElementById('result').innerHTML = Text;
    }
}


