/*global $, jQuery, document, window*/
/* ==========================================================================
 Document Ready Function
 ========================================================================== */
jQuery(document).ready(function () {

    'use strict';

    var onMobile, slider, slider2, readyHeight, windowWidth, formInput, sformInput;


    /* ==========================================================================
     ToolTip
     ========================================================================== */
    $("a[data-rel=tooltip]").tooltip({container: 'body'});


    /* ==========================================================================
     on mobile?
     ========================================================================== */
    onMobile = false;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        onMobile = true;
    }

    if (onMobile === true) {
        $('#dot-menu').css({display: 'none'});
        $("a[data-rel=tooltip]").tooltip('destroy');
        $('.parallax-variation').css({background: 'url(images/background/1-1600x900.jpg) center top'});
        $('#video-variation').css({background: 'url(images/background/1-1920x1200.jpg) center center'});
        $('#home-blog-section').css({background: 'url(images/background/1-1600x900.jpg) center center'});
    } else {
        /* ==========================================================================
         Tubular
         ========================================================================== */
        $(function () {
            if ($('#video-variation').length > 0) {
                $('#video-variation').tubular({
                    videoId: '3RCTV4mWyXc',
                    repeat: true,
                    start: 0
                });
            }
        });

        /* ==========================================================================
         Parallax
         ========================================================================== */

        if ($('.parallax-variation').length > 0) {
            jQuery('.parallax-variation').parallax("50%", 0.3);
        }
        if ($('#home-blog-section').length > 0) {
            jQuery('#home-blog-section').parallax("50%", 0.3);
        }
    }


    /* ==========================================================================
     ScrollTo
     ========================================================================== */
    $('a.scrollto').click(function (event) {
        $('html, body').scrollTo(this.hash, this.hash, {gap: {y: 2}, animation: {easing: 'easeInOutCubic', duration: 800}});
        event.preventDefault();
    });


    /* ==========================================================================
     Feature Tabs
     ========================================================================== */
    if ($("#WorksTabs").length > 0) {
        slider = $("div#WorksTabs").sliderTabs({
            autoplay: 10000,
            panelArrows: true,
            position: 'top',
            tabArrows: false,
            defaultTab: 2
        });
    }


    /* ==========================================================================
     Member Tabs
     ========================================================================== */
    if ($("#TeamTabs").length > 0) {
        slider2 = $("div#TeamTabs").sliderTabs({
            autoplay: 10000,
            panelArrows: false,
            tabArrows: false,
            position: 'top',
            indicators: true
        });
    }


    /* ==========================================================================
     Fancy Box
     ========================================================================== */
    $(".fancybox").fancybox({
        helpers: {
            overlay: {
                speedOut: 0,
                locked: false
            }
        }
    });


    /* ==========================================================================
     Magnify
     ========================================================================== */
    $("#magnify-image").mlens({
        imgSrc: $("#magnify-image").attr("data-big"),
        lensShape: "circle",
        lensSize: 180,
        borderSize: 4,
        borderColor: "#000000",
        borderRadius: 0
    });


    /* ==========================================================================
     Feature Image Height
     ========================================================================== */
    windowWidth = $(window).width();
    if (windowWidth >= 991) {
        $('#ready-section .feature-image').css({minHeight: '480px'});
        readyHeight = $('.col-md-6.readyHeights').height() + 40;
        $('#ready-section .feature-image').css({height: readyHeight});
    } else {
        $('#ready-section .feature-image').css({height: '480px'});
    }


    /* ==========================================================================
     FAQ Tabs
     ========================================================================== */
    $(function () {
        $('.faq-tabs > ul li:first-child a').addClass('active');
        $('#faq1Containt').siblings().hide();
        $('.faq-tabs > ul li a').click(function (event) {
            var faq = this.hash;
            $('.faq-tabs > ul li a').removeClass('active');
            $(this).addClass('active');
            $(faq + 'Containt').siblings().slideUp(0);
            $(faq + 'Containt').slideDown(0);
            event.preventDefault();
        });
    });

    /* ==========================================================================
     FORM Validation
     ========================================================================== */
    $('form#form').submit(function () {
        $('form#form .error').remove();
        $('form#form .success').remove();
        var hasError = false;
        $('.requiredField').each(function () {
            if (jQuery.trim($(this).val()) === '') {
                hasError = true;
            } else if ($(this).hasClass('email')) {
                var emailReg = /^([\w-\.]+@([\w]+\.)+[\w]{2,4})?$/;
                if (!emailReg.test(jQuery.trim($(this).val()))) {
                    hasError = true;
                }
            }
        });
        if (hasError === true) {
            $('form#form').append('<div class="success"><div class="alert alert-nesto"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><p>Oops. You missed some required fields.</p></div></div>');
        }
        if (!hasError) {
            formInput = $(this).serialize();
            $.post($(this).attr('action'), formInput, function (data) {
                $('form#form').append('<div class="success"><div class="alert alert-nesto"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><p>Thanks! Your email was successfully sent. We will contact you asap.</p></div></div>');
            });
            $('.requiredField').val('');
        }
        return false;
    });
    $('form#form input').focus(function () {
        $('form#form .error').remove();
        $('form#form .success').remove();
    });
    $('form#form textarea').focus(function () {
        $('form#form .error').remove();
        $('form#form .success').remove();
    });


    /* ==========================================================================
     Subscribe
     ========================================================================== */
    $('form#sform').submit(function () {
        $('form#sform .serror').remove();
        $('form#sform .success').remove();
        var shasError = false;
        $('.srequiredField').each(function () {
            if (jQuery.trim($(this).val()) === '') {
                shasError = true;
            } else if ($(this).hasClass('email')) {
                var emailReg = /^([\w-\.]+@([\w]+\.)+[\w]{2,4})?$/;
                if (!emailReg.test(jQuery.trim($(this).val()))) {
                    shasError = true;
                }
            }
        });
        if (shasError === true) {
            $('form#sform').append('<div class="success"><div class="alert alert-nesto"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><p>Please enter a valid email address.</p></div></div>');
        }
        if (!shasError) {
            sformInput = $(this).serialize();
            $.post($(this).attr('action'), sformInput, function (data) {
                $('form#sform').append('<div class="success"><div class="alert alert-nesto"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><p>You have successfully subscribed to our newsletter.</p></div></div>');
            });
            $('.srequiredField').val('');
        }
        return false;
    });
    $('form#sform input').focus(function () {
        $('form#sform .serror').remove();
        $('form#sform .success').remove();
    });

    $('#works-section .ui-slider-tab-content').css({width: $('#works-section .col-md-12').width()});
    $('.ui-slider-tabs-content-container').css({height: $('.ui-slider-tab-content.selected').height()});


    /* ==========================================================================
     FitVids
     ========================================================================== */
    $('.videos').fitVids();


    /* ==========================================================================
     Flickr Feed
     ========================================================================== */
    $('#flickr-feed').jflickrfeed({
        limit: 6,
        qstrings: {
            id: '25461271@N07'
        },
        itemTemplate: '<li>' + '<a href="{{image_b}}" class="fancybox" data-fancybox-group="gall1" title="{{title}}"><img src="{{image_s}}" alt="{{title}}" /></a>' + '</li>'
    });

    /* ==========================================================================
     Supersized Slider
     ========================================================================== */
    jQuery(function ($) {
        if ($('.image-slider').length > 0) {
            $('#supersized').css({height: $('.image-slider').height()});
            $('.image-slider').supersized({
                slide_interval: 5000, // Length between transitions
                transition: 1, // 0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left
                transition_speed: 900, // Speed of transition
                slide_links: '0', // Individual links for each slide (Options: false, 'num', 'name', 'blank')
                slides: [
                    {image: 'images/slider/background.jpeg', title: '', thumb: '', url: ''}
                ]
            });
        }
    });


}); // JavaScript Document

