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
        const allButtons = []
        const pokemons = await this.getPokemons();
        const pikachu = pokemons.find(item => item.name === 'Pikachu')
        let randomEnemy = await this.getRandomPokemon()
        
        let player1 = new Pokemon({
            ...pikachu,
            selectors: 'player1',
        });

        let player2 = new Pokemon({
            ...randomEnemy,
            selectors: 'player2',
        });

        const buttonStart = () => {
            let $btns = $btn;
            $btns.classList.add('button');
            $btns.innerText = `Начинаем бой?`;
            $control.appendChild($btns).addEventListener('click', function() {
                $btns.remove();
                startGame();
            });
        };

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
        }

        buttonStart();
    }

    gameOver = () => {
        const $btn = document.createElement('button');
        const $control = document.querySelector('.control');
        $control.innerHTML = ``;
        $btn.classList.add('button');
        $btn.innerText = `Game Over. Начать сначала?`;
        $control.appendChild($btn).addEventListener('click', () => {
            $btn.remove();
            this.start();

        });
    }
}

const game = new Game();
game.start();

export default game;