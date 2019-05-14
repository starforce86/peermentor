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


var {bp, vw, vh} = require('react-native-relative-units')(100);
var globalStyles=require('../../common/styles/styles.js');


class TextInputComponent extends Component {

  	constructor(props) {
	    super(props);
	    this.state = {text: this.props.question.answer.String}
	}

	render() {
	    return (
	       	<View style={{margin: 10, backgroundColor: '#fff'}}>
	       		<Text style={{fontSize: 20, paddingTop: 30, paddingLeft: 10, paddingBottom: 20}}>{this.props.question.question}</Text>
		      	<TextInput 
		      		style={{minHeight: 40, padding:5, fontSize:14, borderColor: 'grey', borderWidth: 0.5}} 
		      		onChangeText={(text) => { 
		      			this.setState({text}); 
		      			this.props.question.answer = text;
		      		}} 
		      		value={this.state.text} 
		      		editable={!this.props.disabled}
		      		maxLength={255}
		      		placeholder="Write here..."
		      	/>
		    </View>
	    );
  	}
}

module.exports = TextInputComponent;