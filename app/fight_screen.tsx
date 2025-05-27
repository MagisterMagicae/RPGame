import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Image, Text, TouchableOpacity, View } from "react-native";
import { ButtonStyles } from '../styles/button_style';
import { ImageStyles } from '../styles/image_style';
import { MetaStyles } from '../styles/meta_style';
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
    const [controller] = React.useState(() => new GameFightController());

    const handleFightAction = React.useCallback(() => {
        controller.FightController();
    }, [controller]);

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

            <Image
                style={ImageStyles.monsterImage}
                source={require('../assets/images/Werwolf.png')}
            />


            <Text>{fightStore.fightDescription || 'Der Kampf beginnt...'}</Text>

            <View style={ButtonStyles.imageButtonContainer}>
                <View style={ButtonStyles.multiButton}>
                    <TouchableOpacity
                        style={ButtonStyles.imageButton}
                        onPress={handleFightAction}
                    >
                        <Image
                            style={ImageStyles.icon}
                            source={require('../assets/images/Schwert.png')}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={ButtonStyles.imageButton}
                        onPress={handleFightAction}
                    >
                        <Image
                            style={ImageStyles.icon}
                            source={require('../assets/images/Bogen.png')}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={ButtonStyles.imageButton}
                        onPress={handleFightAction}
                    >
                        <Image
                            style={ImageStyles.icon}
                            source={require('../assets/images/Stab.png')}
                        />
                    </TouchableOpacity>
                </View>
                <View style={ButtonStyles.multiButton}>
                    <TouchableOpacity
                        style={ButtonStyles.imageButton}
                        onPress={handleFightAction}
                    >
                        <Image
                            style={ImageStyles.icon}
                            source={require('../assets/images/Trank.png')}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={ButtonStyles.imageButton}
                        onPress={handleFightAction}
                    >
                        <Image
                            style={ImageStyles.icon}
                            source={require('../assets/images/Kugel.png')}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={ButtonStyles.imageButton}
                        onPress={handleFightAction}
                    >
                        <Image
                            style={ImageStyles.icon}
                            source={require('../assets/images/Umhang.png')}
                        />
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
});

export default FightScreen;
