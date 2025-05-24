import { Entity } from "./entity";

export class Monster extends Entity {
  constructor(entityID: number, name: string) {
    // Beispielwerte für Monster
    super(entityID, name,100, 20, 10); // MaxHP, Attack, Defense
  }
}