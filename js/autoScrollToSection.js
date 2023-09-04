$(document).ready(function() {
    // Add class to the navigation item based on the current section
    function highlightCurrentSection() {
      var scrollPosition = $(window).scrollTop();
  
      $('main .container-fluid>.row').each(function() {
        var offsetOftheSection = 200;
        var sectionTop = $(this).offset().top - offsetOftheSection; 
        var sectionHeight = $(this).outerHeight();
  
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          var sectionId = $(this).attr('id');
          $('.nav-link').removeClass('active');

          $('.nav-link').each(function () { 
             if($(this).attr('href') === '#' + sectionId ){
                $(this).addClass('active');
             }
          });
        }
      });
    }
  
    // Call the function on page load or refresh
    highlightCurrentSection();
  
    // Call the function whenever the scroll position changes
    $(window).scroll(function() {
      highlightCurrentSection();
    });
  });