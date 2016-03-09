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
//N = window.N || {};
//N.list = (function(){
//	
//	var list, listItem;
//	
//	function init(){
//		bindElements();
//	}
//	
//	function bindElements(){
//		list = document.querySelector('.list');
//		listItem = list.querySelector('.list-item');
//	}
//	
//	function loadState(){
//		if (localStorage['notes']) {
//			var i=0,
//				notesLength = localStorage['notes'].length,
//				item;
//			for (i; i < notesLength; i++) {
//				item = document.createElement('div').className('list-item');
//				list.appendChild(item);
//			}
//		}
//	}
//	
//	
//})();
N = window.N || {};
N.ui = (function(){
	
})();
N = window.N || {};
N.utils = (function(){

	function supportsHtmlStorage() {
		try {
			return 'localStorage' in window && window['localStorage'] !== null;
		} catch (e) {
			return false;
		}
	};

	return {
		supportHTMLStorage: supportsHtmlStorage
		
	}
	
	
	
})();