(function($){

  'use strict';

  $(document).ready(function() {
    var navState = false;
    $('#nav-button').click(function() {
      if (window.matchMedia('(max-width: 767px)').matches) {
        if(navState) {
          $("html, body").animate({ scrollTop: 0 }, "fast");
          $(this).removeClass('nav-menu-button-active')
          $('.nav-menu-wrapper').removeClass('nav-wrapper-visible').addClass('nav-wrapper-hidden')
          $('.nav-title').removeClass('nav-title-visible').addClass('nav-title-hidden')
        }
        else {
          $(this).addClass('nav-menu-button-active')
          $('.nav-menu-wrapper').removeClass('nav-wrapper-hidden').addClass('nav-wrapper-visible')
          $('.nav-title').removeClass('nav-title-hidden').addClass('nav-title-visible')
        }
        navState = !navState;
      }
    });
  });


})(jQuery);
