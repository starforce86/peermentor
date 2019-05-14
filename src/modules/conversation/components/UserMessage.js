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
var moment = require('moment-timezone');
var globalStyles=require('../../common/styles/styles.js');
var styles=require('../styles.js');

class UserMessage extends Component {
	render() {
		var rowData = this.props.row;
		let from_type, avatar_float, text_align, background, created_at
		
		if(rowData.from_type == "mentee") {
			avatar_float = styles.right;
			text_align = 'right';
			from_type = rowData.user_initial;
			background = '#F2F2F2';	
		} else {
			avatar_float = styles.left;
			from_type = rowData.user_initial;
			background = '#E8F8F8';
			text_align = 'left';
		}

		if(rowData.created_at) 
			created_at = moment(rowData.created_at, 'MMMM DD, YYYY - h:mm A').format('MMM DD - h:mm A');
	    return (
	       	<View key={this.props.rowId} style={[styles.messageRow, globalStyles.margin_top_s]}>
	        	<View style={[avatar_float, {width: vw * 97}]}>
	        		<View style={[styles.avatar]}>
			            <Text style={globalStyles.color_white}>
			              {from_type}
			            </Text>
			        </View>
			        <Text style={{textAlign: text_align, fontSize: 11, opacity: 0.5}}>
	              		{created_at}
	            	</Text>
		        </View>
	            
	            <View>
		            <Text style={{backgroundColor: background, borderRadius: 5, width: vw * 97, padding: 10}}>
		              {rowData.message}
		            </Text>
	            </View>
        	</View>
	    );
  	}
}

module.exports = UserMessage;