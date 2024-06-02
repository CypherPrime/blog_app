import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../Colors';

let width = Dimensions.get("window").width;

export default class Article extends React.Component {
    render() {
        const item = this.props.article;
        return (
            <TouchableOpacity style={this.props.horizontal ? styles.cardContentHorizontal : styles.cardContent} onPress={this.props.onPress}>
                <View style={styles.cardImageContent}>
                    <Image
                        source={{ uri: item.image }}
                        style={styles.cardImage}
                    />
                </View>
                <Text style={styles.category}>{item.category.toUpperCase()}</Text>
                <Text numberOfLines={2} style={styles.cardTitle}>{item.title}</Text>
                <View style={styles.cardRow}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Ionicons name="md-eye" size={16} color={Colors.cardIcon} style={{ marginRight: 5 }} />
                        <Text style={styles.cardText}>{item.views}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Ionicons name="md-time" size={16} color={Colors.cardIcon} style={{ marginRight: 5 }} />
                        <Text style={styles.cardText}>{item.published_at}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    cardContent: {
        width: width * 0.9,
        marginLeft: width * 0.05,
        marginBottom: 20,
        borderRadius: 15,
        paddingBottom: 10,
        backgroundColor: Colors.cardContentBackground,
        elevation: 3,
        shadowColor: Colors.cardShadow,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 3
    },
    cardContentHorizontal: {
        width: width * 0.8,
        marginLeft: width * 0.05,
        marginBottom: 20,
        borderRadius: 15,
        paddingBottom: 10,
        backgroundColor: Colors.cardContentBackground,
        elevation: 3,
        shadowColor: Colors.cardShadow,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 3
    },
    cardImage: {
        width: '100%',
        height: 250
    },
    cardImageContent: {
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        overflow: 'hidden'
    },
    cardTitle: {
        fontSize: 18,
        marginVertical: 5,
        marginHorizontal: 15,
        height: 50,
        fontWeight: 'bold',
        color: Colors.cardTitle
    },
    cardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 15
    },
    cardText: {
        fontSize: 14,
        color: Colors.cardText
    },
    category: {
        fontSize: 14,
        color: Colors.cardText,
        marginHorizontal: 15,
        marginTop: 10,
    }
})