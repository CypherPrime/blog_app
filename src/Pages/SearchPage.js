import React from 'react';
import { FlatList, TextInput, View, ActivityIndicator, Text } from 'react-native';
import Constants from 'expo-constants';
import Colors from '../../Colors';
import Article from '../Components/Article';
import { getArticle } from '../../Api';

export default class SearchPage extends React.Component {
    static navigationOptions = {
        headerShown: false
    };

    constructor(props) {
        super(props);
        this.state = {
            has_next: true,
            loading: false,
            query: '',
            items: []
        };
    }

    loadArticle = () => {
        if (this.state.query.length > 0) {
            getArticle('?search=' + this.state.query).then(response => {
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
    }

    openArticle = (item) => {
        this.props.navigation.navigate('Details', { article: item, title: item.title })
    }

    onChangeText = (query) => {
        this.setState({ query });
    }

    handleSearch = () => {
        this.setState({ loading: true, items: [] }, this.loadArticle);
    }

    renderFooter = () => {
        if (this.state.loading) {
            return (<ActivityIndicator size="large" />);
        }
        else if (this.state.query.length > 0 && this.state.items.length === 0) {
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
            return null;
        }
    }

    render() {
        return (
            <View style={{ backgroundColor: Colors.background, marginBottom: 80, height: '100%', paddingTop: Constants.statusBarHeight }}>
                <Text style={{ color: Colors.text, marginTop: 10, marginLeft: '5%', fontSize: 24, fontWeight: 'bold' }}>Search</Text>
                <TextInput
                    style={{ paddingVertical: 5, paddingHorizontal: 10, margin: 10, backgroundColor: Colors.inputBackground, borderRadius: 10 }}
                    onChangeText={this.onChangeText}
                    value={this.state.query}
                    keyboardType="web-search"
                    returnKeyType="search"
                    onSubmitEditing={this.handleSearch}
                    placeholder="Search..."
                    clearButtonMode="always"
                    autoFocus={true}
                />
                <FlatList
                    data={this.state.items}
                    renderItem={({ item }) => <Article article={item} onPress={() => this.openArticle(item)} />}
                    keyExtractor={item => item.id}
                    ListFooterComponent={this.renderFooter}
                    onEndReachedThreshold={0.4}
                    onEndReached={this.state.has_next ? this.loadArticle : null}
                />
            </View>
        );
    }
}