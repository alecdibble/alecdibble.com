(function($){

  'use strict';

  $(document).ready(function() {
    var navState = false;
    $('#nav-button').click(function() {
      if(navState) {
        $(this).removeClass('nav-menu-button-active')
        $('.nav-menu-wrapper').removeClass('nav-wrapper-visible').addClass('nav-wrapper-hidden')
      }
      else {
        $(this).addClass('nav-menu-button-active')
        $('.nav-menu-wrapper').removeClass('nav-wrapper-hidden').addClass('nav-wrapper-visible')
      }
      navState = !navState;
    });
  });


})(jQuery);
