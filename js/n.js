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