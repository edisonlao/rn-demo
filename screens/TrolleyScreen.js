import React from 'react';
import {
    StyleSheet,
    Button,
    Text,
    View,
    Platform,
    StatusBar,
    PixelRatio, Dimensions
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {isIphoneX} from "react-native-iphone-x-helper";

var ImagePicker = require('react-native-image-picker');
const options = {
    title: '选择图片',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '图片库',
    cameraType: 'back',
    mediaType: 'photo',
    videoQuality: 'high',
    durationLimit: 10,
    maxWidth: 600,
    maxHeight: 600,
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

export default class UserScreen extends React.Component {
    static navigationOptions = ({navigation, screenProps}) => ({
        header: null
    });

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }

    render() {
        const {photos, type} = this.props;
        let conText;
        if(Platform.OS === 'android') {
            return (
                <View style={styles.container}>
                    <StatusBar style={styles.statusBarView} backgroundColor={"#4f8eff"}/>
                    <LinearGradient
                        colors={['#4f8eff', '#37bafe']}
                        style={styles.titleView}>
                        <Text style={styles.titleText}>Trolley</Text>
                    </LinearGradient>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Button title="打开摄像头" onPress={() => this.openCamera()}></Button>
                    </View>
                </View>
            )
        }else {
            return (
                <View style={styles.container}>
                    <StatusBar style={styles.statusBarView} backgroundColor={"#4f8eff"}/>
                    <LinearGradient
                        colors={['#4f8eff', '#37bafe']}
                        style={isIphoneX() ? styles.titleViewIphoneX : styles.titleViewIOS}>
                        <Text style={styles.titleText}>Trolley</Text>
                    </LinearGradient>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Button title="打开摄像头" onPress={() => this.openCamera()}></Button>
                    </View>
                </View>
            )
        }
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
                this.props.onFileUpload(file, response.fileName || '未命名文件.jpg')
                    .then(result => {
                        this.setState({
                            loading: false
                        })
                    })
            }
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    titleView:{
        width: 1 * Dimensions.get('window').width,
        height: 40,
        padding: 5,
        margin: 0,
        color: '#ffffff',
        backgroundColor: '#29c7ef',
    },
    titleViewIOS:{
        width: 1 * Dimensions.get('window').width,
        height: 55,
        padding: 5,
        paddingTop: 20,
        margin: 0,
        color: '#ffffff',
        flexDirection: 'row',
    },
    titleViewIphoneX: {
        width: 1 * Dimensions.get('window').width,
        height: 65,
        padding: 5,
        paddingTop: 30,
        margin: 0,
        color: '#ffffff',
        flexDirection: 'row',
    },
    titleText: {
        color: '#fff',
        fontSize: 20,
        marginLeft: 15
    },
    bottomTab: {
        color: '#29c7ef',
    },
    textStyle: {
        height: 100,
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5
    },
    tabText: {
        color: '#000000',
        fontSize: 10
    },
    selectedTabText: {
        color: '#D81E06'
    },
    icon: {
        width: 20,
        height: 20
    }
});