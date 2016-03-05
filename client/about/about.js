
var info = [
{ indivId: "yehrin", indivPhotoUrl: "https://farm1.staticflickr.com/709/22187892342_c90a6fef31_b.jpg", groupPhotoUrl: "hello",  bio: "Hello My name is yp"}
]

Template.about.helpers({
	individuals: function() {
		return info
	}
})

Template.about.events({

	"click .indiv": function(event) {
		var indivId = event.target.id;
	
	    var image = document.getElementById(indivId); //what i clicked on
	    var main = document.getElementById("group"); //what i'm going to change

	    var newGroupUrl = "";
	    info.forEach(function(individual, index) {
	    	if (individual.indivId == indivId) {
	    		newGroupUrl = info[index].groupPhotoUrl;
	    	}
	    })
	    
	    main.src = newGroupUrl;
	}
});

