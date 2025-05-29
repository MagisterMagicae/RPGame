import { StackNavigationProp } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Text, TouchableOpacity, View } from "react-native";
import { ButtonStyles } from '../styles/button_style';
import { MetaStyles } from '../styles/meta_style';
import { TitleStyles } from '../styles/title_style';
import { useRootStore } from './stores/RootStore';

//This is the Start Page, it has a Title, a "Spielen", a "Spielstand löschen" a "Credits" Button. 
//The only implimented Button is currently the "Spielen" Button, which will send one to the Fight Screen.

type RootStackParamList = {
    StartScreen: undefined;
    FightScreen: undefined;
};

type StartScreenNavigationProp = StackNavigationProp<RootStackParamList, 'StartScreen'>;

type Props = {
    navigation: StartScreenNavigationProp;
};

const StartScreen = observer(({ navigation }: Props) => {
    const { fightStore } = useRootStore();

    const handleStartGame = () => {
        // Only initialize player if they don't exist yet
        if (!fightStore.player) {
            fightStore.initializePlayer("Spieler");
        }
        
        // Always reset the fight state and set up a new monster
        fightStore.resetFight();
        fightStore.setCurrentMonster();
        
        navigation.navigate('FightScreen');
    };

    return (
        <View style={MetaStyles.container}>
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
                        {fightStore.player ? 'Weiterspielen' : 'Neues Spiel'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={ButtonStyles.button}
                    onPress={()=>fightStore.player = null}
                    >
                    <Text style={ButtonStyles.buttonText}>Spielstand löschen</Text>
                </TouchableOpacity>

                <TouchableOpacity style={ButtonStyles.button}>
                    <Text style={ButtonStyles.buttonText}>Credits</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
});

export default StartScreen;