import React, {Component} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import CoinsItem from '../coins/CoinsItem';
import FavoritesEmptyState from './FavoritesEmptyState';
import Colors from '../../res/colors';
import Storage from '../../libs/storage';

class FavoritesScreen extends Component {
  state = {
    favorites: [],
  };
  componentDidMount() {
    this.getFavorites();
    // this is because the component only loads once so we need to listen
    // when there is focus and call getFavorites
    this.props.navigation.addListener('focus', this.getFavorites);
  }

  componentWillUnmount() {
    // This will remove the listener
    this.props.navigation.removeListener('focus', this.getFavorites);
  }
  handlePress = (item) => {
    this.props.navigation.navigate('CoinDetail', item);
  };
  getFavorites = async () => {
    try {
      const allKeys = await Storage.instance.getAllKeys();
      const keys = allKeys.filter((key) => key.includes('favorite-'));
      const favs = await Storage.instance.multiget(keys);
      const favorites = favs.map((fav) => JSON.parse(fav[1]));
      this.setState({favorites});
    } catch (error) {
      console.log('get favorites err', error);
    }
  };
  render() {
    const {favorites} = this.state;
    return (
      <View style={styles.container}>
        {favorites.length === 0 ? (
          <FavoritesEmptyState />
        ) : (
          <FlatList
            data={favorites}
            renderItem={({item}) => (
              <CoinsItem item={item} onPress={() => this.handlePress(item)} />
            )}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charade,
  },
});

export default FavoritesScreen;
