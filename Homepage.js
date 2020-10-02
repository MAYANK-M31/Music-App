import React, { Component, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Dimensions, ActivityIndicator, Image, StatusBar, AsyncStorage, Modal, RefreshControl, Animated, useColorScheme } from "react-native";
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
import TrendingArtists from "./TrendingArtists";
import PopularSingleArtist from "./PopularSingleArtist";




const Homepage = ({ navigation }) => {



    const PlaybackState = usePlaybackState();
    const [history, sethistory] = useState(false)
    const [modal, setmodal] = useState(true)
    const [banner, setbanner] = useState(false)
    const [refreshing, setrefreshing] = useState(false);
    const [reload, setreload] = useState("false")
    const [slow, setslow] = useState(false)

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

        setTimeout(() => {
            setslow(true)
        }, 5000);


    }, [])

    useEffect(() => {
        func = () => {
            if (PlaybackState == "3") {
                setmodal(false)
                setbanner(true)
                // setTimeout(() => {
                //     setmodal(false)
                // }, 3000);

            }
        }
        func()
    }, [PlaybackState])

    useEffect(() => {
        func = () => {
            if (PlaybackState == "2") {
                setmodal(false)
                // setTimeout(() => {
                //     setmodal(false)
                // }, 3000);

            }
        }
        func()
    }, [PlaybackState])




    const onRefresh = () => {
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
                <View style={{ alignItems: "flex-start", left: 20, width: WIDTH.width, height: 50, backgroundColor: "#f6f6f6", justifyContent: "center" }} >
                    <Text style={{ fontSize: 28, color: '#192038' }} >Music</Text>
                    <View style={{ backgroundColor: "#2bc5b4", width: 76, height: 4, borderRadius: 20 }} ></View>
                </View>



                <Animated.ScrollView style={{ backgroundColor: "#f6f6f6", height: HEIGHT }} contentContainerStyle={{ paddingBottom: 250 }} refreshControl={
                    <RefreshControl onRefresh={() => onRefresh()}
                        refreshing={refreshing} />
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



                    {/*-------------------------- Top Songs Componet------------------------------------ */}
                    <View style={{ width: "100%", height: 30, justifyContent: "center", paddingLeft: 25, marginBottom: 10, marginTop: 25 }} >
                        <Text style={{ fontSize: 20, fontWeight: "700" }} >Top Songs</Text>
                    </View>
                    <Topsongs reload={reload} />
                    {/* ------------------------------------------END--------------------------------------- */}




                    {/* ----------------------------------------Popular Artist Component---------------------------------- */}
                    <View style={{ width: "100%", height: 30, justifyContent: "center", paddingLeft: 25, marginBottom: 10, marginTop: 25 }} >
                        <Text style={{ fontSize: 20, fontWeight: "700" }} >Popular Artists</Text>
                    </View>
                    <TrendingArtists reload={reload} />
                    {/* ------------------------------------------END--------------------------------------- */}
                    <PopularSingleArtist reload={reload} />




                </Animated.ScrollView>

                <Modal transparent={true} visible={modal}   >
                    <View style={{ backgroundColor: "#f6f6f6", justifyContent: "center", alignItems: "center" }} >
                        <View style={{ height: "100%", width: "100%", justifyContent: "center", alignItems: "center" }} >
                            <LottieView style={{ height: 250, width: 250 }} source={require('./animations/2919-play-stop-animation.json')} autoPlay loop />
                            <Text style={{ fontWeight: "700", fontSize: 45, color: "#2c385e" }} >Nirvana</Text>

                            <View style={{ position: "absolute", bottom: 140, justifyContent: "center", alignItems: "center", flexDirection: "row-reverse", height: 50 }} >
                                {slow ?
                                
                                    <View style={{ height: 40,alignItems:"center" }}>
                                        <LottieView style={{ height: 40, width: 20 }} source={require("./animations/20850-radio-tower.json")} autoPlay loop />
                                        <Text style={{top:0}} >Connecting</Text>
                                    </View>
                                    : null
                                }


                            </View>


                            <Text style={{ fontWeight: "100", fontSize: 15, color: "#e7164c", bottom: 60, position: "absolute" }} > Powered by AI</Text>
                        </View>

                    </View>

                </Modal>
            </View>


        </SafeAreaView>

    )
}


export default Homepage;