import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import FightScreen from './fight_screen';
import StartScreen from './start_screen';


const Pages = createNativeStackNavigator();

export default function Index (){
  return (
       <Pages.Navigator>
        <Pages.Screen name = "StartScreen" component={StartScreen} />
        <Pages.Screen name = "FightScreen" component={FightScreen} />
      </Pages.Navigator>
  );
}

//Test