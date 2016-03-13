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
N = window.N || {};
N.list = (function(){
	
	var list, listItems, newNoteButton,
		ls = localStorage;
	
	function init(){
		bindElements();
		bindEvents();
		loadState();
	}
	
	function bindElements(){
		list = document.querySelector('.list');
		listItems = list.querySelector('.list-items');
		newNoteButton = list.querySelector('.list-create');
	}
	
	function bindEvents(){
		newNoteButton.onclick = function(){
			var id = Math.max.apply(null, ls.all_notes.split(',')) + 1;
			listItems.appendChild(makeLink(id, 'New note'));
			ls.all_notes += ',' + id;
			N.addNote(id);
			N.setCurrId(id);
			N.editor.loadState(id);
		};
	}
	
	function loadState(){
		var notes = ls.all_notes.split(','),
			notes_count = notes.length;
		while (listItems.firstChild) {
			listItems.removeChild(listItems.firstChild);
		}
		for (var i=0; i<notes_count; i++) {
			listItems.appendChild(makeLink(notes[i], N.getNote(notes[i],true)));
		}
	}
	
	function makeLink(id, title){
		var link = document.createElement('a'),
			cls = document.createElement('div');
		link.href = '#'+id;
		link.dataset.id = id;
//		cls.innerHTML = '✕';
//		cls.onclick = function(){
//			deleteNote(id)
//		}
		link.innerHTML = title;
//		link.appendChild(cls);
		return link;
	}
	
	function deleteNote(id){
		console.log('DELETE #'+id);
	}
	
	return {
		init: init,
		loadState: loadState
	}
	
})();
N = window.N || {};
N = (function(){
	
	var ls = localStorage;
	
	function init(){
		if ('firstVisit' in ls) {
			ls.firstVisit = false;
		} else {
			ls.firstVisit = true;
			ls.curr_id = 1;
			ls.all_notes = '1';
		}
	}
	
	function getFirstVisit(){
		return (ls.firstVisit === 'true');
	}
	
	function getCurrId(){
		return +ls.curr_id;
	}
	
	function setCurrId(id) {
		return ls.curr_id = +id;
	}
	
	function getNote(id, head_only){
		if (head_only) {
			return ls['h_'+id];
		} else {
			return {
				head: ls['h_'+id],
				body: ls['b_'+id]
			}
		}
	}
	
	function addNote(id){
		ls['h_'+id] = 'New note';
		ls['b_'+id] = '';
	}
	
	// addPost, deletePost, getPost(id, head_only)
	
	return {
		init: init,
		getFirstVisit: getFirstVisit,
		getCurrId: getCurrId,
		setCurrId: setCurrId,
		getNote: getNote,
		addNote: addNote
	}
})();
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
		} else {
			window.location.hash = '';
		}
	}
	
	return {
		init: init
	}
})();
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
	}
	
	
	
	return {
		supportHTMLStorage: supportsHtmlStorage,
		
	}
})();