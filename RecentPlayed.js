import React, { Component, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Dimensions, ActivityIndicator, Image, StatusBar, AsyncStorage } from "react-native";
import Icons from "react-native-vector-icons/FontAwesome5"
import Ionicons from "react-native-vector-icons/Ionicons"
import { ScrollView, FlatList } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/AntDesign";
import TrackPlayer, { play, STATE_BUFFERING, useProgress, usePlaybackState } from 'react-native-track-player';
import Slider from "react-native-slider";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableRipple } from "react-native-paper";
const WIDTH = Dimensions.get("window")
const HEIGHT = Dimensions.get("window").height

const colorarray = [
    { id: 1, color: "#a0febf" },
    { id: 2, color: "lightpink" },
    { id: 3, color: "#feff7fCC" },
    { id: 4, color: "palegreen" },
    { id: 5, color: "#f4dcdc" },
    { id: 6, color: "#feff7fCC" },
    { id: 7, color: "#a0febf" },
    { id: 8, color: "lightpink" },
    { id: 9, color: "#feff7f" },
    { id: 10, color: "palegreen" },
    { id: 11, color: "#f4dcdc" },
    { id: 12, color: "#feff7fCC" },
    { id: 13, color: "#a0febf" },
    { id: 14, color: "lightpink" },
    { id: 15, color: "#feff7f" },
    { id: 16, color: "palegreen" },
    { id: 17, color: "#f4dcdc" },
    { id: 18, color: "lightpink" },
    { id: 19, color: "#a0febf" },
    { id: 20, color: "#feff7fCC" },


]

const RecentPlayed = (props) => {
    const [history, sethistory] = useState(false)
    const [recent, setrecent] = useState([])
    const [trendloader, settrendloader] = useState(true)

    useEffect(() => {
        historyfuction = async () => {
            const value = await AsyncStorage.getItem("history")
            if (value === null) {
                sethistory(false)
            } else {
                sethistory(true)
                settrendloader(false)
                // console.log(value)
                // await AsyncStorage.removeItem("history")
                setrecent(JSON.parse(value).reverse())
            }


        }
        historyfuction()
    }, [])

    useEffect(() => {
        settrendloader(true)
        historyfuction = async () => {
            const value = await AsyncStorage.getItem("history")
            if (value === null) {
                sethistory(false)
            } else {
                sethistory(true)
                settrendloader(false)
                // console.log(value)
                // await AsyncStorage.removeItem("history")
                setrecent(JSON.parse(value).reverse())
            }


        }
        historyfuction()
    }, [props.reload])

    const play = async (item) => {



        const track = {
            "id": item.id,
            "url": item.url,
            "title": item.title,
            "album": item.album,
            "artist": item.artist,
            "img": item.img
        }
        TrackPlayer.reset()

        TrackPlayer.add([track]).then(async function () {
            await TrackPlayer.play()
            // console.log(await TrackPlayer.getCurrentTrack())
        });


    }

    return (
        <View style={{ height: 250 }} >

            {history ?
                <View>
                    <View style={{ width: "100%", height: HEIGHT / 10, justifyContent: "center", paddingLeft: 25 }} >
                        <Text style={{ fontSize: 22, fontWeight: "700" }} >Hi There</Text>
                        <Text style={{ fontSize: 14, fontWeight: "100", color: "grey" }} >Recently Played</Text>
                    </View>


                    {trendloader ?
                        <FlatList
                            keyboardShouldPersistTaps="always"
                            data={colorarray.reverse()}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            scrollEventThrottle={16}
                            contentContainerStyle={{ height: 185, paddingRight: 25, paddingLeft: 20 }}
                            style={{ height: 160 }}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => {
                                return (
                                    <View>

                                        <TouchableOpacity onPress={() => play(item)} style={{ width: WIDTH.width / 3.5, height: "100%", marginLeft: 4 }} >
                                            <View style={{ width: "100%", height: "60%", borderRadius: 3, overflow: "hidden", backgroundColor: item.color }} >

                                            </View>
                                            <View style={{ width: "100%", height: "40%", alignItems: "center", paddingTop: 8 }} >

                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                )
                            }}
                        />
                        :
                        <FlatList
                            keyboardShouldPersistTaps="always"
                            data={recent}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            scrollEventThrottle={16}
                            contentContainerStyle={{ height: 185, paddingRight: 25, paddingLeft: 20 }}
                            style={{ height: 160 }}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => {
                                return (
                                    <View>

                                        <TouchableOpacity onPress={() => play(item)} style={{ width: WIDTH.width / 3.5, height: "100%", marginLeft: 4 }} >
                                            <View style={{ width: "100%", height: "60%", borderRadius: 3, overflow: "hidden" }} >
                                                <Image style={{ width: "100%", height: "100%" }} source={{ uri: item.img }} />
                                            </View>
                                            <View style={{ width: "100%", height: "40%", alignItems: "center", paddingTop: 8 }} >
                                                <Text style={{ fontSize: 14, fontWeight: '700', textTransform: "capitalize" }} >{item.title}</Text>
                                                <Text style={{ fontSize: 12, fontWeight: '700', color: "silver", textTransform: "capitalize" }} >{item.artist}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                )
                            }}
                        />
                    }
                </View>

                :
                null
            }





        </View>

    )
}


export default RecentPlayed;