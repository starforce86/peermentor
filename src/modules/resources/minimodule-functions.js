/**
 * Created by Nikee on 12/21/15.
 */
var CONFIG = require('../../config');
var MinimoduleFunctionsResource = {

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
		return CONFIG.ROOT_URL + 'setminimoduledata/' + path;
	},
	insertMinimoduleQuestionAnswers(mentoring_program_base_minimodule_xrefId, questionObjs) {
	    return this.http(this.url('setminimodulequestionanswers'), {
	        mentoring_program_base_minimodule_xref_id: mentoring_program_base_minimodule_xrefId,
            question_objs: JSON.stringify(questionObjs)
	      }
	    );
	},
};

module.exports = MinimoduleFunctionsResource;