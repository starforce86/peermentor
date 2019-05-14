/**
 * Created by Nikee on 12/18/15.
 */
var CONFIG = require('../../config');
var MentoringProgramDataResource = {

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
		return CONFIG.ROOT_URL + 'getmentoringprogramdata/' + path ;
	},
	getMenteeActiveGoal(mentoringProgramBaseId) {
		return this.http(this.url('getactivegoal'), {
            mentoring_program_base_id: mentoringProgramBaseId
          });
	},
	getMenteeActiveGoalAction(mentoringProgramBaseId, goalId) {
		return this.http(this.url('getactivegoalaction'), {
            mentoring_program_base_id: mentoringProgramBaseId,
            goal_id: goalId
          });
	},
	getMenteeGoalActionHistory(goalId) {
        return this.http(this.url('getgoalactionhistory'), {
            goal_id: goalId
          }
        );
    },
    getMenteeWorkingNotWorkingGoals(mentoringProgramBaseId) {
        return this.http(this.url('GetWorkingNotWorkingGoal'), {
            mentoring_program_base_id: mentoringProgramBaseId
          }
        );
    },
    getMenteeActiveCallRequest(baseId) {
        return this.http(this.url('activecallrequest'), {
            base_id: baseId
          }
        );
    },
    getBaseCallTransactions(mentoringProgramBaseId) {
        return this.http(this.url('getbasecalltransactions'), {
            mentoring_program_base_id: mentoringProgramBaseId
          }
        );
    }
};

module.exports = MentoringProgramDataResource;