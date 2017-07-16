import React, { PropTypes,Component } from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    Animated,
    Dimensions
} from 'react-native'

var {height, width} = Dimensions.get('window');
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

export default class arrowComponent extends Component {

    constructor(props)
    {
        super(props)
        this.state = {
            isvisible: this.props.isvisible,
            anchorPoint: {}
        }
        _this = this
    }

calculateBottomCoordinate()
{
    var {width, height} = _this.props.contentSize;
    var contentSize = {width, height};
    var geom = _this.calculateDisplacement({contentSize});
    var isAwaitingShow = _this.state.isAwaitingShow;
    _this.setState(Object.assign(geom,
    {contentSize, isAwaitingShow: undefined}), () => {
    isAwaitingShow
});
        
}

  getArrowSize(placement) {
    var size = new Size(10, 5);
    return new Size(size.height, size.width);
  }

calculateDisplacement({contentSize, placement}) {
    placement = 'bottom'
    const {x,y,px,py,mwidth,mheight} = _this.props.belowWhichViewDimensions
    console.log('the coordinates are',x,y,px,py,mwidth,mheight)
    var options = {
      displayArea: _this.props.displayArea,
      fromRect: {x: px, y: py, width: mwidth, height: mheight},
      arrowSize: _this.getArrowSize(placement),
      contentSize,
    }
     return _this.computeBottomPlacementZindexViewCoordinate(options);
  }

   computeBottomPlacementZindexViewCoordinate({displayArea, fromRect, contentSize, arrowSize}) {
    var popoverOrigin = new Point(
      Math.min(displayArea.x + displayArea.width - contentSize.width,
        Math.max(displayArea.x, fromRect.x + (fromRect.width - contentSize.width) / 2)),
      fromRect.y + fromRect.height + arrowSize.height);
    var anchorPoint = new Point(fromRect.x + fromRect.width / 2.0, fromRect.y + fromRect.height);

    return {
      popoverOrigin,
      anchorPoint,
      placement: 'bottom',
    }
  }

  render()
  {
      const {x,y,px,py,mwidth,mheight,popoverOrigin,anchorPoint} = this.state
      return (
          <View style={{position: 'absolute',zIndex: 100,top: anchorPoint.y,left: anchorPoint.x}}>
          {this.props.isvisible?
            <View onLayout={this.calculateBottomCoordinate}>                     
            {this.props.children}
            </View>
            : null }
            </View>
      )
  }

}