import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Text, TouchableOpacity, View } from "react-native";
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

type VictoryScreenNavigationProp = StackNavigationProp<RootStackParamList, 'VictoryScreen'>;

const VictoryScreen = observer(() => {
    const navigation = useNavigation<VictoryScreenNavigationProp>();
    const { fightStore } = useRootStore();

    const startNextRound = () => {
        if (fightStore.fightCount % 1 === 0) {
            fightStore.resetFight();
            fightStore.setCurrentMonster();
            navigation.navigate('ShopScreen');
        } else {
            fightStore.resetFight();
            fightStore.setCurrentMonster();
            navigation.navigate('FightScreen');
        }
    };

    return (
        <View style={MetaStyles.container}>
            <View style={TitleStyles.titleContainer}>
                <Text style={TitleStyles.title}>Victory!!!</Text>
                <Text style={TitleStyles.subtitle}>Awaiting next battle...</Text>
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