jQuery(document).ready(function () {

    /* ==========================================================================
     Portfolio
     ========================================================================== */
    if ($('.owl-portfolio').length > 0) {
        $('.owl-portfolio').owlCarousel({
            rtl: true,
            items: 4,
            loop: true,
            nav: false,
            autoplay: true,
            lazyLoad: true,
            autoplayHoverPause: true,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1
                },
                992: {
                    items: 4
                },
                768: {
                    items: 2
                }
            }
        });
    }

    /* ==========================================================================
     Clients
     ========================================================================== */
    if ($('.owl-clients').length > 0) {
        $(".owl-clients").owlCarousel({
            rtl: true,
            items: 1,
            lazyLoad: true,
            autoplay: true,
            loop: true,
            dots: false,
            autoplayHoverPause: true,
            nav: false,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1
                }
            }
        });

        $("a.clients-next").click(function () {
            $(".owl-clients").trigger('next.owl.carousel');
        });
        $("a.clients-prev").click(function () {
            $(".owl-clients").trigger('prev.owl.carousel');
        });
    }


    /* ==========================================================================
     MoreApps Slider
     ========================================================================== */
    if ($('#owl-apps').length > 0) {
        $('#owl-apps').owlCarousel({
            rtl: true,
            items: 6,
            loop: true,            
            lazyLoad: true,
            dots: true,
            autoplay: true,
            responsive: {
                0: {
                    items: 1
                },
                992: {
                    items: 6
                },
                768: {
                    items: 4
                },
                480: {
                    items: 3
                },
                380: {
                    items: 2
                }
            }
        });
    }
}); // JavaScript Document

