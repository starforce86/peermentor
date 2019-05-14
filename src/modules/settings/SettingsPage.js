/**
 * Created by Alex on 12/8/15.
 */
var React = require('react-native');
var {
		StyleSheet,
		View,
		ScrollView,
		Image,
		Text,
		TextInput,
		LayoutAnimation,
		TouchableOpacity,
		TouchableHighlight,
		Modal
} = React;

var Camera = require('react-native-camera');
// import DeviceInfo from '@pod-point/react-native-device-info';
//https://www.npmjs.com/package/@pod-point/react-native-device-info
var SettingsController = require('./SettingsController.js');
var UserManager = require("../user/index");
var {bp, vw, vh} = require('react-native-relative-units')(100);
var globalStyles=require('../common/styles/styles.js');
var styles=require('./styles.js');
var Actions = require('react-native-router-flux').Actions;

var EditPersonalInformation=require('./components/EditPersonalInformation.js');
var ChangePassword=require('./components/ChangePassword.js');
var PrivacyPolicy=require('./components/PrivacyPolicy.js');
var TermsConditions=require('./components/TermsConditions.js');
var ProfilePicture=require('./components/ProfilePicture.js');
var UpdateAvailability=require('./components/UpdateAvailability.js');

var Button = React.createClass({
  getInitialState() {
    return {
      active: false
    };
  },

  _onHighlight() {
    this.setState({active: true});
  },

  _onUnhighlight() {
    this.setState({active: false});
  },

  render() {
    var colorStyle = {
      color: this.state.active ? '#fff' : '#000',
    };
    return (
      <TouchableHighlight
        onHideUnderlay={this._onUnhighlight}
        onPress={this.props.onPress}
        onShowUnderlay={this._onHighlight}
        style={[styles.button, this.props.style]}
        underlayColor="#a9d9d4">
          <Text style={[styles.buttonText, colorStyle]}>{this.props.children}</Text>
      </TouchableHighlight>
    );
  }
});

var SettingsPage = React.createClass({
	componentWillMount: function() {
		SettingsController.getData();
		// console.log("device info", DeviceInfo);
  	},
	getInitialState: function() {
		SettingsController.setViewController(this);
		return {
			info: {
				secondary_phone_num: {
		        	Valid: false
		        },
		        image: {
					String: '../../../assets/images/add_profile_image.png',
					Valid: false
				}
			},
			availability: {},
			modalVisible: false,
			modalNumber: 0,
			// cameraType: Camera.constants.Type.front,
			// captureTarget: Camera.constants.CaptureTarget.memory
		}
	},
	_setModalVisible: function(visible, number) {
	    // this.setState({modalVisible: visible, modalNumber: number});
	    switch(number) {
	    	case 1:
	    		Actions.edit_personal_info({info: this.state.info});
	    		break;
	    	case 2:
	    		Actions.update_availability({availability: this.state.availability});
	    		break;
	    	case 3:
	    		Actions.change_password({info: this.state.info});
	    		break;
	    	case 4:
	    		Actions.privacy_policy();
	    		break;
	    	case 5:
	    		Actions.terms_condition();
	    		break;
	    	case 6:
	    		Actions.update_profile_picture();
	    		break;
	    }
	},
	render: function() {
		var profileImgTag;
		if(this.state.info.image.Valid) {
			profileImgTag = (<Image style={{flex:1, width:125, height: 100, borderRadius: 5}} source={{uri: this.state.info.image.String}} />);
		} else {
			// profileImgTag = (<Image style={{flex:1, width:125, height: 100, borderRadius: 5}} source={require('../../../assets/images/add_profile_image.png')}></Image>);
		}
		return (
			<ScrollView style={[globalStyles.container]}>
				<View style={{flex:1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f5f7', paddingTop: 30, paddingBottom: 50}}>
					{profileImgTag}
					<Text style={{textAlign: 'center', fontSize: 24, marginTop: 10, color: '#636363'}}>{UserManager.data.first_name + ' ' + UserManager.data.last_name}</Text>
				</View>
				<View style={{flex:1, flexDirection: 'column', alignItems: 'center', marginTop: -43}}>
					<TouchableOpacity onPress={this._setModalVisible.bind(this, true, 6)} style={{flex:1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', width: 80, height: 80, borderRadius: 40, shadowColor: '#000', shadowOpacity: 0.2, shadowOffset: {width:1, height: 1}}}>
						<Text style={{color: 'red', fontSize: 40, textAlign: 'center', lineHeight: 48}}>+</Text>
					</TouchableOpacity>
					<View style={styles.list_holder}>
						<TouchableOpacity style={styles.list} onPress={this._setModalVisible.bind(this, true, 1)}>
							<Image style={styles.list_icon} source={require('../../../assets/images/icons/edit_info.png')}></Image>
							<Text style={styles.list_title}>Edit Personal Information</Text>
							<Text style={styles.list_arrow}>></Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.list} onPress={this._setModalVisible.bind(this, true, 2)}>
							<Image style={styles.list_icon} source={require('../../../assets/images/icons/calendar.png')}></Image>
							<Text style={styles.list_title}>Update Availability</Text>
							<Text style={styles.list_arrow}>></Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.list} onPress={this._setModalVisible.bind(this, true, 3)}>
							<Image style={styles.list_icon} source={require('../../../assets/images/icons/key.png')}></Image>
							<Text style={styles.list_title}>Change Password</Text>
							<Text style={styles.list_arrow}>></Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.list} onPress={this._setModalVisible.bind(this, true, 4)}>
							<Image style={styles.list_icon} source={require('../../../assets/images/icons/privacy.png')}></Image>
							<Text style={styles.list_title}>Privacy Policy</Text>
							<Text style={styles.list_arrow}>></Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.list} onPress={this._setModalVisible.bind(this, true, 5)}>
							<Image style={styles.list_icon} source={require('../../../assets/images/icons/terms.png')}></Image>
							<Text style={styles.list_title}>Terms & Conditions</Text>
							<Text style={styles.list_arrow}>></Text>
						</TouchableOpacity>
					</View>
				</View>
				
		    </ScrollView>
		);
	}
});

module.exports = SettingsPage;