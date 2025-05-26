import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View } from "react-native";
import { ButtonStyles } from '../styles/button_style';
import { MetaStyles } from '../styles/meta_style';
import { TitleStyles } from '../styles/title_style';
import { GameFightController } from './controllers/GameFightController';
import { useRootStore } from './stores/RootStore';

//This is the Fight Page, it has a Title, a "Angriff" and a "Items" Button. The Buttons are currently functionless.

type RootStackParamList = {
    StartScreen: undefined;
    FightScreen: undefined;
};

type FightScreenNavigationProp = StackNavigationProp<RootStackParamList, 'FightScreen'>;

const FightScreen = observer(() => {
    const navigation = useNavigation<FightScreenNavigationProp>();
    const { fightStore } = useRootStore();
    const controller = new GameFightController();

    // Wenn der Spieler verliert, dann wird man auf den StartScreen zurückgeleitet
    useEffect(() => {
        if (fightStore.gameOver) {
            // kleiner Delay
            setTimeout(() => {
                navigation.navigate('StartScreen');
            }, 2000);
        }
    }, [fightStore.gameOver]);

    return (
        <View style={MetaStyles.container}>
            <View style={TitleStyles.titleContainer}>
                <Text style={TitleStyles.title}>Fight</Text>
                <Text style={TitleStyles.subtitle}>Screen</Text>
            </View>

            <Text>{fightStore.fightDescription || 'Der Kampf beginnt...'}</Text>

            <View style={ButtonStyles.buttonContainer}>
                <TouchableOpacity style={ButtonStyles.button}>
                    <Text style={ButtonStyles.buttonText}>Angriff</Text>
                </TouchableOpacity>

                <TouchableOpacity style={ButtonStyles.button}>
                    <Text style={ButtonStyles.buttonText}>Items</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
});

export default FightScreen;
