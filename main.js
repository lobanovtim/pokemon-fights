const $btnKick = document.getElementById('btn-kick');
const $btnPush = document.getElementById('btn-push');

const character = {
    name: 'Pikachu',
    defulHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character'),
}

const enemy = {
    name: 'character',
    defulHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-enemy'),
    elProgressbar: document.getElementById('progressbar-enemy'),
}

$btnKick.addEventListener('click', function() {
    console.log(`Kick`);
    changeHP(random(20), character);
    changeHP(random(20), enemy);
});

$btnPush.addEventListener('click', function() {
    console.log(`Push`);
    changeHP(random(10), character);
    changeHP(random(10), enemy);
});

function init() {
    console.log('Start Game!');
    renderHP(character);
    renderHP(enemy);
}

function renderHP(person) {
    renderHPLife(person);
    renderProgressBarHP(person);
}

function renderHPLife(person) {
    person.elHP.innerText = person.damageHP + ' / '+ person.defulHP;
}

function renderProgressBarHP(person) {
    person.elProgressbar.style.width = person.damageHP + '%';
}

function changeHP(count, person) {
    if (person.damageHP < count) {
        person.damageHP = 0;
        alert('Бедный ' + person.name +' проиграл бой!');
        $btnKick.disabled = true;
        $btnPush.disabled = true;
    } else {
        person.damageHP -= count;
    }

    renderHP(person);
}

function random(num) {
    return Math.ceil(Math.random() * num)
}

init();
