( function( $, window, document ) {

    var timer;
    var $window = $( window );
    var $doc = $( document );

    //---------------------------------------------------------
    //  Lightbox
    //---------------------------------------------------------
    var addLightbox = function() {
        var $galleryPage = $( ".gallery-page" );

        if ( $galleryPage.length > 0 ) {
            if ( $window.innerWidth() > 800 ) {
                var $gallery1 = $( "#gallery-1" ).find( "a" ),
                    $gallery2 = $( "#gallery-2" ).find( "a" ),
                    $gallery3 = $( "#gallery-3" ).find( "a" );

                $gallery1.simpleLightbox( {
                    nav: true
                } );
                $gallery2.simpleLightbox( {
                    nav: true
                } );
                $gallery3.simpleLightbox( {
                    nav: true
                } );
            } else {
                var $gallery = $( ".slide-show" ).find( "a" );
                $gallery.simpleLightbox( {
                    nav: true
                } );
            }
        }
    }

    //---------------------------------------------------------
    //  Navbar Icons
    //---------------------------------------------------------
    var moveIcons = function() {
        var $icons = $( ".navbar-icons-content" )
        if ( $window.innerWidth() < 800 ) {
            $icons.appendTo( ".nav-list" )
        } else {
            $icons.appendTo( ".navbar-icons" )
        }
    }

    //---------------------------------------------------------
    //  Gallery Images Caption
    //---------------------------------------------------------
    var showImageCaption = function() {
        var $galleryImage = $( ".gallery-image" );

        $galleryImage.each( function() {
            var $this = $( this ),
                $img = $this.find( "img" ),
                elementAttribute = "alt",
                altText = $img.attr( elementAttribute );

            $this.append( "<p class='caption'>" + altText + "</p>" )
        } )
    }

    //---------------------------------------------------------
    //  Navbar
    //---------------------------------------------------------
    var toggleNav = function() {
        var $navbarButton = $( "#nav-button" )

        function showNavbar() {
            $navbarButton
                .removeClass( "is-closed" )
                .addClass( "open" )
                .attr( "aria-expanded", "true" )
                .parents( "#header" )
                .addClass( "open-navbar" )
                .addClass( "is-visible" )
                .find( "#nav-list" )
                .show( "fast" )
                .parents( "#header" )

        }

        function hideNavbar() {
            $navbarButton
                .addClass( "is-closed" )
                .removeClass( "open" )
                .attr( "aria-expanded", "false" )
                .parents( "#header" )
                .removeClass( "open-navbar" )
                .removeClass( "is-visible" )
                .find( "#nav-list" )
                .hide( "fast" )
                .parents( "#header" )
        }

        function toggleNavbar( e ) {
            e.stopPropagation();
            if ( $( this ).hasClass( "is-closed" ) ) {
                showNavbar()
            } else {
                hideNavbar()
            }
        }

        function hideNavbarClickOutside( e ) {
            if ( !$( e.target ).hasClass( "is-visible" ) ) {
                hideNavbar()
            }
        }
        $navbarButton.on( "click.onNavbarButton", toggleNavbar );
        $( document ).on( "click.onDocument", hideNavbarClickOutside )
    }

    //---------------------------------------------------------
    // Sliders
    //---------------------------------------------------------
    var createSlick = function() {
        var $sliders = $( ".home-page .slide-show, .gallery-page .slide-show" ),
            $aboutSlider = $( ".about-page .slide-show" ),
            $button = '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button"><span class="c-icon c-icon_arrow"></span></button>',
            $aboutButton = '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button"><span class="c-icon c-icon_arrow-dark"></span></button>',
            $sliderButton = '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button"><span class="c-icon c-icon_arrow"></span></button>',
            $slider = $( "#slider" );

        $sliders.slick( {
            dots: true,
            arrows: true,
            vertical: true,
            nextArrow: $button,
            verticalSwiping: true,
            //  autoplay: true,
            //  autoplaySpeed: 2800,
            responsive: [ {
                breakpoint: 800,
                settings: "unslick"
            } ]
        } );

        $aboutSlider.slick( {
            dots: true,
            arrows: true,
            vertical: true,
            nextArrow: $aboutButton,
            verticalSwiping: true,
            responsive: [ {
                breakpoint: 800,
                settings: "unslick"
            } ]
        } );

        if ( $window.width() <= 800 ) {
            $slider.slick( {
                dots: true,
                arrows: true,
                vertical: true,
                //  autoplay: true,
                verticalSwiping: true,
                autoplaySpeed: 2800,
                nextArrow: $sliderButton
            } );
        }

    }

    //---------------------------------------------------------
    //  Website Size
    //---------------------------------------------------------
    var adjustHeight = function() {
        var $header = $( "header" );
        var $slide = $( ".slick-slide" );
        var $container = $( ".container" );
        var windowWidth = 800

        if ( $window.width() <= windowWidth ) {
            var windowHeight = $window.innerHeight()
            var headerHeight = $header.innerHeight()
            if ( windowHeight < 300 ) {
                $slide.css( "height", 700 - headerHeight )
            } else {
                $slide.css( "height", windowHeight - headerHeight )
            }

        } else {
            var containerWidth = $container.height();
            $slide.css( "height", containerWidth )
        }
    };

    $( function() {
        addLightbox();
        moveIcons();
        showImageCaption();
        toggleNav();
        createSlick();
        adjustHeight();

        $window.resize( function() {

            clearTimeout( timer );
            timer = setTimeout( onResize, 50 );

            function onResize() {
                moveIcons();
                addLightbox();

                var $header = $( ".header" ).height()

                if ( $header < 50 ) {
                    adjustHeight();
                    var $slickInitialized = $( ".slick-initialized " );
                    if ( $slickInitialized.length === 0 ) {
                        createSlick()
                    }
                }
            }

        } );
    } );

}( window.jQuery, window, document ) );
