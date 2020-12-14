import Pokemon from "./pokemon.js";
import random from "./utils.js";
import renderLog from "./renderLog.js";



class Game {
    getPokemons = async () => {
        const responce = await fetch ('https://reactmarathon-api.netlify.app/api/pokemons');
        const body = await responce.json();
        return body;
    }

    getRandomPokemon = async () => {
        const responce = await fetch ('https://reactmarathon-api.netlify.app/api/pokemons?random=true');
        const body = await responce.json();
        return body;
    }

    start = async () => {
        const $btn = document.createElement('button');
        const $control = document.querySelector('.control');
        const pokemons = await this.getPokemons();
        const allButtons = [];
        let randomHero = {};
        let randomEnemy = {};
        const findRivals = () => {
            const player1 = pokemons[random(0, pokemons.length)];
            const player2 = pokemons[random(0, pokemons.length)];
            if (player1.name != player2.name) {
                return(randomHero = player1, randomEnemy = player2);
            }
            else {
                findRivals();
            }
        }

        findRivals()
        
        let player1 = new Pokemon({
            ...randomHero,
            selectors: 'player1',
        });

        let player2 = new Pokemon({
            ...randomEnemy,
            selectors: 'player2',
        });

        const buttonStart = () => {
            $btn.classList.add('button');
            $btn.innerText = `Начинаем бой?`;
            $control.appendChild($btn).addEventListener('click', function() {
                $btn.remove();
                renderEnemy1();
                renderEnemy2();
                renderButton();
            });
        };

        const renderEnemy1 = () => {
            const $elImg = document.getElementById('img-player1');
            const $elName = document.getElementById('name-player1');
            $elImg.src = randomHero.img;
            $elName.innerText = randomHero.name;
        }

        const renderEnemy2 = () => {
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
                    btnCount();
                    player1.changeHP(random(item.minDamage, item.maxDamage), function(count) {
                        renderLog(player1, player2, count);
                    });
                    player2.changeHP(random(item.minDamage, item.maxDamage), function(count) {
                            renderLog(player2, player1, count);
                    });
                })
                allButtons.push($control.appendChild($btn));
            });
        };

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
                ...randomHero,
                selectors: 'player1',
            });
            player2 = new Pokemon({
                ...randomEnemy,
                selectors: 'player2',
            });
            buttonStart();
        }

        startGame();
    }

    gameOver = () => {
        const $btn = document.createElement('button');
        const $control = document.querySelector('.control');
        $control.innerHTML = ``;
        $btn.classList.add('button');
        $btn.innerText = `Game Over. Начать сначала?`;
        $control.appendChild($btn).addEventListener('click', () => {
            let $logs = document.querySelector('#logs');
            let newLogs = $logs.querySelectorAll('p');
            newLogs.forEach(item  => {
                item.remove();
            })
            $btn.remove();
            this.start();
        });
    }
}

const game = new Game();
game.start();

export default game;