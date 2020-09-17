import React, { Component, useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Dimensions, ActivityIndicator, FlatList, Image, StatusBar, Keyboard, AsyncStorage, BackHandler } from "react-native";
import Icons from "react-native-vector-icons/Entypo"
import Ionicons from "react-native-vector-icons/Ionicons"
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import TrackPlayer from "react-native-track-player"
import { TouchableRipple } from "react-native-paper"
import { useNavigation } from '@react-navigation/native';

var _ = require('underscore');

const WIDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height

const Searchpage = ({navigation}) => {
    const [result, setresult] = useState("");
    const [data, setdata] = useState([])
    const [found, setfound] = useState(null)
    const [loading, setloading] = useState(false)
    const [playbutton, setplaybutton] = useState()
    const [array, setarray] = useState([])
    const [recent, setrecent] = useState([])
    const [history, sethistory] = useState(false)
    const [artist, setartist] = useState({ artist: "artist", image: "https://a2zwiki.com/wp-content/uploads/2020/01/Arijit-Singh-Wiki.jpg" })
    const [showartist, setshowartist] = useState(false)
    const [cross, setcross] = useState()
    const [searchdata,setsearchdata] = useState()


    const search = async (data) => {
        setloading(true)
        sethistory(false)
        setsearchdata(data)
        if (data.length == 0) {  /// To avoid showing no result found on  backpress inputbox
            setfound(true)
            setloading(false)
            setcross(false)
            historyfuction()
        } else {
            setcross(true)
        }


        await axios.get("http://192.168.31.74:5000/data/" + `${data}`.toLowerCase())  // Toosie Slide  dolce gabbana
            .then(res => {
                const a = res.data
                function renameKey(obj, oldKey, newKey) {
                    obj[newKey] = obj[oldKey];
                    delete obj[oldKey];
                }
                a.forEach(a => renameKey(a, '_id', 'id'));
                // console.log(a)
                setresult(a)
                setfound(true)
                setloading(false)
                // console.log(result)
                if (res.data == "") {
                    setfound(false)
                } else {
                    setfound(true)
                }

                //     // To Find Artist Name from Search
                //     var artistnames = []  // Search Data Artist Array
                //     res.data.map(name =>{      
                //         artistnames.push(name.artist)  
                //     })
                //    const uniqueartist =  _.findWhere(artistnames, data)  // To seperate unique Name Of Artist


                axios.get("http://192.168.31.74:5000/data/artist/search/" + `${data}`.toLowerCase())
                    .then(res => {
                        if (res.data.length > 0) {
                            setshowartist(true)
                            setartist(res.data[0])
                        } else {
                            setshowartist(false)
                            // setartist({artist:"artist",image:"https://a2zwiki.com/wp-content/uploads/2020/01/Arijit-Singh-Wiki.jpg"})
                        }




                    })

            })
    }


    useEffect(() => {
        historyfuction = async () => {
            const value = await AsyncStorage.getItem("history")
            if (value === null) {
                sethistory(false)
            } else {
                sethistory(true)
                // console.log(value)
                // await AsyncStorage.removeItem("history")
                setrecent(JSON.parse(value))
                setarray(JSON.parse(await AsyncStorage.getItem("history")))
            }


        }
        historyfuction()
    }, [])




    const play = async (item) => {
        Keyboard.dismiss()
        setplaybutton()
        setdata(item)

        await AsyncStorage.setItem("lastsong", JSON.stringify(item))

        if (_.findWhere(array, item) == null) {
            array.push(item);
            await AsyncStorage.setItem("history", JSON.stringify(array))
            // console.log("unique added")
        } else {
            // console.log("same")
        }



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





        const current_track = await TrackPlayer.getCurrentTrack()
        if (current_track == item.id) {

            setplaybutton(current_track) //#2bc5b4
        } else {
            setplaybutton("ihc aj")
        }


        // await axios.get("http://192.168.31.74:5000/data/" + `${item.artist}`.toLowerCase())  // Toosie Slide  dolce gabbana
        // .then(res => {
        //      console.log(res.data)
        //      TrackPlayer.reset()
        //      TrackPlayer.add(res.data)
        //      TrackPlayer.play()
        // })
    }


    const remove = async (item) => {


        const deletearray = _.without(array, _.findWhere(array, item));
        setarray(deletearray)
        await AsyncStorage.setItem("history", JSON.stringify(deletearray))
        setrecent(deletearray)


        if (array.length <= 1) {
            // alert(array.length)
            sethistory(false)
            await AsyncStorage.removeItem("history")

        }




    }


    return (
        <View style={{ backgroundColor: "#f6f6f6", flex: 1 }} >
            <StatusBar backgroundColor={"tranparent"} barStyle={"dark-content"} />
            <View style={{ width: WIDTH, alignItems: "center", top: 0, height: HEIGHT / 10, justifyContent: "center" }} >
                <View style={{ width: "90%", flexDirection: "row", justifyContent: "space-evenly", overflow: "hidden", backgroundColor: "white", alignItems: "center", borderRadius: 10, elevation: 0.5, borderColor: "#11ece5", borderWidth: 1 }} >
                    {loading ?
                        <View style={{ width: WIDTH / 12 }} >
                            <ActivityIndicator size={25} color={"grey"} />
                        </View >

                        :
                        <View style={{ width: WIDTH / 12, alignItems: "center" }} >
                            <Ionicons name={"search"} style={{ left: "10%" }} color={"grey"} size={25} />
                        </View>
                    }


                    <TextInput
                        value={searchdata}
                        onChangeText={data => search(data)}
                        autoFocus={true}
                        autoCapitalize={"words"}
                        placeholder="Music, Artist and Albums" placeholderTextColor="silver" style={{ backgroundColor: "white", fontSize: 17, width: "80%", height: HEIGHT / 16, color: "#303846", fontWeight: "700" }}
                    />
                    <View style={{ width: WIDTH / 12, alignItems: "center", justifyContent: "center",height:"85%" }} >
                        {cross ?
                            <TouchableOpacity  style={{width:"100%",height:"50%"}} onPress={()=>{setsearchdata(),sethistory(true),setcross(false)}} >
                                <Ionicons name={"close"} style={{ left: "10%" }} color={"grey"} size={20} />
                            </TouchableOpacity>

                            :
                            null
                        }
                    </View>
                </View>

            </View>

            {history ?
                <View>
                    <View style={{ width: WIDTH, height: HEIGHT / 22, flexDirection: "row", justifyContent: "space-between" }} >

                        <View style={{ width: "50%", paddingLeft: "5%" }}>
                            <Text style={{ fontSize: 22 }} >Recent Searches</Text>
                        </View>

                        <TouchableOpacity activeOpacity={0.9} onPress={async () => { await AsyncStorage.removeItem("history"), sethistory(false), setarray([]) }} style={{ width: "50%", alignItems: "flex-end", paddingRight: "5%", paddingTop: "2%" }} >
                            <Text style={{ color: "#2bc5b4", fontWeight: "bold" }} >Clear</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={"always"} style={{ height: HEIGHT / 1.38 }} >
                        {recent.map((item) =>

                            <TouchableRipple rippleColor="rgba(0, 0, 0, 0.15)" onPress={() => play(item)} style={{ height: HEIGHT / 11, justifyContent: "center", alignItems: "center" }} >

                                <View style={{ width: WIDTH, height: HEIGHT / 13, alignItems: "center", flexDirection: "row", left: "25%" }} >
                                    <View style={{ width: WIDTH / 8, height: "90%", borderRadius: 6, overflow: "hidden" }}>
                                        <Image style={{ width: "100%", height: "100%" }} source={{ uri: `${item.img}` }} />
                                    </View>
                                    <View style={{ width: WIDTH / 1.5, height: "90%", paddingLeft: 15, justifyContent: "center" }}>
                                        <Text style={{ fontSize: 15, fontWeight: "700", textTransform: "capitalize", color: " #192038", fontFamily: "OpenSans" }} >{item.title}</Text>
                                        <Text style={{ fontSize: 12.5, color: "silver", textTransform: "capitalize" }} >{item.artist}</Text>
                                    </View>
                                    <View style={{ width: WIDTH / 5.2, height: "90%", justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
                                        <TouchableOpacity onPress={() => remove(item)} activeOpacity={0.9} style={{ width: "40%", height: "60%", backgroundColor: "white", borderRadius: 50, justifyContent: "center", alignItems: "center", bottom: "10%", borderColor:"#11ece5",borderWidth:0.4,elevation:0.8, overflow: "hidden" }}  >
                                            <Icons name={'cross'} color={"grey"} size={20} />
                                        </TouchableOpacity>

                                    </View>
                                </View>
                            </TouchableRipple>

                        )}
                    </ScrollView>


                </View> :
                found ?
                    <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="always"   >
                        {showartist ?
                            <>
                                <View style={{ width: "50%", paddingLeft: "5%" }}>
                                    <Text style={{ fontSize: 22, fontWeight: "700" }} >Artist</Text>
                                </View>
                                <View style={{ width: WIDTH, justifyContent: "center", alignItems: "center" }} >
                                    <TouchableRipple rippleColor="rgba(0, 0, 0, 0.15)" onPress={() => navigation.navigate("ArtistPlaylist",{data:artist.artist,image:artist.image})} style={{ height: HEIGHT / 11, justifyContent: "center", alignItems: "center" }} >
                                        <View style={{ width: WIDTH, height: HEIGHT / 13, alignItems: "center", flexDirection: "row", left: "20%", justifyContent: "center" }} >
                                            <View style={{ width: WIDTH / 8, height: "85%", borderRadius: 50, overflow: "hidden" }}>
                                                <Image style={{ width: "100%", height: "100%" }} source={{ uri: artist.image }} />
                                            </View>
                                            <View style={{ width: WIDTH / 1.5, height: "90%", paddingLeft: 15, justifyContent: "center" }}>
                                                <Text style={{ fontSize: 15, fontWeight: "700", textTransform: "capitalize" }} >{artist.artist}</Text>
                                                <Text style={{ fontSize: 12.5, color: "silver", textTransform: "capitalize" }} >Singer</Text>
                                            </View>
                                            <View style={{ width: WIDTH / 5.2, height: "90%", justifyContent: "center", alignItems: "center" }}>
                                                <Icons name={'dots-three-vertical'} color={"grey"} size={20} />
                                            </View>
                                        </View>
                                    </TouchableRipple>
                                </View>
                            </>
                            :
                            null
                        }
                        <View style={{ width: WIDTH, left: "5%", height: HEIGHT / 25 }} >
                            {found ?
                                <Text style={{ fontSize: 22, fontWeight: "700" }} >Top Result</Text>
                                :
                                null
                            }
                        </View>
                        <FlatList
                            keyboardShouldPersistTaps="always"
                            data={result}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => {
                                return (

                                    <View style={{ width: WIDTH, top: "2%", justifyContent: "center", alignItems: "center" }} >
                                        <TouchableRipple rippleColor="rgba(0, 0, 0, 0.15)" onPress={() => play(item)} style={{ height: HEIGHT / 11, justifyContent: "center", alignItems: "center" }} >

                                            <View style={{ width: WIDTH, height: HEIGHT / 13, alignItems: "center", flexDirection: "row", left: "25%" }} >
                                                <View style={{ width: WIDTH / 8, height: "90%", borderRadius: 6, overflow: "hidden" }}>
                                                    <Image style={{ width: "100%", height: "100%" }} source={{ uri: `${item.img}` }} />
                                                </View>
                                                <View style={{ width: WIDTH / 1.5, height: "90%", paddingLeft: 15, justifyContent: "center" }}>
                                                    <Text style={{ fontSize: 15, fontWeight: "700", textTransform: "capitalize", color: playbutton == item.id ? "#2bc5b4" : " #192038" }} >{item.title}</Text>
                                                    <Text style={{ fontSize: 12.5, color: "silver", textTransform: "capitalize" }} >{item.artist}</Text>
                                                </View>
                                                <View style={{ width: WIDTH / 5.2, height: "90%", justifyContent: "center", alignItems: "center" }}>
                                                    <Icons name={'dots-three-vertical'} color={"grey"} size={20} />
                                                </View>
                                            </View>
                                        </TouchableRipple>
                                    </View>

                                )
                            }}
                        />


                    </ScrollView>
                    :
                    <View style={{ width: WIDTH, height: HEIGHT, top: WIDTH / 2, alignItems: "center" }} >
                        <Text style={{ fontSize: 22 }}>Oops!</Text>
                        <Text style={{ fontSize: 22 }}>No Result Found</Text>
                    </View>


            }









        </View>

    )
}

export default Searchpage;