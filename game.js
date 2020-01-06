// Zobacz gotowy projekt: https://websamuraj.pl/examples/js/projekt7/
const game = {
    playerHand: "",
    aiHand: ""
}

const gameStats = {
    games: 0,
    wins: 0,
    losses: 0,
    draws: 0,
}

const hands = [...document.querySelectorAll('.select img')];
const play = document.querySelector('button');

// Wybór gracza
function handSelection() {
    // console.log(this);
    game.playerHand = this.dataset.option;
    hands.forEach(hand => hand.style.boxShadow = '');
    this.style.boxShadow = '0 0 4px 4px green';


}
hands.forEach(hand => hand.addEventListener('click', handSelection));

function aiChoice() {
    return hands[Math.floor(Math.random() * 3)].dataset.option;
}

function checkResult(player, ai) {
    console.log(player, ai);

    if (player === ai) {
        console.log('remis');
        return 'draw'
    } else if ((player === 'papier' && ai === 'kamień') || (player === 'kamień' && ai === 'nożyczki') || (player === 'nożyczki' && ai === 'papier')) {
        console.log('wygrałeś');
        return 'win'
    } else {
        console.log('przegrałeś');
        return 'loss';
    }
}

// wyświetlanie wyniku
function publishGameStats(player, ai, result) {
    document.querySelector('[data-summary="your-choice"]').textContent = player;
    document.querySelector('[data-summary="ai-choice"]').textContent = ai;
    if (result === 'win') {
        document.querySelector('[data-summary="who-win"]').textContent = 'Wygrałeś';
        document.querySelector('[data-summary="who-win"]').style.color = 'green';
        document.querySelector('.wins span').textContent = `${++gameStats.wins}`;
    } else if (result === "loss") {
        document.querySelector('[data-summary="who-win"]').textContent = 'Przegrałeś';
        document.querySelector('[data-summary="who-win"]').style.color = 'red';
        document.querySelector('.losses span').textContent = `${++gameStats.losses}`;
    } else {
        document.querySelector('[data-summary="who-win"]').textContent = 'Remis';
        document.querySelector('[data-summary="who-win"]').style.color = 'gray';
        document.querySelector('.draws span').textContent = `${++gameStats.draws}`;

    }

    document.querySelector('.numbers span').textContent = `${++gameStats.games}`;
    document.querySelector('.ratio span').textContent = `${Math.floor((gameStats.wins/gameStats.games)*100)}%`;

}

// Gra
function Game() {
    if (game.playerHand) {
        game.aiHand = aiChoice();
        const gameResult = checkResult(game.playerHand, game.aiHand);
        publishGameStats(game.playerHand, game.aiHand, gameResult);

        game.playerHand = '';
        game.aiHand = '';
        hands.forEach(hand => hand.style.boxShadow = '');
    } else {
        alert('wybierz dłoń')
    }

}


play.addEventListener('click', Game);