/**
 * Created by Alex on 12/8/15.
 */
var React = require('react-native');
var { ToastAndroid } = React;

var toastService = {

	show(str_text, type) {
		if (type == 0) {
			ToastAndroid.show(str_text, ToastAndroid.SHORT)
		} else {
			ToastAndroid.show(str_text, ToastAndroid.LONG)
		}
	}
	
};

module.exports = toastService;