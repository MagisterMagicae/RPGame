import { StyleSheet } from "react-native";

//This file definines the way Title Text looks in the game, it serves as a convinient config

export const TitleStyles = StyleSheet.create({
    titleContainer: {
        alignItems: "center",
        marginBottom: 40,
    },
    title: {
        fontSize: 100,
        fontWeight: "bold",
        color: "#fff",
        marginTop: 120,
    },
    subtitle: {
        fontSize: 30,
        color: "#fff",
        marginTop: 8,
    },

    text: {
        fontSize: 18,
        color: "#fff",
        marginTop: 8,
    }
})