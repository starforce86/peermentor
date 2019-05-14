/**
 * Created by Nikee on 12/21/15.
 */
var CONFIG = require('../../config');
var MentoringProgramFunctionsResource = {

	
	http(url, dictParam) {
		return fetch(url, {
		  method: 'POST',
		  headers: {
		    'Accept': 'application/json',
      		'Content-Type': 'application/x-www-form-urlencoded'
		  },
		  body: this.serialize(dictParam)
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
		return CONFIG.ROOT_URL + 'setmentoringprogramdata/' + path + "?_st=Inquisit14" ;
	},
	rescheduleCallBlock(baseId, dateTime, rescheduleFlag, note) {
	    return this.http(this.url('reschedulecallrequest'), {
	        base_id: baseId,
            date_time: dateTime,
            reschedule_flag: rescheduleFlag,
            note: note
	      }
	    );
	},
	saveGoalCheckResponse(goalId, currentStatus, note) {
	    return this.http(this.url('savegoalcheckresponse'), {
	        goal_id: goalId,
            current_status: currentStatus,
            note: note
	      }
	    );
	},
	updateGoalTargetDate(goalId, targetDate) {
	    return this.http(this.url('updategoaltargetdate'), {
	        goal_id: goalId,
            target_date: targetDate
	      }
	    );
	},
};

module.exports = MentoringProgramFunctionsResource;