var gameDefinitions = {
    CardType:{
        Restart: 0,
        Backet: 1,
        Flop: 2,
        Turn: 3,
        River: 4
    },
    cardSuits : ['s', 'h', 'd', 'c'],
    cardNumbers : [{ 'number': 2, text: '2' }, { 'number': 3, text: '3' }, { 'number': 4, text: '4' }, { 'number': 5, text: '5' },
        { 'number': 6, text: '6' }, { 'number': 7, text: '7' }, { 'number': 8, text: '8' }, { 'number': 9, text: '9' }, { 'number': 10, text: 'T' },
        { 'number': 11, text: 'J' },
        { 'number': 12, text: 'Q' }, { 'number': 13, text: 'K' }, { 'number': 14, text: 'A' }]

}

var preconfigure = {
    "Moves": [
        { // First Move
            "Backet": [
                "Ts",
                "Js"
            ],
            "Flop": [
                "7h",
                "2d",
                "Qs"
            ],
            "Turn": [
                "Ks"
            ],
            "River": [
                "As"
            ]
        },
        { // Second Move
            "Backet": [
                "Ts",
                "Js"
            ],
            "Flop": [
                "Ks",
                "2d",
                "Qs"
            ],
            "Turn": [
                "9s"
            ],
            "River": [
                "7h"
            ]
        },
        { // Third Move
            "Backet": [
                "Ah",
                "7d"
            ],
            "Flop": [
                "As",
                "Ad",
                "7s"
            ],
            "Turn": [
                "Ac"
            ],
            "River": [
                "7h"
            ]
        },
        { // Forth Move
            "Backet": [
                "Kh",
                "7d"
            ],
            "Flop": [
                "As",
                "Ad",
                "7s"
            ],
            "Turn": [
                "Kc"
            ],
            "River": [
                "7h"
            ]
        }
    ]
}