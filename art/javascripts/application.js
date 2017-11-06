// Generated by CoffeeScript 1.6.2
/*
 *
 * Hi there, have a look at my source files here:
 * https://github.com/stefanRitter/stefanRitter.github.io
 *
*/


(function() {
  jQuery(function($) {
    var animTimout, img, img2, img3, img4, moved, warning, _ref;

    $('.loading')[0].style.visibility = 'visible';
    moved = false;
    animTimout = 2000;
    warning = '';
    if ((_ref = history.navigationMode) == null) {
      history.navigationMode = "compatible";
    }
    if (navigator.appName === 'Microsoft Internet Explorer') {
      Modernizr.csstransforms3d = false;
      $('html').removeClass('csstransforms3d');
    }
    if (!Modernizr.csstransforms3d) {
      animTimout = 0;
      warning = $('footer p:nth-child(1)').html();
      warning += '<span style="background: pink; padding: 0.2em;">Best viewed with 3D transforms in Chrome, Firefox, or Safari</span>';
      $('footer p:nth-child(1)').html(warning);
    }
    $('a').click(function(event) {
      var moveyBy, url;

      url = $(this).attr('href');
      moveyBy = -(window.innerHeight / 2);
      event.preventDefault();
      $(this).blur();
      if (url !== '#') {
        moved = true;
        $('html').css('overflow', 'hidden');
        $('.loading').css('visibility', 'visible');
        $('footer').animate({
          bottom: moveyBy
        }, 200);
        return $('header').animate({
          top: moveyBy
        }, 300, function() {
          $('li>a').removeClass('rotfadein').addClass('rotfadeout');
          return setTimeout(function() {
            return window.location = url;
          }, 800);
        });
      }
    });
    $(window).on('pageshow', function() {
      if (moved) {
        $('li>a').removeClass('rotfadeout').addClass('rotfadein');
        $('.loading').css('visibility', 'hidden');
        $('footer').animate({
          bottom: '0.2em'
        }, 90);
        return $('header').animate({
          top: '0'
        }, 180, function() {
          return $('html').css('overflow', 'visible');
        });
      }
    });
    img = new Image();
    img2 = new Image();
    img3 = new Image();
    img4 = new Image();
    img.onload = function() {
      return img4.src = "images/cream.png";
    };
    img4.onload = function() {
      $('.loading')[0].style.visibility = 'hidden';
      $('.maintable')[0].style.display = '';
      return setTimeout(function() {
        var displayLinkname, setBackground;

        setTimeout(function() {
          return $('html').css('overflow', 'visible');
        }, animTimout !== 0 ? 800 : 0);
        displayLinkname = function(that) {
          var info, newSpan;

          info = $(that).children().attr('alt');
          newSpan = $('<div class="linkname">' + info + '</div>');
          if ($(that).attr('href') === '#') {
            newSpan = $('<div class="comingsoon">coming soon...</div>');
          }
          return newSpan.hide().appendTo(that).delay(100).fadeIn(500);
        };
        setBackground = function(that) {
          var image, newBackground;

          newBackground = $('<div class="newbackground"></div>');
          image = $(that).find('img').attr('src');
          newBackground.css('background-image', 'url(' + image + ')');
          return newBackground.hide().prependTo('body').delay(100).fadeIn(500);
        };
        if (Modernizr.touch) {
          $('nav a').each(function() {
            return displayLinkname(this);
          });
          return setBackground('nav a.portfolio');
        } else {
          $('nav a').on('mouseenter', function() {
            $('.linkname, .comingsoon, .newbackground').stop().fadeOut(500, function() {
              return $(this).remove();
            });
            displayLinkname(this);
            return setBackground(this);
          });
          return $('nav a.portfolio').mouseenter();
        }
      }, animTimout);
    };
    img.src = "images/portfolio.png";
    img2.src = "images/fleshscreen.png";
    return img3.src = "images/canvas.png";
  });

}).call(this);
