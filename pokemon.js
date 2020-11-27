class Selectors {
    constructor(name) {
        this.elHp = document.getElementById(`health-${name}`);
        this.elProgressbar = document.getElementById(`progressbar-${name}`);
    }
}

class Pokemon extends Selectors {
    constructor({name, defulHP, damageHP, type, selectors}) {
        super(selectors);

        this.name = name;
        this.defulHP = defulHP;
        this.damageHP = damageHP;
        this.type = type;
        this.lastDamageHP;

        this.renderHP();
    }
    renderHP = () => {
        this.renderHPLife();
        this.renderProgressBarHP();
    }
    
    renderHPLife = () => {
        const{ elHp, damageHP, defulHP} = this;

        elHp.innerText = damageHP + '/' + defulHP;
    }
    
    renderProgressBarHP = () => {
        this.elProgressbar.style.width = this.damageHP + '%';
    }

    changeHP = (count, cb) => {

        this.damageHP -= count;
        this.lastDamageHP = count;

        if (this.damageHP <= count) {
            this.damageHP = 0;
        }

        this.renderHP();
        cb && cb(count);
    }


}


export default Pokemon;