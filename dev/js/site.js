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

    $('#contact-form').submit(function() {

      try {
        AWS.config.region = 'us-east-1';
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: 'us-east-1:92c22f4c-c658-45b6-aa04-2d869b65a3db',
        });

        var message = "Name: " + document.querySelector('#input-name').value + ";     Email: " + document.querySelector('#input-email').value + "     Message: " + document.querySelector('#input-message').value;
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1;
        var yyyy = today.getFullYear();
        var hh = today.getHours();
        var min = today.getMinutes();

        if(dd<10) {
            dd='0'+dd
        } 

        if(mm<10) {
            mm='0'+mm
        } 

        var now = mm+'/'+dd+'/'+yyyy+': '+hh+':'+min;

        var sns = new AWS.SNS();
        var params = {
            //Message: 'Hello topic', /* required */
            Message: message,
            Subject: now + ': Browser SNS publish - contact form',
            TopicArn: 'arn:aws:sns:us-east-1:036268242154:Main_Contact_Form_Internal_Notifcation'
        };
        sns.publish(params, function(err, data) {
            if (err)  { 
              $('.contact-error').val("There was an error. Please contact me at alec@alecdibble.com");
            } 
            else { 
              $('.contact').hide();
              $('.contact-thanks').show();
            }
        });
      }
      catch(e) {
        $('.contact-error').val("There was an error. Please contact me at alec@alecdibble.com");
      }

      return false;
    });
  });


})(jQuery);
