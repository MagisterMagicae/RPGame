import { ImageStyles } from '@/styles/image_style';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { MMKV } from 'react-native-mmkv';
import { ButtonStyles } from '../styles/button_style';
import { MetaStyles } from '../styles/meta_style';
import { TitleStyles } from '../styles/title_style';
import { useRootStore } from './stores/RootStore';

//This is the Start Page, it has a Title, a "Spielen", a "Spielstand löschen" a "Credits" Button. 
//The only implimented Button is currently the "Spielen" Button, which will send one to the Fight Screen.

type RootStackParamList = {
    StartScreen: undefined;
    FightScreen: undefined;
    ShopScreen: undefined;
};

const storage = new MMKV({
    id:"fileStorage"
    });

type StartScreenNavigationProp = StackNavigationProp<RootStackParamList, 'StartScreen'>;

type Props = {
    navigation: StartScreenNavigationProp;
};

const StartScreen = observer(({ navigation }: Props) => {
    const { fightStore } = useRootStore();
    fightStore.fileExists = storage.size > 0;
    const [fontsLoaded] = useFonts({
            Minecraft: require("../assets/fonts/Minecraft.ttf")
        });
    const deleteData = () => {
    storage.clearAll();
    fightStore.fileExists = false;
    fightStore.player = null;
    fightStore.currentMonster = null;
    fightStore.initializePlayer("Spieler");
    fightStore.setCurrentMonster();
    }
    const handleStartGame = () => {
        // Only initialize player if they don't exist yet
        if (!fightStore.player) {
            fightStore.initializePlayer("Spieler");
        }

        try{
            if(fightStore.fileExists){
            if(!fightStore.player){
                fightStore.initializePlayer("Spieler");
            }
            //Laden der Daten
            //-----------------------------------Misc-Data-----------------------------------//
            fightStore.inShop = storage.getBoolean("inShop") as boolean;
            fightStore.fightCount = storage.getNumber("fightCount") as number;

            //-----------------------------------Player-Data-----------------------------------//
            fightStore.player?.setCurrentHealthPoints(storage.getNumber("currentHealth") as number);
            fightStore.player?.setMaxHealthPoints(storage.getNumber("currentMaxHealth") as number);
            fightStore.player?.setCurrentAttack(storage.getNumber("currentAtk") as number);
            fightStore.player?.setCurrentDefense(storage.getNumber("currentDef") as number);
            fightStore.player?.inventory[0].setAmount(storage.getNumber("schwertLevel") as number);
            fightStore.player?.inventory[1].setAmount(storage.getNumber("bogenLevel") as number);
            fightStore.player?.inventory[2].setAmount(storage.getNumber("stabLevel") as number);
            fightStore.player?.inventory[3].setAmount(storage.getNumber("trankAnzahl") as number);
            fightStore.player?.inventory[4].setAmount(storage.getNumber("kugelAnzahl") as number);
            fightStore.player?.inventory[5].setAmount(storage.getNumber("umhangAnzahl") as number);
            fightStore.player?.setGold(storage.getNumber("gold") as number);
            
            if(!fightStore.currentMonster){
                fightStore.setCurrentMonster();
            }

            //-----------------------------------Monster-Data-----------------------------------//
            console.log("monSprite: " + (storage.getNumber("monSprite") as number));
            fightStore.currentMonster?.setName(storage.getString("monName") as string);
            console.log(fightStore.currentMonster?.getName());
            fightStore.currentMonster!.setCurrentHealthPoints(storage.getNumber("monCurrentHealth") as number);
            fightStore.currentMonster?.setMaxHealthPoints(storage.getNumber("monCurrentHealth") as number);
            fightStore.currentMonster?.setCurrentAttack(storage.getNumber("monCurrentAtk") as number);
            fightStore.currentMonster?.setCurrentDefense(storage.getNumber("monCurrentDef") as number);
            fightStore.currentMonster?.inventory[0].setAmount(storage.getNumber("monAngriff1") as number);
            fightStore.currentMonster?.inventory[1].setAmount(storage.getNumber("monAngriff2") as number);
            fightStore.currentMonster?.inventory[2].setAmount(storage.getNumber("monAngriff3") as number);
            fightStore.currentMonster?.inventory[3].setAmount(storage.getNumber("monHeilung") as number);
            fightStore.currentMonster?.inventory[4].setAmount(storage.getNumber("monAtkBuff") as number);
            fightStore.currentMonster?.inventory[5].setAmount(storage.getNumber("monDefBuff") as number);
            //fightStore.currentMonster?.setSprite(storage.getNumber("monSprite") as number);
            fightStore.currentMonster?.setSprite(storage.getNumber("monSprite") as number);
            fightStore.currentMonster!.fightValue[0] = storage.getNumber("monFightVal0") as number;
            fightStore.currentMonster!.fightValue[1] = storage.getNumber("monFightVal1") as number;
            fightStore.currentMonster!.fightValue[2] = storage.getNumber("monFightVal2") as number;
            fightStore.currentMonster!.fightValue[3] = storage.getNumber("monFightVal3") as number;
            fightStore.currentMonster!.fightValue[4] = storage.getNumber("monFightVal4") as number;
            fightStore.currentMonster!.fightValue[5] = storage.getNumber("monFightVal5") as number;
            fightStore.currentMonster?.setResistance(storage.getNumber("monRes") as number);
            fightStore.currentMonster?.setWeakness(storage.getNumber("monWeak") as number);
            fightStore.setDescription("Ein wilder " + fightStore.currentMonster?.getName() as string + " erscheint!");
        console.log("heyhoooo");
            }
            else{
                if(fightStore.player == undefined){fightStore.initializePlayer("Spieler");}
                
                if(fightStore.currentMonster == undefined){fightStore.setCurrentMonster();}
            }
        }
        catch(err){
            console.log("Speicherstand konnte nicht geladen werden.");
            //fightStore.initializePlayer("Spieler");
            //fightStore.setCurrentMonster();
            
        }
        // Always reset the fight state and set up a new monster
        if(fightStore.inShop){
            console.log("Wir gehen vom Start gerade zum Shop");
            navigation.navigate('ShopScreen');
        }

        else {
            console.log("Wir gehen gerade vom Start zum Fight");
            navigation.navigate('FightScreen');
            
        }

    };

    return (

        <View style={MetaStyles.container}>
                    
            <ImageBackground
                style={ImageStyles.ImageBackground}
                source={require('../assets/images/brickwall_v02.png')}
            >

                <View style={TitleStyles.titleContainer}>
                    <Text style={TitleStyles.title}>RPG</Text>
                    <Text style={TitleStyles.subtitle}>Game</Text>
                </View>

                <View style={ButtonStyles.buttonContainer}>
                    <TouchableOpacity
                        style={ButtonStyles.button}
                        onPress={handleStartGame}
                    >
                        <Text style={ButtonStyles.buttonText}>
                        {fightStore.fileExists ? 'Weiterspielen' : 'Neues Spiel'}
                    </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={ButtonStyles.button}
                        onPress={deleteData}
                    >
                        <Text style={ButtonStyles.buttonText}>Spielstand löschen</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>


    );
});

export default StartScreen;