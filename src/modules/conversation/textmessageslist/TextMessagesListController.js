/**
 * Created by Alex on 12/8/15.
 */
var Firebase = require('firebase');
var React = require('react-native');
var moment = require('moment-timezone');
var _ = require("underscore");
var CONFIG = require("../../../config.js");
var {
		ListView
	} = React;
var Actions = require('react-native-router-flux').Actions;
var UserManager = require("../../user/index");
var CommonFunctionsResource = require("../../resources/common-functions");

var TextMessagesListController = {
	viewController: null,
	chatRef: null,
	nodes: [],
	messageText: null,
	chatUsers: [],
	chatUsersRef: null,
	updateState() {
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.viewController.setState({
			dataSource: ds.cloneWithRows(this.nodes)
		});
	},
	hideModal() {
		this.viewController.setState({
			isModalOpen: false
		});
	},
	setViewController(controller) {
		this.viewController = controller;
	},
	getData() {
		this.chatRef = new Firebase(CONFIG.FIREBASE.URL+'/mentee/'+UserManager.data.mentee_id+'/chat/'+UserManager.data.mentee_id);
		this.chatRef.orderByChild("notification_type").equalTo("message").on('value', (snapshot) => {
			if(!!snapshot.val()) {
		  		TextMessagesListController.nodes = _.values(snapshot.val()).reverse();
		  		this.updateState();
		  	}
		  	this.hideModal();
	    });
	    
	},
	setMessage(text) {
		this.messageText = text;
	},
	sendMessage() {
		if(!!this.viewController.state.text && this.viewController.state.text.trim().length > 0) {
			var message = this.viewController.state.text.trim();
			var today = moment().tz("America/New_York");
			var smsNode = {
                "from_type": "mentee",
                "user_type_id": UserManager.data.mentee_id, //$scope.mentee.profile.id,
                "mentee_id": UserManager.data.mentee_id, //$scope.mentee.profile.id,
                "mentor_id": 6, //$scope.mentee.profile.mentor_id.Int64,
                "user_initial": UserManager.data.first_name.charAt(0)+UserManager.data.last_name.charAt(0), //menteeInitials,
                "created_at": today.format("MMMM DD, YYYY - h:mm A"),
                "date": today.format("YYYY-MM-DD"),
                "notification_type": "message",
                "notification_type_id": 0,
                "message": message, 
                "goal_id": 0,//goalId,
                "machine_sent": 0,
                "received": 0,
                "response_required_ind": 0,//response_required_ind,
                "sent": 1,
                "message_read_ind": 1,
                "user_type_message_read_ind": "mentee1",
                "timestamp": today.unix()
            };
          	// TextMessagesListController.nodes.push(smsNode);
		  	var newSmsNodeKey = this.chatRef.push(smsNode);
            newSmsNodeKey = newSmsNodeKey.toString().split("/");
            newSmsNodeKey = newSmsNodeKey[newSmsNodeKey.length-1];
            smsNode.sent = 0;
            smsNode.received = 1;
            smsNode.message_read_ind = 0;
            smsNode.user_type_message_read_ind = "mentee0";

            this.updateState();
          	this.viewController.setState({
				text: ''
		  	});
		
            // Send this message to every user in this chat group
            _(TextMessagesListController.chatUsers).each((userFirebaseNode, userType) => {
            	if(userType != "mentee") {
              	  	var chatRoomUsersFirebase = new Firebase(CONFIG.FIREBASE.URL+"/"+userFirebaseNode.path+"/"+newSmsNodeKey);
                	chatRoomUsersFirebase.set(smsNode);
              	}
			});
			CommonFunctionsResource.orchestrate_log({message: JSON.stringify(smsNode)});
			Actions.conversation();

		} else {
			this.viewController.setState({
				text: ''
			});
		}
	}
};

module.exports = TextMessagesListController;