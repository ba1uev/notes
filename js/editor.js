N = window.N || {};
N.editor = (function(){
	
	var header, body, ls = localStorage;
	
	function init(){
		bindElements();
		bindEvents();
//		console.log(N.getFirstVisit());
//		console.log(typeof N.getFirstVisit());
		if (N.getFirstVisit()) {
			console.log('FIRST');
			saveState(N.getCurrId());
		} else {
			console.log('SECOND');
			loadState(N.getCurrId());
		}
	}
	
	function bindElements(){
		header = document.querySelector('.note-header');
		body = document.querySelector('.note-body');
	}
	
	function bindEvents(){
		document.onkeyup = function() {
			saveState(N.getCurrId());
			// менять тайтл текущей ссылки
		}
	}
	
	function loadState(id){
		header.innerHTML = ls['h_' + id];
		body.innerHTML = ls['b_' + id];
		console.log('note #'+id+' loaded');
	}
	
	function saveState(id){
		ls['h_'+id] = header.innerHTML;
		ls['b_'+id] = body.innerHTML;
		console.log('#'+id+' saved');
	}
	
//	function currId(id){
//		if (id) {
//			localStorage.curr_id = curr_id = id;
//			return curr_id;
//		} else {
//			return curr_id;
//		}
//	}
	
	// =============================================
	
	return {
		init: init,
//		currId: currId,
//		loadState: loadState
	}
	
})();