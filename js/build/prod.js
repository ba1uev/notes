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
		header.onkeydown = function(e){
			if (e.keyCode === 13) {
				e.preventDefault();
				body.focus();
			}
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
	
	function initNote(){
		body.focus();
	}
	
	return {
		init: init,
		loadState: loadState,
		initNote: initNote
	}
	
})();
N = window.N || {};
N.list = (function(){
	
	var list, listItems, newNoteButton,
		deleteButton,
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
		deleteButton = document.querySelector('.delete');
	}
	
	function bindEvents(){
		newNoteButton.onclick = function(){
			var id = Math.max.apply(null, ls.all_notes.split(',')) + 1,
				link = makeLink(id, 'New note');
			listItems.appendChild(link);
			ls.all_notes += ',' + id;
			N.addNote(id);
			N.setCurrId(id);
			N.editor.loadState(id);
			N.editor.initNote();
			link.click();
		};
		deleteButton.onclick = function(){
			// if empty note -> no confirm
			if (confirm('Are you sure to delete note?')) {
				N.deleteNote(N.getCurrId());
			}
		}
	}
	
	function loadState(){
		var notes = ls.all_notes.split(','),
			notes_count = notes.length,
			curr_id = N.getCurrId();
		while (listItems.firstChild) {
			listItems.removeChild(listItems.firstChild);
		}
		for (var i=0; i<notes_count; i++) {
			if (notes[i] != curr_id) {
				listItems.appendChild(makeLink(notes[i], N.getNote(notes[i],true)));
			} else {
				listItems.appendChild(makeLink(notes[i], N.getNote(notes[i],true), true));
			}
			// if header = '' -> ______
		}
	}
	
	function makeLink(id, title, curr){
		var link = document.createElement('a'),
			cls = document.createElement('div');
		link.href = '#'+id;
		link.dataset.id = id;
		if (curr) {
			link.className = 'curr';
		}
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
	
	function deleteNote(id){
		var n, arr, link;
		delete ls['h_'+id];
		delete ls['b_'+id];
		arr = ls.all_notes.split(','); 
		n = arr.indexOf(id+'');
		arr.splice(n,1);
		ls.all_notes = arr.join(',');
		link = document.querySelectorAll('[data-id="'+id+'"]')[0];
		link.parentNode.removeChild(link);
		N.editor.loadState(1);
	}
	
	
	return {
		init: init,
		getFirstVisit: getFirstVisit,
		getCurrId: getCurrId,
		setCurrId: setCurrId,
		getNote: getNote,
		addNote: addNote,
		deleteNote: deleteNote
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