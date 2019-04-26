import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator} from "react-navigation";
import { AppLoading, Font } from 'expo';

import Login from "./src/components/Login";
import SignUp from "./src/components/SignUp";
import SideMenu from "./src/components/SideMenu.js";
import HomeScreen from "./src/containers/Home";
import MatchesScreen from "./src/containers/Matches";
import MessagesScreen from "./src/containers/Messages";
import ProfileScreen from "./src/containers/Profile";
import store from "./src/store/store";

import { Provider } from "react-redux";
console.disableYellowBox = true;

const RootStack = createStackNavigator(
  {
    Login: { screen: Login },
    SignUp: { screen: SignUp }
    // CommentsPage:{screen: CommentsPage},
    // UsersPage:{screen: UsersPage},
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false,
      drawerLockMode: "locked-closed"
    }
  }
);


// export default class App extends React.Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>Open up App.js to start working on your app!</Text>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });





const Drawer = createBottomTabNavigator(
  {
    Explore: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({ focused }) => {
          const iconFocused = focused ? "#7444C0" : "#363636";
          return (
            <Text style={[styles.icon, { color: iconFocused }]}>&#xf50d;</Text>
          );
        }
      }
    },
    Matches: {
      screen: MatchesScreen,
      navigationOptions: {
        tabBarIcon: ({ focused }) => {
          const iconFocused = focused ? "#7444C0" : "#363636";
          return (
            <Text style={[styles.icon, { color: iconFocused }]}>&#xe800;</Text>
          );
        }
      }
    },
    Chat: {
      screen: MessagesScreen,
      navigationOptions: {
        tabBarIcon: ({ focused }) => {
          const iconFocused = focused ? "#7444C0" : "#363636";
          return (
            <Text style={[styles.icon, { color: iconFocused }]}>&#xf4ac;</Text>
          );
        }
      }
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: ({ focused }) => {
          const iconFocused = focused ? "#7444C0" : "#363636";
          return (
            <Text style={[styles.icon, { color: iconFocused }]}>&#xf061;</Text>
          );
        }
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: "#7444C0",
      inactiveTintColor: "#363636",
      labelStyle: {
        fontSize: 14,
        textTransform: "uppercase",
        paddingTop: 10
      },
      style: {
        backgroundColor: "#FFF",
        borderTopWidth: 0,
        // paddingVertical: 30,
        height: 60,
        marginBottom: 0,
        shadowOpacity: 0.05,
        shadowRadius: 10,
        shadowColor: "#000",
        shadowOffset: { height: 0, width: 0 }
      }
    }
  }
);

const HomeNavigationDrawer = createDrawerNavigator(
  {
    RootStack: { screen: RootStack },
    Drawer: { screen: Drawer }
  },
  {
    contentComponent: SideMenu,
    drawerOpenRoute: "DrawerOpen",
    drawerCloseRoute: "DrawerClose",
    drawerToggleRoute: "DrawerToggle",
    drawerWidth: 250
  }
);
const PrimaryNav = createStackNavigator(
  {
    HomeNavigationDrawer: { screen: HomeNavigationDrawer }
  },
  {
    // Default config for all screens
    headerMode: "none",
    title: "Main",
    initialRouteName: "HomeNavigationDrawer",
    gesturesEnabled: false
  }
);

const styles = StyleSheet.create({
  tabButton: {
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  tabButtonText: {
    textTransform: "uppercase"
  },
  icon: {
    fontFamily: "tinderclone",
    height: 20,
    paddingTop: 7
  }
});

const AppContainer = createAppContainer(PrimaryNav);

class App extends React.Component {
  state = {
    isReady: false,
  };
  async componentDidMount() {
    await Font.loadAsync(
      'tinderclone',
      // eslint-disable-next-line
      require('./assets/fonts/tinderclone.ttf')
    );

    await Font.loadAsync(
      'Lobster',
      // eslint-disable-next-line
      require('./assets/fonts/Lobster-Regular.ttf')
    );
    // eslint-disable-next-line
    this.setState({ isReady: true });
  }
  render() {
    const {isReady } = this.state;
    if (!isReady) {
      return <AppLoading />;
    }
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

export default App;
