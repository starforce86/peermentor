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
var ProgressHUD = require('react-native-progress-hud');
const {
  MKButton,
  MKColor,
  MKTextField,
  mdl,
} = MK;

var LoginController = require('./LoginController.js');
var {bp, vw, vh} = require('react-native-relative-units')(100);
var styles=require('./styles.js');
// Custom Components
var ColoredRaisedButton = MKButton.coloredButton().build();
var ColorRoundButton = MKButton.colorRoundButton().build();
const Textfield = MKTextField.textfield()
	.withHighlightColor(MKColor.Green)
  	.build();

const PasswordInput = MKTextField.textfield()
  .withPassword(true)
  .withPlaceholder('PASSWORD')
  .withHighlightColor(MKColor.Green)
  .build();

var LoadingModal = require('../../components/LoadingModal');

var LoginPage = React.createClass({
	 mixins: [ProgressHUD.Mixin],
	componentWillMount: function() {
	    // LayoutAnimation.spring();
	   	
  	},
 //  	componentDidMount: function() {
	//     NetInfo.addEventListener(
	//         'change',
	//         LoginController._handleConnectionInfoChange
	//     );
	// },
	// componentWillUnmount: function() {
	//     NetInfo.removeEventListener(
	//         'change',
	//         LoginController._handleConnectionInfoChange
	//     );
	// },
	getInitialState: function() {
		LoginController.setView(this);
		return {
			flagReadyForLogin: false,
			isModalOpen: false,
		}
	},
	render: function() {
		return (
			<View style={styles.container}>
				<View style={styles.main_background}>
					<Image source={require('../../../assets/images/login-bg.jpg')}
						style={styles.img_main_back}>
					</Image>
				</View>

				<View style={styles.top_area}>
					<Image source={require('../../../assets/images/logo.png')}
						style={styles.img_top_logo}>
					</Image>
				</View>

				<View style={styles.login_area}>
					<View style={styles.left_sep}></View>
					<View style={styles.login_form}> 
						<Text style={styles.login_title}> LOGIN </Text>
						<Textfield style={styles.login_email}
								onChangeText={(text) => LoginController.setEmail(text)}
								placeholder="USERNAME" value="inquisittesting2"/>
						<PasswordInput style={styles.login_password}
								onChangeText={(text) => LoginController.setPassword(text)}
								value="testing"
								placeholder="PASSWORD"/>
						<ColoredRaisedButton style={styles.btn_login}
							onPressOut = {() => LoginController.doLogin()}>
		          			<Text pointerEvents="none" style={styles.lbl_login} > LOGIN </Text>
		        		</ColoredRaisedButton>  	
					</View>
				</View>

				<ProgressHUD
		          isVisible={this.state.is_hud_visible}
		          isDismissible={true}
		          overlayColor="rgba(0, 0, 0, 0.11)"
		        />

		        
		       	<LoadingModal isVisible={this.state.isModalOpen}>
		       	</LoadingModal>

		    </View>
		);

	}
});

module.exports = LoginPage;