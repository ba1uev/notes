N = window.N || {};
N.editor = (function(){
	
	var header, body, curr_id = 1;
	
	// при ините едитора сразу запихать первичный текст в ЛС
	// в листе тоже захуярить в лист-итеме первичный тайтл
	function init(){
		bindElements();
		bindEvents();
		if (N.utils.supportHTMLStorage()) {
			localStorage.curr_id = curr_id;
			loadState();
//			if (!localStorage['active']) {
//				console.log('надо сохранить')
//				saveState(1);
//			}
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
				N.list.loadState();
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
		console.log('saved');
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