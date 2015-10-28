/**
 * Created by blakelieberman on 10/28/15.
 */
jQuery(document).ready(function($) {

	$(window).scroll(function () {
		var y = $(this).scrollTop();

		if (y >= 150) {
			$('.main-header').addClass('condensed');
		}
		else {
			$('.main-header').removeClass('condensed');
		}
	});
});