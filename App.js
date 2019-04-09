import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import {
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator,
  DrawerItems
} from "react-navigation";

import Login from "./components/Login";
import Map from "./components/Map";
import SignUp from "./components/SignUp";
//   import SpotPage from './components/SpotPage'
//   import MySpots from './components/MySpots'
//   import Settings from './components/Settings'
import SideMenu from "./components/SideMenu.js";

import { Provider } from "react-redux";
import store from "./store";

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

const Drawer = createStackNavigator(
  {
    Map: { screen: Map }
    // 'My Spots': {screen: MySpots},
    // Settings: {screen: Settings},
    // SpotPage: {screen: SpotPage},
    // NewSpotPage: {screen: NewSpotPage},
    // LocationSelectorMap: {screen: LocationSelectorMap},
    // AdminConsole:{screen: AdminConsole},
    // PostsPage:{screen: PostsPage},
    // Approvals:{screen: Approvals},
    // ApprovalSpotPage:{screen: ApprovalSpotPage},
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  },
  {
    initialRouteName: "Map"
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

const AppContainer = createAppContainer(PrimaryNav);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

export default App;
