import React from 'react';
import { FlatList, Text } from 'react-native';
import Article from '../Components/Article';
import Colors from '../../Colors';
import { getArticle } from '../../Api';

export default class NewsPage extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', 'News'),
      headerStyle: {
        backgroundColor: Colors.headerBackground,
      },
      headerTintColor: Colors.headerText
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      has_next: true,
      category_id: props.navigation.getParam('id', null),
      items: []
    };
  }

  componentDidMount() {
    this.loadArticle();
  }

  loadArticle = () => {
    if (!this.state.loading) this.setState({ loading: true });

    getArticle(this.state.category_id + '?page=' + this.state.items.length)
      .then(response => {
        this.setState(prevState =>
          ({
            loading: false,
            has_next: response.news.length === response.limit,
            items: [...prevState.items, ...response.news]
          }));
      }).catch(() => {
        this.setState({ loading: false });
      })
  }

  handleRefresh = () => {
    this.setState({ loading: true, items: [] }, this.loadArticle);
  }

  openArticle = (item) => {
    this.props.navigation.navigate('Details', { article: item, title: item.title })
  }

  render() {
    if (!this.state.loading && this.state.items.length == 0) {
      return (<Text style={{
        paddingTop: 20,
        width: '100%',
        height: '100%',
        fontSize: 20,
        color: Colors.inactiveText,
        backgroundColor: Colors.background,
        textAlign: 'center'
      }}>Item not found</Text>);
    } else {
      return (
        <FlatList
          style={{ backgroundColor: Colors.background, marginTop: 7 }}
          data={this.state.items}
          renderItem={({ item }) => <Article article={item} onPress={() => this.openArticle(item)} />}
          keyExtractor={item => item.id}
          refreshing={this.state.loading}
          onRefresh={this.handleRefresh}
          onEndReachedThreshold={0.4}
          onEndReached={this.state.has_next ? this.loadArticle : null}
        />
      );
    }
  }
}