$(function(){

	var iTunes = function (){};	//namespace
	var api = iTunes.prototype;	//cache object prototype
	
	api.model = {
		query : "",
		url : "https://itunes.apple.com/search?",
		params : {
			term: "all",
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
		_searchItunes : function(query){
			api.model.query = query;	//passing query parameter
			var html = '<script src="' + api.model.url+api.controller._urlEncode(api.model.params) + '"><\/script>';
			$('head').append(html);	//append results to html
		}
	};

	api.view = {
		events : function(){
			//actions for pages
			$(".brand").on("click", function(e){
				e.preventDefault();
				api.controller._searchItunes("all");
				$('html, body').animate({ scrollTop: 0 }, 'slow');
			});
		}()//events auto execute
	};

	iTunes();

});

//CALLBACK FUNCTION
function resultsItunes(arg) {
	var results = arg.results;
	console.log(results);
}//resultsItunes()