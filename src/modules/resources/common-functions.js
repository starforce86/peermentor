/**
 * Created by Alex on 12/8/15.
 */
var CONFIG = require('../../config');
var CommonFunctionsResource = {

	http(url, dictParam) {
		return fetch(url, {
		  method: 'POST',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		  },
		  body: JSON.stringify(dictParam)
		})
		.then((response) => response.json())
	  	.then((responseText) => {
	    	return responseText;
	  	})
	  	.catch((error) => {
	    	return error;
	  	});
	},

	orchestrate_log(dictParam) {
		return this.http(CONFIG.ROOT_URL + 'setchatdata/logmessageinorchestrate', dictParam);
	}
};

module.exports = CommonFunctionsResource;