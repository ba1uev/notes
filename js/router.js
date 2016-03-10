N = window.N || {};
N.router = (function(){
	var hash;
	function init(){
		if ('onhashchange' in window) {
			window.onhashchange = function (e) {
				hash = window.location.hash.substr(1);
				if (hash &&
					localStorage.all_notes &&
					localStorage.all_notes.split(',').indexOf(hash) !== -1) {
//					console.log('SHOW POST #'+hash);
					N.editor.currId(hash);
					N.editor.loadState(hash);
				} else {
					window.location.hash = '';
				}
			}
		}
	}
	
	return {
		init: init
	}
})();