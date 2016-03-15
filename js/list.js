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
		link.innerHTML = title;
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