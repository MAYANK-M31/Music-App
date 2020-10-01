import React, { Component, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Dimensions, ActivityIndicator, Image, StatusBar, AsyncStorage, Modal, RefreshControl,Animated,useColorScheme } from "react-native";
import Icons from "react-native-vector-icons/FontAwesome5"
import Ionicons from "react-native-vector-icons/Ionicons"
import { ScrollView, FlatList } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/AntDesign";
import TrackPlayer, { play, STATE_BUFFERING, useProgress, usePlaybackState } from 'react-native-track-player';
import Slider from "react-native-slider";
import { SafeAreaView } from "react-native-safe-area-context";
import RecentPlayed from "./RecentPlayed";
const WIDTH = Dimensions.get("window")
const HEIGHT = Dimensions.get("window").height
import LottieView from "lottie-react-native"
import { useIsFocused } from '@react-navigation/native';
import Topsongs from "./Topsongs";




const Homepage = ({ navigation }) => {
    
 

    const PlaybackState = usePlaybackState();
    const [history, sethistory] = useState(false)
    const [modal, setmodal] = useState(true)
    const [banner, setbanner] = useState(false)
    const [refreshing, setrefreshing] = useState(false);
    const [reload,setreload] =useState("false")

    useEffect(() => {
        historyfuction = async () => {
            const value = await AsyncStorage.getItem("history")
            if (value === null) {
                sethistory(false)
            } else {
                sethistory(true)
            }


        }
        historyfuction()

        // if (PlaybackState == "2" || "3") {
            
        //     setTimeout(() => {
        //         setmodal(false)
        //     }, 3000);

        // }

        setTimeout(() => {
            setbanner(true)
        }, 10000);


    }, [])
    
    useEffect(()=>{
        func=()=>{
            if (PlaybackState == "3") {
                setmodal(false)
                setbanner(true)
                // setTimeout(() => {
                //     setmodal(false)
                // }, 3000);
    
            }
        }
        func()
    },[PlaybackState])

    useEffect(()=>{
        func=()=>{
            if (PlaybackState == "2") {
                setmodal(false)
                // setTimeout(() => {
                //     setmodal(false)
                // }, 3000);
    
            }
        }
        func()
    },[PlaybackState])

  


    const onRefresh =()=>{
        setreload("true")
        setrefreshing(true)
        setTimeout(() => {
            setrefreshing(false)
            setreload("false")
            historyfuction = async () => {
                const value = await AsyncStorage.getItem("history")
                if (value === null) {
                    sethistory(false)
                } else {
                    sethistory(true)
                }
    
    
            }
            historyfuction()
        }, 500);
        
    }




    return (
        <SafeAreaView>
            <View>

            <StatusBar backgroundColor={"#f6f6f6"} barStyle={"dark-content"} />
            <View style={{ alignItems: "flex-start", left: 20, width: WIDTH.width, height: 50,backgroundColor:"#f6f6f6",justifyContent:"center" }} >
                <Text style={{ fontSize: 28, color: '#192038' }} >Music</Text>
                <View style={{ backgroundColor: "#2bc5b4", width: 76, height: 4, borderRadius: 20 }} ></View>
            </View>



            <Animated.ScrollView style={{ backgroundColor: "#f6f6f6", height: HEIGHT - 150 }} refreshControl={
                <RefreshControl onRefresh={() => onRefresh()}
                    refreshing={refreshing}  />
            }
              >

                {banner ?
                    <View style={{ width: "100%", height: 250, paddingTop: "2%" }} >
                        <Image style={{ width: "100%", height: "100%" }} source={{ uri: "https://wallpapercave.com/wp/wp4236611.jpg" }} />
                    </View>
                    : null}


                {history ?
                    <RecentPlayed reload={reload} />
                    :
                    null
                }

                <View style={{ width: "100%", height: 30, justifyContent: "center", paddingLeft: 25, marginBottom: 10, marginTop: 25 }} >
                    <Text style={{ fontSize: 20, fontWeight: "700" }} >Top Songs</Text>
                </View>


                <Topsongs reload={reload} />


                <View style={{ width: "100%", height: 30, justifyContent: "center", paddingLeft: 25, marginBottom: 10, marginTop: 25 }} >
                    <Text style={{ fontSize: 20, fontWeight: "700" }} >Trending Artist</Text>
                </View>


                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} scrollEventThrottle={16} style={{ height: 170 }} contentContainerStyle={{ height: 185, paddingLeft: 15, paddingRight: 15 }}  >
                    <View style={{ width: 115, height: "100%", marginLeft: 10, padding: 5 }} >
                        <View style={{ width: "100%", height: "60%", borderRadius: 100, overflow: "hidden" }} >
                            <Image style={{ width: "100%", height: "100%" }} source={{ uri: "https://static.toiimg.com/thumb/msid-69771713,width-800,height-600,resizemode-75,imgsize-64652,pt-32,y_pad-40/69771713.jpg" }} />
                        </View>
                        <View style={{ width: "100%", height: "40%", alignItems: "center", paddingTop: 8 }} >
                            <Text style={{ fontSize: 15, fontWeight: '700' }} >Diljit Dosanjh</Text>
                            <Text style={{ fontSize: 12, fontWeight: '700', color: "silver" }} >Trending</Text>
                        </View>
                    </View>
                    <View style={{ width: WIDTH.width / 3.5, height: "100%", marginLeft: 10 }} >
                        <View style={{ width: "100%", height: "60%", borderRadius: 5, overflow: "hidden" }} >
                            <Image style={{ width: "100%", height: "100%" }} source={{ uri: "https://media.santabanta.com/newsite/cinemascope/feed/diljit-goat.jpg" }} />
                        </View>
                        <View style={{ width: "100%", height: "40%", alignItems: "center", paddingTop: 8 }} >
                            <Text style={{ fontSize: 15, fontWeight: '700' }} >G.O.A.T</Text>
                            <Text style={{ fontSize: 12, fontWeight: '700', color: "silver" }} >Diljit Dosanjh</Text>
                        </View>
                    </View>
                    <View style={{ width: WIDTH.width / 3.5, height: "100%", marginLeft: 10 }} >
                        <View style={{ width: "100%", height: "60%", borderRadius: 5, overflow: "hidden" }} >
                            <Image style={{ width: "100%", height: "100%" }} source={{ uri: "https://media.newstracklive.com/uploads/entertainment-news/regional-cinema-news/Sep/05/big_thumb/DILJIT_5f534efb2e3a9.JPG" }} />
                        </View>
                        <View style={{ width: "100%", height: "40%", alignItems: "center", paddingTop: 8 }} >
                            <Text style={{ fontSize: 15, fontWeight: '700' }} >Born To Shine</Text>
                            <Text style={{ fontSize: 12, fontWeight: '700', color: "silver" }} >Diljit Dosanjh</Text>
                        </View>
                    </View>
                    <View style={{ width: WIDTH.width / 3.5, height: "100%", marginLeft: 10 }} >
                        <View style={{ width: "100%", height: "60%", borderRadius: 5, overflow: "hidden" }} >
                            <Image style={{ width: "100%", height: "100%" }} source={{ uri: "https://whatson.guide/wp-content/uploads/2020/08/Clash-Diljit-min.jpg" }} />
                        </View>
                        <View style={{ width: "100%", height: "40%", alignItems: "center", paddingTop: 8 }} >
                            <Text style={{ fontSize: 15, fontWeight: '700' }} >Clash</Text>
                            <Text style={{ fontSize: 12, fontWeight: '700', color: "silver" }} >Diljit Dosanjh</Text>
                        </View>
                    </View>
                    <View style={{ width: WIDTH.width / 3.5, height: "100%", marginLeft: 10 }} >
                        <View style={{ width: "100%", height: "60%", borderRadius: 5, overflow: "hidden" }} >
                            <Image style={{ width: "100%", height: "100%" }} source={{ uri: "https://m.media-amazon.com/images/I/71WN-EL5oWL._SS500_.jpg" }} />
                        </View>
                        <View style={{ width: "100%", height: "40%", alignItems: "center", paddingTop: 8 }} >
                            <Text style={{ fontSize: 15, fontWeight: '700' }} >Do You Know</Text>
                            <Text style={{ fontSize: 12, fontWeight: '700', color: "silver" }} >Diljit Dosanjh</Text>
                        </View>
                    </View>
                    <View style={{ width: WIDTH.width / 3.5, height: "100%", marginLeft: 10 }} >
                        <View style={{ width: "100%", height: "60%", borderRadius: 5, overflow: "hidden" }} >
                            <Image style={{ width: "100%", height: "100%" }} source={{ uri: "https://api.pendu-jatt.com/thumb/10442784.jpg" }} />
                        </View>
                        <View style={{ width: "100%", height: "40%", alignItems: "center", paddingTop: 8 }} >
                            <Text style={{ fontSize: 15, fontWeight: '700' }} >Laembadgini</Text>
                            <Text style={{ fontSize: 12, fontWeight: '700', color: "silver" }} >Diljit Dosanjh</Text>
                        </View>
                    </View>
                    <View style={{ width: WIDTH.width / 3.5, height: "100%", marginLeft: 10, alignItems: "center", justifyContent: "center" }} >
                        <View style={{ width: "100%", height: "60%", alignItems: "center", justifyContent: "center" }} >
                            <View style={{ width: "80%", height: "80%", alignItems: "center", backgroundColor: "#e7fdf2", borderRadius: 200, borderWidth: 0.2, borderColor: "silver", alignItems: "center", justifyContent: "center" }} >
                                <Icon name={"play"} size={30} color={"#2bc5b4"} />

                            </View>
                            <Text style={{ fontSize: 15, fontWeight: '700' }} >View All</Text>
                        </View>
                        <View style={{ width: "100%", height: "40%", alignItems: "center", paddingTop: 8 }} >

                        </View>

                    </View>


                </ScrollView>

            </Animated.ScrollView>

            <Modal transparent={true} visible={modal}   >
                <View style={{ backgroundColor: "#f6f6f6", justifyContent: "center", alignItems: "center" }} >
                    <View style={{ height: "100%", width: "100%", justifyContent: "center", alignItems: "center" }} >
                        <LottieView style={{ height: 250, width: 250 }} source={require('./animations/2919-play-stop-animation.json')} autoPlay loop />
                        <Text style={{fontWeight:"700",fontSize:45,color:"#2c385e"}} >Nirvana</Text>
                    </View>
                   
                </View>
            </Modal>
            </View>


        </SafeAreaView>

    )
}


export default Homepage;