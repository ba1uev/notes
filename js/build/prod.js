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
N = window.N || {};
N.list = (function(){
	
	var list, listItems, newNoteButton;
	
	function init(){
		bindElements();
		bindEvents();
		loadState();
		if (!localStorage['active']) {
			localStorage.all_notes = '1';
			localStorage.active = true;
		}
	}
	
	function bindElements(){
		list = document.querySelector('.list');
		listItems = list.querySelector('.list-items');
		newNoteButton = list.querySelector('.list-create');
	}
	
	function bindEvents(){
		newNoteButton.onclick = function(){
			var link = document.createElement('a'),
				id = Math.max.apply(null, localStorage.all_notes.split(',')) + 1;
			listItems.appendChild(makeLink(id, 'New note'));
			localStorage.all_notes += ',' + id;
		};
//		for (var i=0; i<listItemsCount; i++) {
//			listItems[i].onclick = function(){
//				console.log(this.dataset.id);
//			}
//		}
//		listItems.onclick = function(e){
//			N.editor.currId(e.target.dataset.id)
//		};
	}
	
	function loadState(){
		if (N.utils.supportHTMLStorage()) {
			if (localStorage.all_notes){
				var notes = localStorage['all_notes'].split(','),
					notes_count = notes.length,
					link;
				while (listItems.firstChild) {
					listItems.removeChild(listItems.firstChild);
				}
				for (var i=0; i<notes_count; i++) {
//					console.log(notes[i]);
					link = document.createElement('a');
					link.dataset.id = notes[i];
					link.href = '#' + notes[i];
					link.innerHTML = N.utils.getNote(notes[i], true);
					listItems.appendChild(link);
				}
			} else {
				localStorage.all_notes = '1'
			}
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
		// преобразование к числу
		// поскольку LS возвращает всегда строку
		return +ls.curr_id;
	}
	
	function setCurrId(id) {
		return ls.curr_id = +id;
	}
	
	
	// addPost, deletePost, getPost(id, head_only)
	
	return {
		init: init,
		getFirstVisit: getFirstVisit,
		getCurrId: getCurrId,
		setCurrId: setCurrId
	}
})();
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
			console.log('loadNote');
		} else {
			window.location.hash = '';
			console.log('loadNote NOT');
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
	
	function getNote(id, head_only){
		if (head_only) {
			return localStorage['h_'+id];
		} else {
			return {
				head: localStorage['h_'+id],
				body: localStorage['b_'+id]
			}
		}
	}
	
	return {
		supportHTMLStorage: supportsHtmlStorage,
		getNote: getNote
	}
})();