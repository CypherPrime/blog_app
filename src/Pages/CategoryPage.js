import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, FlatList, Image, StatusBar, StyleSheet, View } from "react-native";
import Constants from 'expo-constants';
import Colors from '../../Colors';
import { getCategories } from '../../Api';

export default class CategoryPage extends React.Component {

    static navigationOptions = {
        headerShown: false
    }

    state = {
        categories: [],
        loading: true
    }

    componentDidMount() {
        this.loadCategory();
    }

    loadCategory = async () => {
        getCategories().then(
            response => {
                this.setState({ loading: false, categories: response.items })
            }).catch(() => {
                this.setState({ loading: false });
            })
    }

    handleRefresh = () => {
        this.setState({ loading: true }, this.loadCategory);
    }

    openCategory = (item) => {
        this.props.navigation.navigate('News', item)
    }

    renderRow = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => this.openCategory(item)} style={styles.card}>
                <Image source={{ uri: item.image }} style={{ width: '90%', marginBottom: 5, resizeMode: 'contain', height: 60 }} />
                <Text style={{ fontWeight: '600', fontSize: 16, color: Colors.cardTitle }}>{item.title}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <SafeAreaView style={{ backgroundColor: Colors.background, height: '100%', paddingTop: Constants.statusBarHeight }}>
                <Text style={styles.category}>Categories</Text>
                <StatusBar hidden={false} barStyle={Colors.statusBarStyle} />
                <FlatList
                    data={this.state.categories}
                    renderItem={this.renderRow}
                    keyExtractor={item => item.id}
                    numColumns={2}
                    refreshing={this.state.loading}
                    onRefresh={this.handleRefresh}
                />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        width: '42.5%',
        backgroundColor: Colors.cardContentBackground,
        alignItems: 'center',
        paddingVertical: 20,
        marginVertical: 10,
        marginLeft: '5%',
        borderRadius: 5,
        elevation: 3,
        shadowColor: Colors.cardShadow,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 3
    },
    category: {
        color: Colors.text,
        marginTop: 10,
        marginLeft: '5%',
        fontSize: 24,
        fontWeight: 'bold'
    }
});