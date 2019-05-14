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

var UserManager = require("../../user/index");

var MinimodulesListController = {
	viewController: null,
	chatRef: null,
	nodes: [],
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
		this.chatRef.orderByChild("from_type").equalTo("minimodule").on('value', (snapshot) => {
			if(!!snapshot.val()) {
		  		MinimodulesListController.nodes = _.values(snapshot.val());
		  		this.updateState();
		  	}
		  	this.hideModal();
	    });
	    
	}
};

module.exports = MinimodulesListController;