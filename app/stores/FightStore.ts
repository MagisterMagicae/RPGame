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
    fightCount: number = 1;
    rewardText = 'Du erhältst: ';
    rewardTypes = [0,0,0,0,0,0];

    constructor(private rootStore: RootStore) {
        makeAutoObservable(this);
    }

    mathReward(){
        this.rewardText = 'Du erhältst: ';
        var rewardAmount = Math.floor(Math.random()*3+1); //Es können 1-3 Items erhalten werden, Anzahl zufällig
            while(rewardAmount > 0){
                this.rewardTypes[Math.floor(Math.random()*6)] += 1; //Erhöhung der Itemanzahl bzw. des Waffenlevels
            rewardAmount -= 1;
            }

            for(var i = 0; i < 6; i++){
                if(this.rewardTypes[i] != 0){
                    console.log(i);
                    if(i < 3){ //Waffen*level* werden erhalten
                        console.log(this.player?.inventory[i].getName() + 'level wird gerade eingefügt');
                        this.rewardText += this.player?.inventory[i].getName() + 'level, ';
                    }
                    else{
                        console.log(this.player?.inventory[i].getName() + ' wird gerade eingefügt');

                        this.rewardText += this.player?.inventory[i].getName() + ', ';
                    }
                }
                this.player?.inventory[i].mathAmount(this.rewardTypes[i]);
            }
            this.rewardText = this.rewardText.slice(0, this.rewardText.length-2);
            this.rewardText += '.';
            console.log(this.rewardText);
            for(var i = 0; i < 6; i++){
                this.rewardTypes[i] = 0;
            }
            this.player?.addGold(30);
            console.log(this.player?.getGold());
    }

    setDescription(text: string) {
        this.fightDescription = text;
    }

    initializePlayer(name: string) {
        // Only initialize if player doesn't exist yet
        if (!this.player) {
            this.player = new Player(1, name);
            this.fightCount = 1; // Reset fight count when new player starts
        }
    }

    setCurrentMonster() {
        if (!this.player) return; //Sicherheitscheck

        const rand = Math.floor(Math.random() * 3);
        var name: string;
        const Hp = Math.floor(this.player?.getMaxHealthPoints() + 25 * (Math.random() * 2 - 1));
        const Att = Math.floor(this.player?.getCurrentAttack() + 5 * (Math.random() * 2 - 1));
        const Dev = Math.floor(this.player?.getCurrentDefense() + 5 * (Math.random() * 2 - 1));
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
        this.mathReward();
        this.playerVictory = value;
        if (value) {
            this.setDescription("Sieg! Du hast gewonnen!");
            this.fightCount++; // Increment fight count after winning a fight
        }
    }

    resetFight() {
        this.gameOver = false;
        this.playerVictory = false;
        this.currentMonster = null;
        this.setDescription('');
    }
} 