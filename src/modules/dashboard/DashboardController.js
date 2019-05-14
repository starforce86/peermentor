/**
 * Created by Nikee on 1/7/16.
 */
var Actions = require('react-native-router-flux').Actions;
var UserManager = require("../user/index");
var MenteeDataResource = require("../resources/mentee-data"); 
var moment = require('moment-timezone');
var _ = require("underscore");
var Firebase = require('firebase');
var CONFIG = require("../../config.js");

var DashboardController = {

	viewController: null,
	dashboard: {},
	setViewController(controller) {
		this.viewController = controller;
	},
	updateState() {
		this.viewController.setState({
			dashboard: this.dashboard,
			isModalOpen: false
		});
	},
	momentFormatDate(datetime, index, inputFormat, outputFormat) {
		if(inputFormat) {
			return moment(datetime.split("at ")[index], inputFormat).format(outputFormat);
		}
		else
		return datetime.split("at ")[index];
	},
	dateFormat(date, inputFormat, outputFormat) {
		return moment(date, inputFormat).format(outputFormat);
	},
	getData() {
		var self = this;
		// UserManager.data.mentee_id = 64;
		MenteeDataResource.getDashboardData(UserManager.data.mentee_id).then((response) => {
			if(response) {
				self.dashboard.data = response.dashboard_data;
				self.dashboard.missed_calls_tx = response.missed_calls_tx_count;
				// console.log(self.dashboard);
				self.dashboard.labels = [];
		        _(response.labels).each((label, index) => {
		        	self.dashboard.labels[index] = label.replace("<br />", " ").toUpperCase();
		        });
				self.updateState();
			}
		});

		var chatConnection = new Firebase(CONFIG.FIREBASE.URL+"/mentee/"+UserManager.data.mentee_id+"/chat/"+UserManager.data.mentee_id); 
		chatConnection.orderByChild("message_read_ind").equalTo(0).on("value", function(snapshot) {
          if(!!snapshot.val()) {
            self.dashboard.unreadChatMessages = _.values(snapshot.val());
            self.updateState();
          }
      	});
	},
	navigateToMessages() {
		DashboardController.dashboard.unreadChatMessages = [];
		Actions.conversation();
	},
	daysToGo(date, format) {
        if(date) {
	        if(!format) {
	          return moment(date.split(' at ')[0], "dddd, MMMM DD, YYYY").diff(moment(), "days")+1;
	        }
	        return moment(date).diff(moment(), "days")+1;
      	}
    }
};

module.exports = DashboardController;
