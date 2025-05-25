import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Text, TouchableOpacity, View } from "react-native";
import { ButtonStyles } from '../styles/button_style';
import { MetaStyles } from '../styles/meta_style';
import { TitleStyles } from '../styles/title_style';
import { useRootStore } from './stores/RootStore';

//This is the Fight Page, it has a Title, a "Angriff" and a "Items" Button. The Buttons are currently functionless.

const FightScreen = observer(() => {
    const { fightStore } = useRootStore();

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