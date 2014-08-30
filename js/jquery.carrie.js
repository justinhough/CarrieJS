/* ---------------------------------------
 *
*    CarrieJS 1.0 - requires jQuery
*    http://carriejs.com/ - Coming Soon
*
*    Copyright 2014 Justin Hough.
*    Licensed under GPL and MIT.
*
* ------------------------------------ */

// Declaring global vars for functions
var option, navigation;

// Main Function
function carrieJS(option){
 
  var config = {
    CSS: {
      current: 'nav-active',
      mobile: 'nav-mobile'
    },
    IDs: {
      container: 'navigation'
    },
    labels: {
      // labels here
    },
    settings: {
      skin: 'default',
    },
  };
  
  o = config;
  obj = $(option);
  leng = 0;
  
  container = '#'+o.IDs.container;
  
  function init(){
    currentNavItem();
    
    mobileNavBuilder();
    mobileNavMenu();
    
    clickMobileMenu();
    openCloseMenu();
    
  };


  function currentNavItem(){
  
    $('#navigation').find('a').each(function(){
      var path = $(this).attr('href');
      
      if(window.location.pathname.indexOf(path) != -1 && path.length > leng){
        leng = path.length
        $(this).addClass(o.CSS.current).siblings().removeClass(o.CSS.current);
      }
    });
  
  };

  

   

  
  
  // Desktop Navigation
  function desktopNavBuilder(){};
  
  function desktopNavMenu(){};
  
  
  
  
  
  // Mobile Navigation
  function mobileNavBuilder(){
    mobileBtn = '<span class="mobile-nav-btn">Menu</span>';
    subDropBtn = '<span class="sub-mobile-nav-icon"></span>';
    
    $(container + ' ul:first-child').addClass('mobile-menu');
    
    //$(container + ' ul ul li:first-of-type').addClass('sub-mobile-btn');
    $(container + ' li > ul').parent().addClass('expand').prepend(subDropBtn);
    
    $(container + ' ul ul').addClass('sub-mobile-menu');
    $(container).prepend(mobileBtn);
  };
  
  function mobileNavMenu(){
    
    $('.sub-mobile-nav-icon').click(function(){
      
      $(this).parent().toggleClass('sub-mobile-active');
      $(this).parent().siblings('li').removeClass('sub-mobile-active');
      
    })
    
  };


  function clickMobileMenu() {
    $('.mobile-nav-btn').click(function(){
      if($("#navigation ul").attr('data-mobile') == "closed"){
        //alert('closed')
        $("#navigation ul[data-mobile]").attr('data-mobile','open');
        $('#navigation ul[data-mobile] li').removeClass('sub-mobile-active');
        
      } else if($("#navigation ul").attr('data-mobile') == "open") {
        //alert('open')
        $("#navigation ul[data-mobile]").attr('data-mobile','closed');
        $('#navigation ul[data-mobile] li').removeClass('sub-mobile-active');
        
      } else {
        // nothing
      }
      openCloseMenu();
    });
  }
  
  function openCloseMenu() {
    
    // Mobile Menu Button Click
    
    // Check on if menu is open or not
    if($("#navigation ul").attr('data-mobile') == "closed"){
      // close menu
      //alert('closed')
      $('#navigation ul[data-mobile=closed]').hide();
      $('#navigation ul[data-mobile=closed] ul').removeClass('sub-mobile-active');
    } else if($("#navigation ul").attr('data-mobile') == "open") {
      // open menu
      //alert('open');
      $('#navigation ul[data-mobile=open]').show();
      $('#navigation ul[data-mobile=open] ul').removeClass('sub-mobile-active');
    } else {
      // nothing
    }
    
  }
  
  
  
  function screenAdapt(width) {
    width = $(document).width();
    if (width > 600) {
      $(container).removeClass('nav-mobile');
      $('#navigation ul[data-mobile').show();
    }
    else {
      $(container).addClass('nav-mobile');
      openCloseMenu();
    }
  }
  
  // Run Screensize Check
  $(function() {
    screenAdapt($(this).width());
    $(window).resize(function() {
      screenAdapt($(this).width());
      //carrieJS('desktop');      
    });
  });
  
  init();
  return{config:config, init:init}
  
  console.log('carrieJS has run');

};
