import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import React from 'react';
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
    ShopScreen: undefined;
};

type FightScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ShopScreen'>;

const ShopScreen = observer(() => {
    const navigation = useNavigation<FightScreenNavigationProp>();
    const { fightStore } = useRootStore();
    const [controller] = React.useState(() => new GameFightController());
     const [ItemDescriptionPopUp, setItemDescriptionPopUp] = React.useState(false);
        const [selectedItemID, setSelectedItemID] = React.useState<number | null>(null);

 const handleStartFight = () => {
        fightStore.fightDescription = "Der nächste Kampf beginnt!";
        navigation.navigate('FightScreen');
    };

    React.useEffect(() => {
        fightStore.fightDescription = "Willkommen im Shop!";
    }, []);

    const button = (itemID:number) => {

        if (!fightStore.player) return; //Sicherheitscheck

        return(
            <View style={{ alignItems: 'center' }}>
                <TouchableOpacity
                    style={ButtonStyles.imageButton}
                    onPress={()=>{}} //hi krystyna hier in die swirly klammern kommt rein was die buttons machen
                      onLongPress={()=>{
                            setSelectedItemID(itemID);
                            setItemDescriptionPopUp(true);
                        }}
                >   
                    <Image
                        style={ImageStyles.icon}
                        source={fightStore.player.inventory[itemID].getSpriteDirectory()}
                    />
                </TouchableOpacity>
                <Text style={{ marginTop: 5, textAlign: 'center'}}>
                    {fightStore.player.inventory[itemID].getCost()} Gold {"\n"}
                    {fightStore.player.inventory[itemID].getAmount()} im Besitz
                </Text>
            </View>
        )
    }

    return (
        <View style={[MetaStyles.container, { justifyContent: 'flex-start', paddingTop: 20 }]}>
            
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

            <View style={{ alignItems: 'center', marginVertical: 10 }}>
                <Image
                    style={ImageStyles.shopImage}
                    source={require('../assets/images/shop_temporary.png')}
                />

                <Text style={{ marginVertical: 10 }}>
                    HP: {fightStore.player ? `${fightStore.player.getCurrentHealthPoints()}/${fightStore.player.getMaxHealthPoints()}` : '0/0'}
                </Text>

                <Text style={{ marginBottom: 0 }}>{fightStore.fightDescription || 'Shop'}</Text>
            </View>

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
            <View style={ButtonStyles.shopContainer}>
                <TouchableOpacity 
                    style={ButtonStyles.button} 
                    onPress={handleStartFight}>
                    <Text style={ButtonStyles.buttonText}>Nächster Kampf</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
});

export default ShopScreen;