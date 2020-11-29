import Pokemon from "./pokemon.js";
import random from "./utils.js";
import renderLog from "./renderLog.js";
import { pokemons } from "./pokemons.js";



const pikachu = pokemons.find(item => item.name === 'Pikachu')
let randomEnemy = pokemons[random(0, pokemons.length)];


export let player1 = new Pokemon({
    ...pikachu,
    selectors: 'player1',
});

export let player2 = new Pokemon({
    ...randomEnemy,
    selectors: 'player2',
});



// Первый удар из списка соперника
const firstKickEnemy = (player) => {
    const min = player.attacks[0].minDamage;
    const max = player.attacks[0].maxDamage;
    return([min, max]);
};
const minDamage = [];
const maxDamage = [];
export let allButtons = [];

player1.attacks.forEach(item => {
    minDamage.push(item.minDamage)
    maxDamage.push(item.maxDamage)
}) 

// const randomAttack = () => {
//     const attacks = [];
//     let newArr = []
//     allButtons.forEach(item => {
//         console.log(item.innerText);
//         console.log(player1.attacks.name);
//         if (item.innerText === player1.attacks.name) {
//             return(attacks.push(player1.attacks.maxDamage))
//         }
//     });
// }

    // for(let i = 0; i < minDamage.length; i++) {
    //     newArr = [minDamage[i], maxDamage[i]];
    //     attacks.push(newArr)
    // }
    // return(attacks);

//    let i = random(0, minDamage.length);
//    console.log([minDamage[i], maxDamage[i]])
//    return([minDamage[i], maxDamage[i]])

// console.log(randomAttack(minDamage, maxDamage));
// console.log(maxDamage[0])


const renderChengeHP = () => {
    allButtons.forEach(item => {
        item.addEventListener('click', function() {
            player1.changeHP(random(20, 40), function(count) {
                // console.log(randomAttack())
            renderLog(player1, count);
            });
            player2.changeHP(random(firstKickEnemy(player2)[0],firstKickEnemy(player2)[1]), function(count) {
                renderLog(player2, count);
            });
        });
    });
};


export const $btn = document.createElement('button');
const $control = document.querySelector('.control');

const renderEnemy = () => {
    const $elImg = document.getElementById('img-player2');
    const $elName = document.getElementById('name-player2');
    $elImg.src = randomEnemy.img;
    $elName.innerText = randomEnemy.name;
    }


const renderButton = () => {
    player1.attacks.forEach(item => {
        const $btn = document.createElement('button');
        $btn.classList.add('button');
        $btn.innerText = item.name;
        const btnCount = countBtn(item.maxCount, $btn);
        $btn.addEventListener('click', () => {
            btnCount()
        })

        allButtons.push($control.appendChild($btn));
        // console.log(allButtons);
    });
};

const buttonStart = () => {
    let $btns = $btn;
    $btns.classList.add('button');
    $btns.innerText = `Начинаем бой?`;
    $control.appendChild($btns).addEventListener('click', function() {
        $btns.remove();
        startGame();
    });
};

buttonStart();

function countBtn(count, el) {
    const innerText = el.innerText;
    el.innerText = `${innerText}(${count})`
    return function() {
        count--;
        if (count === 0) {
            el.disabled = true;
        }
        el.innerText = `${innerText}(${count})`
        return count;
    }
}


const startGame = () => {
    allButtons.forEach(item => {
        item.remove();
    });
        player1 = new Pokemon({
        ...pikachu,
        selectors: 'player1',
    });
    player2 = new Pokemon({
        ...randomEnemy,
        selectors: 'player2',
    });
    randomEnemy = pokemons[random(0, pokemons.length)];
    renderEnemy();
    renderButton();
    renderChengeHP();
}



export const gameOver = () => {
    let $btns = $btn;
    $btns.remove();
    $btn.classList.add('button');
    $btn.innerText = `Game Over. Начать сначала?`;
    $control.appendChild($btn).addEventListener('click', function() {
        startGame();
    });
}

export default randomEnemy;