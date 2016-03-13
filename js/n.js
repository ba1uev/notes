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