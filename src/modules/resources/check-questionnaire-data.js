/**
 * Created by Nikee on 12/21/15.
 */
var CONFIG = require('../../config');
var CheckQuestionnaireDataResource = {

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
		return CONFIG.ROOT_URL + 'getcheckquestionnairedata/' + path ;
	},
	getCheckQuestions(orgId, mentoringProgramBaseId) {
		return this.http(this.url('getcheckquestionsanswers'), {
            org_id: orgId,
            mentoring_program_base_id: mentoringProgramBaseId
          });
	}
};

module.exports = CheckQuestionnaireDataResource;