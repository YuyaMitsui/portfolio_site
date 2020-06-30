$(function(){
  $('.scroll-top').hide();
  let height = $('.works-container').height();
  $('.works-container').scroll(function(){
    console.log($(this).scrollTop())
   if ($(this).scrollTop() > height) {
        $('.scroll-top').fadeIn();
   } else {
        $('.scroll-top').fadeOut();
   }});
   $('.scroll-top').click(function(){
     $('.works-container').animate({ scrollTop: 0 }, 500);
   });
});
