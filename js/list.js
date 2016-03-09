//N = window.N || {};
//N.list = (function(){
//	
//	var list, listItem;
//	
//	function init(){
//		bindElements();
//	}
//	
//	function bindElements(){
//		list = document.querySelector('.list');
//		listItem = list.querySelector('.list-item');
//	}
//	
//	function loadState(){
//		if (localStorage['notes']) {
//			var i=0,
//				notesLength = localStorage['notes'].length,
//				item;
//			for (i; i < notesLength; i++) {
//				item = document.createElement('div').className('list-item');
//				list.appendChild(item);
//			}
//		}
//	}
//	
//	
//})();