/**
 * Created by Alex on 12/8/15.
 */
var React = require('react-native');
var {
		StyleSheet,
		View,
		Image,
		Text,
		Modal,
		TextInput,
		TouchableOpacity
} = React;

var Actions = require('react-native-router-flux').Actions;
var localStorage = require("../common/local_store");
var UserManager = require("../user/index");
// Custom Libraries
var ManualPage = require('./manual/ManualPage');
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
var styles=require('./styles.js');

var WelcomePage = React.createClass({
	getInitialState: function () {
	    return {
	      animated: true,
	      modalVisible: false,
	      transparent: true,
	      loadingOpacity: 0
	    };
	},

	_setModalVisible(visible) {
		Actions.how_it_works();
	    // this.setState({modalVisible: visible});
	},

	_toggleAnimated() {
	    this.setState({animated: !this.state.animated});
	},

	_toggleTransparent() {
	    this.setState({transparent: !this.state.transparent});
	},
	componentWillMount: function() {
		var self = this;
		// If the user has logged it, do not prompt log in again, redirect them to the dashboard
		localStorage.getData("UserManager").then((value) => {
  			var data = JSON.parse(value);	
  			UserManager.initiate(); // To populate UserManager with data from local storage
  			if(data.mentee_id) {
  				setTimeout(() => {
  					self.props.navigator.push({id: 'main'});
  				}, 100);
  			}
  		});
	},

	gotoManual: function () {
		this.props.navigator.push({id: 'manual'});
	},

	gotoLogin: function () {
		this.props.navigator.push({id: 'login'});
	},

	render: function() {
		// <Modal
		// 			animated={this.state.animated}
  //         			transparent={this.state.transparent}
  //         			visible={this.state.modalVisible}>
		// 			<ManualPage setVisible={this._setModalVisible} />
		// 		</Modal>
		var self = this;
		setTimeout(() => {self.setState({loadingOpacity: 1});}, 500);
		return (
			<View style={styles.container}>
				<View style={styles.main_background}>
					<Image source={require('../../../assets/images/loading.png')}
						style={styles.img_main_back}>
					</Image>
				</View>
				<View style={{opacity: this.state.loadingOpacity}}>
					<View style={styles.main_background}>
						<Image source={require('../../../assets/images/welcome-bg.jpg')}
							style={styles.img_main_back}>
						</Image>
					</View>

					<View style={styles.top_area}>
						<Image source={require('../../../assets/images/welcome-logo.png')}
							style={styles.img_top_logo}>
						</Image>
					</View>

					<View style={styles.sep_area}>
					</View>

					<View style={styles.inst_area}>
						<Text style={styles.lbl_strong}> IMPROVE OUTCOMES </Text>
						<Text style={styles.lbl_sub}> with </Text>
						<Text style={styles.lbl_strong}> 1-TO-1 PEER MENTORING </Text>
						<Text style={styles.lbl_detailed_colored}>
							<Text>Evidence-based interventions </Text>
							<Text style={styles.lbl_detailed}>
								to reduce costly long-term complications and hospitalizations!
							</Text>	
						</Text>

						<View style={styles.inst_gap}></View>
						<ColorRoundButton style={styles.btn_howitworks} 
							onPress={this.gotoManual}> 
							<Text pointerEvents="none" style={styles.lbl_howitworks}> HOW IT WORKS </Text>
					    </ColorRoundButton>  	
					</View>
				</View>
				<View style={[styles.bottom_area, {opacity: this.state.loadingOpacity}]}>
					<ColoredRaisedButton style={styles.btn_login}
						onPress={this.gotoLogin}>
		          		<Text pointerEvents="none" style={styles.lbl_login}> LOGIN </Text>
		        	</ColoredRaisedButton>  	
				</View>
		    </View>
		);

	}
});

module.exports = WelcomePage;