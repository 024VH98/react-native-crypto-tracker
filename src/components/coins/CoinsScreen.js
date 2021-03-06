import React, {Component} from 'react';
import {View, ActivityIndicator, StyleSheet, FlatList} from 'react-native';
import Http from '../../libs/http';
import CoinsItem from './CoinsItem';
import Colors from '../../res/colors';
import CoinsSearch from './CoinsSearch';

class CoinsScreen extends Component {
  state = {
    coins: [],
    allCoins: [],
    loading: false,
  };
  componentDidMount = async () => {
    this.getCoins();
  };

  getCoins = async () => {
    this.setState({loading: true});
    const res = await Http.instance.get(
      'https://api.coinlore.net/api/tickers/',
    );
    this.setState({coins: res.data, allCoins: res.data, loading: false});
  };

  handlePress = (coin) => {
    this.props.navigation.navigate('CoinDetail', {coin});
  };

  handleSearch = (query) => {
    const {allCoins} = this.state;
    const coinsFiltered = allCoins.filter((coin) => {
      const queryNormalized = query.toLowerCase();
      return (
        coin.name.toLowerCase().includes(queryNormalized) ||
        coin.symbol.toLowerCase().includes(queryNormalized)
      );
    });
    this.setState({coins: coinsFiltered});
  };

  render() {
    const {coins, loading} = this.state;
    return (
      <View style={styles.container}>
        <CoinsSearch onChange={this.handleSearch} />
        {loading && (
          <ActivityIndicator style={styles.loader} color="#000" size="large" />
        )}
        <FlatList
          data={coins}
          renderItem={({item}) => (
            <CoinsItem item={item} onPress={() => this.handlePress(item)} />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charade,
  },
  titleText: {
    color: '#fff',
    textAlign: 'center',
  },
  btn: {
    padding: 8,
    backgroundColor: 'blue',
    borderRadius: 8,
    margin: 16,
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
  },
  loader: {
    marginTop: 60,
  },
});

export default CoinsScreen;
