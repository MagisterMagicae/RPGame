import { StyleSheet } from 'react-native';

export const ModalStyles = StyleSheet.create({
    modalOverlay: {
        fontFamily:"Minecraft",
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        fontFamily:"Minecraft",
        backgroundColor: '#2b2c3c',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    modalTitle: {
        fontFamily:"Minecraft",
        fontSize: 20,
        marginBottom: 10,
        color: 'white',
    },
    modalText: {
        fontFamily:"Minecraft",
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
        color: 'white',
    },
    modalButton: {
        fontFamily:"Minecraft",
        backgroundColor: '#484764',
        padding: 10,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
    },
    modalButtonText: {
        fontFamily:"Minecraft",
        color: 'white',
        fontSize: 16,
    },
});
