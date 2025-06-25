import { StyleSheet } from "react-native";

//This file definines the way Title Text looks in the game, it serves as a convinient config

export const TitleStyles = StyleSheet.create({
    titleContainer: {
        alignItems: "center",
        marginBottom: 40,
    },
    title: {
        fontFamily:"Minecraft",
        fontSize: 80,
        color: "#fff",
        marginTop: 150,
    },
    subtitle: {
        fontFamily:"Minecraft",
        fontSize: 20,
        color: "#fff",
        marginTop: 8,
    },

    text: {
        fontFamily:"Minecraft",
        fontSize: 18,
        color: "#fff",
        marginTop: 8,
    }
})