import { Entity } from "../classes/entity";
import { Monster } from "../classes/monster";
import { Player } from "../classes/player";

export class GameFightController {
    protected isTurn: boolean;
    protected gameOver: boolean;
    protected playerVictory: boolean;

    protected currentMonster = new Monster(2, "Werwolf");
    protected player = new Player(1,"player");

    constructor(isTurn: boolean, gameOver: boolean, playerVictory: boolean) {
        this.isTurn = false; //false = Monster an der Reihe, wird aktuell nicht gelesen = nicht benutzt
        this.gameOver = false;
        this.playerVictory = false;
    }

    GameFightController(): void {
        if(this.gameOver == false || this.playerVictory == false) {
            this.enemyTurn();
            this.checkHealth(this.player);
            this.isTurn = true; // show "Your Turn"???
            this.useItem();
            this.outDamage();
            this.checkHealth(this.currentMonster);
        } else {
            this.endFight();
        }
    }

    enemyTurn(): void {   //Funktion um nächsten Move vom Gegner zu bestimmen, aktuell können Gegner nur hauen
        this.isTurn = false;
        this.inDamage();
    }

    inDamage(): void {   
        // TODO: Implement monster damage to player
    }

    outDamage(): void {   
        // TODO: Implement player damage to monster
    }

    checkHealth(entity: Entity): void {
        // TODO: Implement health check
    }

    useItem(): void {
        // TODO: Implement item usage
    }

    endFight(): void {
        // TODO: Implement fight end
    }
} 