import { StyleSheet } from "react-native";

export const ImageStyles = StyleSheet.create({
    monsterImage: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        marginVertical: 10
    },
    icon: {
        width: 75,
        height: 75,
        resizeMode: 'contain'
    },
    shopImage: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        marginVertical: 10,
    },

    partialBackground: {
        width: 500,
        height: 400,
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: 0,
        paddingTop: 0,
    },

    ImageBackground: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        marginTop: 0,
        paddingTop: 0,
    }

})