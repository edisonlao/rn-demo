import React from 'react';
import {
    StyleSheet,
    Button,
    Text,
    TextInput,
    View,
    StatusBar,
    Dimensions,
    Platform,
    Image,
    ImageBackground,
    ListView,
    TouchableOpacity,
    ScrollView,
    Modal,
    AlertIOS,
} from 'react-native';
import {
    Actions
} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import { isIphoneX } from 'react-native-iphone-x-helper';

var ImagePicker = require('react-native-image-picker');
const options = {
    title: 'Select picture',
    cancelButtonTitle: 'Cancel',
    takePhotoButtonTitle: 'Camera',
    chooseFromLibraryButtonTitle: 'Picture',
    cameraType: 'back',
    mediaType: 'photo',
    videoQuality: 'high',
    durationLimit: 10,
    maxWidth: 1080,
    maxHeight: 1920,
    aspectX: 2,
    aspectY: 1,
    quality: 0.8,
    angle: 0,
    allowsEditing: false,
    noData: false,
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};


export default class SellScreen extends React.Component {
    static navigationOptions = ({navigation, screenProps}) => ({
        header: null
    });

    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds,
            loading: false,
            avatarSource: null,
            active: 1,
        }
    }

    setActive(index){
        this.setState({
            active: index
        });
    }

    render() {
        const {navigate} = this.props.navigation;
        const {photos, type} = this.props;
        let conText;
        return (
            <View>
                {/******************************** 头部tab **********************************/}
                <View style={Platform.OS === 'android' ?
                    styles.container : isIphoneX() ?
                        styles.container_iphoneX : styles.container_ios}>
                    <TouchableOpacity onPress={() => {
                        Actions.pop()
                    }}>
                        <View style={styles.tab_return_view}>
                            <Image
                                style={isIphoneX() ? styles.tab_return_icon_iphoneX : styles.tab_return_icon}
                                source={require('../imgs/icon_back.png')}/>
                        </View>
                    </TouchableOpacity>
                    <View style={Platform.OS === 'android' ?
                        styles.tab_title_view : isIphoneX() ?
                            styles.tab_title_view_iphoneX : styles.tab_title_view_ios}>
                        <Text style={styles.tab_title}>
                            Sell
                        </Text>
                    </View>
                    <TouchableOpacity>
                        <View style={styles.tab_ship_view}>
                            <Image
                                style={isIphoneX() ? styles. tab_skip_icon_iphoneX : styles.tab_skip_icon}
                                source={require('../imgs/icon_skip.png')}/>
                        </View>
                    </TouchableOpacity>
                </View>
                {/******************************** 打开摄像头或相册 **********************************/}
                <ScrollView>
                    <View style={styles.open_camera_view}>
                        <TouchableOpacity onPress={() => this.openCamera()}>
                            <ImageBackground
                                source={this.state.avatarSource}
                                style={styles.open_camera}>
                                <Icon
                                    name="md-camera"
                                    style={styles.camera_icon}/>
                                <Text style={styles.camera_text}>
                                    Open Camera Or Album
                                </Text>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>
                    {/******************************* title输入框 **********************************/}
                    <View style={styles.panel}>
                        <View style={styles.panel_header}>
                            <View style={{width: 0.5 * Dimensions.get('window').width}}>
                                <Text style={styles.header_left}>
                                    <Icon name={"md-medical"} style={{color: '#ee5a5a'}}/>&nbsp;
                                    TITLE
                                </Text>

                            </View>
                            <View style={{width: 0.5 * Dimensions.get('window').width}}>
                                <Text style={styles.header_right}>
                                    0/40
                                </Text>
                            </View>
                        </View>
                        <View style={styles.panel_body}>
                            <TextInput
                                underlineColorAndroid='transparent'
                                placeholder= "Please enter title"
                                style={styles.sm_input}/>
                        </View>
                    </View>
                    {/******************************* 描述输入框 **********************************/}
                    <View style={styles.panel}>
                        <View style={styles.panel_header}>
                            <View style={{width: 0.5 * Dimensions.get('window').width}}>
                                <Text style={styles.header_left}>
                                    <Icon name={"md-medical"} style={{color: '#ee5a5a',marginRight: 5}}/>&nbsp;
                                    DESCRIPTION
                                </Text>

                            </View>
                            <View style={{width: 0.5 * Dimensions.get('window').width}}>
                                <Text style={styles.header_right}>
                                    0/1000
                                </Text>
                            </View>
                        </View>
                        <View style={styles.panel_body}>
                            <TextInput
                                multiline={true}
                                underlineColorAndroid='transparent'
                                placeholder= "Please enter description"
                                style={styles.lg_input}/>
                        </View>
                    </View>
                    {/******************************* 产地输入框 **********************************/}
                    <View style={styles.panel}>
                        <View style={styles.panel_header}>
                            <View style={{width: 0.5 * Dimensions.get('window').width}}>
                                <Text style={styles.header_left}>
                                    <Icon name={"md-medical"} style={{color: '#ee5a5a'}}/>&nbsp;
                                    SHIPS FROM
                                </Text>

                            </View>
                        </View>
                        <View style={styles.panel_body}>
                            <TextInput
                                underlineColorAndroid='transparent'
                                placeholder= "Please enter 5-digit Zip Code"
                                style={styles.sm_input}/>
                        </View>
                    </View>
                    {/******************************* 价格输入框 **********************************/}
                    <View style={styles.panel}>
                        <View style={styles.panel_header}>
                            <View style={{width: 0.5 * Dimensions.get('window').width}}>
                                <Text style={styles.header_left}>
                                    <Icon name={"md-medical"} style={{color: '#ee5a5a'}}/>&nbsp;
                                    SET PRICE
                                </Text>
                            </View>
                        </View>
                        <View style={styles.panel_body}>
                            <TextInput
                                underlineColorAndroid='transparent'
                                placeholder= "(min.$3/max.$2,000)"
                                style={styles.sm_input}/>
                        </View>
                    </View>
                    {/******************************* 新旧程度选择框 **********************************/}
                    <View style={styles.panel_no_padding}>
                        <View style={styles.panel_header_padding_10}>
                            <View style={{width: 0.5 * Dimensions.get('window').width}}>
                                <Text style={styles.header_left}>
                                    <Icon name={"md-medical"} style={{color: '#ee5a5a'}}/>&nbsp;
                                    CONDITION
                                </Text>
                            </View>
                        </View>
                        <View style={styles.panel_body}>
                            <TouchableOpacity onPress={() => this.setActive(1)}>
                                <View style={this.state.active === 1 ? styles.condition_view_active : styles.condition_view_default}>
                                    <Text style={this.state.active === 1 ? styles.condition_text_active : styles.condition_text_default}>
                                        New
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setActive(2)}>
                                <View style={this.state.active === 2 ? styles.condition_view_active : styles.condition_view_default}>
                                    <Text style={this.state.active === 2 ? styles.condition_text_active : styles.condition_text_default}>
                                        Like New
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setActive(3)}>
                                <View style={this.state.active === 3 ? styles.condition_view_active : styles.condition_view_default}>
                                    <Text style={this.state.active === 3 ? styles.condition_text_active : styles.condition_text_default}>
                                        Good
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setActive(4)}>
                                <View style={this.state.active === 4 ? styles.condition_view_active : styles.condition_view_default}>
                                    <Text style={this.state.active === 4 ? styles.condition_text_active : styles.condition_text_default}>
                                        Fair
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setActive(5)}>
                                <View style={this.state.active === 5 ? styles.condition_view_active : styles.condition_view_default}>
                                    <Text style={this.state.active === 5 ? styles.condition_text_active : styles.condition_text_default}>
                                        Poor
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/******************************* 提交按钮 **********************************/}
                    <View style={styles.panel}>
                        <View style={styles.btn_submit}>
                            <Text style={{textAlign:'center', color:'#ffffff'}}>
                                Submit
                            </Text>
                        </View>
                    </View>
                    <View style={{height: 0.1 * Dimensions.get('window').height}}>

                    </View>
                </ScrollView>
            </View>
        )
    }

    openCamera() {
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                let source;

                if (Platform.OS === 'android') {
                    source = {uri: response.uri, isStatic: true}
                } else {
                    source = {uri: response.uri.replace('file://', ''), isStatic: true}
                }
                let file;
                if (Platform.OS === 'android') {
                    file = response.uri
                } else {
                    file = response.uri.replace('file://', '')
                }
                this.setState({
                    loading: true
                });
                this.setState({
                    avatarSource: source
                });
            }
        });
    }
}

