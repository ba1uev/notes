N = window.N || {};
N.utils = (function(){

	function supportsHtmlStorage() {
		try {
			return 'localStorage' in window && window['localStorage'] !== null;
		} catch (e) {
			return false;
		}
	}
	
	function getNote(id, head_only){
		if (head_only) {
			return localStorage['h_'+id];
		} else {
			return {
				head: localStorage['h_'+id],
				body: localStorage['b_'+id]
			}
		}
	}
	
	return {
		supportHTMLStorage: supportsHtmlStorage,
		getNote: getNote
	}
})();