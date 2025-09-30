(function($) {
	
	"use strict"; 
    

const $window = $(window);
const $document = $(document);
//Header
function headerStyle() {
const $siteHeader = $('.main-header');
const $scrollLink = $('.scroll-to-top');
const $stickyHeader = $('.sticky-header, .header-style-two');

if ($siteHeader.length) {
    const windowPos = $window.scrollTop();
    if (windowPos > 250) {
    $siteHeader.addClass('fixed-header');
    $stickyHeader.addClass("animated slideInDown");
    $scrollLink.fadeIn(300);
    } else {
    $siteHeader.removeClass('fixed-header');
    $stickyHeader.removeClass("animated slideInDown");
    $scrollLink.fadeOut(300);
    }

    $('.navigation li.dropdown > a').off('click.preventDropdown').on('click.preventDropdown', function (e) {
    e.preventDefault();
    });
}
}
//Banner Slider
function bannerSlider() {
    if ($(".banner-slider").length > 0) {
        new Swiper('.banner-slider', {
        preloadImages: false,
        loop: true,
        grabCursor: true,
        centeredSlides: false,
        resistance: true,
        resistanceRatio: 0.6,
        speed: 1400,
        spaceBetween: 0,
        parallax: false,
        effect: "slide",
        autoplay: {
            delay: 400000,
            disableOnInteraction: false
        },
        navigation: {
            nextEl: '.banner-slider-button-next',
            prevEl: '.banner-slider-button-prev',
        },
        });
    }
}

    
    
//Sortable Masonary with Filters
function sortableMasonry() {
    if ($('.sortable-masonry').length) {
        const $container = $('.sortable-masonry .items-container');
        const $filter = $('.filter-btns');

        // Initialize Isotope
        $container.isotope({
            filter: '*',
            packery: { gutter: 0 },
            animationOptions: {
                duration: 500,
                easing: 'linear'
            }
        });

        // Filter functionality
        $filter.find('li').on('click', function () {
            const selector = $(this).data('filter');
            $container.isotope({
                filter: selector,
                animationOptions: {
                    duration: 500,
                    easing: 'linear',
                    queue: false
                }
            });
            return false;
        });

        // Resize handling
        $(window).on('resize', function () {
            const selector = $filter.find('li.active').data('filter');
            $container.isotope({
                filter: selector,
                animationOptions: { duration: 500, easing: 'linear', queue: false }
            });
        });

        // Active filter button
        $filter.find('li').on('click', function () {
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
        });
    }

    // For another container with different isotope settings
    if ($('.sortable-masonry-two').length) {
        const $containerTwo = $('.sortable-masonry-two .items-container').isotope({
            itemSelector: '.element-item'
        });

        const filterFns = {
            numberGreaterThan50: function () {
                return parseInt($(this).find('.number').text(), 10) > 50;
            },
            ium: function () {
                return $(this).find('.name').text().match(/ium$/);
            }
        };

        $('.filters-select').on('change', function () {
            const filterValue = filterFns[this.value] || this.value;
            $containerTwo.isotope({ filter: filterValue });
        });
    }
}

sortableMasonry();

    

function CounterNumberbox() {
    const timers = $('.timer');
    
    if (timers.length) {
        timers.each(function () {
            const $this = $(this);
            $this.appear(function () {
                if (!$this.hasClass('counted')) {
                    $this.countTo();
                    $this.addClass('counted'); // Prevent re-trigger
                }
            }, { accX: 0, accY: 0 });
        });
    }
}

 // Submenu Dropdown Toggle
 if ($('.navigation li.dropdown ul').length) {
    $('.navigation li.dropdown').each(function () {
        if (!$(this).find('.dropdown-btn').length) {
            $(this).append('<div class="dropdown-btn"><span class="fa fa-angle-down"></span></div>');
        }
    });
}

// Menu Show / Hide
if ($('.anim-menu-btn').length) {
    const animButton = $('.anim-menu-btn');
    const navInner = $('.nav-inner');

    const showMenu = () => {
        TweenMax.to(navInner, 0.6, {
            force3D: false,
            opacity: 1,
            ease: Expo.easeInOut
        });
        navInner.removeClass('close-menu');
    };

    const hideMenu = () => {
        TweenMax.to(navInner, 0.6, {
            force3D: false,
            opacity: 0,
            ease: Expo.easeInOut
        });
        navInner.addClass('close-menu');
    };

    animButton.on('click', () => {
        navInner.hasClass('close-menu') ? showMenu() : hideMenu();
    });
}

// Features Two Section Animation
if ($('.features-two-sec-single').length) {
    $('.features-two-sec-single').on('mouseenter', function () {
        $('.features-two-sec-single').removeClass('active');
        $(this).addClass('active');
    });
}

//Mobile Nav Hide Show
if($('.mobile-menu').length){

    var mobileMenuContent = $('.main-menu .navigation').html();
    $('.mobile-menu .navigation').append(mobileMenuContent);
    $('.sticky-header .navigation').append(mobileMenuContent);
    //Dropdown Button
    $('.mobile-menu li.dropdown .dropdown-btn').on('click', function() {
        $(this).prev('ul').slideToggle(500);
    });

    var animButton = $(".mobile-nav-toggler"),
        mobileMneu = $(".mobile-menu"),
        navOverlay = $(".nav-overlay");

    function showMenu() {
        TweenMax.to(mobileMneu, 0.6, {
            force3D: false,
            left: "0",
            ease: Expo.easeInOut
        });
        mobileMneu.removeClass("close-menu");
        navOverlay.fadeIn(500);
    }

    function hideMenu() {
        TweenMax.to(mobileMneu, 0.6, {
            force3D: false,
            left: "-350px",
            ease: Expo.easeInOut
        });
        mobileMneu.addClass("close-menu");
        navOverlay.fadeOut(500);
    }
    animButton.on("click", function() {
        if (mobileMneu.hasClass("close-menu")) showMenu();
        else hideMenu();
    });
    navOverlay.on("click", function() {
        hideMenu();
        $(".anim-menu-btn").toggleClass("anim-menu-btn--state-b");
    });
}

if ($('.nav-overlay').length) {
    // / cursor /
    var cursor = $(".nav-overlay .cursor"),
    follower = $(".nav-overlay .cursor-follower");

    var posX = 0,
    posY = 0;

    var mouseX = 0,
    mouseY = 0;

    TweenMax.to({}, 0.016, {
        repeat: -1,
        onRepeat: function() {
            posX += (mouseX - posX) / 9;
            posY += (mouseY - posY) / 9;

            TweenMax.set(follower, {
                css: { 
                    left: posX - 22,
                    top: posY - 22
                }
            });

            TweenMax.set(cursor, {
                css: { 
                    left: mouseX,
                    top: mouseY
                }
            });

        }
    });

    $(document).on("mousemove", function(e) {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        mouseX = e.pageX;
        mouseY = e.pageY - scrollTop;
    });
    $("button, a").on("mouseenter", function() {
        cursor.addClass("active");
        follower.addClass("active");
    });
    $("button, a").on("mouseleave", function() {
        cursor.removeClass("active");
        follower.removeClass("active");
    });
    $(".nav-overlay").on("mouseenter", function() {
        cursor.addClass("close-cursor");
        follower.addClass("close-cursor");
    });
    $(".nav-overlay").on("mouseleave", function() {
        cursor.removeClass("close-cursor");
        follower.removeClass("close-cursor");
    });
}


// Tabs Box Functionality
if ($('.tabs-box').length) {
    $('.tabs-box .tab-buttons .tab-btn').on('click', function (e) {
        e.preventDefault();

        const $this = $(this);
        const targetSelector = $this.data('tab');
        const $target = $(targetSelector);

        if ($target.length && !$target.is(':visible')) {
            const $tabsBox = $this.closest('.tabs-box');

            // Remove previous active states
            $tabsBox.find('.tab-buttons .tab-btn').removeClass('active-btn');
            $tabsBox.find('.tabs-content .tab').removeClass('active-tab').hide();

            // Activate new tab
            $this.addClass('active-btn');
            $target.fadeIn(300).addClass('active-tab');
        }
    });
}


// Lightbox / Fancybox
if ($('.lightbox-image').length) {
    $('.lightbox-image').fancybox({
        openEffect: 'fade',
        closeEffect: 'fade',
        helpers: {
            media: {}
        }
    });
}

// Scroll to a Specific Div
if ($('.scroll-to-target').length) {
    $('.scroll-to-target').on('click', function (e) {
        e.preventDefault();
        const targetSelector = $(this).data('target');
        const $target = $(targetSelector);

        if ($target.length) {
            $('html, body').animate({
                scrollTop: $target.offset().top
            }, 1500);
        }
    });
}

// Video Popup
if ($('.video-popup').length) {
    $('.video-popup').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: true,
        fixedContentPos: false
    });
}

   
    
