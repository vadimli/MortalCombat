const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const player1 = {
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['kunai', 'sword'],
    attack: function() {
        console.log(scorpion.name + ' Fight...');
    },
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP
};

const player2 = {
    player: 2,
    name: 'Sab-Zero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['scepter', 'sword'],
    attack: function() {
        console.log(subZero.name + ' Fight...');
    },
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP
};

function createElement(tag, className) {
    const $tag = document.createElement(tag);

    if  (className) {
        $tag.classList.add(className);
    }

    return $tag;
}

function createPlayer(hero) {
    const $player = createElement('div', 'player'+hero.player);
    const $progressbar = createElement('div', 'progressbar');
    const $character = createElement('div', 'character');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $img = createElement('img');

    $life.style.width = `${hero.hp}%`;
    $name.innerText = hero.name;
    $img.src = hero.img;

    $progressbar.appendChild($life);
    $progressbar.appendChild($name);

    $character.appendChild($img);
    
    $player.appendChild($progressbar);
    $player.appendChild($character);

    return $player;
};

function getRandom(num) {
    return Math.ceil(Math.random() * num);
    
}

function changeHP(damage) {
    this.hp -= damage;

    if (this.hp <= 0) {
        this.hp = 0;
    }
}

function elHP() {
    return document.querySelector(`.player${this.player} .life`)
}

function renderHP() {
   return this.elHP().style.width = `${this.hp}%`;
}

function playerWins(name) {
    const $winsTitle = createElement('div', 'loseTitle');
    if (name) {
        $winsTitle.innerText = `${name} wins`
    } else {
        $winsTitle.innerText = 'draw'
    }
    return $winsTitle;

}

$randomButton.addEventListener('click', function () {
    player1.changeHP(getRandom(20));
    player2.changeHP(getRandom(20));
    player1.renderHP();
    player2.renderHP();

    if (player1.hp === 0 || player2.hp === 0) {
        $randomButton.disabled = true; 
        const reloadButton =  createReloadButton();
        
        reloadButton.addEventListener('click', function() {
            window.location.reload();
        });

        $arenas.appendChild(reloadButton);
    }

    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(playerWins(player2.name));
    } else if(player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerWins(player1.name));
    } else if (player1.hp === 0 && player2.hp === 0){
        $arenas.appendChild(playerWins());
    }

});

function createReloadButton() {
    const reloadWrap = createElement('div', 'reloadWrap');
    const reloadButton = createElement('button', 'button');

    reloadButton.innerText = 'Restart';
    reloadWrap.appendChild(reloadButton);



    return reloadWrap;
}


$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));




