/**
 * Created by Nikee on 12/18/15.
 */
var CONFIG = require('../../config');
var MenteeDataResource = {

	http(url, dictParam) {
		return fetch(url+"?"+this.serialize(dictParam), {
		  method: 'GET'
		})
		.then((response) => response.json())
	  	.then((responseText) => {
	    	return responseText;
	  	})
	  	.catch((error) => {
	    	return error;
	  	});
	},
	serialize(obj) {
	  var str = [];
	  for(var p in obj)
	    if (obj.hasOwnProperty(p)) {
	      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	    }
	  return str.join("&");
	},
	url(path) {
		return CONFIG.ROOT_URL + 'getmenteesdata/' + path ;
	},
	url_mentor(path) {
		return CONFIG.ROOT_URL_MENTOR + 'getmenteesdata/' + path ;
	},
	getMenteeProfile(menteeId) {
		return this.http(this.url('getmenteeprofile'), {
			mentee_id: menteeId
		});
	},
	getMenteeBasicInfo(menteeId) {
		return this.http(this.url('getbasicmenteeinfo'), {
			mentee_id: menteeId
		});
	},
	getMenteeSettingsFields(menteeId) {
		return this.http(this.url('getmenteesettingsinfo'), {
			mentee_id: menteeId
		});
	},
	getDashboardData(menteeId) {
		return this.http(this.url('getdashboarddata'), {
			mentee_id: menteeId
		});
	},
	getAlertsData(menteeId) {
		return this.http(this.url('getalertsdata'), {
			mentee_id: menteeId
		});
	},
	getMenteeAvailability(menteeId) {
		return this.http(this.url_mentor('mentee_app_availability'), {
			mentee_id: menteeId,
			_st: 'Inquisit14'
		});
	}
};

module.exports = MenteeDataResource;