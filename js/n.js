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