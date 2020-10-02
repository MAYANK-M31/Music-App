import React, { Component, useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Dimensions,
    ActivityIndicator,
    FlatList,
    Image,
    StatusBar,
    Keyboard,
    AsyncStorage,
    BackHandler,
    Modal
} from "react-native";
import Icons from "react-native-vector-icons/Entypo"
import Ionicons from "react-native-vector-icons/Ionicons"
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import TrackPlayer from "react-native-track-player"
import { TouchableRipple } from "react-native-paper"
import { useNavigation } from '@react-navigation/native';
import { NavigationActions } from "react-navigation";
import LottieView from 'lottie-react-native';
import songs from "./songs.json"
var _ = require('underscore');

const WIDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height

const Searchpage = ({ navigation }) => {

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
    const [searchdata, setsearchdata] = useState()
    const [modal, setmodal] = useState(false)
    const [modaldata, setmodaldata] = useState([])
    const [typing, settyping] = useState(false)
    const [shuffle, setshuffle] = useState([])
    const [listlength, setlistlenght] = useState(3)
    const [trending, settrending] = useState([])
    const [trendloader, settrendloader] = useState(true)

    // To Shuffle Trending Songs
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        setshuffle(array)
        return array
    }

    useEffect(() => {
        const myfunction = async () => {
            settrendloader(true)
            await axios.get("https://song-streamer.herokuapp.com/data/")  // Toosie Slide  dolce gabbana
                .then(res => {
                    const a = res.data
                    settrendloader(false)
                    function renameKey(obj, oldKey, newKey) {
                        obj[newKey] = obj[oldKey];
                        delete obj[oldKey];
                    }
                    a.forEach(a => renameKey(a, '_id', 'id'));
                    shuffleArray(a)
                    settrending(a)
                    settrendloader(false)
                })
        }
        myfunction()

    }, [])


    const search = async (data) => {
        settyping(true)
        setloading(true)
        sethistory(false)
        setsearchdata(data)
        setshowartist(false)
        if (data.length == 0) {  /// To avoid showing no result found on  backpress inputbox
            setfound(true)
            setloading(false)
            setcross(false)
            sethistory(true)
            historyfuction()
            shuffleArray(trending) //To Shuffle Trending On backPress
            settyping(false)
        } else {
            setcross(true)
        }

        // https://song-streamer.herokuapp.com

        await axios.get("https://song-streamer.herokuapp.com/data/" + `${data}`.toLowerCase())  // Toosie Slide  dolce gabbana
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


                if (data.length > 1) {
                    axios.get("https://song-streamer.herokuapp.com/data/artist/search/" + `${data}`.toLowerCase())
                        .then(res => {
                            if (res.data.length > 0) {
                                setshowartist(true)
                                setartist(res.data[0])
                            } else {
                                setshowartist(false)
                                // setartist({artist:"artist",image:"https://a2zwiki.com/wp-content/uploads/2020/01/Arijit-Singh-Wiki.jpg"})
                            }




                        })
                }


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
                setrecent(JSON.parse(value).reverse())
                setarray(JSON.parse(await AsyncStorage.getItem("history")))
            }


        }
        historyfuction()
        shuffleArray(trending)

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

    const option = (item) => {
        setmodal(true)
        setmodaldata([item])
        // console.log(modaldata[0].img);

    }

    const renderlistswitch = () => {
        switch (listlength) {
            case 3:
                return <Text style={{ color: "#2bc5b4", fontWeight: "bold" }}>See all</Text>

            case recent.length:
                return <Text style={{ color: "#2bc5b4", fontWeight: "bold" }} >Collapse</Text>


            default:
                return <Text style={{ color: "#2bc5b4", fontWeight: "bold" }}>See all</Text>
                break;
        }
    }

    const listswitch = () => {
        if (listlength == 3) {
            setlistlenght(recent.length)
        } else {
            setlistlenght(3)
        }
    }


    





    return (
        <View style={{ backgroundColor: "#f6f6f6", flex: 1 }} >
            <StatusBar translucent backgroundColor={"tranparent"} barStyle={"dark-content"} />
            <View style={{ height: HEIGHT / 32 }} >

            </View>
            <View style={{ width: WIDTH, alignItems: "center", top: 0, height: HEIGHT / 10, justifyContent: "center" }} >
                <View style={{ width: "90%", height: 50, flexDirection: "row", justifyContent: "space-evenly", overflow: "hidden", backgroundColor: "white", alignItems: "center", borderRadius: 10, elevation: 0.5, borderColor: "#11ece5", borderWidth: 1.5 }} >
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
                        autoFocus={false}
                        autoCapitalize={"words"}
                        placeholder="Music, Artist and Albums" placeholderTextColor="silver" style={{ backgroundColor: "white", fontSize: 17, width: "80%", height: HEIGHT / 16, color: "#303846", fontWeight: "700" }}
                    />
                    <View style={{ width: WIDTH / 12, alignItems: "center", justifyContent: "center", height: "85%" }} >
                        {cross ?
                            <TouchableOpacity style={{ width: "100%", height: "50%" }} onPress={() => { setsearchdata(), sethistory(true), setcross(false), shuffleArray(trending), historyfuction(), settyping(false) }} >
                                <Ionicons name={"close"} style={{ left: "10%" }} color={"grey"} size={20} />
                            </TouchableOpacity>

                            :
                            null
                        }
                    </View>
                </View>

            </View>




            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={"always"} style={{ height: HEIGHT / 1.38 }} >

                {typing ?

                    !loading ?
                        <View>

                            {showartist ?
                                <>
                                    <View style={{ width: "50%", paddingLeft: "5%" }}>
                                        <Text style={{ fontSize: 22, fontWeight: "700" }} >Artist</Text>
                                    </View>
                                    <View style={{ width: WIDTH, justifyContent: "center", alignItems: "center" }} >
                                        <TouchableRipple rippleColor="rgba(0, 0, 0, 0.15)" onPress={() => navigation.navigate("ArtistPlaylist", { data: artist.artist, image: artist.image })} style={{ height: HEIGHT / 11, justifyContent: "center", alignItems: "center" }} >
                                            <View style={{ width: WIDTH, height: HEIGHT / 13, alignItems: "center", flexDirection: "row", left: "20%", justifyContent: "center" }} >
                                                <View style={{ width: WIDTH / 8, height: "85%", borderRadius: 50, overflow: "hidden" }}>
                                                    <Image style={{ width: "100%", height: "100%" }} source={{ uri: artist.image }} />
                                                </View>
                                                <View style={{ width: WIDTH / 1.5, height: "90%", paddingLeft: 15, justifyContent: "center" }}>
                                                    <Text style={{ fontSize: 15, fontWeight: "700", textTransform: "capitalize" }} >{artist.artist}</Text>
                                                    <Text style={{ fontSize: 12.5, color: "silver", textTransform: "capitalize" }} >Singer</Text>
                                                </View>
                                                <TouchableOpacity style={{ width: WIDTH / 5.2, height: "90%", justifyContent: "center", alignItems: "center" }}>
                                                    <Icons name={'dots-three-vertical'} color={"grey"} size={20} />
                                                </TouchableOpacity>
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
                                                    <View style={{ width: WIDTH / 8, height: 50, borderRadius: 6, overflow: "hidden" }}>
                                                        <Image style={{ width: "100%", height: "100%" }} source={{ uri: `${item.img}` }} />
                                                    </View>
                                                    <View style={{ width: WIDTH / 1.5, height: "90%", paddingLeft: 15, justifyContent: "center" }}>
                                                        <Text style={{ fontSize: 15, fontWeight: "700", textTransform: "capitalize", color: playbutton == item.id ? "#2bc5b4" : " #192038" }} >{item.title}</Text>
                                                        <Text style={{ fontSize: 12.5, color: "silver", textTransform: "capitalize" }} >{item.artist}</Text>
                                                    </View>
                                                    <TouchableOpacity onPress={() => option(item)} style={{ width: WIDTH / 5.2, height: "90%", justifyContent: "center", alignItems: "center" }}>
                                                        <Icons name={'dots-three-vertical'} color={"grey"} size={20} />
                                                    </TouchableOpacity>
                                                </View>
                                            </TouchableRipple>
                                        </View>

                                    )
                                }}
                            />
                            {!found ?
                                <View style={{ width: WIDTH, height: 400, alignItems: "center" }} >
                                    <LottieView style={{ height: 250, width: 250 }} source={require('./animations/29298-girl-with-a-guitar.json')} autoPlay loop />
                                    <Text style={{ fontSize: 22, fontWeight: "700" }}>Can't Find !!</Text>
                                    <Text style={{ fontSize: 22, fontWeight: "700" }}>We Will Add it Soon...</Text>
                                    <Text style={{ fontSize: 15, color: "#f759a8" }}>Seach With More Specific Keyword </Text>
                                </View>

                                : null
                            }

                        </View>
                        :
                        <View style={{ width: WIDTH, height: 400, top: 200, alignItems: "center" }} >

                            {/* <Image style={{height:100,width:100}} source={require("./images/music-note.png")} /> */}
                            <LottieView style={{ height: 100, width: 100 }} source={require('./animations/14467-music.json')} autoPlay loop />
                            <Text style={{ fontSize: 22, fontWeight: "700" }}>Finding Music...</Text>
                        </View>

                    :

                    <View>

                        {history ?
                            <View>
                                <View style={{ width: WIDTH, height: HEIGHT / 22, flexDirection: "row", justifyContent: "space-between" }} >

                                    <View style={{ width: "50%", paddingLeft: "5%" }}>
                                        <Text style={{ fontSize: 22 }} >Recent Searches</Text>
                                    </View>

                                    <TouchableOpacity activeOpacity={0.9} onPress={listswitch} style={{ width: "50%", alignItems: "flex-end", paddingRight: "5%", paddingTop: "2%" }} >
                                        {renderlistswitch()}
                                    </TouchableOpacity>
                                </View>

                                {recent.slice(0, listlength).map((item, index) =>

                                    <TouchableRipple key={index} rippleColor="rgba(0, 0, 0, 0.15)" onPress={() => play(item)} style={{ height: HEIGHT / 11, justifyContent: "center", alignItems: "center" }} >

                                        <View style={{ width: WIDTH, height: HEIGHT / 13, alignItems: "center", flexDirection: "row", left: "25%" }} >
                                            <View style={{ width: WIDTH / 8, height: 50, borderRadius: 6, overflow: "hidden" }}>
                                                <Image style={{ width: "100%", height: "100%" }} source={{ uri: `${item.img}` }} />
                                            </View>
                                            <View style={{ width: WIDTH / 1.5, height: 50, paddingLeft: 15, justifyContent: "center" }}>
                                                <Text style={{ fontSize: 15, fontWeight: "700", textTransform: "capitalize", color: " #192038", fontFamily: "OpenSans" }} >{item.title}</Text>
                                                <Text style={{ fontSize: 12.5, color: "silver", textTransform: "capitalize" }} >{item.artist}</Text>
                                            </View>
                                            <View style={{ width: WIDTH / 5.2, height: 50, justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
                                                <TouchableOpacity onPress={() => remove(item)} activeOpacity={0.9} style={{ width: "40%", height: "60%", backgroundColor: "white", borderRadius: 50, justifyContent: "center", alignItems: "center", bottom: "10%", borderColor: "#11ece5", borderWidth: 0.4, elevation: 0.8, overflow: "hidden" }}  >
                                                    <Icons name={'cross'} color={"grey"} size={20} />
                                                </TouchableOpacity>

                                            </View>
                                        </View>
                                    </TouchableRipple>
                                )}
                            </View>
                            :
                            null

                        }

                        {!trendloader ?
                            <View>
                                <View style={{ width: WIDTH, height: 50, paddingTop: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }} >

                                    <View style={{ width: "50%", paddingLeft: "4%" }}>
                                        <Text style={{ fontSize: 22, fontWeight: "700" }} >Trending</Text>
                                    </View>

                                </View>



                                {shuffle.slice(0, 10).map((item, index) =>

                                    <TouchableRipple key={index} rippleColor="rgba(0, 0, 0, 0.15)" onPress={() => play(item)} style={{ height: HEIGHT / 11, justifyContent: "center", alignItems: "center" }} >

                                        <View style={{ width: WIDTH, height: HEIGHT / 13, alignItems: "center", flexDirection: "row", left: "25%" }} >
                                            <View style={{ width: WIDTH / 8, height: 50, borderRadius: 6, overflow: "hidden" }}>
                                                <Image style={{ width: "100%", height: "100%" }} source={{ uri: `${item.img}` }} />
                                            </View>
                                            <View style={{ width: WIDTH / 1.5, height: 50, paddingLeft: 15, justifyContent: "center" }}>
                                                <Text style={{ fontSize: 15, fontWeight: "700", textTransform: "capitalize", color: " #192038", fontFamily: "OpenSans" }} >{item.title}</Text>
                                                <Text style={{ fontSize: 12.5, color: "silver", textTransform: "capitalize" }} >{item.artist}</Text>
                                            </View>
                                            <View style={{ width: WIDTH / 5.2, height: 50, justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
                                                <View activeOpacity={0.9} style={{ width: "40%", height: "60%", backgroundColor: "white", borderRadius: 50, justifyContent: "center", alignItems: "center", bottom: "10%", borderColor: "#11ece5", borderWidth: 0.4, elevation: 0.8, overflow: "hidden" }}  >
                                                    <Ionicons name={'trending-up-outline'} color={"black"} size={20} />
                                                </View>

                                            </View>
                                        </View>
                                    </TouchableRipple>
                                )}
                            </View>

                            :
                            <View style={{ height: 300, width: "100%", justifyContent: "center", alignItems: "center" }} >
                                <LottieView style={{ height: 100, width: 100 }} source={require('./animations/2919-play-stop-animation.json')} autoPlay loop />
                            </View>
                        }


                    </View>

                }




            </ScrollView>











            {modal ?
                <Modal transparent={true} visible={modal} onRequestClose={() => setmodal(false)}  >
                    <View style={{ backgroundColor: "#000000CC" }} >


                        <TouchableOpacity onPress={() => setmodal(false)} style={{ height: "52%" }} >

                        </TouchableOpacity>

                        <View style={{ height: "48%", alignItems: "center", bottom: 15 }} >
                            <View style={{ width: 180, height: 180, borderRadius: 6, overflow: "hidden", position: "absolute", top: -90, zIndex: 1 }}>
                                <Image style={{ width: "100%", height: "100%" }} source={{ uri: `${modaldata[0].img}` }} />
                            </View>
                            <View style={{ width: WIDTH / 1.1, height: 130, backgroundColor: "white", borderTopLeftRadius: 3, borderTopRightRadius: 3 }}>

                            </View>
                            <View style={{ width: WIDTH / 1.1, height:"58%", backgroundColor: "white",bottom:40, alignItems: "center", borderBottomRightRadius: 3, borderBottomLeftRadius: 3 }}>

                                <View style={{ width: WIDTH / 1.1, height: "23%", backgroundColor: "white", justifyContent: "center", alignItems: "center" }} >
                                    <Text style={{ color: "black", fontWeight: "700", top: "5%", fontSize: 15, textTransform: "capitalize" }} >{modaldata[0].title}</Text>
                                    <Text style={{ color: "grey", fontWeight: "100", top: "5%", fontSize: 11, textTransform: "capitalize" }} >{modaldata[0].artist}</Text>
                                </View>
                                <View style={{ width: WIDTH / 1.1, height: "23%", justifyContent: "center" }} >
                                    <Text style={{ color: "#2bc5b4", left: "5%", fontWeight: "700", top: "5%", fontSize: 15 }} >Play Now</Text>
                                </View>
                                <View style={{ width: WIDTH / 1.1, height: "23%", backgroundColor: "white", justifyContent: "center" }} >
                                    <Text style={{ color: "black", left: "5%", fontWeight: "700", top: "5%", fontSize: 15 }} >Play Next</Text>
                                </View>
                                <View style={{ width: WIDTH / 1.1, height: "23%", backgroundColor: "white", justifyContent: "center" }} >
                                    <Text style={{ color: "black", left: "5%", fontWeight: "700", top: "5%", fontSize: 15 }} >Save To Library</Text>
                                </View>
                            </View>

                            <TouchableRipple onPress={() => setmodal(false)} style={{ width: WIDTH / 1.1, borderRadius: 3, height: 50, backgroundColor: "white", justifyContent: "center", alignItems: "center", bottom: 0, position: "absolute" }} >
                                <Text style={{ color: "black", fontSize: 15, fontWeight: "700" }} >Cancel</Text>
                            </TouchableRipple>

                        </View>

                    </View>
                </Modal>
                :
                null
            }

        </View>

    )
}

export default Searchpage;