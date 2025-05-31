import { StyleSheet } from "react-native";

//This file definines the way Title Text looks in the game, it serves as a convinient config

export const TitleStyles = StyleSheet.create({
    titleContainer: {
        alignItems: "center",
        marginBottom: 40,
    },
    title: {
        fontSize: 48,
        fontWeight: "bold",
        color: "#333",
    },
    subtitle: {
        fontSize: 24,
        color: "#666",
        marginTop: 8,
    },
})