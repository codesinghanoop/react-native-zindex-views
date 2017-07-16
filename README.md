# react-native-zindex-views
Integrate zindexed view below desired view. The zindexed view will appear to be as a popover component.

**Getting started**

Installation command:
       npm install react-native-zindex-views --save      
----------    

![Alt Text](https://j.gifs.com/LgKr5g.gif)

 ----------

**Usage**

    import ArrowComponent from 'react-native-zindex-views'
    
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
----------

**Properties**

|  Name         | Type          |
| ------------- |:-------------:| 
| isvisible   | PropTypes.bool|
| contentSize      | PropTypes.object |      
| belowWhichViewDimensions | PropTypes.object |  
| displayArea |	PropTypes.object |


----------
**Author**

    Anoop Singh (codesingh)
    Email: anoop100singh@gmail.com
    Stack Overflow: codesingh(username)
    
----------    

**License**
    
MIT

