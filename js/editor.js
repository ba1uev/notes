N = window.N || {};
N.editor = (function(){
	
	var header, body, ls = localStorage;
	
	function init(){
		bindElements();
		bindEvents();
		if (N.getFirstVisit()) {
			saveState(N.getCurrId());
		} else {
			loadState(N.getCurrId());
		}
	}
	
	function bindElements(){
		header = document.querySelector('.note-header');
		body = document.querySelector('.note-body');
	}
	
	function bindEvents(){
		header.onkeyup = function(){
			saveState(N.getCurrId());
			N.list.loadState();
		}
		body.onkeyup = function() {
			saveState(N.getCurrId());
		}
	}
	
	function loadState(id){
		header.innerHTML = ls['h_' + id];
		body.innerHTML = ls['b_' + id];
//		console.log('note #'+id+' loaded');
	}
	
	function saveState(id){
		ls['h_'+id] = header.innerHTML;
		ls['b_'+id] = body.innerHTML;
//		console.log('#'+id+' saved');
	}
	
	return {
		init: init,
		loadState: loadState
	}
	
})();