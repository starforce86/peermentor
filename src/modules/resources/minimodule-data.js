/**
 * Created by Nikee on 12/18/15.
 */
var CONFIG = require('../../config');
var MinimoduleDataResource = {

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
		return CONFIG.ROOT_URL + 'getminimoduledata/' + path ;
	},
	getMinimodule(mentoring_program_base_minimodule_xref_id) {
		return this.http(this.url('getminimodule'), {
            mentoring_program_base_minimodule_xref_id: mentoring_program_base_minimodule_xref_id
        });
	}
};

module.exports = MinimoduleDataResource;