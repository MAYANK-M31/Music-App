import React from "react";
import { View, Dimensions,Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from "react-native-vector-icons/Ionicons"
import Home from "./Home";
import Search from "./Search";
import Mymusic from "./Mymusic";
import Browse from "./Browse";
import MyTabBar from "./MyTabBar"
import BottomTab from "./BottomTab";
import MusicPlayer from "./MusicPlayer";

const Tab = createBottomTabNavigator()
const HEIGHT = Dimensions.get("window").height
const Tabbar = (props) => {
    return (
        <NavigationContainer  >
        
            <Tab.Navigator  initialRouteName={"Home"}  screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused
                            ? 'ios-home-outline'
                            : 'ios-home-outline';
                    } else if (route.name === 'Search') {
                        iconName = focused ? 'ios-search-outline' : 'ios-search-outline';
                    } else if (route.name === 'My Music') {
                        iconName = focused ? 'ios-person-outline' : 'ios-person-outline';
                    }else if (route.name === 'Browse') {
                        iconName = focused ? 'ios-compass-outline' : 'ios-compass-outline';
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                }
            })}
                tabBarOptions={{
                    activeTintColor: '#192038',
                    inactiveTintColor: 'gray',
                    tabStyle:[{backgroundColor:"#f6f6f6",marginTop:58}],
                    labelStyle:{fontWeight:"normal",bottom:9,fontSize:10},
                    style:{height:HEIGHT/6.19,elevation:0},
                    keyboardHidesTabBar:true
                }} >
                <Tab.Screen  name="Home" component={Home}  />
                <Tab.Screen  name="Search" component={Search} />
                <Tab.Screen  name="Browse" component={Browse} />
                <Tab.Screen name="MusicPlayer" component={MusicPlayer}  options={{tabBarButton:(props)=><BottomTab  {...props}/>,tabBarVisible:false }}  />
                <Tab.Screen  name="My Music" component={Mymusic} />
                
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default Tabbar;
