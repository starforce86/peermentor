var React = require('react-native');
var {
		StyleSheet,
		View,
		Image,
		Text,
		ListView,
		Platform,
		TextInput,
		LayoutAnimation,
		TouchableHighlight,
		ScrollView,
		Component,
		TouchableOpacity
} = React;

import { RadioButtons } from 'react-native-radio-buttons'

var {bp, vw, vh} = require('react-native-relative-units')(100);
var globalStyles=require('../../common/styles/styles.js');


class RadioButtonComponent extends Component {

  	constructor(props) {
	    super(props);
	    this.state = {selectedOption: props.answer};
	}
  	setSelectedOption(selectedOption){
  		if(!this.props.disabled) {
	  		this.props.question.answer = selectedOption.answer_id;
	    	this.setState({
	      		selectedOption
	    	});
	    }
  	}

  	renderOption(option, selected, onSelect, index) {
    	var radioSelectedBackground = (selected || (option.answer == this.props.question.answer)) ? { backgroundColor:'#22C064' } : {};
    	var radioSelectedText = (selected || (option.answer == this.props.question.answer)) ? { color:'#fff' } : {};
    	return (
      		<TouchableOpacity key={index} onPress={() => { if(!this.props.disabled) onSelect(); }} style={[{backgroundColor: '#ededed', borderRadius:vw * 5, marginRight:2, height:vh * 6, width:vw * 11, marginBottom: 1, padding: 5, alignItems: 'center'}, radioSelectedBackground]}>
        		<View style={{alignItems: 'center', justifyContent: 'center', height:vh * 4}}>
        			<Text style={[{justifyContent: 'center', fontSize: 14}, radioSelectedText]}>{option.answer}</Text>
        		</View>
      		</TouchableOpacity>
    	);
  	}

  	renderContainer(optionNodes) {
    	return <View style={{flex:1, flexDirection: 'row', justifyContent: 'center'}}>{optionNodes}</View>;
  	}

	render() {
	    return (
	       	<View style={{margin: 10, backgroundColor: '#fff', justifyContent: 'center'}}>
	       		<Text style={{fontSize: 20, paddingTop: 30, width: vw * 80, paddingLeft: 10, paddingBottom: 20}}>{this.props.question.question}</Text>
		      	<RadioButtons
			        options={ this.props.options }
			        onSelection={ this.setSelectedOption.bind(this) }
			        selectedOption={this.state.selectedOption.answer_id }
			        renderOption={ this.renderOption.bind(this) }
			        renderContainer={ this.renderContainer }
		      	/>
		    </View>
	    );
  	}
}

module.exports = RadioButtonComponent;