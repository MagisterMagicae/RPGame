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

   FightController(action:number): void {
        const { fightStore } = rootStore;
        const { inventoryStore } = rootStore;
        // Ensure we have a player
        if (!fightStore.player) {
            throw new Error("No active player found. Please start a new game first.");
        }

        if (fightStore.gameOver || fightStore.playerVictory) {
            this.endFight();
            return;
        }

        // Player's turn
        switch(action){
            case 0:
                this.outDamage();
                break;
            case 1:
                this.outDamage();
                break;
            case 2:
                this.outDamage();
                break;
            case 3:
                this.useItem(3);
                break;
            case 4:
                this.useItem(4);
                break;
            case 5:
                this.useItem(5);
                break;
        }
        this.checkHealth(fightStore.currentMonster!);

        // If the fight isn't over after player's turn, do enemy turn
        if (!fightStore.gameOver && !fightStore.playerVictory) {
            setTimeout(() => {
                this.enemyTurn();
                if (fightStore.player) {
                    this.checkHealth(fightStore.player);
                }
            }, 1000); // Add a 1 second delay for better UX
        }
    }

    enemyTurn(): void {
        const { fightStore } = rootStore;
        rootStore.fightStore.setTurn(false);
        this.inDamage();
    }

    inDamage(): void {
        const { fightStore } = rootStore;
        if (!fightStore.player || !fightStore.currentMonster) return; //Sicherheitscheck
        const damage = Math.max(0,fightStore.currentMonster.getCurrentAttack()+10-fightStore.player.getCurrentDefense());
        fightStore.setDescription(`${fightStore.currentMonster.getName()} greift an und verursacht ${damage} Schaden!`);
        fightStore.player.mathCurrentHealthPoints(-damage);
    }

    outDamage(): void {
        const { fightStore } = rootStore;
        if (!fightStore.player || !fightStore.currentMonster) return; //Sicherheitscheck
        const damage = Math.max(0,fightStore.player.getCurrentAttack() - fightStore.currentMonster.getCurrentDefense());
        fightStore.setDescription(`${fightStore.player.getName()} greift an und verursacht ${damage} Schaden!`);
        fightStore.currentMonster.mathCurrentHealthPoints(-damage);
    }

    checkHealth(entity: Entity): void {
        const { fightStore } = rootStore;

        if (!fightStore.player || !fightStore.currentMonster) return;

        const playerDead = fightStore.player.getCurrentHealthPoints() <= 0;
        const monsterDead = fightStore.currentMonster.getCurrentHealthPoints() <= 0;

        // Beide sind tot → Game Over
        if (playerDead && monsterDead) {
            fightStore.setGameOver(true);
            fightStore.setDescription("Du wurdest besiegt!");
            return;
        }

        // Nur Spieler tot → Game Over
        if (playerDead) {
            fightStore.setGameOver(true);
            fightStore.setDescription("Du wurdest besiegt!");
            return;
        }

        // Nur Gegner tot → Victory
        if (monsterDead) {
            fightStore.setPlayerVictory(true);
            fightStore.setDescription(`Du hast ${fightStore.currentMonster.getName()} besiegt!`);
            return;
        }
    }

    useItem(itemIndex:number): void {
        const {fightStore} = rootStore;
        const{ inventoryStore } = rootStore;
        if(inventoryStore.hasItem(itemIndex)){
        switch(itemIndex){
            case 3:
                fightStore.player?.mathCurrentHealthPoints(20);
                fightStore.setDescription(`Du benutzt einen Heiltrank. Du regenerierst 30 HP!`);
                break;
            case 4:
                fightStore.player?.mathCurrentAttack(5);
                fightStore.setDescription(`Du benutzt eine Zauberkugel. Dein Angriff steigt um 10!`);
                break;
            case 5:
                fightStore.player?.mathCurrentDefense(2);
                fightStore.setDescription(`Du benutzt einen Umhang. Deine Verteidigung steigt um 2!`);
                break;
            default:
        }
    }
    else{
    switch(itemIndex){
            case 3:
                fightStore.setDescription(`Du hast keine Heiltränke mehr...`);
                break;
            case 4:
                fightStore.setDescription(`Du hast keine Zauberkugeln mehr...`);
                break;
            case 5:
                fightStore.setDescription(`Du hast keine Umhänge mehr...`);
                break;
            default:
        }
    }
    inventoryStore.mathAmount(itemIndex, -1);
    }

    endFight(): void {
        const { fightStore } = rootStore;
        fightStore.resetFight();
    }
}
