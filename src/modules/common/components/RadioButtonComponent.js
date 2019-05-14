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
    	const style = (selected || (option.answer_id == this.props.question.answer.String)) ? { opacity: 1 } : { opacity: 0 };
    	const displayInd = ((option.answer_id == this.props.question.answer.String) && this.props.disabled) ? { padding: 10} : { height: 0 };
    	return (
    		<View key={index}>
	      		<TouchableOpacity onPress={() => { if(!this.props.disabled) onSelect(); }} style={{flexDirection: 'row', justifyContent: 'flex-start', backgroundColor: '#ededed', minHeight: vh * 9, marginBottom: 1, padding: 5, alignItems: 'center', justifyContent: 'center'}}>
	        		<View style={{flex:1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
	        			<View style={[style, {width: 40}]}>
	        				<Image source={require('../../../../assets/images/icons/tick.png')} style={globalStyles.icon_small}></Image>
	        			</View>
	        			<Text style={{flex: 1, justifyContent: 'center', fontSize: 16}}>{option.answer}</Text>
	        		</View>
	      		</TouchableOpacity>
	      		<Text style={displayInd}>
	      			{option.answer_explanation.String}
	      		</Text>
		      	
      		</View>
    	);
  	}

  	renderContainer(optionNodes) {
    	return <View>{optionNodes}</View>;
  	}

	render() {
	    return (
	       	<View style={{margin: 10, backgroundColor: '#fff'}}>
	       		<Text style={{fontSize: 20, paddingTop: 30, paddingLeft: 10, paddingBottom: 20}}>{this.props.question.question}</Text>
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