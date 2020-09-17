import React from "react";
import  {View} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator,CardStyleInterpolators} from "@react-navigation/stack"
import MusicPlayer from "./MusicPlayer";
import Homepage from "./Homepage";
import ArtistPlaylist from "./ArtistPlaylist";
import Searchpage from "./Searchpage";

const stack = createStackNavigator()

const SearchStack = ()=>{
    return(
    <NavigationContainer independent={true} >
        <stack.Navigator screenOptions={{cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS}}  >
            <stack.Screen name="Searchpage" component={Searchpage} options={{headerShown:false}} />
            <stack.Screen  name="ArtistPlaylist" component={ArtistPlaylist} options={{headerShown:false}} />
        </stack.Navigator>
    </NavigationContainer>
    )
}

export default SearchStack;

