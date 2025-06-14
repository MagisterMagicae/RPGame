import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Image, Modal, Text, TouchableOpacity, View } from "react-native";
import { ButtonStyles } from '../styles/button_style';
import { ImageStyles } from '../styles/image_style';
import { MetaStyles } from '../styles/meta_style';
import { ModalStyles } from '../styles/modal_style';
import { GameFightController } from './controllers/GameFightController';
import { useRootStore } from './stores/RootStore';

type RootStackParamList = {
    StartScreen: undefined;
    FightScreen: undefined;
    VictoryScreen: undefined;
};

type FightScreenNavigationProp = StackNavigationProp<RootStackParamList, 'FightScreen'>;

const FightScreen = observer(() => {
    const navigation = useNavigation<FightScreenNavigationProp>();
    const { fightStore } = useRootStore();
    const [controller] = React.useState(() => new GameFightController());
    const [ItemDescriptionPopUp, setItemDescriptionPopUp] = React.useState(false);
    const [selectedItemID, setSelectedItemID] = React.useState<number | null>(null);

    // Wenn der Spieler verliert, dann wird man auf den StartScreen zurückgeleitet
    useEffect(() => {
        if (fightStore.gameOver) {
            // kleiner Delay
            setTimeout(() => {
                fightStore.player = null;
                navigation.navigate('StartScreen');
            }, 2000);
        }
    }, [fightStore.gameOver]);

    // Wenn der Spieler gewinnt, dann wird man auf den FightScreen zurückgeleitet
     useEffect(() => {
        if (fightStore.playerVictory) {
            // kleiner Delay
            setTimeout(() => {
                navigation.navigate('VictoryScreen');
            }, 2000);
        }
    }, [fightStore.playerVictory]);

    const button = (itemID:number) => {

        if (!fightStore.player || !fightStore.currentMonster) return; //Sicherheitscheck

        if (fightStore.player?.inventory[itemID].getAmount() > 0){
            return(
                <TouchableOpacity
                        style={ButtonStyles.imageButton}
                        onPress={()=>{
                            if(!fightStore.monsterTurn){
                            controller.FightController(itemID);}}}
                        onLongPress={()=>{
                            setSelectedItemID(itemID);
                            setItemDescriptionPopUp(true);
                        }}
                    > 
                        <Text>{fightStore.player?.inventory[itemID].getAmount()}</Text>

                        <Image
                            style={ImageStyles.icon}
                            source={fightStore.player.inventory[itemID].getSpriteDirectory()}
                        />
                    </TouchableOpacity>
            )
        } else {
            return <TouchableOpacity
                        style={ButtonStyles.imageButton}
                    >
                        <Image
                            style={ImageStyles.icon}
                            source={require('../assets/images/empty.png')}
                        />
                    </TouchableOpacity>
        }
    }

    return (
        <View style={MetaStyles.container}>
         <Modal //item beschreibung pop up
                transparent={true}
                visible={ItemDescriptionPopUp}
                onRequestClose={() => setItemDescriptionPopUp(false)}
            >
                <View style={ModalStyles.modalOverlay}>
                    <View style={ModalStyles.modalContent}>
                        <Text style={ModalStyles.modalTitle}>
                            {selectedItemID !== null && fightStore.player ? 
                                fightStore.player.inventory[selectedItemID].getName() : 
                                'Item'}
                        </Text>
                        <Text style={ModalStyles.modalText}>
                            {selectedItemID !== null && fightStore.player ?
                                fightStore.player.inventory[selectedItemID].getItemDescription() :
                                'description'}
                            </Text>
                        <TouchableOpacity 
                            style={ModalStyles.modalButton}
                            onPress={() => setItemDescriptionPopUp(false)}
                        >
                            <Text style={ModalStyles.modalButtonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        <Text style={{ marginBottom: 10 }}>
            {fightStore.fightCount}
        </Text>
        
        <Text style={{ marginBottom: 10 }}>
            HP: {fightStore.currentMonster ? `${fightStore.currentMonster.getCurrentHealthPoints()}/${fightStore.currentMonster.getMaxHealthPoints()}` : '0/0'}
        </Text>

        <Image
            style={ImageStyles.monsterImage}
            source={fightStore.currentMonster?.getSpriteDirectory()}
        />

        <Text style={{ marginBottom: 10 }}>
            HP: {fightStore.player ? `${fightStore.player.getCurrentHealthPoints()}/${fightStore.player.getMaxHealthPoints()}` : '0/0'}
        </Text>

        <Text>{fightStore.fightDescription || 'Der Kampf beginnt...'}</Text>

        <View style={ButtonStyles.imageButtonContainer}>
            <View style={ButtonStyles.multiButton}>

                {button(0)}
                {button(1)}
                {button(2)}
                
            </View>
            <View style={ButtonStyles.multiButton}>
                
                {button(3)}
                {button(4)}
                {button(5)}

            </View>
        </View>

    </View>
);
});

export default FightScreen;