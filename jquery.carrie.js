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
    //navBuilder();
    currentNavItem();
    mobileNavBuilder();
    mobileNavMenu();
  };
   
  function navBuilder(){
    // Build from an navigation object 
    // Future release
    
    // Format of build
    /*
    <ul>
     <li><a href="#">Page</a>
       <ul>
         <li><a href="#">Subpage</a></li>
         ...
       </ul>
     </li>
     ...
    </ul>
    */
  };
   
  function currentNavItem(){
  
  $('#navigation').find('a').each(function(){
  var path = $(this).attr('href');
  
  if(window.location.pathname.indexOf(path) != -1 && path.length > leng){
  leng = path.length
  $(this).addClass('active').siblings().removeClass('active');
  }
  });
  
  };
  
  function mobileNavBuilder(){
    mobileBtn = '<span class="mobile-nav-btn">Menu</span>';
    subDropBtn = '<span class="sub-mobile-nav-icon"></span>';
    
    $(container' ul:first-child').addClass('mobile-menu');
    
    $(container' ul li').addClass('sub-mobile-btn');
    $(container' li > ul').parent().addClass('expand').prepend(subDropBtn);
    
    $(container' ul ul').addClass('sub-mobile-menu');
    $(container).prepend(mobileBtn);
  };
  
  function mobileNavMenu(){
    $('.mobile-menu').hide();
      $('.sub-mobile-menu').hide();
      
      $('.mobile-nav-btn').click(function(){
      $('.mobile-menu').toggle();
    })
    
    $('.sub-mobile-nav-icon').click(function(){
      $(this).siblings('.sub-mobile-menu').toggle();
      $(this).parent().toggleClass('sub-mobile-active');
    })
  };
  
  function screenAdapt(width) {
    width = $(document).width();
    if (width > 600) {
      $(container).removeClass('nav-mobile');
    }
    else {
      $(container).addClass('nav-mobile');
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
