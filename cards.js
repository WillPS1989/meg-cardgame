const cards = [];
let drawnCards = [];
let activeGame = true;
let wins = 0;
let losses = 0;

function buildDeck()
{
    let cardNums = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    let cardSuits = ['Hearts', 'Diamonds', 'Spades', 'Clubs'];
    cardSuits.forEach(function (suit) {
        cardNums.forEach(function(num){
            let card = [];
            switch(num) {
                case 10:
                    card['numAsString'] = 'J';
                    break;
                case 11:
                    card['numAsString'] = 'Q';
                    break;
                case 12:
                    card['numAsString'] = 'K';
                    break;
                case 13:
                    card['numAsString'] = 'A';
                    break;
                default:
                    card['numAsString'] = num.toString();
            }
            card['num'] = num;
            card['suit'] = suit;
            cards.push(card);
        })
    });
}

function initialise()
{
    buildDeck();
    showHiLoButtons();
    resetCards();
    playNextCard(null);
    document.getElementById('loader').style.display = 'none';
    document.getElementById('game').style.display = 'block';
}

function resetCards()
{
    for(i=1;i<=5;i++){
        document.getElementById('card_'+i).style.visibility = 'hidden';
        document.getElementById('value_'+i).innerHTML = '';
    }
    drawnCards = [];
    activeGame = true;
}

function drawNextCard()
{
    let drawnCard = null;

    while (drawnCard===null) {
        let randomCard = cards[Math.floor(Math.random()*cards.length)];

        //check card has not already been drawn
        if (!drawnCards.includes(randomCard)){
            drawnCards.push(randomCard);
            drawnCard = randomCard;
        }
    }
    return drawnCard;
}

function playNextCard(hiLo){
    let cardIndex = drawnCards.length + 1;
    let nextCard = drawNextCard();

    document.getElementById('card_'+cardIndex).style.visibility = 'visible';
    document.getElementById('value_'+cardIndex).innerHTML = nextCard['numAsString'] + ' of ' + nextCard['suit'];

    if(hiLo!==null){
        let currentCard = drawnCards[cardIndex-2];
        if( (hiLo==='higher' && nextCard['num']<=currentCard['num']) || (hiLo==='lower' && nextCard['num']>=currentCard['num']) ){
            losses++;
            activeGame = false;
            alert('Sorry, you lost!');
            showResetGameButton();
        } else if(cardIndex===5) {
            wins++;
            alert('Congratulations, you win!');
            showResetGameButton();
        }
    }
}

function showResetGameButton()
{
    document.getElementById('higher').style.visibility = 'hidden';
    document.getElementById('lower').style.visibility = 'hidden';
    document.getElementById('resetGame').style.visibility = 'visible';
    updateWinsLosses();
}

function showHiLoButtons()
{
    document.getElementById('higher').style.visibility = 'visible';
    document.getElementById('lower').style.visibility = 'visible';
    document.getElementById('resetGame').style.visibility = 'hidden';
}

function updateWinsLosses()
{
    document.getElementById('wins').innerHTML = wins.toString();
    document.getElementById('losses').innerHTML = losses.toString();
}

document.addEventListener("DOMContentLoaded", function() {

    initialise();

    document.getElementById('higher').onclick = function () {
        playNextCard('higher');
    }

    document.getElementById('lower').onclick = function () {
        playNextCard('lower');
    }

    document.getElementById('resetGame').onclick = function () {
        resetCards();
        playNextCard(null);
        showHiLoButtons();
    }
});
