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
		TouchableOpacity
} = React;
var Actions = require('react-native-router-flux').Actions;
// Custom Libraries
const MK = require('react-native-material-kit');
const {
  MKButton,
  MKColor,
} = MK;
var {bp, vw, vh} = require('react-native-relative-units')(100);

// Custom Components
var ColoredRaisedButton = MKButton.coloredButton().build();
var ColorRoundButton = MKButton.colorRoundButton().build();

// Styles
var globalStyles=require('../../common/styles/styles.js');
var styles=require('./styles.js');

var ManualPage = React.createClass({
	closeManual: function () {
		// this.props.navigator.push({id: 'welcome'});
		// this.props.setVisible(false);
		this.props.navigator.pop();
	},

	render: function() {
		return (
			<View style={[styles.container]}>
				<View style={styles.header}>
					<Text style={styles.header_text}>How it works</Text>
				</View>

				<View style={styles.inst_area}>
					<Text style={styles.margin_top_m}>This peer-to-peer mentoring program has helped many individuals better manage their chronic disease. The app helps you get the most out of this program.</Text>
					<Text style={[styles.margin_top_m, styles.text_left]}>Features:</Text>
					<View style={[styles.margin_top_m]}>
						<View style={styles.list_holder}>
							<Image source={require('../../../../assets/images/icons/chat.png')} style={styles.icon_small}></Image>
							<Text style={styles.padding_left} numberOfLines={3}>							
								Chat with your mentor through the app.
							</Text>
						</View>
			            <View style={styles.list_holder}>
			            	<Image source={require('../../../../assets/images/icons/minimodule.png')} style={styles.icon_small}></Image>
				            <Text style={styles.padding_left} numberOfLines={3}>
				            	Access helpful videos and exercises.
				            </Text>
						</View>
						<View style={styles.list_holder}>
				            <Image source={require('../../../../assets/images/icons/goal.png')} style={styles.icon_small}></Image>
				            <Text style={styles.padding_left} numberOfLines={3}>
				            	Track your progress through the program.
				            </Text>
				        </View>
				        <View style={styles.list_holder}>
				            <Image source={require('../../../../assets/images/icons/time.png')} style={styles.icon_small}></Image>
				            <Text style={[styles.padding_left, {flex: 1}]} numberOfLines={3}>
				            	Schedule mentoring phone calls, change your contact preferences, and more…
				            </Text>
				        </View>
				        <Text style={styles.margin_top_m}>Your mentor will be here to guide you at every step of the way!</Text>
					</View>	
				</View>
				<View style={styles.bottom_area}>
					<ColoredRaisedButton style={styles.btn_login} onPress={this.closeManual}>
		          		<Text pointerEvents="none" style={styles.lbl_login}> Close </Text>
		        	</ColoredRaisedButton>  	
				</View>
		    </View>
		);

	}
});

module.exports = ManualPage;