import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator,
  DrawerItems
} from "react-navigation";

import Login from "./components/Login";
import SignUp from "./components/SignUp";
import SideMenu from "./components/SideMenu.js";

// import Map from "./components/Map";

import HomeScreen from './containers/Home';
import MatchesScreen from './containers/Matches';
import MessagesScreen from './containers/Messages';
import ProfileScreen from './containers/Profile';


//   import SpotPage from './components/SpotPage'
//   import MySpots from './components/MySpots'
//   import Settings from './components/Settings'

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

// const Drawer = createStackNavigator(
//   {
//     Map: { screen: Map }
//     // 'My Spots': {screen: MySpots},
//     // Settings: {screen: Settings},
//     // SpotPage: {screen: SpotPage},
//     // NewSpotPage: {screen: NewSpotPage},
//     // LocationSelectorMap: {screen: LocationSelectorMap},
//     // AdminConsole:{screen: AdminConsole},
//     // PostsPage:{screen: PostsPage},
//     // Approvals:{screen: Approvals},
//     // ApprovalSpotPage:{screen: ApprovalSpotPage},
//   },
//   {
//     headerMode: "none",
//     navigationOptions: {
//       headerVisible: false
//     }
//   },
//   {
//     initialRouteName: "Map"
//   }
// );
const Drawer = createBottomTabNavigator(
	{
		Explore: {
			screen: HomeScreen,
			navigationOptions: {
				tabBarIcon: ({ focused, tintColor }) => {
					const iconFocused = focused ? '#7444C0' : '#363636';
					return (
						<Text style={[styles.icon, { color: iconFocused }]}>&#xf50d;</Text>
					);
				}
			}
		},
		Matches: {
			screen: MatchesScreen,
			navigationOptions: {
				tabBarIcon: ({ focused, tintColor }) => {
					const iconFocused = focused ? '#7444C0' : '#363636';
					return (
						<Text style={[styles.icon, { color: iconFocused }]}>&#xe800;</Text>
					);
				}
			}
		},
		Chat: {
			screen: MessagesScreen,
			navigationOptions: {
				tabBarIcon: ({ focused, tintColor }) => {
					const iconFocused = focused ? '#7444C0' : '#363636';
					return (
						<Text style={[styles.icon, { color: iconFocused }]}>&#xf4ac;</Text>
					);
				}
			}
		},
		Profile: {
			screen: ProfileScreen,
			navigationOptions: {
				tabBarIcon: ({ focused, tintColor }) => {
					const iconFocused = focused ? '#7444C0' : '#363636';
					return (
						<Text style={[styles.icon, { color: iconFocused }]}>&#xf061;</Text>
					);
				}
			}
		}
	},
	{
		tabBarOptions: {
			activeTintColor: '#7444C0',
			inactiveTintColor: '#363636',
			labelStyle: {
				fontSize: 14,
				textTransform: 'uppercase',
				paddingTop: 10
			},
			style: {
				backgroundColor: '#FFF',
				borderTopWidth: 0,
				paddingVertical: 30,
				height: 60,
				marginBottom: 0,
				shadowOpacity: 0.05,
				shadowRadius: 10,
				shadowColor: '#000',
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
		paddingBottom: 30,
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1
	},
	tabButtonText: {
		textTransform: 'uppercase'
	},
	icon: {
		fontFamily: 'tinderclone',
		height: 20,
		paddingBottom: 7
	}
});

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
