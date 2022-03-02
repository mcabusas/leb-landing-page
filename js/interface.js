( function($) {
  'use strict';



    /*-------------------------------------------------------------------------------
	  Window load
	-------------------------------------------------------------------------------*/



	$(window).on('load', function(){

		$('.loader').hide();
    	var wow = new WOW({
		    offset: 100,          
		    mobile: false
		  }
		);
		wow.init();
	});

	var navbarAffixHeight=61




	/*-------------------------------------------------------------------------------
	  Smooth scroll to anchor
	-------------------------------------------------------------------------------*/



    $('.js-target-scroll, .navbar-nav .nav-link').on('click', function() {
        var target = $(this.hash);
        if (target.length) {
            $('html,body').animate({
                scrollTop: (target.offset().top - navbarAffixHeight + 1)
            }, 1000);
            return false;
        }
    });



    /*-------------------------------------------------------------------------------
	  Fixed navbar
	-------------------------------------------------------------------------------*/



	$(window).on('scroll',function(){
		FixedNavbar();
	
	});

	FixedNavbar();

	function FixedNavbar(){
		if ($(window).scrollTop() > 0) {
			if (!$('.collapse').hasClass('show')){
				$('.navbar').addClass('navbar-fixed animated slideInDown').removeClass('affix-top');
			}
		}
		else{
			$('.navbar').removeClass('navbar-fixed animated slideInDown').addClass('affix-top');
			if( $('.collapse').hasClass('show')){
				$('.navbar').addClass('navbar-fixed');
			}
			
		}
	}



	/*-------------------------------------------------------------------------------
	 Navbar collapse
	-------------------------------------------------------------------------------*/



	$('.collapse').on('show.bs.collapse', function () {
		$('.navbar').addClass('navbar-fixed');
	});

	$('.collapse').on('hidden.bs.collapse', function () {
		if ($('.navbar').hasClass('affix-top')){
			$('.navbar').removeClass('navbar-fixed');
		}
		
		
	});

	$(window).on('resize',function(){
		$('.collapse').removeClass('show');
		if ($(window).scrollTop() == 0) {
			$('.navbar').removeClass('navbar-fixed');
		}

	})






	/*-------------------------------------------------------------------------------
	 Scrollspy
	-------------------------------------------------------------------------------*/



	$('body').scrollspy({
		offset:  navbarAffixHeight + 1
	});



	/*-------------------------------------------------------------------------------
	  Partners carousel
	-------------------------------------------------------------------------------*/




	$(".partners-carousel").owlCarousel({
		margin:20,
		responsive:{
        0:{
            items:1
        },
        768:{
            items:3
        },
        992:{
            items:3
        },
        1200:{
        	items:5
        }
	}});





	/*-------------------------------------------------------------------------------
	  Reviews carousel
	-------------------------------------------------------------------------------*/



	$(".review-carousel").owlCarousel({
		margin:50,
		responsive:{
        0:{
            items:1
        }
	 }});



	/*-------------------------------------------------------------------------------
	  Pie charts
	-------------------------------------------------------------------------------*/



    $(window).scroll( function(){

	    $('.chart').each( function(i){
	        var bottom_of_object = $(this).offset().top + $(this).outerHeight();
	        var bottom_of_window = $(window).scrollTop() + $(window).height();
	        if( bottom_of_window > bottom_of_object ){
		        $('.chart').easyPieChart({
		          scaleColor:false,
		          trackColor:'#ebedee',
		          barColor: function(percent) {
				    var ctx = this.renderer.getCtx();
				    var canvas = this.renderer.getCanvas();
				    var gradient = ctx.createLinearGradient(0,0,canvas.width,0);
				        gradient.addColorStop(0, "#6442c7");
				        gradient.addColorStop(1, "#bea7ff");
				    return gradient;
				  },
			      lineWidth:6,
			      lineCap: false,
			      rotate:180,
			      size:180,
		          animate:1000
		        });
	        }
	    }); 
	});


	$('.js-play').magnificPopup({
	    type: 'iframe',
	    removalDelay: 300,
	    mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
		zoom: {
			enabled: true,
			duration: 300 // don't foget to change the duration also in CSS
		}
    });


	/*-------------------------------------------------------------------------------
	  Subscribe Form
	-------------------------------------------------------------------------------*/


	
	$('#mc-form').ajaxChimp({
        language: 'cm',
        url: 'http://csmthemes.us3.list-manage.com/subscribe/post?u=9666c25a337f497687875a388&id=5b881a50fb'
            //http://xxx.xxx.list-manage.com/subscribe/post?u=xxx&id=xxx
    });


    $.ajaxChimp.translations.cm = {
        'submit': 'Submitting...',
        0: '<i class="fa fa-envelope"></i> Awesome! We have sent you a confirmation email',
        1: '<i class="fa fa-exclamation-triangle"></i> Please enter a value',
        2: '<i class="fa fa-exclamation-triangle"></i> An email address must contain a single @',
        3: '<i class="fa fa-exclamation-triangle"></i> The domain portion of the email address is invalid (the portion after the @: )',
        4: '<i class="fa fa-exclamation-triangle"></i> The username portion of the email address is invalid (the portion before the @: )',
        5: '<i class="fa fa-exclamation-triangle"></i> This email address looks fake or invalid. Please enter a real email address'
    };


	/*-------------------------------------------------------------------------------
	  Ajax Form
	-------------------------------------------------------------------------------*/



	if ($('.js-ajax-form').length) {
		$('.js-ajax-form').each(function(){
			$(this).validate({
				errorClass: 'error wobble-error',
			    submitHandler: function(form){
		        	$.ajax({
			            type: "POST",
			            url:"mail.php",
			            data: $(form).serialize(),
			            success: function() {
			                $('.modal').modal('hide');
		                	$('#success').modal('show');
		                },

		                error: function(){
			            	$('.modal').modal('hide');
			                $('#error').modal('show');
			            }
			        });
			    }
			});
		});
	}
})(jQuery);