/* ==========================================================================
 Window Resize
 ========================================================================== */
$(window).resize(function () {

    'use strict';

    var magnifyWidth, windowWidth, readyHeight;

    /* ==========================================================================
     Magnify Width
     ========================================================================== */
    magnifyWidth = $('#magnify-container').width();
    $('#mlens_wrapper_0').css({width: magnifyWidth});


    /* ==========================================================================
     Feature Image Height
     ========================================================================== */
    windowWidth = $(window).width();
    if (windowWidth >= 991) {
        $('#ready-section .feature-image').css({minHeight: '480px'});
        readyHeight = $('.col-md-6.readyHeights').height() + 40;
        $('#ready-section .feature-image').css({height: readyHeight});
    } else {
        $('#ready-section .feature-image').css({height: '480px'});
    }

    $('#supersized').css({height: $('.image-slider').height()});
});




/* ==========================================================================
 Window Load
 ========================================================================== */
jQuery(window).load(function () {

    'use strict';

    var LoaderDelay, LoaderFadeOutTime;

    /* ==============================================
     Loader
     =============================================== */
    LoaderDelay = 350;
    LoaderFadeOutTime = 800;

    function hideLoader() {
        var loadingLoader = $('#Loader');
        loadingLoader.fadeOut();
    }
    hideLoader();


    $('#works-section .ui-slider-tab-content').css({width: $('#works-section .col-md-12').width()});
    $('.ui-slider-tabs-content-container').css({height: $('.ui-slider-tab-content.selected').height()});


});




/* ==========================================================================
 Window Scroll
 ========================================================================== */
