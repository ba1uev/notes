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
			var id = Math.max.apply(null, ls.all_notes.split(',')) + 1;
			listItems.appendChild(makeLink(id, 'New note'));
			ls.all_notes += ',' + id;
			N.addNote(id);
			N.setCurrId(id);
			N.editor.loadState(id);
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