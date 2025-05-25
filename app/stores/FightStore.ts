import { makeAutoObservable } from 'mobx';
import { Monster } from '../classes/monster';
import { Player } from '../classes/player';
import { RootStore } from './RootStore';

export class FightStore {
    isTurn: boolean = false;
    gameOver: boolean = false;
    playerVictory: boolean = false;
    currentMonster: Monster | null = null;
    player: Player | null = null;

    constructor(private rootStore: RootStore) {
        makeAutoObservable(this);
    }

    initializePlayer(name: string) {
        // Only initialize if player doesn't exist yet
        if (!this.player) {
            this.player = new Player(1, name);
        }
    }

    hasActivePlayer(): boolean {
        return this.player !== null;
    }

    setCurrentMonster(id: number, name: string) {
        this.currentMonster = new Monster(id, name);
    }

    setTurn(value: boolean) {
        this.isTurn = value;
    }

    toggleTurn() {
        this.isTurn = !this.isTurn;
    }

    get isPlayerTurn() {
        return this.isTurn;
    }

    get isMonsterTurn() {
        return !this.isTurn;
    }

    setGameOver(value: boolean) {
        this.gameOver = value;
    }

    setPlayerVictory(value: boolean) {
        this.playerVictory = value;
    }

    // Reset fight state but keep player
    resetFight() {
        this.isTurn = false;
        this.gameOver = false;
        this.playerVictory = false;
        this.currentMonster = null;
    }
} 