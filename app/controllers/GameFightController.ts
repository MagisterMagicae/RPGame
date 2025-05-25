import { Entity } from "../classes/entity";
import { rootStore } from "../stores/RootStore";

export class GameFightController {

    constructor() {
        const { fightStore } = rootStore;
        fightStore.setCurrentMonster(2, "Werwolf");
    }

    startNewGame(playerName: string): boolean {
        const { fightStore } = rootStore; 
        // Initialize player if not exists
        if (!fightStore.hasActivePlayer()) {
            fightStore.initializePlayer(playerName);
        }
        // Reset fight state but keep player stats
        fightStore.resetFight();
        fightStore.setCurrentMonster(2, "Werwolf");
        return true;
    }

    GameFightController(): void {
        const { fightStore } = rootStore;
        
        // Ensure we have a player
        if (!fightStore.player) {
            throw new Error("No active player found. Please start a new game first.");
        }
        
        while(!fightStore.gameOver || !fightStore.playerVictory) {
            this.enemyTurn();
            this.checkHealth(fightStore.player);
            fightStore.setTurn(true); // Player's turn
            this.useItem();
            this.outDamage();
            this.checkHealth(fightStore.currentMonster!);
        }
        if (fightStore.gameOver || fightStore.playerVictory) {
            this.endFight();
        }
    }

    enemyTurn(): void {   //Funktion um nächsten Move vom Gegner zu bestimmen, aktuell können Gegner nur hauen
        const { fightStore } = rootStore;
        rootStore.fightStore.setTurn(false);
        this.inDamage();
    }

    inDamage(): void {   
        const { fightStore } = rootStore;
        if (!fightStore.player || !fightStore.currentMonster) return; //Sicherheitscheck
        const damage = fightStore.currentMonster.getCurrentAttack();
        fightStore.setDescription(`${fightStore.currentMonster.getName()} greift an und verursacht ${damage} Schaden!`);
        fightStore.player.mathCurrentHealthPoints(-damage);
    }

    outDamage(): void {   
        const { fightStore } = rootStore;
        if (!fightStore.player || !fightStore.currentMonster) return; //Sicherheitscheck
        const damage = fightStore.player.getCurrentAttack();
        fightStore.setDescription(`${fightStore.player.getName()} greift an und verursacht ${damage} Schaden!`);
        fightStore.currentMonster.mathCurrentHealthPoints(-damage);
    }

    checkHealth(entity: Entity): void {
        //hi krystyna, pls setze fightstore.gameover auf true wenn der Player stirbt oder fightstore.playervictory auf true wenn der Gegner stirbt
    }

    useItem(): void { //hi alex wir müssten wahrscheinlich einen Inventory store anlegen und dann hier die items auslesen
    }

    endFight(): void {
        const { fightStore } = rootStore;
        //hi krystyna, am Ende resetFight() aufrufen pls
        fightStore.resetFight();
    }
} 