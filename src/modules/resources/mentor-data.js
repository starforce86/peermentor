/**
 * Created by Nikee on 12/18/15.
 */
var CONFIG = require('../../config');
var MentorDataResource = {

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
		return CONFIG.ROOT_URL + 'getmentorsdata/' + path ;
	},
	getMentorAvailability(mentorId, menteeId, date) {
		return this.http(this.url('getmentorrescheduleavailability'), {
            mentor_id: mentorId,
            mentee_id: menteeId,
            availability_start_date: date
          });
	}
};

module.exports = MentorDataResource;