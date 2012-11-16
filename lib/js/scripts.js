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
		},
		_searchSubmit : function(){
			var value = $("#search-box").val();
			if(value){ api.controller._searchItunes(value); }
		}
	};

	api.view = {
		events : function(){

			
			//go to top when click on logo
			$(".brand").on("click", function(){
				$('html, body').animate({ scrollTop: 0 }, 'slow', function(){
					$("#search-box").val("").focus();
				});
			});

			//search button action
			$("#search-button").on("click", function(){
				api.controller._searchSubmit();
			});

			$("#search-box").keypress(function(e) {
		    if (event.which == 13) {
		      e.preventDefault();
		 			api.controller._searchSubmit();
		    }
			});

		}()//events auto execute
	};

	iTunes();

});

//CALLBACK FUNCTION
function resultsItunes(arg) {
	var results = arg.results;
	console.log(results);
	html = "";
	size = results.length;
	if(size > 0){
		for (var i = 0; i < size; i++) {
			html += "<div class='span2' style='margin-bottom: 20px; height: 200px; overflow: hidden;'><a href='"+results[i].trackViewUrl+"' target='_blank'><img src='"+results[i].artworkUrl100+"' width=100 /><a/><br/>"+results[i].trackCensoredName+"</div>";
		}
	}else{
			html = "Sorry, no results found!"
	}
	$("#load_results").html(html);
}//resultsItunes()