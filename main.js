function getElById(id) {
    return document.getElementById(id);
}

const $btnKick = getElById('btn-kick');
const $btnPush = getElById('btn-push');
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
    changeHP: changeHP,
    renderHP: renderHP,
    renderHPLife: renderHPLife,
    renderProgressBarHP: renderProgressBarHP,

}

const enemy = {
    name: 'Character',
    defulHP: 200,
    damageHP: 100,
    elHP: getElById('health-enemy'),
    elProgressbar: getElById('progressbar-enemy'),
    changeHP: changeHP,
    renderHP: renderHP,
    renderHPLife: renderHPLife,
    renderProgressBarHP: renderProgressBarHP,
}

let characterDamageHP = 0;
let enemyDamageHP = 0;

const {name: nameCharacter} = character;
const {name: nameEnemy} = enemy;

$btnKick.addEventListener('click', function() {
    console.log(`Kick`);
    characterDamageHP = character.changeHP(random(20));
    enemyDamageHP = enemy.changeHP(random(20));
});

$btnPush.addEventListener('click', function() {
    console.log(`Push`);
    characterDamageHP = character.changeHP(random(10));
    enemyDamageHP = enemy.changeHP(random(10));
});

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

    const log = this === enemy ? generateLog(this, character) : generateLog(enemy, this);
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
    
    this.renderHP();
            
}

function generateLog(firstPerson, secondPerson) {
    const logs = [
        // Хотел использовать переменную-счётчик, но так и не понял, почему она не перезаписывается
        // Как пользоваться this в данном контексте? Ведь this.changeHP должен вызывать метод объекта в контексте
        `${nameCharacter} вспомнил что-то важное, но неожиданно ${nameEnemy}, не помня себя от испуга, ударил в предплечье враг -${characterDamageHP}HP[${character.damageHP}/${character.defulHP}]`, 
        `${nameCharacter} поперхнулся, и за это ${nameEnemy} с испугу приложил прямой удар коленом в лоб врага.`,
        `${nameCharacter} забылся, но в это время наглый ${nameEnemy}, приняв волевое решение, неслышно подойдя сзади, ударил.`,
        `${nameCharacter} пришел в себя, но неожиданно ${nameEnemy} случайно нанес мощнейший удар.`,
        `${nameCharacter} поперхнулся, но в это время ${nameEnemy} нехотя раздробил кулаком \<вырезанно цензурой\> противника.`,
        `${nameCharacter} удивился, а ${nameEnemy} пошатнувшись влепил подлый удар.`,
        `${nameCharacter} высморкался, но неожиданно ${nameEnemy} провел дробящий удар.`,
        `${nameCharacter} пошатнулся, и внезапно наглый ${nameEnemy} беспричинно ударил в ногу противника`,
        `${nameCharacter} расстроился, как вдруг, неожиданно ${nameEnemy} случайно влепил стопой в живот соперника.`,
        `${nameCharacter} пытался что-то сказать, но вдруг, неожиданно ${nameEnemy} со скуки, разбил бровь сопернику`
    ];
    
    return logs[random(logs.length) - 1];
};




init();

