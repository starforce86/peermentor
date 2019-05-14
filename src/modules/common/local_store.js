/**
 * Created by Alex on 12/8/15.
 */
var React = require('react-native'); 
var { AsyncStorage } = React;
var local_store = {

	data: {},

	setData(key, value) {
		try{
			return AsyncStorage.setItem(key, value);
		} catch (error) {
			console.log("AsyncStorage save error.");
		}
	},

	async getData(key) {
		var result = null;
		try{
			return AsyncStorage.getItem(key);
		} catch (error) {
			console.log("AsyncStorage retrieve error.", error);
		}
	},

	removeData(key) {
		try{
			return AsyncStorage.removeItem(key);
		} catch (error) {
			console.log("AsyncStorage remove item error.", error);
		}
	},

	storeData() {
		try{
			AsyncStorage.setItem("STORE", this.data);
		} catch (error) {
			console.log("AsyncStorage save error.");
		}
	},

	loadData() {
		try{
			this.data = AsyncStorage.getItem("STORE");
		} catch (error) {
			console.log("AsyncStorage retrieve error.");
		}	
	},
	
};

module.exports = local_store;