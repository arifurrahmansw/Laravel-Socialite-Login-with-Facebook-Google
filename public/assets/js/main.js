
   $("#home-slider").owlCarousel({
    items: 1,
    autoplay: true,
    lazyLoad: true,
    loop: true,
    margin: 20,
    navText: [
            "<i class='icon-angle-left'></i>",
            "<i class='icon-angle-right'></i>"
          ],
     /*
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    */
    responsiveClass: true,
    autoHeight: true,
    autoplayTimeout: 7000,
    smartSpeed: 800,
    nav: true,
    responsive: {
      0: {
        items: 1,
        dots: false,
      },
      600: {
          dots: false,
          nav: false,
      },
      1024: {
      },
      1366: {
      }
    }
  });

$('.best-sale-slider').owlCarousel({
        loop: false,
        margin:10,
        touchDrag  : true,
        mouseDrag  : false,
        nav: true,
        navText: [
        "<i class='icon-angle-left'></i>",
        "<i class='icon-angle-right'></i>"
        ],
        dots: false,
        autoplay: false,
        responsiveClass:true,
        responsive: {
        0: {
        items: 2,
        nav: false
        },
        380: {
        items: 2,
        nav: false
        },
        480: {
        items: 3
        },
        600: {
        items: 3
        },
        1000: {
        items: 4
        }
        }
})

$('.product-nav-slider').owlCarousel({
    loop: false,
    items:5,
    //nav: true,
    navText: [
        "<i class='icon-angle-left'></i>",
        "<i class='icon-angle-right'></i>"
    ],
    dots: false,
    autoplay: false,
    autoplayHoverPause: true,
    responsiveClass:true,
    responsive: {
        0: {
        items: 3,
        nav: true,
        },
        380: {
        items: 3,
        nav: true,
        },
        600: {
        items: 3,
        nav: true,
        },
        1000: {
        items: 4,
        nav: false
        },
        1100: {
            items: 4,
            nav: false
        },
        1300: {
            items: 4,
            nav: false
        },
        1301: {
            items: 5,
            nav: false
        }
    }
})

$('.variant-slider').owlCarousel({
        loop: false,
        nav: true,
        navText: [
            "<i class='icon-angle-left'></i>",
            "<i class='icon-angle-right'></i>"
        ],
        dots: false,
        autoplay: false,
        autoplayHoverPause: true,
        responsiveClass:true,
        responsive: {
            0: {
            items: 3,
            nav: false,
            },
            320: {
            items: 3,
            nav: false,
            },
            600: {
            items: 3
            },
            1000: {
            items: 4,
            nav: false
            },
            1100: {
            items: 4,
            nav: false
            },
            1300: {
            items: 4,
            nav: false
            },
            1301: {
            items: 5,
            nav: false
                }
        }
})



