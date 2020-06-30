$(window).on('load', function(){
    $('.inner-relative,.menu > *,.outer *').removeClass('trans');
});
$(function() {
    $('a:not(.mail-link):not(.insta-link):not([href^="#"]):not([target])').on('click', function(e){
        e.preventDefault();
        url = $(this).attr('href');
        if (url !== '') {
            $('.inner-relative,.menu *,.outer > *:not(.inner)').addClass('trans');
            setTimeout(function(){
                window.location = url;
            }, 800);
        }
        return false;
    });
});
