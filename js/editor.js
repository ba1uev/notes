N = window.N || {};
N.editor = (function(){
	
	var header, body, yas = 0;
	
	function init(){
		bindElements();
		if (N.utils.supportHTMLStorage()) {
			loadState();
		}
		bindEvents();
	}
	
	function bindElements(){
		header = document.querySelector('.note-header');
		body = document.querySelector('.note-body');
	}
	
	function bindEvents(){
		if (N.utils.supportHTMLStorage()) {
			document.onkeyup = function() {
				saveState();
			}
		}
	}
	
	function loadState(){
		if (localStorage['n_header']) {
			header.innerHTML = localStorage.n_header;
			body.innerHTML = localStorage.n_body;
			console.log('note loaded');
		}
	}
	
	function saveState(){
		console.log(yas++);
		localStorage.n_header = header.innerHTML;
		localStorage.n_body = body.innerHTML;
	}
	
	// =============================================
	
	return {
		init: init
	}
	
})();