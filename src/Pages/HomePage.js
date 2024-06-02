import React from 'react';
import { FlatList, SafeAreaView, View, Text, ScrollView, StatusBar, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import Colors from '../../Colors';
import Article from '../Components/Article';
import Carousel from '../Components/Carousel';
import { getHomeItems } from '../../Api';

export default class HomePage extends React.Component {
  static navigationOptions = {
    headerShown: false
  }

  constructor(props) {
    super(props);
    this.key = 0;
    this.state = {
      loading: true,
      items: [],
    };
  }

  getKey = () => {
    this.key += 1;
    return this.key;
  }

  componentDidMount() {
    this.loadArticle();
  }

  loadArticle = () => {
    if (!this.state.loading) this.setState({ loading: true });

    getHomeItems()
      .then(response => {
        this.setState(
          {
            loading: false,
            items: response.items,
          });
      }).catch(() => {
        this.setState({ loading: false });
      });
  }

  handleRefresh = () => {
    this.setState({ loading: true, latest: [] }, this.loadArticle);
  }

  openArticle = (item) => {
    this.props.navigation.navigate('Details', { article: item, title: item.title })
  }

  renderItem = (item, index) => {
    if (item.items.length === 0) return null;

    let result = null;

    switch (item.type) {
      case 'list':
        result = item.items.map(i => <Article key={i.id + 100} article={i} onPress={() => this.openArticle(i)} />);
        break;

      case 'carousel':
        result = <Carousel items={item.items} onPress={(item) => this.openArticle(item)} />;
        break;

      case 'horizontal':
        result =
          <FlatList
            data={item.items}
            renderItem={({ item }) => <Article key={this.getKey()} article={item} style={{}} horizontal={true} onPress={() => this.openArticle(item)} />}
            keyExtractor={item => item.id}
            horizontal={true}
          />;
        break;
    }

    return (
      <View key={index}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.title}>{item.title}</Text>
          {
            item.all &&
            <TouchableOpacity
              style={{ marginRight: '5%', marginVertical: 7 }}
              onPress={() => this.props.navigation.navigate('News', { title: item.title, id: item.all })}>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          }
        </View>
        {result}
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <StatusBar hidden={false} barStyle={Colors.statusBarStyle} />
          {
            this.state.items.map(this.renderItem)
          }
          {
            this.state.loading && <ActivityIndicator size="large" />
          }
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: { backgroundColor: Colors.background, marginBottom: 80, height: '100%', paddingTop: Constants.statusBarHeight },
  seeAll: {
    fontSize: 14,
    backgroundColor: Colors.categoryBackground,
    color: Colors.categoryText,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    overflow: 'hidden'
  },
  title: { color: Colors.text, marginVertical: 7, marginLeft: '5%', fontSize: 24, fontWeight: 'bold' }
})