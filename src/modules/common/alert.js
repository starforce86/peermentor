/**
 * Created by Alex on 12/8/15.
 */
var React = require('react-native');
var { Alert } = React;

var alertService = {

	confirmDialog(str_title, str_text) {
		Alert.alert(
           	str_title,
            str_text,
            [
              {text: 'Confirm'},
            ]
          );
	},

	generalAlert(str_title, str_text) {
		Alert.alert(
           	str_title,
            str_text,
            [
              {text: 'Ok'},
            ]
          );
	},
	notification(str_text) {
		Alert.alert(
            str_text
          );
	},

	alertMessage(str_title, str_text) {

	},

	alertOkCancel(str_title, str_text) {
		
	}


	
};

module.exports = alertService;