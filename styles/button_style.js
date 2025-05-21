import { StyleSheet } from "react-native";

//This file definines the way Buttons look in the game, it serves as a convinient config

export const ButtonStyles = StyleSheet.create({
    buttonContainer: {
        width: "80%",
        gap: 16,
    },
    button: {
        backgroundColor: "#4a90e2",
        padding: 15,
        borderRadius: 8,
        width: "100%",
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        textAlign: "center",
        fontWeight: "500",
    },
})