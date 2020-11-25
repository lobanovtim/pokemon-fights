function getElById(id) {
    return document.getElementById(id);
}

const $btnKick = getElById('btn-kick');
const $btnPush = getElById('btn-push');
const $btns = document.querySelectorAll('.button');
const $logs = document.querySelector('#logs')

function random(num) {
    return Math.ceil(Math.random() * num)
}

const character = {
    name: 'Pikachu',
    defulHP: 100,
    damageHP: 100,
    elHP: getElById('health-character'),
    elProgressbar: getElById('progressbar-character'),
    changeHP,
    renderHP,
    renderHPLife,
    renderProgressBarHP,
    lastDamageHP: 0,

}

const enemy = {
    name: 'Character',
    defulHP: 100,
    damageHP: 100,
    elHP: getElById('health-enemy'),
    elProgressbar: getElById('progressbar-enemy'),
    changeHP,
    renderHP,
    renderHPLife,
    renderProgressBarHP,
    lastDamageHP: 0,
}

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
    characterDamageHP = character.changeHP(random(20));
    enemyDamageHP = enemy.changeHP(random(20));
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
    characterDamageHP = character.changeHP(random(10));
    enemyDamageHP = enemy.changeHP(random(10));
    amountPush.addCount();
    this.textContent = ``;
    this.textContent = `Tail Kick [${maxKicks - amountPush.count} из ${maxKicks} ударов]`;
    if (maxKicks <= amountPush.count) {
        $btnPush.disabled = true;
    }});

function init() {
    console.log('Start Game!');
    renderHP(character);
    renderHP(enemy);
}

function renderHP() {
    this.renderHPLife();
    this.renderProgressBarHP();
}

function renderHPLife() {
    this.elHP.innerText = Math.ceil(this.damageHP * this.defulHP / 100) + ' / '+ this.defulHP;
}

function renderProgressBarHP() {
    this.elProgressbar.style.width = this.damageHP + '%';
}

function changeHP(count, person) {
    this.damageHP -= count;
    this.lastDamageHP = count;

    const log = this === enemy ? generateLog(enemy, character) : generateLog(character, enemy);
    const $p = document.createElement('p');
    
    $p.innerText = `${log}`;  
    $logs.insertBefore($p, $logs.children[0]);

    if (this.damageHP <= count) {
        this.damageHP = 0;
        $p.innerText = `Бедный ${this.name} проиграл бой!`;
        $logs.insertBefore($p, $logs.children[0]);
        $btnKick.disabled = true;
        $btnPush.disabled = true;
    }

    if (this.damageHP === count) {
        $p.innerText = `Бой был равный! Ничья.`
    }
    
    this.renderHP();
}

function generateLog(toPerson, fromPerson) {
    const logs = [
        `${toPerson.name} вспомнил что-то важное, но неожиданно ${fromPerson.name}, не помня себя от испуга, ударил в предплечье враг. -${toPerson.lastDamageHP}HP[${character.damageHP}/${character.defulHP}]`, 
        `${toPerson.name} поперхнулся, и за это ${fromPerson.name} с испугу приложил прямой удар коленом в лоб врага. -${toPerson.lastDamageHP}HP[${character.damageHP}/${character.defulHP}]`,
        `${toPerson.name} забылся, но в это время наглый ${fromPerson.name}, приняв волевое решение, неслышно подойдя сзади, ударил. -${toPerson.lastDamageHP}HP[${character.damageHP}/${character.defulHP}]`,
        `${toPerson.name} пришел в себя, но неожиданно ${fromPerson.name} случайно нанес мощнейший удар. -${toPerson.lastDamageHP}HP[${character.damageHP}/${character.defulHP}]`,
        `${toPerson.name} поперхнулся, но в это время ${fromPerson.name} нехотя раздробил кулаком \<вырезанно цензурой\> противника. -${toPerson.lastDamageHP}HP[${character.damageHP}/${character.defulHP}]`,
        `${toPerson.name} удивился, а ${fromPerson.name} пошатнувшись влепил подлый удар. -${toPerson.lastDamageHP}HP[${character.damageHP}/${character.defulHP}]`,
        `${toPerson.name} высморкался, но неожиданно ${fromPerson.name} провел дробящий удар. -${toPerson.lastDamageHP}HP[${character.damageHP}/${character.defulHP}]`,
        `${toPerson.name} пошатнулся, и внезапно наглый ${fromPerson.name} беспричинно ударил в ногу противника. -${toPerson.lastDamageHP}HP[${character.damageHP}/${character.defulHP}]`,
        `${toPerson.name} расстроился, как вдруг, неожиданно ${fromPerson.name} случайно влепил стопой в живот соперника. -${toPerson.lastDamageHP}HP[${character.damageHP}/${character.defulHP}]`,
        `${toPerson.name} пытался что-то сказать, но вдруг, неожиданно ${fromPerson.name} со скуки, разбил бровь сопернику. -${toPerson.lastDamageHP}HP[${character.damageHP}/${character.defulHP}]`
    ];
    
    return logs[random(logs.length) - 1];
};

for (let i = 0; i <= $btns.lenght; i++) {
    $btns[i].addEventListener('click', function() {
        console.log(`boom`);
    });
}


init();

