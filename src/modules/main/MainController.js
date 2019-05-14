/**
 * Created by Alex on 12/8/15.
 */
 var React = require('react-native'); var { AsyncStorage } = React;
var globals = require("../../config.js");
var LoginDataResource = require("../resources/login-data");
var MenteeDataResource = require("../resources/mentee-data");
var localStorage = require("../common/local_store");
var Actions = require('react-native-router-flux').Actions;
var UserManager = require("../user/index");

var MainController = {
	view: null,
	menteeProfile: [],
	updateState() {
		this.view.setState({
			flagReadyForLogin: this.checkLoginReady()
		});
	},

	getMenteeProfile() {
		MenteeDataResource.getMenteeProfile(UserManager.data.mentee_id).then((response) => {
			if(response)
				UserManager.profile = response;
		});
	},

	setView(view) {
		this.view = view;
	},

	setPassword(password) {
		this.loginData.password = password;
		this.updateState();
	},
	setEmail(email) {
		this.loginData.email = email;
		this.updateState();
	},

	checkLoginReady() {
		if (this.loginData.email.length > 0 && this.loginData.password.length > 0) {
			return true;
		} else {
			return false;
		}
	},

	
};

module.exports = MainController;