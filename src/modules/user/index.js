/**
 * Created by Alex on 12/8/15.
 */
var React = require('react-native'); 
var { AsyncStorage } = React;
var localStorage = require("../common/local_store");
var ProfileManager = require("../profile/index");
var MenteeDataResource = require("../resources/mentee-data");
var UserManager = {

	data: {},
	profile: {},
	initiate() {
		var self = this;
		localStorage.getData("UserManager").then((value) => {
  			self.data = JSON.parse(value);	
  			ProfileManager.initiate(self);
  		});
	},
	
};

module.exports = UserManager;