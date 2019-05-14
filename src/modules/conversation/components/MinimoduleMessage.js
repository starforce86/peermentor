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

var Actions = require('react-native-router-flux').Actions;
var {bp, vw, vh} = require('react-native-relative-units')(100);
var moment = require('moment-timezone');
var globalStyles=require('../../common/styles/styles.js');
var styles=require('../styles.js');

class MinimoduleMessage extends Component {
	render() {
		var rowData = this.props.row;
		let from_type, avatar_float, text_align, background, created_at
		
		if(rowData.from_type == "minimodule") {
			background = '#00C2E5';
		} else {
			background = '#FF8162';
		}

		if(rowData.created_at) 
			created_at = moment(rowData.created_at, 'MMMM DD, YYYY - h:mm A').format('MMM DD - h:mm A');
	    return (
	    	<TouchableOpacity
        		onPress={()=>Actions.minimodule({minimoduleId: rowData.notification_type_id})}>
		        <View key={this.props.rowId} style={[styles.messageRow, globalStyles.margin_top_s]}>
			        <Text style={{width: vw * 97, textAlign: 'right', fontSize: 11, opacity: 0.5}}>
	              		{created_at}
	            	</Text>
		            <View style={{width: vw * 99, flexDirection: 'column', backgroundColor: background, padding: 10}}>
		            	<Text style={{fontSize: 11, color: '#fff'}}>MINI-MODULE</Text>
		            	<View style={{flexDirection: 'row', alignItems: 'center'}}>
		            		<Image source={require('../../../../assets/images/icons/minimodule_white.png')} style={globalStyles.icon_medium}></Image>
		            		<View style={{paddingLeft: 10}}>
				            	<Text style={{width: vw * 97, fontSize: 16, color: '#fff'}}>
				              		{rowData.message}
				            	</Text>
			            		<Text style={{fontSize: 11, fontWeight: '100', color: '#fff'}}>{rowData.video_duration}</Text>
			            	</View>
		            	</View>
		            </View>
		        </View>
	        </TouchableOpacity>
	    );
  	}
}

module.exports = MinimoduleMessage;