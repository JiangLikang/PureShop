function $ (id) {
	return document.getElementById(id);
}

function create_xhr () {
	var xhr=null;
	if (window.XMLHttpRequest) {
		xhr=new XMLHttpRequest();
	}else {
		xhr=new ActiveXObject('Micro soft XMLHTTP');
	}
	return xhr;
}