// Main Js File
$(document).ready(function () {
    'use strict';
    quantityInputs();
    // $(function () {
    //     $('[data-toggle="tooltip"]').tooltip()
    //   })
    // Header Search Toggle
    var $searchWrapper = $('.header-search-wrapper'),
    	$body = $('body'),
        $searchToggle = $('.search-toggle');
	$searchToggle.on('click', function (e) {
		$searchWrapper.toggleClass('show');
		$(this).toggleClass('active');
        $('#search-btn').hide();
		$searchWrapper.find('input').focus();
		e.preventDefault();
	});

	$body.on('click', function (e) {
		if ( $searchWrapper.hasClass('show') ) {
			$searchWrapper.removeClass('show');
            $('#search-btn').show();
			$searchToggle.removeClass('active');
			$body.removeClass('is-search-active');
		}
	});
	$('.header-search').on('click', function (e) {
		e.stopPropagation();
	});

	// Sticky header
    var catDropdown = $('.category-dropdown'),
        catInitVal = catDropdown.data('visible');
	if ( $('.sticky-header').length && $(window).width() >= 992 ) {
		var sticky = new Waypoint.Sticky({
			element: $('.sticky-header')[0],
			stuckClass: 'fixed',
			offset: -300,
            handler: function ( direction ) {
                // Show category dropdown
                if ( catInitVal &&  direction == 'up') {
                    catDropdown.addClass('show').find('.dropdown-menu').addClass('show');
                    catDropdown.find('.dropdown-toggle').attr('aria-expanded', 'true');
                    return false;
                }
                // Hide category dropdown on fixed header
                if ( catDropdown.hasClass('show') ) {
                    catDropdown.removeClass('show').find('.dropdown-menu').removeClass('show');
                    catDropdown.find('.dropdown-toggle').attr('aria-expanded', 'false');
                }
            }
		});
	}

    // Menu init with superfish plugin
    if ( $.fn.superfish ) {
        $('.menu, .menu-vertical').superfish({
            popUpSelector: 'ul, .megamenu',
            hoverClass: 'show',
            delay: 0,
            speed: 80,
            speedOut: 80 ,
            autoArrows: true
        });
    }

	// Mobile Menu Toggle - Show & Hide
    $('.mobile-menu-toggler').on('click', function (e) {
		$body.toggleClass('mmenu-active');
		$(this).toggleClass('active');
		e.preventDefault();
    });

    $('.mobile-menu-overlay, .mobile-menu-close').on('click', function (e) {
		$body.removeClass('mmenu-active');
		$('.menu-toggler').removeClass('active');
		e.preventDefault();
    });

	// Add Mobile menu icon arrows to items with children
    $('.mobile-menu').find('li').each(function () {
        var $this = $(this);
        if ( $this.find('ul').length ) {
            $('<span/>', {
                'class': 'mmenu-btn'
            }).appendTo($this.children('a'));
        }
    });

    // Mobile Menu toggle children menu
    $('.mmenu-btn').on('click', function (e) {
        var $parent = $(this).closest('li'),
            $targetUl = $parent.find('ul').eq(0);
            if ( !$parent.hasClass('open') ) {
                $targetUl.slideDown(300, function () {
                    $parent.addClass('open');
                });
            } else {
                $targetUl.slideUp(300, function () {
                    $parent.removeClass('open');
                });
            }
        e.stopPropagation();
        e.preventDefault();
    });

	// Sidebar Filter - Show & Hide
    var $sidebarToggler = $('.sidebar-toggler');
    $sidebarToggler.on('click', function (e) {
		$body.toggleClass('sidebar-filter-active');
		$(this).toggleClass('active');
		e.preventDefault();
    });

    $('.sidebar-filter-overlay').on('click', function (e) {
		$body.removeClass('sidebar-filter-active');
		$sidebarToggler.removeClass('active');
		e.preventDefault();
    });

    // Clear All checkbox/remove filters in sidebar filter
    $('.sidebar-filter-clear').on('click', function (e) {
    	$('.sidebar-shop').find('input').prop('checked', false);
    	e.preventDefault();
    });

	// Quantity Input - Cart page - Product Details pages
    function quantityInputs() {
        if ( $.fn.inputSpinner ) {
            $("input[type='number']").inputSpinner({
                decrementButton: '<i class="icon-minus"></i>',
                incrementButton: '<i class="icon-plus"></i>',
                groupClass: 'input-spinner',
                buttonsClass: 'btn-spinner',
                buttonsWidth: '26px'
            });
        }
    }
    // $('.variant-btn').on('mouseenter mouseleave',  function(e) {
    //     var old_img     =  $('#product-zoom').attr('data-zoom-image');
    //     var old_color   = $('.product-color').attr('data-color');
    //     var old_price   = $('.sale-price').attr('data-price');
    //     switch(e.type) {
    //         case 'mouseenter':
    //             var thisPrice = Number($(this).attr('data-price'));
    //             var thisColor = $(this).attr('data-color');
    //             var thisSRC=$(this).attr('data-src');
    //             $('#product-zoom').attr('src',thisSRC);
    //             $('.item-price').html(thisPrice.toFixed(2));
    //             $('.sale-price').html(thisPrice.toFixed(2));
    //             $('.item-color').html(thisColor);
    //             break;
    //         case 'mouseleave':
    //            $('#product-zoom').attr('src',old_img);
    //            $('.item-color').html(old_color);
    //            $('.sale-price').html(Number(old_price).toFixed(2));
    //             break;
    //     }
    // })
    // $('.variant-btn').hover(function(event){
    //     var thisPrice = Number($(this).attr('data-price'));
    //     var thisColor = $(this).attr('data-color');
    //     var thisSRC=$(this).attr('data-src');
    //     $('#product-zoom').attr('src',thisSRC);
    //     $('.item-price').html(thisPrice.toFixed(2));
    //     $('.sale-price').html(thisPrice.toFixed(2));
    //     $('.item-color').html(thisColor);
    //     });
    // Sticky Content - Sidebar - Social Icons etc..
    // Wrap elements with <div class="sticky-content"></div> if you want to make it sticky
    if ( $.fn.stick_in_parent && $(window).width() >= 992 ) {
    	$('.sticky-content').stick_in_parent({
			offset_top: 80,
            inner_scrolling: false
		});
    }
    // Product Image Zoom plugin - product pages
    // if ( $.fn.elevateZoom ) {
    //     $('#product-zoom').elevateZoom({
    //         gallery:'product-zoom-gallery',
    //         galleryActiveClass: 'active',
    //         zoomType: "inner",
    //         cursor: "crosshair",
    //         zoomWindowFadeIn: 400,
    //         zoomWindowFadeOut: 400,
    //         responsive: true
    //     });

    //     // On click change thumbs active item
    //     $('.product-gallery-item').on('click', function (e) {
    //         $('#product-zoom-gallery').find('a').removeClass('active');
    //         $(this).addClass('active');
    //         e.preventDefault();
    //     });
    //     var ez = $('#product-zoom').data('elevateZoom');
    //     // Open popup - product images
    //     $('#btn-product-gallery').on('click', function (e) {
    //         if ( $.fn.magnificPopup ) {
    //             $.magnificPopup.open({
    //                 items: ez.getGalleryList(),
    //                 type: 'image',
    //                 gallery:{
    //                     enabled:true
    //                 },
    //                 fixedContentPos: false,
    //                 removalDelay: 600,
    //                 closeBtnInside: false
    //             }, 0);
    //             e.preventDefault();
    //         }
    //     });
    // }

    // Checkout discount input - toggle label if input is empty etc...
    $('#checkout-discount-input').on('focus', function () {
        // Hide label on focus
        $(this).parent('form').find('label').css('opacity', 0);
    }).on('blur', function () {
        // Check if input is empty / toggle label
        var $this = $(this);
        if( $this.val().length !== 0 ) {
            $this.parent('form').find('label').css('opacity', 0);
        } else {
            $this.parent('form').find('label').css('opacity', 1);
        }
    });

    // Dashboard Page Tab Trigger
    $('.tab-trigger-link').on('click', function (e) {
    	var targetHref = $(this).attr('href');
    	$('.nav-dashboard').find('a[href="'+targetHref+'"]').trigger('click');
    	e.preventDefault();
    });
    // Scroll To button
    var $scrollTo = $('.scroll-to');
    // If button scroll elements exists
    if ( $scrollTo.length ) {
        // Scroll to - Animate scroll
        $scrollTo.on('click', function(e) {
            var target = $(this).attr('href'),
                $target = $(target);
            if ($target.length) {
                // Add offset for sticky menu
                var scrolloffset = ( $(window).width() >= 992 ) ? ($target.offset().top - 52) : $target.offset().top
                $('html, body').animate({
                    'scrollTop': scrolloffset
                }, 600);
                e.preventDefault();
            }
        });
    }
	// Scroll Top Button - Show
    var $scrollTop = $('#scroll-top');
    $(window).on('load scroll', function() {
        if ( $(window).scrollTop() >= 400 ) {
            $scrollTop.addClass('show');
        } else {
            $scrollTop.removeClass('show');
        }
    });
    // On click animate to top
    $scrollTop.on('click', function (e) {
        $('html, body').animate({
            'scrollTop': 0
        }, 800);
        e.preventDefault();
    });


    // if(document.getElementById('newsletter-popup-form')) {
    //     setTimeout(function() {
    //         var mpInstance = $.magnificPopup.instance;
    //         if (mpInstance.isOpen) {
    //             mpInstance.close();
    //         }
    //         setTimeout(function() {
    //             $.magnificPopup.open({
    //                 items: {
    //                     src: '#newsletter-popup-form'
    //                 },
    //                 type: 'inline',
    //                 removalDelay: 350,
    //                 callbacks: {
    //                     open: function() {
    //                         $('body').css('overflow-x', 'visible');
    //                         $('.sticky-header.fixed').css('padding-right', '1.7rem');
    //                     },
    //                     close: function() {
    //                         $('body').css('overflow-x', 'hidden');
    //                         $('.sticky-header.fixed').css('padding-right', '0');
    //                     }
    //                 }
    //             });
    //         }, 500)
    //     }, 900)
    // }
});
