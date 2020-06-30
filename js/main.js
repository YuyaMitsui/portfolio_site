$(function(){
  let cnt = 0;
  let first = true;
  let beforex = 0;
  let beforey = 0;
  let draw = false;
  let innerWidth = $('.inner').width();
  let innerHeight = $('.inner').height();
  let innerX = $('.inner').offset().left;
  let innerY = $('.inner').offset().top;
  let del = 700;
  let flipToggle = 0;
  let mouseEvent = true;
  let Frontobjects = ".main-container,.title-wrap,.detail-trriger,.sns";
  let Backobjects = ".menu-wrap,.menu-link";
  let Allobjects = ".main-container,.title-wrap,.detail-trriger,.menu-wrap,.sns,.menu-link";
  let isPC;
  if (window.matchMedia('(max-width: 1024px)').matches) {
    isPC = false;
  } else if (window.matchMedia('(min-width:1025px)').matches) {
    isPC = true;
  }
  let isChrome;
  let userAgent = window.navigator.userAgent;
  if(userAgent.indexOf('Edge') == -1 && userAgent.indexOf('Chrome') != -1) {
    isChrome = true;
    console.log(userAgent);
    console.log(userAgent.indexOf('Chrome'));
  }
  else{
    isChrome = false;
  }
  function mousesleep(delay){
    mouseEvent = false;
    setTimeout(function(){
      mouseEvent = true;
    },delay);
  }
  $('.flip-trriger').click(function(){
    if(mouseEvent == true){

      $('.main-container').toggleClass('inner-fliped');
      $('.menu').toggleClass('menu-fliped');
      $('.label').toggleClass('fliped');//for not PC
      flipToggle++;
      flipToggle = flipToggle % 2;
      mouseEvent = $(window).mousemove;
      mousesleep(600);
    }
  });

  //傾き計算、transform処理
  $(window).mousemove(function(){
    if(mouseEvent == true && isPC == true && isChrome == true){
      let mouseX = event.clientX;
      let mouseY = event.clientY;
      cnt++;
      let w_height = $(window).height();
      let w_width = $(window).width();
      let x = mouseX - w_width/2;
      let y = mouseY - w_height/2;
      let gap = Math.sqrt((mouseX-beforex)**2+(mouseY-beforey)**2);
      if((mouseX > innerX && mouseX < (innerX+innerWidth))&&(mouseY > innerY && mouseY < (innerY+innerHeight))){
        if(gap > 1){
          draw = true;
        }
      let deg;
      let vector_size = Math.sqrt(x**2 + y**2);
      deg = vector_size / Math.sqrt((w_width/2)**2 + (w_height/2)**2) * 10;
      //vertical vector
      x = x/vector_size;
      y = y/vector_size;
      let vx = -y;
      let vy = x;
      let Dir = "rotate3d(" + vx +", " + vy + ", 0,"+deg+"deg)";
      if(draw == true){
          let flipTransZ = " translateZ(-500px)";
          if(flipToggle == 0){
            $(Frontobjects).css({
              'transform':Dir,
              'transition':'0s'
            })
            $(Backobjects).css({
              'transform':Dir+flipTransZ,
              'transition':'0s'
            })
          }
          else{
            $(Frontobjects).css({
              'transform':Dir+flipTransZ,
              'transition':'0s'
            })
            $(Backobjects).css({
              'transform':Dir,
              'transition':'0s'
            })
          }
        }
        beforex = mouseX;
        beforey = mouseY;
      }
      else{
        $(Allobjects).css({
          'transform':'rotate3d(0,0,0,0deg)',
          'transition':'.7s'
        });
        cnt = 0;
        beforex = null;
        beforey = null;
      }
    }
  });

  let displayoff = ".flip-trriger,.detail-trriger,.top-link";
  $(".detail-trriger").click(function(){
    $(Allobjects).css({
      'transform':'rotate3d(0,0,0,0deg)',
      'transition':'.2s'
    });
    mousesleep(1300);
    $(".top-link").stop().addClass('trans');
    $(".right-wrap,.left-wrap,.slides,.detail,.flip-trriger").addClass('activated');
    $(displayoff).css({
      "opacity": "0",
      "transition": ".3s"
    });
    setTimeout(function(){
      $(displayoff).addClass("displaynone");
    },300);
    $(".detail-ctrl").css({
      "display": "block"
    });
    setTimeout(function(){
      $(".detail-ctrl").css({
        "opacity":"1",
        "transition":".3s"
      });
    },1000);
    $(".label").css({
      "opacity":"0",
      "transition":".3s"
    });
    setTimeout(function(){
      $(".label").text("-detail-");
      $(".label").css({
        "opacity":"1",
        "transition":".3s"
      });
    },1000);
  });
  $(".goback").click(function(){
    $(".detail,.label,detail-ctrl,.right-wrap").css({
      "opacity": "0",
      "transition":".3s"
    });
    setTimeout(function(){
      $(".detail,.label,detail-ctrl,.right-wrap").css({
        "opacity": "0",
        "transition":".3s"
      });
    },300);
    setTimeout(function(){
      window.location.href = 'index.html';
    },500);
  });
  $(".goworks").click(function(){
    $(".detail,.label,detail-ctrl,.right-wrap").css({
      "opacity": "0",
      "transition":".3s"
    });
    setTimeout(function(){
      $(".detail,.label,detail-ctrl,.right-wrap").css({
        "opacity": "0",
        "transition":".3s"
      });
    },300);
    setTimeout(function(){
      window.location.href = 'works.html';
    },500);
  });
});
