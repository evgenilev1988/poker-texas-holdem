function dealCards() {
    resetGame();
    document.getElementById('deal-cards').classList.add('hide-button');
    document.getElementById('check-cards').classList.remove('hide-button');
    var allbacketCards = document.getElementsByClassName('backet');
    var backetArray = handsPlayed < 4 ? preconfigure.Moves[handsPlayed].Backet : setRandomCard(2);
    backetArray.forEach((item) => PlayerCards.push(item));
    setCardImages(allbacketCards, backetArray, CardType.Flop);
}

function checkCards() {
    document.getElementById('deal-cards').classList.add('hide-button');
    document.getElementById('check-cards').classList.remove('hide-button');

    switch (actionToPerform) {
        case CardType.Flop:
            {
                var flopArray = handsPlayed < 4 ? preconfigure.Moves[handsPlayed].Flop : setRandomCard(3);
                setCardImages(document.getElementsByClassName('flop'), flopArray, CardType.Turn);
                break;
            }
        case CardType.Turn:
            {
                var turnArray = handsPlayed < 4 ? preconfigure.Moves[handsPlayed].Turn : setRandomCard(1);
                setCardImages(document.getElementsByClassName('turn'), turnArray, CardType.River);
                break;
            }
        case CardType.River:
            {
                var riverArray = handsPlayed < 4 ? preconfigure.Moves[handsPlayed].River : setRandomCard(1);
                setCardImages(document.getElementsByClassName('river'), riverArray, CardType.Restart);
                document.getElementById('redeal-cards').classList.remove('hide-button');
                document.getElementById('check-cards').classList.add('hide-button');
                addRotation();
                checkResult();
                break;
            }
        default:
            {
                console.log('Not implemented');
            }
    }
}

function RedealCards() {

    for (var i = 0; i < document.querySelectorAll('.card-position img').length; i++) {
        document.querySelectorAll('.card-position img')[i].classList.add('initial-card');
        document.querySelectorAll('.card-position img')[i].removeAttribute("style");
        document.querySelectorAll('.card-position img')[i].classList.remove('rotate-card');
    }

    document.getElementById('deal-cards').classList.remove('hide-button');
    document.getElementById('redeal-cards').classList.add('hide-button');
    deleteRotation();
    actionToPerform = CardType.Backet;
    // Increase hands dealt in order to allow make sure the first four are pre configured
    console.log(handsPlayed);
    setText("");
    handsPlayed++;
}

function checkResult() {
    var PlayingCards = Play.concat(PlayerCards).mapToCardObjects();
    var flush = false;
    var straight = false;
    var straightFlush = checkStraightFlush(PlayingCards);
    if (!straightFlush)
        flush = checkFlush(PlayingCards);
    if (!flush && !straightFlush)
        straight = checkStraight(PlayingCards);
    if (!flush && !straightFlush && !straight)
        CheckPairs(PlayingCards);
}

function checkStraightFlush(PlayingCards) {
    var count = 0;
    var straightFlush = false;
    var suits = PlayingCards.getUnique('Suit');

    var array = [];
    // Aces check
    for (var i = 0; i < PlayingCards.length; i++) {
        if (PlayingCards[i].Number == 14) {
            array.push({ Number: 1, Suit: PlayingCards[i].Suit, FullCard: PlayingCards[i].FullCard });
        }
    }
    array = array.concat(PlayingCards);

    suits.forEach((val, index) => {
        if (array.map(x => x.Suit == suits[index].Suit).filter(x => x == true).length >= 5) {

            for (var i = 1; i < array.filter(x => x.Suit == suits[index].Suit).length; i++) {
                var current = array.filter(x => x.Suit == suits[index].Suit)[i].Number
                var prev = array.filter(x => x.Suit == suits[index].Suit)[i-1].Number
                if (current - prev == 1){
                    count++;
                    if (count == 4) {
                        straightFlush = true;
                        return;
                    }
                }
                else
                    count = 0;
            }


        }
    });
    if (straightFlush) 
        setText("Straight Flush");
    return straightFlush;
}

function checkFlush(PlayingCards) {
    var count = 0;
    var flush = false;
    var suits = PlayingCards.getUnique('Suit');
    suits.forEach((val, index) => {
        if (PlayingCards.map(x => x.Suit == suits[index].Suit).filter(x => x == true).length == 5) {
            setText("Flush");
            flush = true;
        }
    });

    return flush;
}

function checkStraight(PlayingCards) {
    var count = 0;
    var straight = false;
    if (PlayingCards.checkdifference()) {
        setText("Straight");
        straight = true;
    }

    return straight;
}

function CheckPairs(PlayingCards) {
    var pair = 0, threesOfAkind = 0;
    var fourOfAKind = false;
    var numbers = PlayingCards.getUnique('Number');

    numbers.forEach((val, index) => {
        if (PlayingCards.map(x => x.Number == numbers[index].Number).filter(x => x == true).length == 4) {
            setText("Four Of A kind")
            fourOfAKind = true;
        }
        else if (PlayingCards.map(x => x.Number == numbers[index].Number).filter(x => x == true).length == 3)
            threesOfAkind++;
        else if (PlayingCards.map(x => x.Number == numbers[index].Number).filter(x => x == true).length == 2)
            pair++;
    });
    if (!fourOfAKind) {
        if (threesOfAkind == 1 && pair >= 1)
            setText("Full house");
        else if (threesOfAkind == 1 && pair == 0)
            setText("Three of A kind");
        else if (pair >= 2)
            setText("Two Pair");
        else if (pair == 1)
            setText("One Pair");
        else
            setText("High Card");
    }
}