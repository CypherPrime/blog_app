import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';
import Colors from './Colors';
import HomePage from './src/Pages/HomePage';
import NewsPage from './src/Pages/NewsPage';
import SearchPage from './src/Pages/SearchPage';
import CategoryPage from './src/Pages/CategoryPage';
import DetailsPage from './src/Pages/DetailsPage';
import BookmarkPage from './src/Pages/BookmarkPage';

const HomeStack = createStackNavigator({
  Home: HomePage,
  Details: DetailsPage
});

const CategoryStack = createStackNavigator({
  Category: CategoryPage,
  News: NewsPage,
  Details: DetailsPage
});

const SearchStack = createStackNavigator({
  Search: SearchPage,
  Details: DetailsPage,
});

const BookmarkStack = createStackNavigator({
  Bookmark: BookmarkPage,
  Details: DetailsPage,
});

export default createAppContainer(createBottomTabNavigator(
  {
    Home: HomeStack,
    Category: CategoryStack,
    Search: SearchStack,
    Bookmark: BookmarkStack,
  }, {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-today`;
        } else if (routeName === 'Category') {
          iconName = `ios-apps`;
        } else if (routeName === 'Search') {
          iconName = `ios-search`;
        } else if (routeName === 'Bookmark') {
          iconName = `ios-heart`;
        }
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: Colors.activeTabTextIcon,
      inactiveTintColor: Colors.inactiveTabTextIcon,
      activeBackgroundColor: Colors.activeTabBackground,
      inactiveBackgroundColor: Colors.inactiveTabBackground
    }
  }
));