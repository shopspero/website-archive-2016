
var info = [
{indivId: "yehrin", indivPhotoUrl: "https://farm1.staticflickr.com/709/22187892342_c90a6fef31_b.jpg", groupPhotoUrl: "https://googledrive.com/host/0Bwg6P0bQonCuZG5GVEtKNC1lZW8/YehrinPark.JPG",  bio: "Hello My name is yp"},
{indivId: "alyssa", indivPhotoUrl: "https://farm1.staticflickr.com/709/22187892342_c90a6fef31_b.jpg", groupPhotoUrl: "https://googledrive.com/host/0Bwg6P0bQonCuZG5GVEtKNC1lZW8/AlyssaKim.JPG",  bio: "Hello My name is yp"},
{indivId: "andrew", indivPhotoUrl: "https://farm1.staticflickr.com/709/22187892342_c90a6fef31_b.jpg", groupPhotoUrl: "https://googledrive.com/host/0Bwg6P0bQonCuZG5GVEtKNC1lZW8/AndrewChang.JPG",  bio: "Hello My name is yp"},
{indivId: "angelina", indivPhotoUrl: "https://farm1.staticflickr.com/709/22187892342_c90a6fef31_b.jpg", groupPhotoUrl: "https://googledrive.com/host/0Bwg6P0bQonCuZG5GVEtKNC1lZW8/AngelinaTong.JPG",  bio: "Hello My name is yp"},
{indivId: "davidL", indivPhotoUrl: "https://farm1.staticflickr.com/709/22187892342_c90a6fef31_b.jpg", groupPhotoUrl: "https://googledrive.com/host/0Bwg6P0bQonCuZG5GVEtKNC1lZW8/DavidLee.JPG",  bio: "Hello My name is yp"},
{indivId: "davidM", indivPhotoUrl: "https://farm1.staticflickr.com/709/22187892342_c90a6fef31_b.jpg", groupPhotoUrl: "https://googledrive.com/host/0Bwg6P0bQonCuZG5GVEtKNC1lZW8/DavidMoon.JPG",  bio: "Hello My name is yp"},
{indivId: "elsie", indivPhotoUrl: "https://farm1.staticflickr.com/709/22187892342_c90a6fef31_b.jpg", groupPhotoUrl: "https://googledrive.com/host/0Bwg6P0bQonCuZG5GVEtKNC1lZW8/ElsieCheang.JPG",  bio: "Hello My name is yp"},
{indivId: "eric", indivPhotoUrl: "https://farm1.staticflickr.com/709/22187892342_c90a6fef31_b.jpg", groupPhotoUrl: "https://googledrive.com/host/0Bwg6P0bQonCuZG5GVEtKNC1lZW8/EricHuang.JPG",  bio: "Hello My name is yp"},
{indivId: "jennifer", indivPhotoUrl: "https://farm1.staticflickr.com/709/22187892342_c90a6fef31_b.jpg", groupPhotoUrl: "https://googledrive.com/host/0Bwg6P0bQonCuZG5GVEtKNC1lZW8/JenniferMin.JPG",  bio: "Hello My name is yp"},
{indivId: "justine", indivPhotoUrl: "https://farm1.staticflickr.com/709/22187892342_c90a6fef31_b.jpg", groupPhotoUrl: "https://googledrive.com/host/0Bwg6P0bQonCuZG5GVEtKNC1lZW8/JustineJeon.JPG",  bio: "Hello My name is yp"},
{indivId: "landon", indivPhotoUrl: "https://farm1.staticflickr.com/709/22187892342_c90a6fef31_b.jpg", groupPhotoUrl: "https://googledrive.com/host/0Bwg6P0bQonCuZG5GVEtKNC1lZW8/LandonChang.JPG",  bio: "Hello My name is yp"},
{indivId: "nicholas", indivPhotoUrl: "https://farm1.staticflickr.com/709/22187892342_c90a6fef31_b.jpg", groupPhotoUrl: "https://googledrive.com/host/0Bwg6P0bQonCuZG5GVEtKNC1lZW8/NicholasChoi.JPG",  bio: "Hello My name is yp"},
{indivId: "phil", indivPhotoUrl: "https://farm1.staticflickr.com/709/22187892342_c90a6fef31_b.jpg", groupPhotoUrl: "https://googledrive.com/host/0Bwg6P0bQonCuZG5GVEtKNC1lZW8/PhilKwon.JPG",  bio: "Hello My name is yp"},
{indivId: "sharon", indivPhotoUrl: "https://farm1.staticflickr.com/709/22187892342_c90a6fef31_b.jpg", groupPhotoUrl: "https://googledrive.com/host/0Bwg6P0bQonCuZG5GVEtKNC1lZW8/SharonYoun.JPG",  bio: "Hello My name is yp"},
{indivId: "susie", indivPhotoUrl: "https://farm1.staticflickr.com/709/22187892342_c90a6fef31_b.jpg", groupPhotoUrl: "https://googledrive.com/host/0Bwg6P0bQonCuZG5GVEtKNC1lZW8/SusieKang.JPG",  bio: "Hello My name is yp"}
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

