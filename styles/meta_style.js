import { StyleSheet } from "react-native";

//This file is for Styles which aren't specific to any kind of component and is instead shared between them.

export const MetaStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#2b2c3c", //Für Normale Fights
        //backgroundColor: "#211112", //Für LevelBoss Fights
    },
})