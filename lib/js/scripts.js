$(function(){

	var iTunes = function (){};	//namespace
	var api = iTunes.prototype;	//cache object prototype
	
	api.model = {
		url : "https://itunes.apple.com/search?",
		params : {
			term: "",
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
			for (var key in obj) { s += encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]) + '&'; }
			if (s.length > 0) {	s = s.substr(0, s.length - 1); }
			return (s);
		},
		_searchItunes : function(query){
			api.model.params.term = query;	//passing query parameter
			var html = '<script src="' + api.model.url+api.controller._urlEncode(api.model.params) + '"><\/script>';
			$('head').append(html);	//append results to html
		}
	};

	api.view = {
		events : function(){
			//actions for pages
			$(".brand").on("click", function(e){
				e.preventDefault();
				api.controller._searchItunes("men");
				$('html, body').animate({ scrollTop: 0 }, 'slow', function(){
					console.log("here");
					$("#search-box").focus();
				});
			});
		}()//events auto execute
	};

	iTunes();

});

//CALLBACK FUNCTION
function resultsItunes(arg) {
	var results = arg.results;
	html = "";
	for (var i = 0; i < results.length; i++) {
		html += "<div class='span2' style='background: #ccc; margin-bottom: 20px; height: 50px; overflow: hidden;'>"+results[i].trackCensoredName+"</div>";
	}
	$("#load_results").html(html);
	console.log(results);
}//resultsItunes()