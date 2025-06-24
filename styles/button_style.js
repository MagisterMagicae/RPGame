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
        shopButtonContainer: {
        width: "80%",
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 16,
        gap: 1,
        marginTop: 1,
    },
    shopContainer: {
        width: "80%",
        justifyContent: 'center',
        marginHorizontal: 16,
        gap: 8,
        marginTop: 2,
        marginBottom: 8,
    },
    imageButtonContainer: {
        width: "80%",
        justifyContent: 'flex-end',
        marginHorizontal: 0,
        paddingTop: 20,
        paddingBottom: 20,
    },
    button: {
        backgroundColor: "#484764",
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
        justifyContent: 'space-between',
        marginVertical: 5,
    },
    imageButton: {
        backgroundColor: "#00000000",
        padding: 0,
        borderRadius: 0,
        width: "auto",
    },
})