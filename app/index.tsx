import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import FightScreen from './fight_screen';
import ShopScreen from './shop_screen';
import StartScreen from './start_screen';
import VictoryScreen from './victory_screen';

const Pages = createNativeStackNavigator();

export default function Index (){
  return (
      <Pages.Navigator screenOptions={{
        //headerShown: false <- um den screen navigator header zu entfernen
      }}>
        <Pages.Screen name = "StartScreen" component={StartScreen} />
        <Pages.Screen name = "FightScreen" component={FightScreen} />
        <Pages.Screen name = "VictoryScreen" component={VictoryScreen} />
        <Pages.Screen name = "ShopScreen" component={ShopScreen} />
      </Pages.Navigator>
  );
}