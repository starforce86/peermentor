'use strict';

var React = require('react-native');
var Slider = require('react-native-slider');
var {bp, vw, vh} = require('react-native-relative-units')(100);
var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Component,
} = React;

class SliderComponent extends Component {
  	constructor(props) {
    	super(props);
    	this.state = {value: (this.props.question.answer.Valid == true ) ? parseInt(this.props.question.answer.String) : this.props.question.min.Int64};
	}

  	render() {
	    return (
	      <View style={{margin: 10, backgroundColor: '#fff'}}>
	      	<Text style={{fontSize: 20, paddingTop: 30, paddingLeft: 10, paddingBottom: 20}}>{this.props.question.question}</Text>
	      	<View style={styles.slider_holder}>
            <Text>{this.props.question.min.Int64}</Text>
		        <Slider
		          style={styles.slider}
		          value={this.state.value}
		          minimumValue={this.props.question.min.Int64}
		          maximumValue={this.props.question.max.Int64}
		          onValueChange={(value) => this.setState({value})} />
            <Text>{this.props.question.max.Int64}</Text> 
		    </View>
	      </View>
	    );
  	}
};
var lineHeight = vh * 4;
var styles = StyleSheet.create({
  slider_holder: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  slider: {
  	flex: 1,
  	width: vw * 89,
  	height: vh * 10,
  }
});

module.exports = SliderComponent;