import React from 'react';
import { View, ScrollView, TouchableHighlight, Image, StyleSheet, Dimensions, Text } from 'react-native';

const { width } = Dimensions.get('window');
const height = width * 0.6;

export default class Carousel extends React.Component {
    state = {
        currentSlide: 0
    }

    changeSlide = obj => {
        const currentSlide = Math.ceil(obj.nativeEvent.contentOffset.x / obj.nativeEvent.layoutMeasurement.width);
        if (this.state.currentSlide !== currentSlide) {
            this.setState({ currentSlide })
        }
    }

    render() {
        const { items } = this.props;
        if (items && items.length) {
            return (
                <View style={styles.scrollContainer}>
                    <ScrollView
                        horizontal
                        pagingEnabled
                        onScroll={this.changeSlide}
                        showsHorizontalScrollIndicator={false}>

                        {items.map((item, index) => (
                            <TouchableHighlight onPress={() => this.props.onPress(item)} key={index}>
                                <View style={styles.item}>
                                    <Image style={styles.image} source={{ uri: item.image }} />
                                    <View style={styles.text}>
                                        <Text style={{ color: 'white', fontSize:18 }}>{item.title}</Text>
                                    </View>
                                </View>
                            </TouchableHighlight>
                        ))}

                    </ScrollView>
                    <View style={styles.pagination}>
                        {items.map((item, index) => (
                            <Text key={index} style={{ padding: 0, margin: 3, fontSize: (width / 30), color: index === this.state.currentSlide ? '#fff' : '#ccc' }}>●</Text>
                        ))}
                    </View>
                </View>
            );
        }
        return null;
    }
}

const styles = StyleSheet.create({
    scrollContainer: {
        height
    },
    item: {
        width,
        height
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    text: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        color: 'white',
        paddingTop: 10,
        paddingHorizontal:20,
        paddingBottom: 20
    },
    pagination: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center'
    }
});