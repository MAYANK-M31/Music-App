import React, { Component, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Dimensions, ActivityIndicator, Image, StatusBar } from "react-native";
import Icons from "react-native-vector-icons/FontAwesome5"
import Ionicons from "react-native-vector-icons/Ionicons"
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/AntDesign";
import TrackPlayer, { play, STATE_BUFFERING, useProgress, usePlaybackState } from 'react-native-track-player';
import Slider from "react-native-slider";
const WIDTH = Dimensions.get("window")
const HEIGHT = Dimensions.get("window").height



const Homepage = ({ navigation }) => {



    return (
        <View style={{ backgroundColor: "#f6f6f6", flex: 1, }} >
            <StatusBar backgroundColor={"#f6f6f6"} barStyle={"dark-content"} />
            <View style={{ alignItems: "center", left: 10, width: WIDTH.width / 4 }} >
                <Text style={{ fontSize: 28, color: '#192038' }} >Music</Text>
                <View style={{ backgroundColor: "#2bc5b4", width: 76, height: 4, borderRadius: 20 }} ></View>
            </View>

            <View style={{ width: "100%", height: HEIGHT / 3, paddingTop: "2%" }} >
                <Image style={{ width: "100%", height: "100%" }} source={{ uri: "https://wallpapercave.com/wp/wp4236611.jpg" }} />
            </View>

            <View style={{ width: "100%", height: HEIGHT / 15, justifyContent: "center", paddingLeft: 10 }} >
                <Text style={{ fontSize: 22, fontWeight: "700" }} >Hi There</Text>
            </View>

            <View style={{ width: "100%", height: HEIGHT / 4, justifyContent: "flex-end" }} >
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ height: "100%", width: WIDTH.width * 2 + 70, alignItems: "center" }} >
                    <View style={{ width: WIDTH.width / 3.5, height: "100%", marginLeft: "1%" }} >
                        <View style={{ width: "100%", height: "60%", borderRadius: 5, overflow: "hidden" }} >
                            <Image style={{ width: "100%", height: "100%" }} source={{ uri: "https://www.hdwallpapers.in/download/alan_walker_a_ap_rocky_live_fast_pubg_4k-2560x1440.jpg" }} />
                        </View>
                        <View style={{ width: "100%", height: "40%", alignItems: "center", paddingTop: 8 }} >
                            <Text style={{ fontSize: 15, fontWeight: '700' }} >Live Fast</Text>
                            <Text style={{ fontSize: 12, fontWeight: '700', color: "silver" }} >Alan Walker-PUBG</Text>
                        </View>
                    </View>
                    <View style={{ width: WIDTH.width / 3.5, height: "100%", marginLeft: "1%" }} >
                        <View style={{ width: "100%", height: "60%", borderRadius: 5, overflow: "hidden" }} >
                            <Image style={{ width: "100%", height: "100%" }} source={{ uri: "https://upload.wikimedia.org/wikipedia/en/thumb/4/46/Drake_-_Toosie_Slide.png/220px-Drake_-_Toosie_Slide.png" }} />
                        </View>
                        <View style={{ width: "100%", height: "40%", alignItems: "center", paddingTop: 8 }} >
                            <Text style={{ fontSize: 15, fontWeight: '700' }} >Toosie Slide</Text>
                            <Text style={{ fontSize: 12, fontWeight: '700', color: "silver" }} >Scorpion - Drake</Text>
                        </View>
                    </View>
                    <View style={{ width: WIDTH.width / 3.5, height: "100%", marginLeft: "1%" }} >
                        <View style={{ width: "100%", height: "60%", borderRadius: 5, overflow: "hidden" }} >
                            <Image style={{ width: "100%", height: "100%" }} source={{ uri: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Anne-Marie_-_Ciao_Adios.png/220px-Anne-Marie_-_Ciao_Adios.png" }} />
                        </View>
                        <View style={{ width: "100%", height: "40%", alignItems: "center", paddingTop: 8 }} >
                            <Text style={{ fontSize: 15, fontWeight: '700' }} >Cios Adios</Text>
                            <Text style={{ fontSize: 12, fontWeight: '700', color: "silver" }} >Annie Maria</Text>
                        </View>
                    </View>
                    <View style={{ width: WIDTH.width / 3.5, height: "100%", marginLeft: "1%" }} >
                        <View style={{ width: "100%", height: "60%", borderRadius: 5, overflow: "hidden" }} >
                            <Image style={{ width: "100%", height: "100%" }} source={{ uri: "https://upload.wikimedia.org/wikipedia/en/9/9d/Marshmello_and_Anne-Marie_Friends.jpg" }} />
                        </View>
                        <View style={{ width: "100%", height: "40%", alignItems: "center", paddingTop: 8 }} >
                            <Text style={{ fontSize: 15, fontWeight: '700' }} >Friends</Text>
                            <Text style={{ fontSize: 12, fontWeight: '700', color: "silver" }} >Annie Maria</Text>
                        </View>
                    </View>
                    <View style={{ width: WIDTH.width / 3.5, height: "100%", marginLeft: "1%" }} >
                        <View style={{ width: "100%", height: "60%", borderRadius: 5, overflow: "hidden" }} >
                            <Image style={{ width: "100%", height: "100%" }} source={{ uri: "https://i.ytimg.com/vi/pZyGoq-FJYo/maxresdefault.jpg" }} />
                        </View>
                        <View style={{ width: "100%", height: "40%", alignItems: "center", paddingTop: 8 }} >
                            <Text style={{ fontSize: 15, fontWeight: '700' }} >Intentions</Text>
                            <Text style={{ fontSize: 12, fontWeight: '700', color: "silver" }} >Justien Bieber</Text>
                        </View>
                    </View>
                    <View style={{ width: WIDTH.width / 3.5, height: "100%", marginLeft: "1%" }} >
                        <View style={{ width: "100%", height: "60%", borderRadius: 5, overflow: "hidden" }} >
                            <Image style={{ width: "100%", height: "100%" }} source={{ uri: "https://upload.wikimedia.org/wikipedia/en/0/04/DripReport_-_Sketchers_New_Cover.jpg" }} />
                        </View>
                        <View style={{ width: "100%", height: "40%", alignItems: "center", paddingTop: 8 }} >
                            <Text style={{ fontSize: 15, fontWeight: '700' }} >Sketchers</Text>
                            <Text style={{ fontSize: 12, fontWeight: '700', color: "silver" }} >Drip Report</Text>
                        </View>
                    </View>
                    <View style={{ width: WIDTH.width / 3.5, height: "100%", marginLeft: "1%", alignItems: "center", justifyContent: "center" }} >
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
            </View>

            {/* ----------------------Bottom Player ------------------------------------------------------ */}

{/* 
            <View style={{ bottom: 0, position: "absolute", height: HEIGHT / 12 }} >
                <Slider minimumValue={0} maximumValue={duration} value={position} trackStyle={{ height: 2 }} thumbStyle={{ height: 0, width: 0, borderRadius: 50, elevation: 1 }} minimumTrackTintColor={"#2bc5b4"} maximumTrackTintColor={"#00FFFF00"} thumbTintColor={"#2bc5b4"} style={{ width: WIDTH.width, height: 3, position: "absolute" }} />
                <View style={{ bottom: -2, width: WIDTH.width, height: HEIGHT / 13, alignItems: "center", paddingLeft: "1%", borderTopWidth: 0.4, borderTopColor: "silver", flexDirection: "row" }} >
                    <View style={{ width: WIDTH.width / 8, height: "90%" }}>
                        <Image style={{ width: "100%", height: "100%" }} source={{ uri: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Anne-Marie_-_Ciao_Adios.png/220px-Anne-Marie_-_Ciao_Adios.png" }} />
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate("MusicPlayer")} style={{ width: WIDTH.width / 1.5, height: "90%", paddingLeft: 15, justifyContent: "center" }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold" }} >Cios Adios</Text>
                        <Text style={{ fontSize: 15, color: "silver" }} >Annie Maria - Drake</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={playpause} style={{ width: WIDTH.width / 5.2, height: "90%", justifyContent: "center", alignItems: "center" }}>
                        {renderplaypause()}
                    </TouchableOpacity>
                </View>
            </View> */}


        </View>

    )
}


export default Homepage;