$(function(){

	var iTunes = function (){};	//namespace
	var api = iTunes.prototype;	//cache object prototype
	
	api.model = {
		query : "",
		url : "https://itunes.apple.com/search?",
		params : {
			term: this.query,
			country: "US",
			media: "movie",
			limit: 200,
			sort: "recent",
			callback: "resultsItunes"
		}
	};

	api.controller = {
		_urlEncode : function(obj){
			var s = '';
			for (var key in obj) {
				s += encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]) + '&';
			}
			if (s.length > 0) {
				s = s.substr(0, s.length - 1);
			}
			return (s);
		},
		_searchItunes : function(query) {
			this.model.query = query;	//passing query parameter
			var html = '<script src="' + this.model.url+this.model.params + '"><\/script>';
			$('head').append(html);	//append results to html
		}

	};

	api.view = {};

	iTunes();


	var urlEncode = function(obj) {
	var s = '';
	for (var key in obj) {
		s += encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]) + '&';
	}
	if (s.length > 0) {
		s = s.substr(0, s.length - 1);
	}
	return (s);
}//urlEncode()

var searchItunes = function(query) {
	query = "brave";
	var params = {
		term: query,
		country: "US",
		media: "movie",
		limit: 200,
		sort: "recent",
		callback: "resultsItunes"
	};
	var params = urlEncode(params);
	var url = 'https://itunes.apple.com/search?' + params;
	var html = '<script src="' + url + '"><\/script>';
	$('head').append(html);
}//searchItunes()

var resultsItunes = function(arg) {
	var results = arg.results;
	console.log(results);
}//resultsItunes()



$(".brand").on("click", function(e){
		e.preventDefault();
		//searchItunes();
		$('html, body').animate({ scrollTop: 0 }, 'slow');
	});
});

