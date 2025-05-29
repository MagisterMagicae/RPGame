import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from "react-native";
import { ButtonStyles } from '../styles/button_style';
import { ImageStyles } from '../styles/image_style';
import { MetaStyles } from '../styles/meta_style';
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
                
                <TouchableOpacity
                        style={ButtonStyles.imageButton}
                        onPress={()=>{}} //hi krystyna hier in die swirly klammern kommt rein was die buttons machen
                    >
                        <Image
                            style={ImageStyles.icon}
                            source={fightStore.player.inventory[itemID].getSpriteDirectory()}
                        />
                    </TouchableOpacity>
            )
    }

    return (
        <View style={[MetaStyles.container, { justifyContent: 'flex-start', paddingTop: 20 }]}>
            
  

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