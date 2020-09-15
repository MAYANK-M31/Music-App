import React from 'react';
import {YellowBox} from "react-native"
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
,"VirtualizedLists"
,"Warning: Each child in a list",
" Warning: Cannot update a component...."]);

const App = () => {
 
  return (
    <Tabbar/>
  )

}

export default App;