const styles = StyleSheet.create({
    container: {
        width: 1 * Dimensions.get('window').width,
        height: 0.12 * Dimensions.get('window').width,
        flexDirection: 'row',
        backgroundColor: '#ffffff',
    },
    container_ios: {
        width: 1 * Dimensions.get('window').width,
        height: 0.15 * Dimensions.get('window').width,
        paddingTop: 0.03 * Dimensions.get('window').width,
        flexDirection: 'row',
        backgroundColor: '#ffffff',
    },
    container_iphoneX: {
        width: 1 * Dimensions.get('window').width,
        height: 0.18 * Dimensions.get('window').width,
        paddingTop: 0.03 * Dimensions.get('window').width,
        flexDirection: 'row',
        backgroundColor: '#ffffff',
    },
    tab_return_view: {
        width: 0.12 * Dimensions.get('window').width,
        height: 0.12 * Dimensions.get('window').width,
    },
    tab_return_icon: {
        width: 0.06 * Dimensions.get('window').width,
        height: 0.06 * Dimensions.get('window').width,
        marginLeft: 0.06 * Dimensions.get('window').width,
        marginTop: 0.03 * Dimensions.get('window').width,
    },
    tab_return_icon_iphoneX: {
        width: 0.06 * Dimensions.get('window').width,
        height: 0.06 * Dimensions.get('window').width,
        marginLeft: 0.06 * Dimensions.get('window').width,
        marginTop: 0.06 * Dimensions.get('window').width,
    },
    tab_title_view: {
        width: 0.74 * Dimensions.get('window').width,
        height: 0.12 * Dimensions.get('window').width,
        marginTop: 0.03 * Dimensions.get('window').width,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    tab_title_view_ios: {
        width: 0.74 * Dimensions.get('window').width,
        height: 0.09 * Dimensions.get('window').width,
        marginTop: 0.03 * Dimensions.get('window').width,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    tab_title_view_iphoneX: {
        width: 0.74 * Dimensions.get('window').width,
        height: 0.09 * Dimensions.get('window').width,
        marginTop: 0.06 * Dimensions.get('window').width,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    tab_title: {
        color: '#000000',
        fontSize: 0.05 * Dimensions.get('window').width,
    },
    tab_ship_view: {
        width: 0.12 * Dimensions.get('window').width,
        height: 0.12 * Dimensions.get('window').width,
    },
    tab_skip_icon: {
        width: 0.06 * Dimensions.get('window').width,
        height: 0.06 * Dimensions.get('window').width,
        marginLeft: 0.02 * Dimensions.get('window').width,
        marginTop: 0.03 * Dimensions.get('window').width,
    },
    tab_skip_icon_iphoneX: {
        width: 0.06 * Dimensions.get('window').width,
        height: 0.06 * Dimensions.get('window').width,
        marginLeft: 0.02 * Dimensions.get('window').width,
        marginTop: 0.06 * Dimensions.get('window').width,
    },
    open_camera_view: {
        width: 0.995 * Dimensions.get('window').width,
        height: 0.3 * Dimensions.get('window').height,
        backgroundColor: '#ffffff',
        padding: 15,
    },
    open_camera: {
        width: null,
        height: 0.3 * Dimensions.get('window').height - 30,
        backgroundColor: '#ee5a5a',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center'
    },
    camera_icon: {
        fontSize: 40,
        textAlign: 'center',
        color: '#ffffff',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 5,
        textShadowColor: 'rgba(0,0,0,0.5)'
    },
    camera_text: {
        textAlign: 'center',
        color: '#ffffff',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 5,
        textShadowColor: 'rgba(0,0,0,0.5)'
    },
    panel: {
        width: 1 * Dimensions.get('window').width,
        marginTop: 10,
        padding: 10,
        backgroundColor: '#ffffff'
    },
    panel_no_padding:{
        width: 1 * Dimensions.get('window').width,
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#ffffff'
    },
    panel_header: {
        width: 1 * Dimensions.get('window').width,
        flexDirection: 'row',
        paddingTop: 5,
        paddingBottom: 5,
    },
    panel_header_padding_10: {
        width: 1 * Dimensions.get('window').width,
        flexDirection: 'row',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
    },
    header_left: {
        alignSelf: 'flex-start'
    },
    header_right: {
        alignSelf: 'flex-end',
        marginRight: 15,
    },
    panel_body:{
        width: 1 * Dimensions.get('window').width,
        flexDirection: 'row',
    },
    sm_input:{
        width: 1 * Dimensions.get('window').width - 20,
        height: 50,
        borderWidth: 0.5,
        paddingLeft: 5,
        borderColor: '#ccc',
        borderRadius: 4,
        backgroundColor: '#ffffff',
        color: '#808080'
    },
    lg_input:{
        width: 1 * Dimensions.get('window').width - 20,
        height: 150,
        borderWidth: 0.5,
        paddingLeft: 5,
        borderColor: '#ccc',
        borderRadius: 4,
        backgroundColor: '#ffffff',
        color: '#808080'
    },
    condition_view_active:{
        width: 0.18 * Dimensions.get('window').width,
        height: 0.18 * Dimensions.get('window').width,
        borderRadius: 3,
        justifyContent: 'center',
        flexDirection: 'column',
        flexWrap:'nowrap',
        backgroundColor: '#ee5a5a',
        marginLeft: 0.016 * Dimensions.get('window').width,
    },
    condition_view_default:{
        width: 0.18 * Dimensions.get('window').width,
        height: 0.18 * Dimensions.get('window').width,
        borderRadius: 3,
        justifyContent: 'center',
        flexDirection: 'column',
        flexWrap:'nowrap',
        borderWidth: 1,
        borderColor: '#ee5a5a',
        backgroundColor: '#ffffff',
        marginLeft: 0.016 * Dimensions.get('window').width,
    },
    condition_text_active:{
        color: '#ffffff',
        fontWeight: "bold",
        textAlign: 'center',
    },
    condition_text_default:{
        color: '#ee5a5a',
        fontWeight: "bold",
        textAlign: 'center',
    },
    btn_submit:{
        backgroundColor: '#f47900',
        height: 50,
        borderRadius: 3,
        justifyContent: 'center',
        flexDirection: 'column',
    }
});