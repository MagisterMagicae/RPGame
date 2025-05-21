import * as React from 'react';
import { Text, TouchableOpacity, View } from "react-native";
import { ButtonStyles } from '../styles/button_style';
import { MetaStyles } from '../styles/meta_style';
import { TitleStyles } from '../styles/title_style';

//This is the Start Page, it has a Title, a "Spielen", a "Spielstand löschen" a "Credits" Button. 
//The only implimented Button is currently the "Spielen" Button, which will send one to the Fight Screen.

export default function StartScreen({navigation}){
    return (
        <View style={MetaStyles.container}>
            <View style={TitleStyles.titleContainer}>
                <Text style={TitleStyles.title}>RPG</Text>
                <Text style={TitleStyles.subtitle}>Game</Text>
            </View>

            <View style={ButtonStyles.buttonContainer}>
                <TouchableOpacity style={ButtonStyles.button} onPress={() => navigation.navigate('FightScreen')}>
                    <Text style={ButtonStyles.buttonText}>Spielen</Text>
                </TouchableOpacity>

                <TouchableOpacity style={ButtonStyles.button}>
                    <Text style={ButtonStyles.buttonText}>Spielstand löschen</Text>
                </TouchableOpacity>

                <TouchableOpacity style={ButtonStyles.button}>
                    <Text style={ButtonStyles.buttonText}>Credits</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}