$(document).ready(function () {
  var trigger = $('.hamburger'),
      overlay = $('.overlay'),
     isClosed = false;
    trigger.click(function () {
      hamburger_cross();      
    });

    overlay.click(function () {
      hamburger_cross();
    });

    function hamburger_cross() {
      if (isClosed == true) {          
        overlay.hide();
        trigger.removeClass('is-open');
        trigger.addClass('is-closed');
        isClosed = false;
      } else {   
        overlay.show();
        trigger.removeClass('is-closed');
        trigger.addClass('is-open');
        isClosed = true;
      }
  }
  
  $('[data-toggle="offcanvas"]').click(function () {
       $('#wrapper').toggleClass('toggled');
  });  
});



  // image gallery
// init the state from the input
$(".image-checkbox").each(function () {
if ($(this).find('input[type="checkbox"]').first().attr("checked")) {
$(this).addClass('image-checkbox-checked');
}
else {
$(this).removeClass('image-checkbox-checked');
}
});

// sync the state to the input
$(".image-checkbox").on("click", function (e) {
$(this).toggleClass('image-checkbox-checked');
var $checkbox = $(this).find('input[type="checkbox"]');
$checkbox.prop("checked",!$checkbox.prop("checked"))

e.preventDefault();
});