jQuery(window).scroll(function () {

    'use strict';

    var HomeSection, FeatureSection, WorksSection, PortfolioSection, CloserSection, TeamSection, MoreappsSection, FaqSection, ClientsSection, PriceSection, RecentSection, ReachSection, SubscribeSection, AddActive;


    /* ==========================================================================
     Dot Menu
     ========================================================================== */
    AddActive = $(document).scrollTop();
    HomeSection = $('#home-section').offset().top;
    FeatureSection = $('#feature-section').offset().top;
    WorksSection = $('#works-section').offset().top;
    PortfolioSection = $('#portfolio-section').offset().top;
    CloserSection = $('#closer-section').offset().top;
    TeamSection = $('#team-section').offset().top;
    MoreappsSection = $('#moreapps-section').offset().top;
    FaqSection = $('#faq-section').offset().top;
    ClientsSection = $('#clients-section').offset().top;
    PriceSection = $('#price-section').offset().top;
    RecentSection = $('#recent-section').offset().top;
    ReachSection = $('#reach-section').offset().top;
    SubscribeSection = $('#subscribe-section').offset().top;

    if (AddActive >= HomeSection && AddActive < FeatureSection) {
        $('#dot-menu ul li a').removeClass('active');
    } else if (AddActive >= FeatureSection && AddActive < WorksSection) {
        $('#dot-menu ul li a#feature-sections').addClass('active');
        $('#dot-menu ul li a#works-sections').removeClass('active');
        $('#dot-menu ul li a#portfolio-sections').removeClass('active');
        $('#dot-menu ul li a#closer-sections').removeClass('active');
        $('#dot-menu ul li a#team-sections').removeClass('active');
        $('#dot-menu ul li a#moreapps-sections').removeClass('active');
        $('#dot-menu ul li a#faq-sections').removeClass('active');
        $('#dot-menu ul li a#clients-sections').removeClass('active');
        $('#dot-menu ul li a#price-sections').removeClass('active');
        $('#dot-menu ul li a#recent-sections').removeClass('active');
        $('#dot-menu ul li a#reach-sections').removeClass('active');
        $('#dot-menu ul li a#subscribe-sections').removeClass('active');
    } else if (AddActive >= WorksSection && AddActive < PortfolioSection) {
        $('#dot-menu ul li a#feature-sections').removeClass('active');
        $('#dot-menu ul li a#works-sections').addClass('active');
        $('#dot-menu ul li a#portfolio-sections').removeClass('active');
        $('#dot-menu ul li a#closer-sections').removeClass('active');
        $('#dot-menu ul li a#team-sections').removeClass('active');
        $('#dot-menu ul li a#moreapps-sections').removeClass('active');
        $('#dot-menu ul li a#faq-sections').removeClass('active');
        $('#dot-menu ul li a#clients-sections').removeClass('active');
        $('#dot-menu ul li a#price-sections').removeClass('active');
        $('#dot-menu ul li a#recent-sections').removeClass('active');
        $('#dot-menu ul li a#reach-sections').removeClass('active');
        $('#dot-menu ul li a#subscribe-sections').removeClass('active');
    } else if (AddActive >= PortfolioSection && AddActive < CloserSection) {
        $('#dot-menu ul li a#feature-sections').removeClass('active');
        $('#dot-menu ul li a#works-sections').removeClass('active');
        $('#dot-menu ul li a#portfolio-sections').addClass('active');
        $('#dot-menu ul li a#closer-sections').removeClass('active');
        $('#dot-menu ul li a#team-sections').removeClass('active');
        $('#dot-menu ul li a#moreapps-sections').removeClass('active');
        $('#dot-menu ul li a#faq-sections').removeClass('active');
        $('#dot-menu ul li a#clients-sections').removeClass('active');
        $('#dot-menu ul li a#price-sections').removeClass('active');
        $('#dot-menu ul li a#recent-sections').removeClass('active');
        $('#dot-menu ul li a#reach-sections').removeClass('active');
        $('#dot-menu ul li a#subscribe-sections').removeClass('active');
    } else if (AddActive >= CloserSection && AddActive < TeamSection) {
        $('#dot-menu ul li a#feature-sections').removeClass('active');
        $('#dot-menu ul li a#works-sections').removeClass('active');
        $('#dot-menu ul li a#portfolio-sections').removeClass('active');
        $('#dot-menu ul li a#closer-sections').addClass('active');
        $('#dot-menu ul li a#team-sections').removeClass('active');
        $('#dot-menu ul li a#moreapps-sections').removeClass('active');
        $('#dot-menu ul li a#faq-sections').removeClass('active');
        $('#dot-menu ul li a#clients-sections').removeClass('active');
        $('#dot-menu ul li a#price-sections').removeClass('active');
        $('#dot-menu ul li a#recent-sections').removeClass('active');
        $('#dot-menu ul li a#reach-sections').removeClass('active');
        $('#dot-menu ul li a#subscribe-sections').removeClass('active');
    } else if (AddActive >= TeamSection && AddActive < MoreappsSection) {
        $('#dot-menu ul li a#feature-sections').removeClass('active');
        $('#dot-menu ul li a#works-sections').removeClass('active');
        $('#dot-menu ul li a#portfolio-sections').removeClass('active');
        $('#dot-menu ul li a#closer-sections').removeClass('active');
        $('#dot-menu ul li a#team-sections').addClass('active');
        $('#dot-menu ul li a#moreapps-sections').removeClass('active');
        $('#dot-menu ul li a#faq-sections').removeClass('active');
        $('#dot-menu ul li a#clients-sections').removeClass('active');
        $('#dot-menu ul li a#price-sections').removeClass('active');
        $('#dot-menu ul li a#recent-sections').removeClass('active');
        $('#dot-menu ul li a#reach-sections').removeClass('active');
        $('#dot-menu ul li a#subscribe-sections').removeClass('active');
    } else if (AddActive >= MoreappsSection && AddActive < FaqSection) {
        $('#dot-menu ul li a#feature-sections').removeClass('active');
        $('#dot-menu ul li a#works-sections').removeClass('active');
        $('#dot-menu ul li a#portfolio-sections').removeClass('active');
        $('#dot-menu ul li a#closer-sections').removeClass('active');
        $('#dot-menu ul li a#team-sections').removeClass('active');
        $('#dot-menu ul li a#moreapps-sections').addClass('active');
        $('#dot-menu ul li a#faq-sections').removeClass('active');
        $('#dot-menu ul li a#clients-sections').removeClass('active');
        $('#dot-menu ul li a#price-sections').removeClass('active');
        $('#dot-menu ul li a#recent-sections').removeClass('active');
        $('#dot-menu ul li a#reach-sections').removeClass('active');
        $('#dot-menu ul li a#subscribe-sections').removeClass('active');
    } else if (AddActive >= FaqSection && AddActive < ClientsSection) {
        $('#dot-menu ul li a#feature-sections').removeClass('active');
        $('#dot-menu ul li a#works-sections').removeClass('active');
        $('#dot-menu ul li a#portfolio-sections').removeClass('active');
        $('#dot-menu ul li a#closer-sections').removeClass('active');
        $('#dot-menu ul li a#team-sections').removeClass('active');
        $('#dot-menu ul li a#moreapps-sections').removeClass('active');
        $('#dot-menu ul li a#faq-sections').addClass('active');
        $('#dot-menu ul li a#clients-sections').removeClass('active');
        $('#dot-menu ul li a#price-sections').removeClass('active');
        $('#dot-menu ul li a#recent-sections').removeClass('active');
        $('#dot-menu ul li a#reach-sections').removeClass('active');
        $('#dot-menu ul li a#subscribe-sections').removeClass('active');
    } else if (AddActive >= ClientsSection && AddActive < PriceSection) {
        $('#dot-menu ul li a#feature-sections').removeClass('active');
        $('#dot-menu ul li a#works-sections').removeClass('active');
        $('#dot-menu ul li a#portfolio-sections').removeClass('active');
        $('#dot-menu ul li a#closer-sections').removeClass('active');
        $('#dot-menu ul li a#team-sections').removeClass('active');
        $('#dot-menu ul li a#moreapps-sections').removeClass('active');
        $('#dot-menu ul li a#faq-sections').removeClass('active');
        $('#dot-menu ul li a#clients-sections').addClass('active');
        $('#dot-menu ul li a#price-sections').removeClass('active');
        $('#dot-menu ul li a#recent-sections').removeClass('active');
        $('#dot-menu ul li a#reach-sections').removeClass('active');
        $('#dot-menu ul li a#subscribe-sections').removeClass('active');
    } else if (AddActive >= PriceSection && AddActive < RecentSection) {
        $('#dot-menu ul li a#feature-sections').removeClass('active');
        $('#dot-menu ul li a#works-sections').removeClass('active');
        $('#dot-menu ul li a#portfolio-sections').removeClass('active');
        $('#dot-menu ul li a#closer-sections').removeClass('active');
        $('#dot-menu ul li a#team-sections').removeClass('active');
        $('#dot-menu ul li a#moreapps-sections').removeClass('active');
        $('#dot-menu ul li a#faq-sections').removeClass('active');
        $('#dot-menu ul li a#clients-sections').removeClass('active');
        $('#dot-menu ul li a#price-sections').addClass('active');
        $('#dot-menu ul li a#recent-sections').removeClass('active');
        $('#dot-menu ul li a#reach-sections').removeClass('active');
        $('#dot-menu ul li a#subscribe-sections').removeClass('active');
    } else if (AddActive >= RecentSection && AddActive < ReachSection) {
        $('#dot-menu ul li a#feature-sections').removeClass('active');
        $('#dot-menu ul li a#works-sections').removeClass('active');
        $('#dot-menu ul li a#portfolio-sections').removeClass('active');
        $('#dot-menu ul li a#closer-sections').removeClass('active');
        $('#dot-menu ul li a#team-sections').removeClass('active');
        $('#dot-menu ul li a#moreapps-sections').removeClass('active');
        $('#dot-menu ul li a#faq-sections').removeClass('active');
        $('#dot-menu ul li a#clients-sections').removeClass('active');
        $('#dot-menu ul li a#price-sections').removeClass('active');
        $('#dot-menu ul li a#recent-sections').addClass('active');
        $('#dot-menu ul li a#reach-sections').removeClass('active');
        $('#dot-menu ul li a#subscribe-sections').removeClass('active');
    } else if (AddActive >= ReachSection && AddActive < SubscribeSection) {
        $('#dot-menu ul li a#feature-sections').removeClass('active');
        $('#dot-menu ul li a#works-sections').removeClass('active');
        $('#dot-menu ul li a#portfolio-sections').removeClass('active');
        $('#dot-menu ul li a#closer-sections').removeClass('active');
        $('#dot-menu ul li a#team-sections').removeClass('active');
        $('#dot-menu ul li a#moreapps-sections').removeClass('active');
        $('#dot-menu ul li a#faq-sections').removeClass('active');
        $('#dot-menu ul li a#clients-sections').removeClass('active');
        $('#dot-menu ul li a#price-sections').removeClass('active');
        $('#dot-menu ul li a#recent-sections').removeClass('active');
        $('#dot-menu ul li a#reach-sections').addClass('active');
        $('#dot-menu ul li a#subscribe-sections').removeClass('active');
    } else if (AddActive >= SubscribeSection) {
        $('#dot-menu ul li a#feature-sections').removeClass('active');
        $('#dot-menu ul li a#works-sections').removeClass('active');
        $('#dot-menu ul li a#portfolio-sections').removeClass('active');
        $('#dot-menu ul li a#closer-sections').removeClass('active');
        $('#dot-menu ul li a#team-sections').removeClass('active');
        $('#dot-menu ul li a#moreapps-sections').removeClass('active');
        $('#dot-menu ul li a#faq-sections').removeClass('active');
        $('#dot-menu ul li a#clients-sections').removeClass('active');
        $('#dot-menu ul li a#price-sections').removeClass('active');
        $('#dot-menu ul li a#recent-sections').removeClass('active');
        $('#dot-menu ul li a#reach-sections').removeClass('active');
        $('#dot-menu ul li a#subscribe-sections').addClass('active');
    }

});