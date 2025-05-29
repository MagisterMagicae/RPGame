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
};

type VictoryScreenNavigationProp = StackNavigationProp<RootStackParamList, 'VictoryScreen'>;

type Props = {
    navigation: VictoryScreenNavigationProp;
};


const VictoryScreen = observer(({ navigation }: Props) => {
    const { fightStore } = useRootStore();

    const handleStartRound = () => {
        // Always reset the fight state and set up a new monster
        fightStore.resetFight();
        fightStore.setCurrentMonster();

        navigation.navigate('FightScreen');
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
                                onPress={(handleStartRound)}
                            >
                               <Text style={ButtonStyles.buttonText}>Nächster Kampf</Text>
                            </TouchableOpacity>
                        </View>
        </View>
    );
});

export default VictoryScreen;