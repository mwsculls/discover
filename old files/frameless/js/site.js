$(document).ready(function(){
	
	// smooth scrolling navigation
	$('a[href*=#]').bind('click', function(){
		var $href = $(this).attr('href')
		$('html,body').animate({scrollTop: $($(this).attr('href')).offset().top}, 1200, 'easeInOutExpo');
		return false;
	});
	
	// subnav
	//$('footer nav').hide()
	//window.onscroll = function() {
	    //if( window.XMLHttpRequest ) {
	        //if (document.documentElement.scrollTop > 210 || self.pageYOffset > 210) {
		    	//$('footer nav').fadeIn('normal');
	        //} else if (document.documentElement.scrollTop < 228 || self.pageYOffset < 228) {
			 	//$('footer nav').fadeOut('normal');
	        //}
	    //}
	//};
	
	//Check to see if the window is top if not then display button
    $(window).scroll(function(){
        if ($(this).scrollTop() > 100) {
            $('footer nav').fadeIn();
        } else {
            $('footer nav').fadeOut();
        }
        
        //if ($(this).scrollTop() > 1800) {
            //$('.parallax').fadeOut();
        //} else {
            //$('.parallax').fadeIn();
        //}
    });
	
});