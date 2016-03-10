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