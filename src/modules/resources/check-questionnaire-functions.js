/**
 * Created by Nikee on 12/21/15.
 */
var CONFIG = require('../../config');
var CheckQuestionnaireFunctionsResource = {

	http(url, dictParam) {
		return fetch(url, {
		  method: 'POST',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		  },
		  body: JSON.stringify(dictParam)
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
		return CONFIG.ROOT_URL + 'setcheckquestionnairedata/' + path + "?_st=Inquisit14" ;
	},
	setCheckQuestionnaireAnswers(questionObjs) {
	    return this.http(this.url('setcheckquestionnairementeeanswers'), {
	        question_objs: JSON.stringify(questionObjs)
	      }
	    );
	},
};

module.exports = CheckQuestionnaireFunctionsResource;