/**
 * Created by Nikee on 12/24/15.
 */
var MenteeDataResource = require("../resources/mentee-data"); 
var MenteeFunctionsResource = require("../resources/mentee-functions"); 
var UserManager = require('../user/index');
var Alert = require('../common/alert.js');

var SettingsController = {

	viewController: null,
	info: {},
	formData: {},
	updateState() {
		this.viewController.setState({
			info: SettingsController.info
		});
	},

	setViewController(controller) {
		this.viewController = controller;
	},
	closeModal() {
		this.viewController.setState({
			modalVisible: false
		});
	},

	getData() {
		MenteeDataResource.getMenteeSettingsFields(UserManager.data.mentee_id).then((response) => {
          if(response) {
            SettingsController.info = response;
            console.log(response);
            SettingsController.info.sms_alerts = (response.sms_alerts == 1) ? true : false;
            SettingsController.updateState();
          }
        });
	},

	setFirstName(text) {
		this.info.first_name = text;
	},
	setLastName(text) {
		this.info.last_name = text;
	},
	setPhoneNum(text) {
		this.info.phone_num = text;
	},
	setSecondaryPhoneNum(text) {
		this.info.secondary_phone_num.String = text;
	},
	setCurrentPassword(text) {
		this.formData.currentPassword = text;
	},
	setNewPassword(text) {
		this.formData.newPassword = text;
	},
	setConfirmPassword(text) {
		this.formData.confirmPassword = text;
	},
	saveData() {
		MenteeFunctionsResource.updateMenteePersonalInformation(64, this.info).then((response) => {
			Alert.notification("Information saved!");
			SettingsController.closeModal();
		});
	},
	updatePassword() {
		if(this.formData.newPassword == this.formData.confirmPassword && this.formData.newPassword.length >= 7 && this.formData.currentPassword.length > 0) {
			MenteeFunctionsResource.changePassword(this.info.email.String, this.formData.currentPassword, this.formData.newPassword).then((response) => {
				if(response.success == 1) {
					Alert.notification("Password updated.");
					SettingsController.closeModal();
				}
				else 
					Alert.notification("Password not updated.");
			});
		} else {
			return false;
		}
	},
	saveProfilePicture(profileImage) {
		MenteeFunctionsResource.setMenteeProfilePicture(UserManager.data.mentee_id, profileImage).then( (response) => {
			if(response) {
				SettingsController.info.image.String = profileImage;
				SettingsController.info.image.Valid = true;
				SettingsController.updateState();
				Alert.notification("Profile picture updated!");
				SettingsController.closeModal();
			}
		});
	},
	saveAvailability(slots) {
		MenteeFunctionsResource.setAvailability(UserManager.data.mentee_id, slots).then( (response) => {
			if(response.success == 1) {
				Alert.notification("Availability saved!");
				SettingsController.closeModal();
			} else {
				Alert.notification("Availability not saved.");
			}
		});
	}
};

module.exports = SettingsController;