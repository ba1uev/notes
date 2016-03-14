N = window.N || {};
N.router = (function(){
	var hash,
		ls = localStorage;
	
	
	function init(){
		if ('onhashchange' in window) {
			window.onhashchange = function () {
				loadNote();
			}
		}
		loadNote();
	}
	
	function loadNote(){
		hash = window.location.hash.substr(1);
		if (hash &&
			localStorage.all_notes &&
			localStorage.all_notes.split(',').indexOf(hash) !== -1) {
			N.setCurrId(hash);
			N.editor.loadState(hash);
			N.list.loadState();
		} else {
			window.location.hash = '';
			N.setCurrId(1);
		}
	}
	
	return {
		init: init
	}
})();