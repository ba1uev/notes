N = window.N || {};
N.router = (function(){
	var hash;
	function init(){
		if ('onhashchange' in window) {
			window.onhashchange = function () {
				loadNote()
			}
		}
		loadNote();
	}
	
	function loadNote(){
		hash = window.location.hash.substr(1);
		if (hash &&
			localStorage.all_notes &&
			localStorage.all_notes.split(',').indexOf(hash) !== -1) {
			N.editor.currId(hash);
			N.editor.init();
		} else {
			window.location.hash = '';
		}
	}
	
	return {
		init: init
	}
})();