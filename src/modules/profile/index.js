/**
 * Created by Alex on 12/8/15.
 */
var React = require('react-native'); 
var { AsyncStorage } = React;
var localStorage = require("../common/local_store");
var MenteeDataResource = require("../resources/mentee-data");

var ProfileManager = {

	data: {},
	initiate(userManager) {

		MenteeDataResource.getMenteeProfile(userManager.data.mentee_id).then((response) => {
			ProfileManager.data = response;
			localStorage.setData("MenteeProfile", JSON.stringify(ProfileManager.data));
		});
	}
	
};

module.exports = ProfileManager;