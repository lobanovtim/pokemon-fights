class Selectors {
    constructor(name) {
        this.elHp = document.getElementById(`health-${name}`);
        this.elProgressbar = document.getElementById(`progressbar-${name}`);
    }
}

class Pokemon extends Selectors {
    constructor({name, hp, type, selectors, attacks = []}) {
        super(selectors);

        this.name = name;
        this.hp = {
            current: hp,
            total: hp,
        };
        this.type = type;
        this.attacks = attacks;

        this.renderHP();
    }

    renderHP = () => {
        this.renderHPLife();
        this.renderProgressBarHP();
    }

    renderHPLife = () => {
        const { elHp, hp: {current, total} } = this;
        elHp.innerText = current + '/' + total;
    }

    renderProgressBarHP = () => {
        const { elProgressbar, hp: {current, total} } = this;
        const procent = current / (total / 100);
        if (procent > 60) {
            elProgressbar.classList.remove('low');
            elProgressbar.classList.remove('critical');
        }
        if (procent <= 60 && procent >= 20) {
            elProgressbar.classList.add('low');
        }
        if (procent < 20) {
            elProgressbar.classList.add('critical');
        }
        elProgressbar.style.width = procent + '%';
    }

    changeHP = (count, cb) => {
        this.hp.current -= count;

        if (this.hp.current <= count) {
            this.hp.current = 0;
        }

        this.renderHP();
        cb && cb(count);
    }

}


export default Pokemon;