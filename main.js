import Pokemon from "./pokemon.js";
import random from "./utils.js";

const player1 = new Pokemon({
    name: 'Pikachu',
    type: 'electric',
    defulHP: 100,
    damageHP: 100,
    selectors: 'character',
});

const player2 = new Pokemon({
    name: 'Chermander',
    type: 'fire',
    defulHP: 100,
    damageHP: 100,
    selectors: 'enemy',
});

console.log(player1)

function getElById(id) {
    return document.getElementById(id);
}

const $btnKick = getElById('btn-kick');
const $btnPush = getElById('btn-push');
const $logs = document.querySelector('#logs')


const amountKick = new counter();
const amountPush = new counter();;
const maxKicks = 6;

function counter() {
    this.count = 0;
    this.addCount = function() {
        this.count += 1;
    }
}
$btnKick.textContent = `Thunder Jolt [${maxKicks} из ${maxKicks}] ударов`;
$btnKick.addEventListener('click', function() {
    console.log(`Kick`);
    player1.changeHP(random(20), function(count) {
        renderLog(player1, player2);
    });
    player2.changeHP(random(20), function(count) {
        renderLog(player1, player2);
    });
    amountKick.addCount();
    this.textContent = ``;
    this.textContent = `Thunder Jolt [${maxKicks - amountKick.count} из ${maxKicks} ударов]`;
    if (maxKicks <= amountKick.count) {
        $btnKick.disabled = true;
    }
  
});

$btnPush.textContent = `Tail Kick [${maxKicks} из ${maxKicks}] ударов`;
$btnPush.addEventListener('click', function() {
    console.log(`Push`);
    player1.changeHP(random(20), function(count) {
        renderLog(player1, player2);
    });
    player2.changeHP(random(20), function(count) {
        renderLog(player1, player2);
    });
    amountPush.addCount();
    this.textContent = ``;
    this.textContent = `Tail Kick [${maxKicks - amountPush.count} из ${maxKicks} ударов]`;
    if (maxKicks <= amountPush.count) {
        $btnPush.disabled = true;
    }});

const renderLog = function(player1, player2) {
    // this.damageHP -= count;
    // this.lastDamageHP = count;
    console.log(this);
    const log = this === player1 ? generateLog(player1, player2) : generateLog(player2, player1);
    const $p = document.createElement('p');
    
    $p.innerText = `${log}`;  
    $logs.insertBefore($p, $logs.children[0]);

    // if (this.damageHP <= count) {
    //     this.damageHP = 0;
    //     $p.innerText = `Бедный ${this.name} проиграл бой!`;
    //     $logs.insertBefore($p, $logs.children[0]);
    //     $btnKick.disabled = true;
    //     $btnPush.disabled = true;
    // }

    // if (this.damageHP === count) {
    //     $p.innerText = `Бой был равный! Ничья.`
    // }
    
}

function generateLog(toPerson, fromPerson) {
    const logs = [
        `${toPerson.name} вспомнил что-то важное, но неожиданно ${fromPerson.name}, не помня себя от испуга, ударил в предплечье враг. -${toPerson.lastDamageHP}HP[${toPerson.damageHP}/${toPerson.defulHP}]`, 
        `${toPerson.name} поперхнулся, и за это ${fromPerson.name} с испугу приложил прямой удар коленом в лоб врага. -${toPerson.lastDamageHP}HP[${toPerson.damageHP}/${toPerson.defulHP}]`,
        `${toPerson.name} забылся, но в это время наглый ${fromPerson.name}, приняв волевое решение, неслышно подойдя сзади, ударил. -${toPerson.lastDamageHP}HP[${toPerson.damageHP}/${toPerson.defulHP}]`,
        `${toPerson.name} пришел в себя, но неожиданно ${fromPerson.name} случайно нанес мощнейший удар. -${toPerson.lastDamageHP}HP[${toPerson.damageHP}/${toPerson.defulHP}]`,
        `${toPerson.name} поперхнулся, но в это время ${fromPerson.name} нехотя раздробил кулаком \<вырезанно цензурой\> противника. -${toPerson.lastDamageHP}HP[${toPerson.damageHP}/${toPerson.defulHP}]`,
        `${toPerson.name} удивился, а ${fromPerson.name} пошатнувшись влепил подлый удар. -${toPerson.lastDamageHP}HP[${toPerson.damageHP}/${toPerson.defulHP}]`,
        `${toPerson.name} высморкался, но неожиданно ${fromPerson.name} провел дробящий удар. -${toPerson.lastDamageHP}HP[${toPerson.damageHP}/${toPerson.defulHP}]`,
        `${toPerson.name} пошатнулся, и внезапно наглый ${fromPerson.name} беспричинно ударил в ногу противника. -${toPerson.lastDamageHP}HP[${toPerson.damageHP}/${toPerson.defulHP}]`,
        `${toPerson.name} расстроился, как вдруг, неожиданно ${fromPerson.name} случайно влепил стопой в живот соперника. -${toPerson.lastDamageHP}HP[${toPerson.damageHP}/${toPerson.defulHP}]`,
        `${toPerson.name} пытался что-то сказать, но вдруг, неожиданно ${fromPerson.name} со скуки, разбил бровь сопернику. -${toPerson.lastDamageHP}HP[${toPerson.damageHP}/${toPerson.defulHP}]`
    ];
    
    return logs[random(logs.length) - 1];
};
