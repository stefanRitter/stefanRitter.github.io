/*
 *
 *  Hi there, have a look at my source files here:
 *  https://github.com/stefanRitter/stefanRitter.github.io
 *
 */


$(document).ready(function() { 'use strict';

    var moved = false, animTimout = 2000, warning;

    if (history.navigationMode) {
       history.navigationMode = "compatible"; // Opera only, resets back button behaviour
    }

    function isTouchDevice() {
        return ("ontouchstart" in window) || navigator.msMaxTouchPoints;
    }


    if (!Modernizr.csstransforms3d) {

        animTimout = 0; //don't wait for any animation

        warning = $('footer p:nth-child(1)').html();
        warning += '<span style="background: pink; padding: 0.2em;">Best viewed with 3D transforms in Chrome, Firefox 18, or Safari</span>';
        $('footer p:nth-child(1)').html(warning);
    }

    //start exit animation if link is clicked
    $('a').click(function(event) {
        var url = $(this).attr('href'), moveyBy = -(window.innerHeight/2);

        event.preventDefault();

        $(this).blur(); //unfocus link esp for firefox to prevent dotted outline

        if(url !== '#') {

            moved = true;

            $('html').css('overflow', 'hidden');

            $('.loading').css('visibility', 'visible');

            $('footer').animate({
                    bottom: moveyBy
                }, 200 );

            $('header').animate({
                    top: moveyBy
                }, 300, function() {

                    $('li>a').removeClass('rotfadein').addClass('rotfadeout');

                    setTimeout(function() {
                        window.location = url;
                    }, 800);
            });
        }
    });

    //alternate animation for back button
    $(window).on('pageshow',function() {
        if (moved) {

            $('li>a').removeClass('rotfadeout').addClass('rotfadein');

            $('.loading').css('visibility', 'hidden');

            $('footer').animate({
	                bottom: '0.2em'
	            }, 90 );
	        $('header').animate({
	                top: '0'
	            }, 180, function () {
                    $('html').css('overflow', 'visible');
                });
	    }
    });


    //wait for entry animation to finish, then listen to mouse/touch events
    setTimeout( function() {

        //reset scrollbars after intro animation
        setTimeout( function () {
            $('html').css('overflow', 'visible');
        }, (animTimout !== 0) ? 800 : 0);

        function displayLinkname(that) {
            var info = $(that).children().attr('alt'),
                newSpan = $('<div class="linkname">' + info + '</div>');

            if($(that).attr('href') === '#') {
                newSpan = $('<div class="comingsoon">coming soon...</div>');
            }

            newSpan.hide().appendTo(that).delay(100).fadeIn(500);
        }

        function setBackground(that) {
            var newBackground = $('<div class="newbackground"></div>'),
                image = $(that).find('img').attr('src');

            newBackground.css('background-image', 'url(' + image + ')');
            newBackground.hide().prependTo('body').delay(100).fadeIn(500);
        }

        if (isTouchDevice()) {

            $('nav a').each(function () {
                displayLinkname(this);
            });
            setBackground('nav a.portfolio');

        } else { //not touch

            $('nav a').on('mouseenter', function() {

                $('.linkname, .comingsoon, .newbackground').stop().fadeOut(500, function() {
                    $(this).remove();
                });

                displayLinkname(this);
                setBackground(this);
            });

            $('nav a.portfolio').mouseenter(); //set default active link
        }

    }, animTimout);

});
