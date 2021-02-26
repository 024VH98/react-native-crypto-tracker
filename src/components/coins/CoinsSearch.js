import React, {Component} from 'react';
import {TextInput, Platform, View, StyleSheet} from 'react-native';
import colors from '../../res/colors';

class CoinsSearch extends Component {
  state = {
    query: '',
  };
  handleText = (query) => {
    this.setState({query});

    if (this.props.onChange) {
      this.props.onChange(query);
    }
  };
  render() {
    const {query} = this.state;
    return (
      <View>
        <TextInput
          style={[
            styles.textInput,
            Platform.OS === 'ios' ? styles.textInputIOS : styles.textInputAn,
          ]}
          value={query}
          onChangeText={this.handleText}
          placeholder="Search Coin"
          placeholderTextColor="#fff"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    height: 46,
    backgroundColor: colors.charade,
    paddingLeft: 16,
    color: '#fff',
  },
  textInputAndroid: {
    borderBottomWidth: 2,
    borderBottomColor: colors.zircon,
  },
  textInputIOS: {
    margin: 8,
    borderRadius: 8,
  },
});

export default CoinsSearch;
