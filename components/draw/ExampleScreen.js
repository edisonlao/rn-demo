import React from 'react';
import {
    Text,
    StyleSheet,
    View,
    Dimensions,
    TouchableOpacity,
    Alert,
    Platform,
    ViewPropTypes,
    Button,
    UIManager,
    StatusBar,
} from 'react-native';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';
import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';

export default class ExampleScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            color: '#FF0000',
            strokeWidth: 5
        }
    }

    changeColor(color){
        Alert.alert(color);
        this.setState({
            color: color
        })
    };

    clear() {
        if (Platform.OS === 'ios') {
            // SketchCanvasManager.clear()
        } else {
            UIManager.dispatchViewManagerCommand(this._handle, UIManager.RNSketchCanvas.Commands.clear, [])
        }
    }

    render() {
        var strokeColorArray = [
            "#FF0000", "#00FFFF", "#0000FF", "#FFFF00", "#00FF00", "#808080"
        ];

        return (
            <View>
                <StatusBar style={styles.statusBarView} backgroundColor={"#4f8eff"}/>
                <LinearGradient
                    colors={['#4f8eff', '#37bafe']}
                    style={styles.titleView}>
                    <Text style={styles.titleText}>Draw</Text>
                </LinearGradient>
                <View>
                    <RNSketchCanvas
                        ref={ref => this.canvas1=ref}
                        strokeColor={this.state.color}
                        strokeWidth={this.state.strokeWidth}
                        canvasStyle={{
                            width: 1 * Dimensions.get("window").width,
                            height: 0.28 * Dimensions.get("window").height
                        }}
                        closeComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Close</Text></View>}
                        onClosePressed={() => {
                            this.setState({ example: 0 })
                        }}
                        strokeComponent={color => (
                            <View style={[{ backgroundColor: color }, styles.strokeColorButton]} />
                        )}
                        strokeSelectedComponent={(color, index, changed) => {
                            return (
                                <View style={[{ backgroundColor: color, borderWidth: 2 }, styles.strokeColorButton]} />
                            )
                        }}
                        strokeWidthComponent={(w) => {
                            return (<View style={styles.strokeWidthButton}>
                                    <View  style={{
                                        backgroundColor: 'white', marginHorizontal: 2.5,
                                        width: Math.sqrt(w / 3) * 10, height: Math.sqrt(w / 3) * 10, borderRadius: Math.sqrt(w / 3) * 10 / 2
                                    }} />
                                </View>
                            )}}
                        undoComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Undo</Text></View>}
                        onUndoPressed={(id) => {
                            this.canvas1.deletePath(id)
                        }}
                        clearComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Clear</Text></View>}
                        onClearPressed={() => {
                            this.canvas1.clear()
                        }}
                        defaultStrokeIndex={0}
                        defaultStrokeWidth={10}
                        saveComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Save</Text></View>}
                        savePreference={() => {
                            return {
                                folder: 'RNSketchCanvas',
                                filename: String(Math.ceil(Math.random() * 100000000)),
                                transparent: true,
                                imageType: 'jpg'
                            }
                        }}
                    />
                    <RNSketchCanvas
                        ref={ref => this.canvas2=ref}
                        strokeColor={this.state.color}
                        strokeWidth={this.state.strokeWidth}
                        canvasStyle={{
                            width: 1 * Dimensions.get("window").width,
                            height: 0.28 * Dimensions.get("window").height
                        }}
                        closeComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Close</Text></View>}
                        onClosePressed={() => {
                            this.setState({ example: 0 })
                        }}
                        strokeComponent={color => (
                            <View style={[{ backgroundColor: color }, styles.strokeColorButton]} />
                        )}
                        strokeSelectedComponent={(color, index, changed) => {
                            return (
                                <View style={[{ backgroundColor: color, borderWidth: 2 }, styles.strokeColorButton]} />
                            )
                        }}
                        strokeWidthComponent={(w) => {
                            return (<View style={styles.strokeWidthButton}>
                                    <View  style={{
                                        backgroundColor: 'white', marginHorizontal: 2.5, justifyContent: 'center', alignItems: 'center',
                                        width: Math.sqrt(w / 3) * 10, height: Math.sqrt(w / 3) * 10, borderRadius: Math.sqrt(w / 3) * 10 / 2
                                    }} />
                                </View>
                            )}}
                        undoComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Undo</Text></View>}
                        onUndoPressed={(id) => {
                            this.canvas2.deletePath(id)
                        }}
                        clearComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Clear</Text></View>}
                        onClearPressed={() => {
                            this.canvas2.clear()
                        }}
                        defaultStrokeIndex={0}
                        defaultStrokeWidth={10}
                        saveComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Save</Text></View>}
                        savePreference={() => {
                            return {
                                folder: 'RNSketchCanvas',
                                filename: String(Math.ceil(Math.random() * 100000000)),
                                transparent: true,
                                imageType: 'jpg'
                            }
                        }}
                    />
                    <View style={styles.strokeColorView}>
                        <TouchableOpacity style={[styles.btnStrokeColor, {backgroundColor: '#FF0000'}]}
                                          onPress={() => {this.changeColor("#FF0000")}}>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btnStrokeColor, {backgroundColor: '#000000'}]}
                                          onPress={() => {this.changeColor("#000000")}}>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btnStrokeColor, {backgroundColor: '#00FFFF'}]}
                                          onPress={() => {this.changeColor("#00FFFF")}}>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btnStrokeColor, {backgroundColor: '#FFFF00'}]}
                                          onPress={() => {this.changeColor("#FFFF00")}}>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btnStrokeColor, {backgroundColor: '#808080'}]}
                                          onPress={() => {this.changeColor("#808080")}}>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.strokeColorView}>

                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#4f8eff',
    },
    statusBarView:{
        backgroundColor: '#4f8eff'
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
    titleText:{
        color: '#fff',
        fontSize: 20,
        marginLeft: 15
    },
    strokeColorView: {
        width: 1 * Dimensions.get("window").width,
        height: 0.1 * Dimensions.get("window").height,
        flexDirection: 'row',
        marginTop: 0.05 * Dimensions.get("window").height,
    },
    btnStrokeColor: {
        width: 0.1 * Dimensions.get("window").width,
        height: 0.1 * Dimensions.get("window").width,
        marginLeft: 5,
        borderBottomRightRadius: 100,
        borderBottomLeftRadius: 100,
        borderTopRightRadius: 100,
        borderTopLeftRadius: 100,
    },
    functionButton: {
        marginHorizontal: 2.5,
        marginVertical: 8,
        height: 30,
        width: 60,
        backgroundColor: '#39579A',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    strokeColorButton: {
        width: 0.1 * Dimensions.get("window").width,
        height: 0.1 * Dimensions.get("window").width,
        marginLeft: 5,
        borderBottomRightRadius: 100,
        borderBottomLeftRadius: 100,
        borderTopRightRadius: 100,
        borderTopLeftRadius: 100,
    },
    strokeWidthButton: {
        marginHorizontal: 2.5,
        marginVertical: 8,
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#39579A'
    },
});