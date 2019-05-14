/**
 * Created by Alex on 12/8/15.
 */
 var React = require('react-native'); var { AsyncStorage } = React;
var globals = require("../../config.js");
var LoginDataResource = require("../resources/login-data");
var localStorage = require("../common/local_store");
var UserManager = require("../user/index");
var alertService = require("../common/alert");
var toastService = require("../common/toast");
var Actions = require('react-native-router-flux').Actions;

var LoginController = {

	view: null,
	loginData : {
          email: "inquisittesting2",
          password: "testing",
          remember: false
    },

	updateState() {
		this.view.setState({
			flagReadyForLogin: this.checkLoginReady()
		});
	},

	setView(view) {
		this.view = view;
	},

	setPassword(password) {
		this.loginData.password = password;
		this.updateState();
	},
	setEmail(email) {
		this.loginData.email = email;
		this.updateState();
	},

	checkLoginReady() {
		if (this.loginData.email.length > 0 && this.loginData.password.length > 0) {
			return true;
		} else {
			return false;
		}
	},

	doLogin() {
		var self = this;
		if (this.checkLoginReady()) {
			// alert("Login Information:" + JSON.stringify(this.loginData));
		}
		this.view.showProgressHUD();

		LoginDataResource.login(this.loginData).then(function(json) {
	        console.log("success=", json);
	        // Call Real Login API
	        var token = json.token;
	        LoginDataResource.validate_token({token: token}).then(function (response) {
	        	if (response.error) {
                    alert(response.message);
                }
                if(response.user_info.role == "mentee")
                {
                	console.log("Login Result=", response.user_info, " toJson=", JSON.stringify(response.user_info));
                  	localStorage.setData('UserManager',JSON.stringify(response.user_info)).then((value) => {
                  		UserManager.initiate();
	                    // Go To Dashboard
	                    // Actions.dashboard();
	                    setTimeout(() => {
	                    	self.view.dismissProgressHUD();
	                    	self.view.props.navigator.push({id: 'main'});
	                    }, 500);
	
                  	});

                	localStorage.getData('FirstTimeLogin').then((value) => {
                		if (!value) {
                			localStorage.setData('FirstTimeLogin', "1");	
                		}
                	});
                	
                  	
                    // Actions.conversation();
                }
                else
                {
                  // Invalid Account Error Message
                  alert("Sorry, you are not authorized to access this app.");
                }
	        }, function (error) {
	        	self.view.dismissProgressHUD();	
	        	console.log('Request failed', error);
	        });
	      }, function (error) {
	      	self.view.dismissProgressHUD();	
	        console.log('Request failed', error);

	      });
	},

	_handleConnectionInfoChange(connectionInfo) {
		alert("Connection Changed..", connectionInfo);
	},

	handleFirstConnectivityChange(isConnected) {
	  console.log('Then, is ' + (isConnected ? 'online' : 'offline'));
	  NetInfo.isConnected.removeEventListener(
	    'change',
	    handleFirstConnectivityChange
	  );
	},

	doSignUp() {
		alert("Sign Up");
	},
	
	doForgetPassword() {
		alert("Forgot Password");
	}
};

module.exports = LoginController;