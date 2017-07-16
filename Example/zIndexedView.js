import React, { Component } from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    Animated,
    Dimensions
} from 'react-native'
import ArrowComponent from './util.js'
var fullViewHeight = Dimensions.get('window').height;
var fullViewWidth = Dimensions.get('window').width;
var _this
let placement = 'bottom'

function Point(x, y) {
  this.x = x;
  this.y = y;
}

function Size(width, height) {
  this.width = width;
  this.height = height;
}

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

//   getArrowSize(placement) {
//     var size = new Size(10, 5);
//     switch(placement) {
//       case 'left':
//       case 'right':
//         return new Size(size.height, size.width);
//       default:
//         return size;
//     }
//   }

// computeGeometry({contentSize, placement}) {
//     placement = 'bottom'
//     const {x,y,px,py,mwidth,mheight} = _this.state
//     console.log('the coordinates are',x,y,px,py,mwidth,mheight)
//     var options = {
//       displayArea: {x: 5, y: 20, width: width - 10, height: height - 25},
//       fromRect: {x: px, y: py, width: mwidth, height: mheight},
//       arrowSize: _this.getArrowSize(placement),
//       contentSize,
//     }
//     console.log('the placement is',options)
//     switch (placement) {
//       case 'top':
//         return _this.computeTopGeometry(options);
//       case 'bottom':
//         return _this.computeBottomGeometry(options);
//       case 'left':
//         return _this.computeLeftGeometry(options);
//       case 'right':
//         return _this.computeRightGeometry(options);
//       default:
//         return _this.computeAutoGeometry(options);
//     }
//   }

//    computeBottomGeometry({displayArea, fromRect, contentSize, arrowSize}) {
//     var popoverOrigin = new Point(
//       Math.min(displayArea.x + displayArea.width - contentSize.width,
//         Math.max(displayArea.x, fromRect.x + (fromRect.width - contentSize.width) / 2)),
//       fromRect.y + fromRect.height + arrowSize.height);
//     var anchorPoint = new Point(fromRect.x + fromRect.width / 2.0, fromRect.y + fromRect.height);

//     return {
//       popoverOrigin,
//       anchorPoint,
//       placement: 'bottom',
//     }
//   }

  render()
  {
    //   console.log('the GEOM',this.state.geom)
    //   const {x,y,px,py,mwidth,mheight,popoverOrigin,anchorPoint} = this.state
       console.log('the call is for menu',this.state.contentSize,this.state.belowWhichViewDimensions)
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