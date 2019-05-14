/**
 * Created by Alex on 12/8/15.
 */
var globals = require("../../config.js");
var LoginDataResource = require("../resources/login-data");
var localStorage = require("../common/local_store");
var alertService = require("../common/alert");
var toastService = require("../common/toast");
var Actions = require('react-native-router-flux').Actions;
var ProgressHUD = require('react-native-progress-hud');

var LoginController = {
	mixins: [ProgressHUD.Mixin],

	viewController: null,
	loginData : {
          email: "",
          password: "",
          remember: false
    },

	updateState() {
		this.viewController.setState({
			flagReadyForLogin: this.checkLoginReady()
		});
	},

	setViewController(controller) {
		this.viewController = controller;
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
		
		if (this.checkLoginReady()) {
			// alert("Login Information:" + JSON.stringify(this.loginData));
		}

		// this.viewController.showProgressHUD();
		// var scope = this;
		// LoginDataResource.login(this.loginData).then(function(json) {
	 //        console.log("success=", json);
	 //        // Call Real Login API
	 //        var token = json.token;
	        
	 //        LoginDataResource.validate_token({token: token}).then(function (response) {
	 //        	console.log("scope=", scope);
	 //        	scope.viewController.dismissProgressHUD();
	 //        	if (response.error) {
  //                   // alert(response.message);
  //                   alertService.generalAlert("Peermentor", response.message);
  //               }
  //               if(response.user_info.role == "mentee")
  //               {
  //               	if (!localStorage.getData('FirstTimeLogin')) {
  //               		localStorage.setData('FirstTimeLogin', 1);
  //               	}
  //                 	localStorage.setData('UserManager',JSON.stringify(response.user_info));
  //                   // Go To Dashboard
                    
  //               }
  //               else
  //               {
  //                 // Invalid Account Error Message
  //                 alert("Sorry, you are not authorized to access this app.");
  //               }
	 //        })
	 //      }).catch((error) => {
	 //      	console.log("scope=", scope);
	 //      	scope.viewController.dismissProgressHUD();
	 //        console.log('Request failed', error);
	 //      });;
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