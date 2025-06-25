import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Text, TouchableOpacity, View } from "react-native";
import { MMKV } from 'react-native-mmkv';
import { ButtonStyles } from '../styles/button_style';
import { MetaStyles } from '../styles/meta_style';
import { TitleStyles } from '../styles/title_style';
import { useRootStore } from './stores/RootStore';

type RootStackParamList = {
    StartScreen: undefined;
    FightScreen: undefined;
    VictoryScreen: undefined;
    ShopScreen: undefined;
};

const storage = new MMKV({
    id:"fileStorage"
    });

type VictoryScreenNavigationProp = StackNavigationProp<RootStackParamList, 'VictoryScreen'>;

const VictoryScreen = observer(() => {
    const navigation = useNavigation<VictoryScreenNavigationProp>();
    const { fightStore } = useRootStore();
    const [fontsLoaded] = useFonts({
            Minecraft: require("../assets/fonts/Minecraft.ttf")
        });
        
    const startNextRound = () => {
        fightStore.resetFight();
        //Speichern der Daten
            //-----------------------------------Misc-Data-----------------------------------//
            storage.set("inShop", fightStore.inShop);
            storage.set("fightCount", fightStore.fightCount);

            //-----------------------------------Monster-Data-----------------------------------//
            fightStore.setCurrentMonster();
            storage.set("monID", 2);
            storage.set("monName", fightStore.currentMonster?.getName() as string);
            storage.set("monCurrentHealth", Number(fightStore.currentMonster?.getCurrentHealthPoints()));
            storage.set("monCurrentMaxHealth", Number(fightStore.currentMonster?.getMaxHealthPoints()));
            storage.set("monCurrentAtk", Number(fightStore.currentMonster?.getCurrentAttack()));
            storage.set("monCurrentDef", Number(fightStore.currentMonster?.getCurrentDefense()));
            storage.set("monAngriff1", Number(fightStore.currentMonster?.inventory[0].getAmount()));
            storage.set("monAngriff2", Number(fightStore.currentMonster?.inventory[1].getAmount()));
            storage.set("monAngriff3", Number(fightStore.currentMonster?.inventory[2].getAmount()));
            storage.set("monHeilung", Number(fightStore.currentMonster?.inventory[3].getAmount()));
            storage.set("monAtkBuff", Number(fightStore.currentMonster?.inventory[4].getAmount()));
            storage.set("monDefBuff", Number(fightStore.currentMonster?.inventory[5].getAmount()));
            storage.set("monSprite", Number(fightStore.currentMonster?.getSpriteDirectory()));
            storage.set("monFightVal0", Number(fightStore.currentMonster?.fightValue[0]));
            storage.set("monFightVal1", Number(fightStore.currentMonster?.fightValue[1]));
            storage.set("monFightVal2", Number(fightStore.currentMonster?.fightValue[2]));
            storage.set("monFightVal3", Number(fightStore.currentMonster?.fightValue[3]));
            storage.set("monFightVal4", Number(fightStore.currentMonster?.fightValue[4]));
            storage.set("monFightVal5", Number(fightStore.currentMonster?.fightValue[5]));
            storage.set("monRes", Number(fightStore.currentMonster?.getResistance()));
            storage.set("monWeak", Number(fightStore.currentMonster?.getResistance()));

            //-----------------------------------Player-Data-----------------------------------//
            storage.set("currentHealth", Number(fightStore.player?.getCurrentHealthPoints()));
            storage.set("currentMaxHealth", Number(fightStore.player?.getMaxHealthPoints()));
            storage.set("currentAtk", Number(fightStore.player?.getCurrentAttack()));
            storage.set("currentDef", Number(fightStore.player?.getCurrentDefense()));
            storage.set("schwertLevel", Number(fightStore.player?.inventory[0].getAmount()));
            storage.set("bogenLevel", Number(fightStore.player?.inventory[1].getAmount()));
            storage.set("stabLevel", Number(fightStore.player?.inventory[2].getAmount()));
            storage.set("trankAnzahl", Number(fightStore.player?.inventory[3].getAmount()));
            storage.set("kugelAnzahl", Number(fightStore.player?.inventory[4].getAmount()));
            storage.set("umhangAnzahl", Number(fightStore.player?.inventory[5].getAmount()));
            storage.set("gold", Number(fightStore.player?.getGold()));

        if (fightStore.inShop) {
            
            //fightStore.setCurrentMonster();
            navigation.navigate('ShopScreen');
        } else {           
            //fightStore.setCurrentMonster();
            navigation.navigate('FightScreen');
        }
        };

    return (
        
        <View style={MetaStyles.container}>
            <View style={TitleStyles.titleContainer}>
                <Text style={TitleStyles.title}>Victory!!!</Text>
                <Text style={TitleStyles.subtitle}>{fightStore.rewardText}</Text>
            </View>
            <View style={ButtonStyles.buttonContainer}>
                <TouchableOpacity 
                    style={ButtonStyles.button} 
                    onPress={startNextRound}
                >
                    <Text style={ButtonStyles.buttonText}>weiter</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
});

export default VictoryScreen;