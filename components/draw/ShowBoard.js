import React from 'react';
import {
    StyleSheet,
    Button,
    Text,
    View,
} from 'react-native';

export default class ShowBoard extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            ctx : null,
            mousePressed : false,
            lineValue : 9,
            colorValue : 'blue',
            beginX: 0,
            beginY: 0,
            endX: 0,
            endY: 0
        }
    }

    hasProps(prop){
        if(!prop){
            return false
        };

        var propName;
        if( this.props.route && this.props.route[prop] ){
            propName = this.props.route[prop];
        }

        if (this.props[prop]) {
            console.log('no route',this.props);
            propName = this.props[prop];
        }

        if(propName){
            return propName;
        }
        return false;
    }

    ready() {
        var el = this.refs.myCanvas;
        var ready,socket;

        this.setState({
            ctx : el.getContext("2d")
        });

        ready = this.hasProps('ready');

        if(ready){
            socket = ready();
            this.setState({
                socket : socket
            })
            socket.on('showPath', (data)=>{
                this.drawing(
                    data.endX,
                    data.endY,
                    data.beginX,
                    data.beginY,
                    data.colorValue,
                    data.lineValue
                );
            });
            //监听答案是否正确
            socket.on('answer', (data)=>{
                switch (data.bingo) {
                    case 1:
                        alert('真棒答对了！');
                        break;
                    default:
                        alert('愚蠢的地球人！');
                }
            });
            //清除画布
            socket.on('showBoardClearArea', ()=>{
                this.clearArea();
            })
        }
    }

    drawing(x, y, beginX, beginY, colorValue, lineValue) {
        var ctx = this.state.ctx;
            ctx.beginPath();
            ctx.strokeStyle = colorValue;
            ctx.lineWidth = lineValue;
            ctx.lineJoin = "round";
            ctx.moveTo(beginX, beginY);
            ctx.lineTo(x, y);
            ctx.closePath();
            ctx.stroke();
    }

    clearArea() {
        var ctx = this.state.ctx;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    componentDidMount(){
        this.ready();
    }

    render(){
        return (
            <View className="control-ops">
                <View className="item keyword">猜猜这家伙画的是啥！</View>
                <canvas ref="myCanvas"
                    width="500"
                    height="400"
                    style={{border:'1px solid #ccc'}}>
                </canvas>
                <View className="keyword">

                </View>
            </View>
        );
    }
}
