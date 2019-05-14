/**
 * Created by Alex on 12/8/15.
 */
var CONFIG = require('../../config');
var LoginDataResource = {

	
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
	  		console.log("responsetext=", responseText);
	    	return responseText;
	  	})
	  	.catch((error) => {
	  		console.log("eerrr=", error);
	    	return error;
	  	});
	},

	login(dictParam) {
		console.log("Login Params=", dictParam);
		return this.http(CONFIG.ROOT_URL_MENTOR + 'authentication/login', dictParam);
	},

	validate_token(dictParam) {
		console.log("Validate Params=", dictParam);
		return this.http(CONFIG.ROOT_URL_MENTOR + 'authentication/validate_token', dictParam);
	}
};

module.exports = LoginDataResource;