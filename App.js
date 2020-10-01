import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { YellowBox } from "react-native"
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import Tabbar from "./Tabbar"

YellowBox.ignoreWarnings(['Warning: ReactNative.createElement'
  , "VirtualizedLists"
  , "Warning: Each child in a list",
  " Warning: Cannot update a component....",
  "StatusBar._updatePropsStack"]);

const App = () => {

  useEffect(() => {
    SplashScreen.hide()
  }, [])

  return (
    <Tabbar />
  )

}

export default App;
