$(function(){
  let AnyInput = true;
  let speed = 500;
  let bkOrfrnt = 0; //frnt = 0, bk = 1
  let cntup = 0;
  let detailViewed = false;
  let isPC;
  let isSP;
  if (window.matchMedia('(max-width: 1024px)').matches) {
    isPC = false;
  } else if (window.matchMedia('(min-width:1025px)').matches) {
    isPC = true;
  }
  if (window.matchMedia('(max-width: 720px)').matches) {
    isSP = true;
  } else if (window.matchMedia('(min-width:721px)').matches) {
    isSP = false;
  }
  function stop_Input(){
    AnyInput = false;
    setTimeout(function(){
      AnyInput = true;
    },speed);
  }
  function canslide(){
    if(ismouseOver){
      if(bkOrfrnt == 1){
        if($(".skills-detail.active .skills-discription").scrollTop() > 0){
          return false;
        }
        else return true;
      }
    }
    else return true;
  }
  function slideIconToggle(bkOrfrnt){
    if(bkOrfrnt == 0){
      $(".about-scroll-icon").addClass("fa-angle-double-up");
      $(".about-scroll-icon").removeClass("fa-angle-double-down");
    }
    else{
      $(".about-scroll-icon").addClass("fa-angle-double-down");
      $(".about-scroll-icon").removeClass("fa-angle-double-up");
    }
  }
  function moveback(){
    slideIconToggle(bkOrfrnt);
    $(".profile,.skills").toggleClass('active');
    bkOrfrnt = 1;
    $(".about-title p").toggleClass("front");
    stop_Input();
    $('.skills-detail').removeClass('active');
    $('.skills-detail').eq(0).addClass('active');
    if(isPC == false){
      detailViewed = false;
      $('.about-left2').fadeIn();
      $('.skills-detail').removeClass('active');
      $('.skills-detail').eq(0).addClass('active');
      $("#backTolist").removeClass('detailViewed');
    }
  }
  function movefront(){
    slideIconToggle(bkOrfrnt);
    stop_Input();
    $(".profile,.skills").toggleClass('active');
    bkOrfrnt = 0;
    $(".about-title p").toggleClass("front");
    $(".skills-discription").scrollTop(0);
  }
  $('.about-scroll-icon').click(function(){
    if(bkOrfrnt == 0){
      moveback();
    }
    else if(bkOrfrnt == 1){
      movefront();
    }
  });
  let ismouseOver = false;
  $('.skills-discription').mouseover(function(){
    ismouseOver = true;
  });
  $('.skills-discription').mouseout(function(){
    ismouseOver = false;
    cntup = 0;
  });
  function scroll_control(event) {
    event.preventDefault();
  }
  function no_scroll(){
    document.addEventListener("mousewheel", scroll_control, {passive: false});
    document.addEventListener("touchmove", scroll_control, {passive: false});
  }
  let mousewheelevent = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
  $(document).on(mousewheelevent,function(e){
    no_scroll();
    if(AnyInput == true){
      var delta = e.originalEvent.deltaY ? -(e.originalEvent.deltaY) : e.originalEvent.wheelDelta ? e.originalEvent.wheelDelta : -(e.originalEvent.detail);
      if (delta < 0){
        if(bkOrfrnt == 0){
          moveback();
        }
        else{
          cntup = 0;
        }
      } else  if( delta > 0 && bkOrfrnt == 1){
        if(canslide()){
          cntup++;
          if(cntup >= 5){
            movefront();
            cntup = 0;
          }
        }
      }
    }
  });
  $('html').keydown(function(e){
    if(AnyInput == false){
      e.preventDefault();
    } else {
      var acvStgSwP = parseInt($('body').attr('data-page'));
      switch(e.which){
        case 33: // Key[PgUp]
        if(bkOrfrnt == 1){
          e.preventDefault();
          movefront();
        }
        break;

        case 34: // Key[PgDn]
        if(bkOrfrnt == 0){
          e.preventDefault();
          moveback();
        }
        break;

        case 38: // Key[↑]
        if(bkOrfrnt == 1){
          e.preventDefault();
          movefront();
        }
        break;

        case 40: // Key[↓]
        if(bkOrfrnt == 0){
          e.preventDefault();
          moveback();
        }
        break;

        case 37: // Key[←]
        if(bkOrfrnt == 1){
          e.preventDefault();
          movefront();
        }
        break;

        case 39: // Key[→]
        if(bkOrfrnt == 0){
          e.preventDefault();
          moveback();
        }
        break;
      }
    }
  });
  /*タブレット・スマホでskills-discriptionスクロール中の他処理の中止*/
  let cantmove = false;
  $('.skills-discription').on({
    'touchmove': function(){
      cantmove = true;
    },
    'touchend': function(){
      setTimeout(function(){
        cantmove=false;
      },500);    }
  });
  let touchS,touchF;
  $(document).on({
    'touchstart': function(e){
      touchS = event.changedTouches[0].pageY;
    },
    'touchmove': function(e){
      touchF = event.changedTouches[0].pageY;
    },
    'touchend': function(e){
      if(AnyInput == true){
        if((touchF - touchS) <= -100 && bkOrfrnt == 0 && cantmove == false){
          moveback();
        }
        else if((touchF - touchS) >= 100 && bkOrfrnt == 1 && cantmove == false){
          movefront();
        }
      }
    }
  });

  $('.skill-icon:not(.notposted)').click(function(){
    stop_Input();
    let index = $('.skill-icon').index(this);
    $('.skills-detail').removeClass('active');
    $('.skills-detail').eq(index+1).addClass('active');
    if(isPC == false){
      $('.about-left2').fadeOut();
      $('#backTolist').addClass('detailViewed');
    }
    detailViewed = true;
    cntup = 0;
  });
  $('.notposted').click(function(){
    if(isPC == true){
      $('.skills-detail').removeClass('active');
      $('.skills-detail').eq(0).addClass('active');
    }
    cntup = 0;
  });
  /*スマホ・タブレット操作*/
  if(isPC == false){
    /*skillsの説明箇所*/
    let desc = $('.skills-detail:first-child .skills-discription p').html();
    $('.about-left2').prepend("<p class = 'prepended-desc'>"+desc+"</p>");
    $('.skills').append("<span id = 'backTolist'>< back</span>");
  }
  $('#backTolist').click(function(){
      stop_Input();
      $(this).removeClass('detailViewed');
      $('.about-left2').fadeIn();
      $('.skills-detail').removeClass('active');
      $('.skills-detail').eq(0).addClass('active');
  });
});
