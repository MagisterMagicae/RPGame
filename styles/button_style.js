import { StyleSheet } from "react-native";

//This file definines the way Buttons look in the game, it serves as a convinient config

export const ButtonStyles = StyleSheet.create({
    buttonContainer: {
        width: "80%",
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 16,
        gap: 16,
        marginTop: 8,
    },
    imageButtonContainer: {
        width: "80%",
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 0,
        gap: 0,
        marginTop: -75,
    },
    button: {
        backgroundColor: "#4a90e2",
        padding: 15,
        borderRadius: 8,
        width: "auto",
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        textAlign: "center",
        fontWeight: "500",
    },
    multiButton: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    imageButton: {
        backgroundColor: "#00000000",
        padding: 0,
        borderRadius: 0,
        width: "auto",
    },
})