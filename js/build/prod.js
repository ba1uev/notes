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
N = window.N || {};
N.list = (function(){
	
	var list, listItems, newNoteButton;
	
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
			alert('asdasd');
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
	
	return {
		init: init
	}
	
})();
N = window.N || {};
N.router = (function(){
	var hash;
	function init(){
		if ('onhashchange' in window) {
			window.onhashchange = function (e) {
				hash = window.location.hash.substr(1);
				if (hash &&
					localStorage.all_notes &&
					localStorage.all_notes.split(',').indexOf(hash) !== -1) {
//					console.log('SHOW POST #'+hash);
					N.editor.currId(hash);
					N.editor.loadState(hash);
				} else {
					window.location.hash = '';
				}
			}
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