// Fact Counter + Text Count
if ($('.count-box').length) {
    $('.count-box').appear(function () {
        const $el = $(this);
        const $countText = $el.find('.count-text');
        const target = parseInt($countText.data('stop'), 10);
        const speed = parseInt($countText.data('speed'), 10);

        if (!$el.hasClass('counted')) {
            $el.addClass('counted');

            $({ countNum: parseInt($countText.text(), 10) }).animate(
                { countNum: target },
                {
                    duration: speed,
                    easing: 'linear',
                    step: function () {
                        $countText.text(Math.floor(this.countNum));
                    },
                    complete: function () {
                        $countText.text(this.countNum);
                    }
                }
            );
        }
    }, { accY: 0 });
}

// Testimonials Carousel
if ($(".testimonials-one-carousel").length) {
    $(".testimonials-one-carousel").owlCarousel({
        loop: true,
        margin: 30,
        nav: false,
        smartSpeed: 500,
        autoHeight: false,
        autoplay: true,
        dots: true,
        autoplayTimeout: 10000,
        navText: [
            '<span class="fa fa-angle-left"></span>',
            '<span class="fa fa-angle-right"></span>',
        ],
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 1,
            },
            800: {
                items: 2,
            },
            1024: {
                items: 3,
            },
            1200: {
                items: 3,
            },
        },
    });
}
// Brand Carousel
$(".brand-one-carousel").owlCarousel({
    loop: true,
    nav: false,
    dots: false,
    autoplay: true,
    smartSpeed: 800,
    responsive: {
        0: {
            items: 2,
        },
        576: {
            items: 3,
        },
        768: {
            items: 4,
        },
        992: {
            items: 5,
        },
    },
});
       

