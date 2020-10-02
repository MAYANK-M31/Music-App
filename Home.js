import React from "react";
import { View, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack"
import MusicPlayer from "./MusicPlayer";
import Homepage from "./Homepage";
import ArtistPlaylistHome from "./ArtistPlaylistHome";


const stack = createStackNavigator()

const Home = () => {
    return (

        <NavigationContainer independent={true} >
            <stack.Navigator  >
                <stack.Screen name="Homepage" component={Homepage} options={{ headerShown: false }} />
                <stack.Screen name="ArtistPlaylistHome" component={ArtistPlaylistHome} options={{headerShown:false}} />
            </stack.Navigator>
        </NavigationContainer>
    )
}

export default Home;

