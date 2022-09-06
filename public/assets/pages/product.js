    $(document).on('click','.view-variant',function(e){
        e.preventDefault();
        var variant_id  = ($(this).attr("data-id"));
        var master_id   = ($(this).attr("data-master"));
        var get_url     = $('#base_url').val();
        $.ajax({
            type:'get',
            url:get_url+'/ajax/get-variant-details/'+variant_id,
            async :true,
            beforeSend: function () {
                $("body").css("cursor", "progress");
              //  $("#loader").fadeIn(300);
            },
            success: function (data) {
                var variant_slug = data.variant.URL_SLUG;
                var variant_url = 'product/'+variant_slug;
                window.history.pushState("object or string", "Title", "/product/"+variant_slug);
                console.log(data);
                var product  = 'master-'+master_id;
                $('.'+product).empty();
                $('.'+product).append(data.html_data);
                $('#page-prd-title').text(data.variant.VARIANT_NAME);
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
                        items: 6
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
                //   if (window.matchMedia('(min-width: 768px)').matches) {
                  $('.zoomContainer').remove();
                  $('#product-zoom').removeData('elevateZoom');
                  $('#product-zoom').elevateZoom({
                    gallery:'product-zoom-gallery',
                    galleryActiveClass: 'active',
                    zoomType: "inner",
                    cursor: "crosshair",
                    zoomWindowFadeIn: 400,
                    zoomWindowFadeOut: 400,
                    responsive: true
                });
            // }
                var ez = $('#product-zoom').data('elevateZoom');
                $('#btn-product-gallery').on('click', function (e) {
                    if ( $.fn.magnificPopup ) {
                        $.magnificPopup.open({
                            items: ez.getGalleryList(),
                            type: 'image',
                            gallery:{
                                enabled:true
                            },
                            fixedContentPos: false,
                            removalDelay: 600,
                            closeBtnInside: false
                        }, 0);
                        e.preventDefault();
                    }
                });

                // if (window.matchMedia('(min-width: 500px)').matches) {
                //     jQuery.fn.elevateZoom.options = {
                //         zoomEnabled: true
                //     }
                // }else{
                //     jQuery.fn.elevateZoom.options = {
                //         zoomEnabled: false
                //     }
                // }
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
            },
            complete: function (data) {
              $("body").css("cursor", "default");
            //  $("#loader").fadeOut(300);
            }
        });
    })
