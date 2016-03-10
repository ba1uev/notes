N = window.N || {};
N.editor = (function(){
	
	var header, body, curr_id = 1;
	
	function init(){
		bindElements();
		bindEvents();
		if (N.utils.supportHTMLStorage()) {
			localStorage.curr_id = curr_id;
			loadState();
			localStorage.active = true;
		}
	}
	
	function bindElements(){
		header = document.querySelector('.note-header');
		body = document.querySelector('.note-body');
	}
	
	function bindEvents(){
		if (N.utils.supportHTMLStorage()) {
			document.onkeyup = function() {
				saveState(curr_id);
			}
		}
	}
	
	function loadState(){
		if (localStorage['active']) {
			curr_id = localStorage.curr_id;
			header.innerHTML = localStorage['h_' + curr_id];
			body.innerHTML = localStorage['b_' + curr_id];
			console.log('note #'+curr_id+' loaded');
		}
	}
	
	function saveState(id){
		localStorage['h_'+id] = header.innerHTML;
		localStorage['b_'+id] = body.innerHTML;
	}
	
	function currId(id){
		if (id) {
			localStorage.curr_id = curr_id = id;
			return curr_id;
		} else {
			return curr_id;
		}
	}
	
	// =============================================
	
	return {
		init: init,
		currId: currId,
		loadState: loadState
	}
	
})();