import React from 'react';
import { FlatList, Text, AsyncStorage, View } from 'react-native';
import Constants from 'expo-constants';
import Article from '../Components/Article';
import Colors from '../../Colors';

export default class BookmarkPage extends React.Component {
    static navigationOptions = {
        headerShown: false
    };

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            items: []
        };
        props.navigation.addListener('didFocus',this._retrieveData);
    }

    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getAllKeys();
            if (value !== null) {
                this._loadList(value);
            } else {
                this.setState({ loading: false })
            }
        } catch (error) {
            this.setState({ loading: false })
        }
    };

    _loadList = (val) => {
        AsyncStorage.multiGet(val).then(res => {
            let items = [];
            res.forEach(item => {
                if (item[1]) {
                    items.push(JSON.parse(item[1]));
                }
            });
            this.setState({ items, loading: false })
        }).catch(() => {
            this.setState({ loading: false })
        });
    }

    openArticle = (item) => {
        this.props.navigation.navigate('Details', { article: item, title: item.title })
    }

    render() {
        return (
            <View style={{ backgroundColor: Colors.background, marginBottom: 80, height: '100%', paddingTop: Constants.statusBarHeight }}>
                <Text style={{ color: Colors.text, marginTop: 10, marginLeft: '5%', fontSize: 24, fontWeight: 'bold' }}>Bookmark</Text>
                {
                    !this.state.loading && this.state.items.length == 0 && <Text style={{
                        paddingTop: 20,
                        fontSize: 20,
                        color: Colors.inactiveText,
                        textAlign: 'center'
                    }}>Bookmarks empty</Text>
                }
                <FlatList
                    data={this.state.items}
                    renderItem={({ item }) => <Article article={item} onPress={() => this.openArticle(item)} />}
                    keyExtractor={item => item.id}
                    refreshing={this.state.loading}
                />
            </View>
        );
    }
}