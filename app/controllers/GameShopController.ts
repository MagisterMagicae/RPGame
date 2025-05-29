import { StackNavigationProp } from '@react-navigation/stack';
import { Item } from '../classes/item';
import { Player } from '../classes/player';

type RootStackParamList = {
  StartScreen: undefined;
  FightScreen: undefined;
  VictoryScreen: undefined;
};

export class GameShopController {
  player: Player;
  navigation: StackNavigationProp<RootStackParamList, 'FightScreen'>;

  constructor(player: Player, navigation: StackNavigationProp<RootStackParamList, 'FightScreen'>) {
    this.player = player;
    this.navigation = navigation;
  }

  buyItem(item: Item): boolean {
    if (this.player.spendGold(item.getCost())) {
      this.player.addItem(item);
      return true;
    }
    return false;
  }

  leaveShop() {
    this.navigation.navigate('FightScreen');
  }
}