// Progress Bar Animation (Appear on Scroll)
if ($(".progress-levels .progress-box .bar-fill").length) {
    $(".progress-levels .progress-box .bar-fill").each(function () {
        const $this = $(this);
        $this.appear(
            function () {
                const progressWidth = $this.data("percent");
                $this.css("width", progressWidth + "%");
            },
            { accY: 0 }
        );
    });
}

     
// Image Popup
function handleImgPopupGroups() {
    const groups = {};
    $(".img-popup").each(function () {
      const id = parseInt($(this).attr("data-group"), 10);

      if (isNaN(id)) {
        console.warn("Invalid or missing data-group attribute");
        return;
      }

      if (!groups[id]) groups[id] = [];
      groups[id].push(this);
    });

    $.each(groups, function (_, group) {
      try {
        $(group).magnificPopup({
          type: "image",
          closeOnContentClick: true,
          closeBtnInside: false,
          gallery: { enabled: true },
        });
      } catch (e) {
        console.error("MagnificPopup init error:", e);
      }
    });
  }

// Fallback for broken images
$('img').on('error', function () {
$(this).attr('src', 'assets/images/default.jpg');
}); 
    
    
// Accordion Box
if ($(".accordion-box").length) {
    $(".accordion-box").on("click", ".acc-btn", function () {
        const $button = $(this);
        const $accordion = $button.closest(".accordion");
        const $accordionBox = $button.closest(".accordion-box");

        if (!$button.hasClass("active")) {
            $accordionBox.find(".acc-btn").removeClass("active");
            $accordionBox.find(".accordion").removeClass("active-block");
            $accordionBox.find(".acc-content").slideUp(300);

            $button.addClass("active");
            $accordion.addClass("active-block");
            $button.next(".acc-content").slideDown(300);
        }
    });
}

// Preloader
if ($(".preloader").length) {
    $(".preloader").fadeOut();
}    
		
// Elements Animation
if($('.wow').length){
    var wow = new WOW(
      {
        boxClass:     'wow',      // animated element css class (default is wow)
        animateClass: 'animated', // animation css class (default is animated)
        offset:       0,          // distance to the element when triggering the animation (default is 0)
        mobile:       false,       // trigger animations on mobile devices (default is true)
        live:         true       // act on asynchronously loaded content (default is true)
      }
    );
    wow.init();
}



/* ==========================================================================
   When document is loading, do
   ========================================================================== */
	
	$(window).on('load', function() {
        headerStyle();
		bannerSlider();
		CounterNumberbox();
        sortableMasonry();
        handleImgPopupGroups();
	});



		

})(window.jQuery);

