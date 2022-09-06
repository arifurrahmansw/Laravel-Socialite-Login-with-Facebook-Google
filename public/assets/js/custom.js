$(document).ready(function () {
    'use strict';

//	var owl = $('.owl-carousel');
	//console.log(owl);
	$('.owl-carousel').owlCarousel( {
		onInitialized: $('body').addClass('loaded')
	});

});

// function callback(event) {
// 	console.log("loaded");
// 	$("body").addClass("loaded");
// }