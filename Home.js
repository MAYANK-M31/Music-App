import React from "react";
import { View, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack"
import MusicPlayer from "./MusicPlayer";
import Homepage from "./Homepage";
import { useIsFocused } from '@react-navigation/native';

function FocusAwareStatusBar(props) {
    const isFocused = useIsFocused();

    return isFocused ? <StatusBar {...props} /> : null;
}

const stack = createStackNavigator()

const Home = () => {
    return (

        <NavigationContainer independent={true} >
            <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#f6f6f6" />
            <stack.Navigator  >
                <stack.Screen name="Homepage" component={Homepage} options={{ headerShown: false }} />
                {/* <stack.Screen name="MusicPlayer" component={MusicPlayer} options={{headerShown:false}} /> */}
            </stack.Navigator>
        </NavigationContainer>
    )
}

export default Home;

