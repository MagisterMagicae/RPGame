import { makeAutoObservable } from 'mobx';
import EffectType from '../classes/effecttype';
import { Monster } from '../classes/monster';
import { Player } from '../classes/player';
import { RootStore } from './RootStore';

export class FightStore {
    gameOver: boolean = false;
    playerVictory: boolean = false;
    currentMonster: Monster | null = null;
    player: Player | null = null;
    fightDescription: string = '';

    constructor(private rootStore: RootStore) {
        makeAutoObservable(this);
    }

    setDescription(text: string) {
        this.fightDescription = text;
    }

    initializePlayer(name: string) {
        // Only initialize if player doesn't exist yet
        if (!this.player) {
            this.player = new Player(1, name);
        }
    }

    setCurrentMonster() {
        if (!this.player) return; //Sicherheitscheck

        const rand = Math.floor(Math.random() * 3);
        var name: string;
        const Hp = Math.floor(this.player?.getMaxHealthPoints() + 50 * (Math.random() * 2 - 1));
        const Att = Math.floor(this.player?.getCurrentAttack() + 10 * (Math.random() * 2 - 1));
        const Dev = Math.floor(this.player?.getCurrentDefense() + 10 * (Math.random() * 2 - 1));
        switch (rand) {
            case 0:
                name = "Werwolf";
                this.currentMonster = new Monster(2, name, Hp, Hp, Att, 999, Dev, 999, [2, 1, 0, 5, 0, 2], require("../../assets/images/Werwolf.png"), EffectType.BOGEN, EffectType.STAB);
                this.setDescription(`Ein wilder ${name} erscheint!`);
                break;
            case 1:
                name = "Schleim";
                this.currentMonster = new Monster(2, name, Hp, Hp, Att, 999, Dev, 999, [2, 1, 0, 5, 0, 2], require("../../assets/images/Slime.png"), EffectType.SCHWERT, EffectType.BOGEN);
                this.setDescription(`Ein wilder ${name} erscheint!`);
                break;
            case 2:
                name = "Zombie";
                this.currentMonster = new Monster(2, name, Hp, Hp, Att, 999, Dev, 999, [2, 1, 0, 5, 0, 2], require("../../assets/images/Zombie.png"), EffectType.STAB, EffectType.SCHWERT);
                this.setDescription(`Ein wilder ${name} erscheint!`);
                break;

        }


    }

    setGameOver(value: boolean) {
        this.gameOver = value;
        if (value) {
            this.setDescription("Game Over!");
        }
    }

    setPlayerVictory(value: boolean) {
        this.playerVictory = value;
        if (value) {
            this.setDescription("Sieg! Du hast gewonnen!");
        }
    }

    resetFight() {
        this.gameOver = false;
        this.playerVictory = false;
        this.currentMonster = null;
        this.setDescription('');
    }
} 