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
        
        if(!fightStore.gameOver || !fightStore.playerVictory) {
            this.enemyTurn();
            this.checkHealth(fightStore.player);
            fightStore.setTurn(true); // Player's turn
            this.useItem();
            this.outDamage();
            this.checkHealth(fightStore.currentMonster!);
        } else {
            this.endFight();
        }
    }

    enemyTurn(): void {   //Funktion um nächsten Move vom Gegner zu bestimmen, aktuell können Gegner nur hauen
        rootStore.fightStore.setTurn(false);
        this.inDamage();
    }

    inDamage(): void {   
        const { fightStore } = rootStore;
        if (!fightStore.player || !fightStore.currentMonster) return;
        // TODO: Implement monster damage to player using fightStore.player
    }

    outDamage(): void {   
        const { fightStore } = rootStore;
        if (!fightStore.player || !fightStore.currentMonster) return;
        // TODO: Implement player damage to monster using fightStore.currentMonster
    }

    checkHealth(entity: Entity): void {
        const { fightStore } = rootStore;
        if (!fightStore.player || !fightStore.currentMonster) return;
        // TODO: Implement health check and update fightStore.gameOver and fightStore.playerVictory accordingly
    }

    useItem(): void {
        const { fightStore } = rootStore;
        if (!fightStore.player) return;
        // TODO: Implement item usage for fightStore.player
    }

    endFight(): void {
        const { fightStore } = rootStore;
        // Handle fight end using fightStore state but keep player stats
        fightStore.resetFight();
    }
} 