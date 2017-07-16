import React, { Component } from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    Animated,
    Dimensions
} from 'react-native'
import ArrowComponent from 'react-native-zindex-views'
var fullViewHeight = Dimensions.get('window').height;
var fullViewWidth = Dimensions.get('window').width;
var _this
let placement = 'bottom'

export default class ZindexedView extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            isvisible: false,
            contentSize: {},
            belowWhichViewDimensions: {}
        }
        _this = this
    }

    Visibility()
    {
        this.setState({
            isvisible: !this.state.isvisible,
            defaultAnimatedValues: {
            scale: new Animated.Value(0),
            translate: new Animated.ValueXY(),
            fade: new Animated.Value(0),
            }
        })
        
    }

    measureContent(x)
    {
      var {width, height} = x.nativeEvent.layout;
      var geom
      var contentSize = {width, height};
      _this.arrowView.measure((x,y,mwidth,mheight,px,py) => {
           console.log('the measure of view is',x,y,width,height,px,py)
           var belowWhichViewDimensions = {x,y,px,py,mwidth:width,mheight:height}
          _this.setState({
              belowWhichViewDimensions,
              contentSize
          })
    })   
}


  render()
  {
       var displayArea = {x: 5, y: 20, width: fullViewWidth - 10, height: fullViewHeight - 25};
      return (
            <View style= {{flex:1,backgroundColor: 'green'}}>
          <View style= {{top:0,right:0,marginTop:15,backgroundColor:'red'}}  >
            <TouchableOpacity onPress={() => this.Visibility()}><View style={{backgroundColor:'pink'}}><Text style={{textAlign:'right'}}>Press me! </Text></View></TouchableOpacity>
          </View>                      
            <ArrowComponent 
             isvisible ={this.state.isvisible}
             contentSize = {this.state.contentSize}
             belowWhichViewDimensions = {this.state.belowWhichViewDimensions} 
             displayArea={displayArea}>
             <View
             style = {{
                width: 12,
                height: 12,
                backgroundColor: 'transparent',
                borderStyle: 'solid',
                borderLeftWidth: 6,
                borderRightWidth: 6,
                borderBottomWidth: 6,
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
                borderBottomColor: 'black',
                borderTopColor: 'transparent',
            }} />
            <View style = {{width:50,height:50,backgroundColor:'blue'}} /> 
             </ArrowComponent>    
          <View style = {{width: 100, height: 100, backgroundColor: 'red'}}>  
            <View ref={(value) => this.arrowView = value} onLayout={this.measureContent} style = {{marginLeft: 50,width: 50, height: 50, backgroundColor: 'white'}} />
          </View>
          </View>
      )
  }

}