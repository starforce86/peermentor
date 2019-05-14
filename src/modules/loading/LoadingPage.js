/**
 * Created by Alex on 12/8/15.
 */
var React = require('react-native');
var {
		StyleSheet,
		View,
		Image,
		Text,
		TextInput,
		LayoutAnimation,
		AlertIOS,
		TouchableOpacity
} = React;

const MK = require('react-native-material-kit');
const {
  MKButton,
  MKColor,
  MKTextField,
  mdl,
} = MK;

var {bp, vw, vh} = require('react-native-relative-units')(100);
var styles=require('./styles.js');

// Custom Components
var LoadingPage = React.createClass({
	componentWillMount: function() {
	    // LayoutAnimation.spring();
	   	
  	},
 
	render: function() {
		return (
			<View style={styles.container}>
				<View style={styles.main_background}>
					<Image source={require('../../../assets/images/loading.png')}
						style={styles.img_main_back}>
					</Image>
				</View>

				<View style={styles.main_area}>
					<Image
		          		style={styles.gif}
		          		source={require('../../../assets/images/245.gif')}>
		        	</Image>
				</View>
		    </View>
		);

	}
});

module.exports = LoadingPage;