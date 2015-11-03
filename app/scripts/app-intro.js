/**
 * Created by blakelieberman on 10/26/15.
 */
jQuery(document).ready(function($){
	//update this value if you change this breakpoint in the style.css file (or _layout.scss if you use SASS)
	var MqL = 1070;
	var totalSteps = $('.cd-single-item').length;
	var currentStep = 1;
	$('.total-steps').html(totalSteps);

	var dotNav = '<ol class="cd-dots hidden-sm-up">' + '<li class="selected"><a href="#0">1</a></li>' +'</ol>';
	$('.cd-slider-nav').before(dotNav);
	for(var i = 0; i < totalSteps - 1; i++) {
		$('.cd-dots').append('<li class=""><a href="#0">' + (i + 2) + '</a></li>');
	}
	$(window).on('scroll', function(){
		toggleHeader();
	});

	function toggleHeader() {
		var topApp = $('.cd-caption').offset().top - 50,
			bottomApp = $('.cd-slider-nav').offset().top,
			scrollTop = $(window).scrollTop();
		if( topApp <= scrollTop && bottomApp >= scrollTop ) {
			$('.main-header').addClass('hide-header');
		} else {
			$('.main-header').removeClass('hide-header');
		}
	}

	$('.cd-image-container').each(function(i){
		if(i === $('.cd-image-container').length - 1) {
			$(this).addClass('last-gif-slide');
		}
	});

	function activeDot(active){
		$(".cd-dots li").each(function(i){
			if(i === active - 1) {
				$(this).addClass("selected");
			} else {
				$(this).removeClass("selected");
			}
		});
	}

	if(totalSteps === 1) {
		$('.cd-slider-nav, .step-counter').addClass('hidden-xs-up');
	}

	//update the slider - desktop only
	//update the slider - desktop only
	$('.cd-prev').on('click', function(event){
		event.preventDefault();
		if(!$('.cd-prev').hasClass('cd-inactive')) {
			var activeSlide = $('.cd-active');
			currentStep --;
			$('.current-step').html(currentStep);
			updateSlider(activeSlide, 'prev');
			activeDot(currentStep);
		}
	});

	$('.cd-next').on('click', function(event){
		event.preventDefault();
		if(!$('.cd-next').hasClass('cd-inactive')) {
			var activeSlide = $('.cd-active');
			currentStep ++;
			$('.current-step').html(currentStep);
			updateSlider(activeSlide, 'next');
			activeDot(currentStep);
		}
	});

	$('.cd-single-item').on('swiperight', function(event){
		event.preventDefault();
		if(!$('.cd-prev').hasClass('cd-inactive')) {
			var activeSlide = $('.cd-active');
			currentStep --;
			$('.current-step').html(currentStep);
			updateSlider(activeSlide, 'prev');
			activeDot(currentStep);
		}
	});
	$('.cd-single-item').on('swipeleft', function(event){
		event.preventDefault();
		if(!$('.cd-next').hasClass('cd-inactive')) {
			var activeSlide = $('.cd-active');
			currentStep ++;
			$('.current-step').html(currentStep);
			updateSlider(activeSlide, 'next');
			activeDot(currentStep);
		}
	});

	$(document).keyup(function(event){
		if(event.which=='37' && $('.cd-main-content').hasClass('is-product-tour') ) {
			var activeSlide = $('.cd-active');
			updateSlider(activeSlide, 'prev');
		}
		else if(event.which=='39' && $('.cd-main-content').hasClass('is-product-tour')) {
			var activeSlide = $('.cd-active');
			updateSlider(activeSlide, 'next');
		}
	});

	$(window).on('resize', function(){
		window.requestAnimationFrame(function(){
			if($(window).width() < MqL) {
				$('.cd-single-item').each(function(){
					$(this).find('img').css('opacity', 1).end().find('video').hide();
				});
			} else {
				$('.cd-single-item.cd-active').find('video').show();
				( $('.cd-main-content').hasClass('is-product-tour') ) ? $('header').addClass('slide-down') : $('header').removeClass('slide-down');
			}
		});
	});



	function updateSlider(active, direction) {
		var selected;
		if( direction == 'next' ) {
			selected = active.next();
			//on Firefox CSS transition/animation fails when parent element changes visibility attribute
			//so we have to change .cd-single-item childrens attributes after having changed its visibility value
			setTimeout(function() {
				active.removeClass('cd-active').addClass('cd-hidden').next().removeClass('cd-move-right').addClass('cd-active').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
					//active.addClass('cd-not-visible');
				});
			}, 50);
		} else {
			selected = active.prev();
			//on Firefox CSS transition/animation fails when parent element changes visibility attribute
			//so we have to change .cd-single-item childrens attributes after having changed its visibility value
			setTimeout(function() {
				active.removeClass('cd-active').addClass('cd-move-right').prev().addClass('cd-active').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
					//active.addClass('cd-not-visible');
				});
			}, 50);
		}
		//update visible slider
		selected.removeClass('cd-not-visible');
		//update slider navigation (in case we reached the last slider)
		updateSliderNav(selected);
		//load the video for the new slider

	}

	function updateSliderNav(selected) {
		( currentStep === totalSteps ) ? $('.cd-next').addClass('cd-inactive') : $('.cd-next').removeClass('cd-inactive') ;
		( selected.is(':first-child') ) ? $('.cd-prev').addClass('cd-inactive') : $('.cd-prev').removeClass('cd-inactive') ;
		//$('.cd-loader').stop().hide().css('width', 0);
	}
});