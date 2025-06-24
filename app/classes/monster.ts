import { EffectType } from "./effecttype";
import { Entity } from "./entity";

export class Monster extends Entity {

  //The constructor automatically creates and assigns the values to class properties
  
  fightValue: Array<number> = [];

  constructor(entityID: number = 2,
    name: string = "Monster",

    currentHealthPoints: number = 100,
    maxHealthPoints: number = 100,

    currentAttack: number = 20,
    maxAttack: number = 999,

    currentDefense: number = 10,
    maxDefense: number = 999,

    startInventory: Array<number> = [2, 1, 0, 99, 0, 99],
    sprite:number = require("../../assets/images/Werwolf.png"),

    fightValue: Array<number> = [1,1,1,1,1,1],

    protected resistance: number = EffectType.HEILUNG,
    protected weakness: number = EffectType.HEILUNG
  ) {

    // Rufe den Entity-Konstruktor mit spezifischen Startwerten auf

    super(
      entityID,
      name,
      currentHealthPoints,
      maxHealthPoints,
      currentAttack,
      maxAttack,
      currentDefense,
      maxDefense,
      startInventory,
      sprite);
      
    this.fightValue = fightValue;
  }

  setName(n:string):void{this.name = n; console.log("yup yup were name setter maxxing")}
  setSprite(s:number):void{
    this.sprite = s; //12:werwolf, 13:greif
    }
  getFightValue(a:number):number {return this.fightValue[a]}
  setResistance(r:number): void{this.resistance = r;}
  setWeakness(w:number): void{this.weakness = w;}
  getResistance(): number { return this.resistance; }
  getWeakness(): number { return this.weakness; }
}
export default Monster;