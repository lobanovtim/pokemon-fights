import game from "./main.js";
import random from "./utils.js";

const $logs = document.querySelector('#logs')
const logArr = [];

const allButtons = document.querySelectorAll('.button')

const deleteButton = () =>{
    allButtons.forEach(item => {
        item.remove();
    });
}

const clearLog = () => {
    logArr.forEach(item => {
        item.remove();
    });
}


const renderLog = (player1, player2, count) => {
    let log = generateLog(player1, player2, count);
    logArr.push(log);
    const $p = document.createElement('p');
    $p.innerText = `${log}`;  
    $logs.insertBefore($p, $logs.children[0]);

    if (player1.hp.current <= count) {
        player1.hp.current = 0;
        $p.innerText = `Бедный ${player1.name} проиграл бой!`;
        $logs.insertBefore($p, $logs.children[0]);
        deleteButton();
        game.gameOver();
    }
    if (player1.hp.current < count && player2.hp.current < count) {
        player1.hp.current = 0;
        player2.hp.current = 0;
        $p.innerText = `Бой был равный! Ничья.`
        $logs.insertBefore($p, $logs.children[0]);
        deleteButton();
        game.gameOver();
    }
}

function generateLog(player1, player2, count) {
    const { name, hp: {current, total} } = player1;
    const { name: enemyName } = player2;

    const logs = [
        `${name} вспомнил что-то важное, но неожиданно ${enemyName}, не помня себя от испуга, ударил в предплечье враг. -${count}HP[${current}/${total}]`, 
        `${name} поперхнулся, и за это ${enemyName} с испугу приложил прямой удар коленом в лоб врага. -${count}HP[${current}/${total}]`,
        `${name} забылся, но в это время наглый ${enemyName}, приняв волевое решение, неслышно подойдя сзади, ударил. -${count}HP[${current}/${total}]`,
        `${name} пришел в себя, но неожиданно ${enemyName} случайно нанес мощнейший удар. -${count}HP[${current}/${total}]`,
        `${name} поперхнулся, но в это время ${enemyName} нехотя раздробил кулаком \<вырезанно цензурой\> противника. -${count}HP[${current}/${total}]`,
        `${name} удивился, а ${enemyName} пошатнувшись влепил подлый удар. -${count}HP[${current}/${total}]`,
        `${name} высморкался, но неожиданно ${enemyName} провел дробящий удар. -${count}HP[${current}/${total}]`,
        `${name} пошатнулся, и внезапно наглый ${enemyName} беспричинно ударил в ногу противника. -${count}HP[${current}/${total}]`,
        `${name} расстроился, как вдруг, неожиданно ${enemyName} случайно влепил стопой в живот соперника. -${count}HP[${current}/${total}]`,
        `${name} пытался что-то сказать, но вдруг, неожиданно ${enemyName} со скуки, разбил бровь сопернику. -${count}HP[${current}/${total}]`
    ];
    
    return logs[random(0, (logs.length - 1))];
};

export default renderLog;