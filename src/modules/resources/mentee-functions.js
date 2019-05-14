/**
 * Created by Nikee on 12/18/15.
 */
var CONFIG = require('../../config');
var MenteeFunctionsResource = {
	parseParam(dictParam) {
		var formBody = [];
		for (var property in dictParam) {
		    var encodedKey = encodeURIComponent(property);
		    var encodedValue = encodeURIComponent(dictParam[property]);
		    formBody.push(encodedKey + "=" + encodedValue);
		}
		formBody = formBody.join("&");
		return formBody;
	},
	http(url, dictParam) {
		return fetch(url, {
		  method: 'POST',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/x-www-form-urlencoded'
		  },
		  body: this.parseParam(dictParam)
		})
		.then((response) => response.json())
	  	.then((responseText) => {
	    	return responseText;
	  	})
	  	.catch((error) => {
	    	return error;
	  	});
	},
	url(path) {
		return CONFIG.ROOT_URL + 'setmenteedata/' + path ;
	},
	url_mentor(path) {
		return CONFIG.ROOT_URL_MENTOR + 'setmenteedata/' + path ;
	},
	setMenteeProfilePicture(menteeId, image) {
	    return this.http(this.url('updatementeeprofilepicture'), {
	        mentee_id: menteeId,
	        image: image
	      }
	    );
	},
	updateMenteePersonalInformation (menteeId, menteeData) {
	    return this.http(this.url('updatementeepersonalinformation'), {
	        mentee_id: menteeId,
	        mentee_data: JSON.stringify(menteeData)
	      }
	    );
	},
    updateMenteeSmsSettings (menteeId, menteeData) {
        return this.http(this.url('updatementeesmsinformation'), {
            mentee_id: menteeId,
            mentee_data: JSON.stringify(menteeData)
          }
        );
    },
    setAvailability(menteeId, slots) {
        return this.http(this.url_mentor('set_mentee_app_availability'), {
            mentee_id: menteeId,
            slots: JSON.stringify(slots)
          }
        );
    },
    changePassword(email, oldPassword, newPassword) {
        return this.http(this.url_mentor('helpers/login/change_password'), {
            email: email,
            oldPassword: oldPassword,
            password: newPassword
          }
        );
    },
    setDeviceToken(menteeId, deviceToken) {
        return this.http(this.url('store_user_device_token_mobile_app'), {
            mentee_id: menteeId,
            device_token: deviceToken
          }
        );
    }
};

module.exports = MenteeFunctionsResource;