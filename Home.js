import React from "react";
import  {View} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack"
import MusicPlayer from "./MusicPlayer";
import Homepage from "./Homepage";

const stack = createStackNavigator()

const Home = ()=>{
    return(
    <NavigationContainer independent={true} >
        <stack.Navigator  >
            <stack.Screen name="Homepage" component={Homepage} options={{headerShown:false}} />
            {/* <stack.Screen name="MusicPlayer" component={MusicPlayer} options={{headerShown:false}} /> */}
        </stack.Navigator>
    </NavigationContainer>
    )
}

export default Home;

