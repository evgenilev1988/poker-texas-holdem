(function () {

    function results() {}

    results.prototype = {
        checkResult: function () {
            var PlayingCards = Play.concat(PlayerCards).mapToCardObjects();
            var flush = false;
            var straight = false;
            var straightFlush = this.checkStraightFlush(PlayingCards);
            if (!straightFlush)
                flush = this.checkFlush(PlayingCards);
            if (!flush && !straightFlush)
                straight = this.checkStraight(PlayingCards);
            if (!flush && !straightFlush && !straight)
                this.CheckPairs(PlayingCards);
        },
        checkStraightFlush: function (PlayingCards) {
            var count = 0;
            var straightFlush = false;
            var suits = PlayingCards.getUnique('Suit');

            var array = [];
            // Aces check
            for (var i = 0; i < PlayingCards.length; i++) {
                if (PlayingCards[i].Number == 14) {
                    array.push({Number: 1, Suit: PlayingCards[i].Suit, FullCard: PlayingCards[i].FullCard});
                }
            }
            array = array.concat(PlayingCards);

            suits.forEach((val, index) => {
                if (array.map(x => x.Suit == suits[index].Suit).filter(x => x == true).length >= 5) {
                    for (var i = 1; i < array.filter(x => x.Suit == suits[index].Suit).length; i++) {
                        var current = array.filter(x => x.Suit == suits[index].Suit)[i].Number
                        var prev = array.filter(x => x.Suit == suits[index].Suit)[i - 1].Number
                        if (current - prev == 1) {
                            count++;
                            if (count == 4) {
                                straightFlush = true;
                                return;
                            }
                        } else
                            count = 0;
                    }


                }
            });
            if (straightFlush)
                design.setText("Straight Flush");
            return straightFlush;
        },
        checkFlush: function (PlayingCards) {
            var count = 0;
            var flush = false;
            var suits = PlayingCards.getUnique('Suit');
            suits.forEach((val, index) => {
                if (PlayingCards.map(x => x.Suit == suits[index].Suit).filter(x => x == true).length == 5) {
                    design.setText("Flush");
                    flush = true;
                }
            });

            return flush;
        },
        checkStraight: function (PlayingCards) {
            var count = 0;
            var straight = false;
            if (PlayingCards.checkdifference()) {
                design.setText("Straight");
                straight = true;
            }
            return straight;
        },
        CheckPairs: function (PlayingCards) {
            var pair = 0, threesOfAkind = 0;
            var fourOfAKind = false;
            var numbers = PlayingCards.getUnique('Number');

            numbers.forEach((val, index) => {
                if (PlayingCards.map(x => x.Number == numbers[index].Number).filter(x => x == true).length == 4) {
                    design.setText("Four Of A kind")
                    fourOfAKind = true;
                } else if (PlayingCards.map(x => x.Number == numbers[index].Number).filter(x => x == true).length == 3)
                    threesOfAkind++;
                else if (PlayingCards.map(x => x.Number == numbers[index].Number).filter(x => x == true).length == 2)
                    pair++;
            });
            if (!fourOfAKind) {
                if (threesOfAkind == 1 && pair >= 1)
                    design.setText("Full house");
                else if (threesOfAkind == 1 && pair == 0)
                    design.setText("Three of A kind");
                else if (pair >= 2)
                    design.setText("Two Pair");
                else if (pair == 1)
                    design.setText("One Pair");
                else
                    design.setText("High Card");
            }
        }
    }

    var init = {
        _initAction: function (dealCards,checkCards,redealCards) {
            document.getElementById('deal-cards').addEventListener('click', function () {
				dealCards();
            });
            document.getElementById('check-cards').addEventListener('click', function () {
				checkCards();
            });
            document.getElementById('redeal-cards').addEventListener('click', function () {
				redealCards();
            });
        },
        dealCards: function () {
            init.resetGame();            
			this.hideButton('deal-cards');
			this.showButton('check-cards');
            var allbacketCards = document.getElementsByClassName('backet');
            var backetArray = handsPlayed < 4 ? preconfigure.Moves[handsPlayed].Backet : this.setRandomCard(2);
            backetArray.forEach((item) => PlayerCards.push(item));
            this.setCardImages(allbacketCards, backetArray, gameDefinitions.CardType.Flop);
        },
		setRandomCard:function (arraySize) {
			var RandomBacket = [];
			for (var i = 0; i < arraySize; i++) {
				var pickSuit = gameDefinitions.cardSuits[Math.floor(Math.random() * gameDefinitions.cardSuits.length)].toString();
				var pickCardNumber = gameDefinitions.cardNumbers[Math.floor(Math.random() * gameDefinitions.cardNumbers.length)].text;
				var usedCard = pickCardNumber + pickSuit;
				if (usedCards.length != 0) {
					// Ensuring no duplicates
					while (usedCards.map(x => x == usedCard).filter(x => x== true).length > 0) {
						pickSuit = gameDefinitions.cardSuits[Math.floor(Math.random() * gameDefinitions.cardSuits.length)].toString();
						pickCardNumber = gameDefinitions.cardNumbers[Math.floor(Math.random() * gameDefinitions.cardNumbers.length)].text;
						usedCard = pickCardNumber + pickSuit;
					}
				}
				RandomBacket.push(usedCard);
				usedCards.push(usedCard);
			}

			return RandomBacket;
		},
		setCardImages: function (elements, items, nextActionToPerform) {
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
		},
        checkCards: function () {
			this.hideButton('deal-cards');
			this.showButton('check-cards');
 
            switch (actionToPerform) {
                case gameDefinitions.CardType.Flop: {
                    var flopArray = handsPlayed < 4 ? preconfigure.Moves[handsPlayed].Flop : this.setRandomCard(3);
                    this.setCardImages(document.getElementsByClassName('flop'), flopArray, gameDefinitions.CardType.Turn);
                    break;
                }
                case gameDefinitions.CardType.Turn: {
                    var turnArray = handsPlayed < 4 ? preconfigure.Moves[handsPlayed].Turn : this.setRandomCard(1);
                    this.setCardImages(document.getElementsByClassName('turn'), turnArray, gameDefinitions.CardType.River);
                    break;
                }
                case gameDefinitions.CardType.River: {
                    var riverArray = handsPlayed < 4 ? preconfigure.Moves[handsPlayed].River : this.setRandomCard(1);
                    this.setCardImages(document.getElementsByClassName('river'), riverArray, gameDefinitions.CardType.Restart);
					this.hideButton('check-cards');
					this.showButton('redeal-cards');
					
					design.addRotation();
                    results.checkResult();
                    break;
                }
                default: {
                    console.log('Not implemented');
                }
            }
        },
		hideButton:function(id){
			document.getElementById(id).classList.add('hide-button');			
		},
		showButton:function(id){
			document.getElementById(id).classList.remove('hide-button');
		},
        RedealCards: function () {
            for (var i = 0; i < document.querySelectorAll('.card-position img').length; i++) {
                document.querySelectorAll('.card-position img')[i].classList.add('initial-card');
                document.querySelectorAll('.card-position img')[i].removeAttribute("style");
                document.querySelectorAll('.card-position img')[i].classList.remove('rotate-card');
            }
            
			this.showButton('deal-cards');
			this.hideButton('redeal-cards');
			
            design.deleteRotation();
            actionToPerform = gameDefinitions.CardType.Backet;
            // Increase hands dealt in order to allow make sure the first four are pre configured
            console.log(handsPlayed);
            design.setText("");
            handsPlayed++;
        },
        resetGame: function () {
            Play = [];
            usedCards = [];
            PlayerCards = [];
            design.setText("");
        },
		_binds:function(){
				this._initAction(this.dealCards.bind(this),this.checkCards.bind(this),this.RedealCards.bind(this));
		}
    };

    var results = new results();
    init._binds();
})();