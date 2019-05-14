/**
 * Created by Alex on 12/8/15.
 */
var Firebase = require('firebase');
var React = require('react-native');
var moment = require('moment-timezone');
var _ = require("underscore");
var CONFIG = require("../../config.js");
var {
		ListView
	} = React;

var UserManager = require("../user/index");
var CommonFunctionsResource = require("../resources/common-functions");

var ConversationController = {
	viewController: null,
	chatRef: null,
	nodes: [],
	messageText: null,
	chatUsers: [],
	chatUsersRef: null,
	updateState() {
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.viewController.setState({
			dataSource2: ds.cloneWithRows(this.nodes)
		});
	},
	hideModal() {
		this.viewController.setState({
			isModalOpen: false
		});
	},
	setViewController(controller) {
		this.viewController = controller;
		// this.openModal();
	},
	getData() {
		var firebaseChatThreadBaseUrl = CONFIG.FIREBASE.URL+'/mentee/'+UserManager.data.mentee_id+'/chat/'; 
		// Get users who belong to this chat
		this.chatUsersRef = new Firebase(firebaseChatThreadBaseUrl+'chat_users');
	    this.chatUsersRef.once('value', (snapshot) => {
	    	ConversationController.chatUsers = snapshot.val();
	    });
	    // Get chat data
		this.chatRef = new Firebase(firebaseChatThreadBaseUrl+UserManager.data.mentee_id);
		var newMessages = this.chatRef.orderByKey().limitToLast(1);
		this.chatRef.once('value', (snapshot) => {
			if(!!snapshot.val()) {
		  		ConversationController.nodes = _.values(snapshot.val()).reverse();
		  		this.updateState();
		  		newMessages.on('child_added', (snapshot) => {
			    	if(ConversationController.nodes.length > 0 && ConversationController.nodes[0].timestamp < snapshot.val().timestamp) {
			    		ConversationController.nodes.unshift(snapshot.val());
			    		this.updateState();
			    	}
			    });

		    	// Mark message as read
              	_(ConversationController.chatUsers).each(function(userFirebaseNode, userType) {
                    var chatRoomData = new Firebase(CONFIG.FIREBASE.URL+"/"+userFirebaseNode.path);
                    var limitedUnreadMessages = chatRoomData.orderByChild("message_read_ind").equalTo(0);
                    limitedUnreadMessages.once("value", function(chatRoomDataSnapshot){
                      	if(chatRoomDataSnapshot.val() != null) {
                        	var userData = chatRoomDataSnapshot.val();
                       		_(userData).each(function(userDataNode, firebaseKey) {
                          		if(userDataNode.message_read_ind == 0 && (userDataNode.from_type == "mentor" || userDataNode.from_type == "expert")) {
                            		var updateFirebaseMessageReadInd = new Firebase(CONFIG.FIREBASE.URL+"/"+userFirebaseNode.path+"/"+firebaseKey);
                            		updateFirebaseMessageReadInd.update({"message_read_ind": 1});
                          		}
                        	});
                      	}
                  	});
                });
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
                "user_type_id": UserManager.data.mentee_id,
                "mentee_id": UserManager.data.mentee_id,
                "mentor_id": 6, //$scope.mentee.profile.mentor_id.Int64,
                "user_initial": UserManager.data.first_name.charAt(0)+UserManager.data.last_name.charAt(0),
                "created_at": today.format("MMMM DD, YYYY - h:mm A"),
                "date": today.format("YYYY-MM-DD"),
                "notification_type": "message",
                "notification_type_id": 0,
                "message": message, 
                "goal_id": 0,
                "machine_sent": 0,
                "received": 0,
                "response_required_ind": 0,//response_required_ind,
                "sent": 1,
                "message_read_ind": 1,
                "user_type_message_read_ind": "mentee1",
                "timestamp": today.unix()
            };
          	// ConversationController.nodes.push(smsNode);
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
            _(ConversationController.chatUsers).each((userFirebaseNode, userType) => {
            	if(userType != "mentee") {
              	  	var chatRoomUsersFirebase = new Firebase(CONFIG.FIREBASE.URL+"/"+userFirebaseNode.path+"/"+newSmsNodeKey);
                	chatRoomUsersFirebase.set(smsNode);
              	}
			});

			CommonFunctionsResource.orchestrate_log({message: JSON.stringify(smsNode)});
		} else {
			this.viewController.setState({
				text: ''
			});
		}
	}
};

module.exports = ConversationController;