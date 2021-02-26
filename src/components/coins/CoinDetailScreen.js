import React, {Component} from 'react';
import {View, Text, Image, SectionList, StyleSheet} from 'react-native';
import Colors from '../../res/colors';

class CoinDetailScreen extends Component {
  state = {
    coin: {},
  };
  componentDidMount() {
    const {coin} = this.props.route.params;
    // With this we set the title for the navigation
    this.props.navigation.setOptions({title: coin.symbol});
    this.setState({coin});
  }

  // This is to get an image from the web
  getSymbolIcon = (nameStr) => {
    if (nameStr) {
      const symbol = nameStr.toLowerCase().replace(' ', '-');
      console.log(`https://c1.coinlore.com/img/25x25/${symbol}.png`);
      return `https://c1.coinlore.com/img/25x25/${symbol}.png`;
    }
  };

  getSections = (coin) => {
    console.log(coin);
    const sections = [
      {
        title: 'Market Cap',
        data: [coin.market_cap_usd],
      },
      {
        title: 'Volume 24',
        data: [coin.volume24],
      },
      {
        title: 'Chage 24H',
        data: [coin.percent_change_24h],
      },
    ];

    return sections;
  };

  render() {
    const {coin} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.subheader}>
          <Image
            style={styles.iconImage}
            source={{uri: this.getSymbolIcon(coin.name)}}
          />
          <Text style={styles.titleText}>{coin.name}</Text>
        </View>
        {/* this list is good to have section with title and subitems */}
        <SectionList
          sections={this.getSections(coin)}
          keyExtractor={(item) => item}
          renderItem={({item}) => (
            <View style={styles.sectionItem}>
              <Text style={styles.itemText}>{item}</Text>
            </View>
          )}
          renderSectionHeader={({section}) => (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionText}>{section.title}</Text>
            </View>
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
  subheader: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    padding: 16,
    flexDirection: 'row',
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 8,
  },
  iconImage: {
    width: 25,
    height: 25,
  },
  sectionHeader: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 8,
  },
  sectionItem: {
    padding: 8,
  },
  itemText: {
    color: '#fff',
    fontSize: 14,
  },
  sectionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default CoinDetailScreen;
