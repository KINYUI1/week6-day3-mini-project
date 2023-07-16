
const ahull = document.querySelector('#ahull');
const ahulla = document.querySelector('#ahulla');
const accuracy = document.querySelector('#aaccuracy');
const afirepower = document.querySelector('#afirepower');
const aname = document.querySelector('#aname');
const hhull = document.querySelector('#hhull');
const hfirepower = document.querySelector('#hfirepower');
const haccuracy = document.querySelector('#haccuracy');
const hname = document.querySelector('#hname');


class Ship{
    constructor(hull,firepower,accuracy,name){
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
        this.name = name
    }
    
    attack(target){
        if(Math.random() < this.accuracy){
            console.log(`${this.name} hit the ${target.name}`);
            target.hull -= this.firepower;
           
        }else{
            console.log(`${this.name} have missed the ${target.name}`);
        }
    }
    
}


// human ship class extends from ship
class HShip extends Ship{
    constructor(){
        super(20,5,.7,'USS Assembly');
    }
    
}

//Alien ship class exteds from ship

class AShip extends Ship{
    constructor(){
        const hull = Math.floor(Math.random() * 4) + 3;
        const firepower = Math.floor(Math.random() * 3) + 2;
        const accuracy = (Math.random() * 0.3) + 0.6;
        super(hull,firepower,accuracy,'Alien ship')
    }

}

const humanShip = new HShip();
const alienShips = [];
for(let i = 0 ; i <= 4 ; i++){
    alienShips.push(new AShip());
}

for(let alienship of alienShips){
    
    hhull.textContent = `Hull: ${humanShip.hull}`;
    haccuracy.textContent = `Accuracy: ${humanShip.accuracy}`;
    hname.textContent = `Name: ${humanShip.name}`;
    hfirepower.textContent = `Firepower: ${humanShip.firepower}`;
    ahull.textContent = `Hull: ${alienship.hull}`;
    accuracy.textContent = `Accuracy: ${alienship.accuracy}`;
    afirepower.textContent = `Firepower: ${alienship.firepower}`;
    aname.textContent = `Name: ${alienship.name + (alienShips.indexOf(alienship)+1)}`;
    humanShip.attack(alienship);
    alienship.hull -= humanShip.firepower;
    while((humanShip.hull >0) && (alienship.hull > 0)){
        alienship.attack(humanShip);
        humanShip.hull -= alienship.firepower;
        humanShip.attack(alienship);
        alienship.hull -= humanShip.firepower;
    }
    if(alienship.hull <= 0){
        ahulla.textContent = `Hull: ${alienship.hull}`;
        let result = window.confirm(`Alien ship ${alienShips.indexOf(alienship)+1} has been destroyed continue?`);
       
        if(result === false){
            window.alert(`you retreated and forfaited the battle`);
            break;
        }
    }
    if(humanShip.hull <= 0){
        window.alert(`you loose`);
    }
}