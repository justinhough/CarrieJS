/* ---------------------------------------
 *
 *    CarrieJS 1.0
 *    http://carriejs.com/ - Coming Soon
 *
 *    Copyright 2014 Justin Hough.
 *    Licensed under GPL and MIT.
 *
 * ------------------------------------ */

// HasClass
function hasClass(elem, className) {
  return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
}
// AddClass
function addClass(elem, className) {
  if (!hasClass(elem, className)) {
    elem.className += ' ' + className;
  }
}
// RemoveClass
function removeClass(elem, className) {
  var newClass = ' ' + elem.className.replace( /[\t\r\n]/g, ' ') + ' ';
  if (hasClass(elem, className)) {
    while (newClass.indexOf(' ' + className + ' ') >= 0 ) {
      newClass = newClass.replace(' ' + className + ' ', ' ');
    }
    elem.className = newClass.replace(/^\s+|\s+$/g, '');
  }
}
// ToggleState
var toggleState = function (elem, one, two) {
  var elem = document.querySelector(elem);
  elem.setAttribute('data-state', elem.getAttribute('data-state') === one ? two : one);
};


// Declaring global vars for functions
var option, navigation;

// Main Function
function carrieJS(option){
  
  var config = {
    CSS: {
      current: 'nav-active',
      mobileActive: 'nav-mobile',
      mobileMenu: 'mobile-menu',
      mobileBtn: 'mobile-nav-btn',
      //.sub-mobile-btn
      //.nav-parent
      //.sub-expand
      //.sub-mobile-nav-icon
      //.sub-mobile-active
      //.sub-nav-parent
    },
    IDs: {
      container: 'navigation',
      
    },
    labels: {
      // labels here
    },
    settings: {
      skin: 'default',
      
    },
  };
  
  o = config;
  //obj = option;
  leng = 0;
  
  container = document.getElementById(o.IDs.container);
  mobileContainer = document.getElementsByClassName(o.CSS.mobileMenu);
  
  // Remove after removing jQuery
  jContainer = '#'+o.IDs.container;
  
  
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
  
    var all_links = container.getElementsByTagName("a"),
      i=0, len=all_links.length,
      full_path = location.href.split('#')[0];
    for(; i<len; i++) {
      if(all_links[i].href.split("#")[0] == full_path) {
        all_links[i].className += " nav-active";
      }
    }
    
  };
  
  function mobileNavBuilder(){
    mobileBtn = '<span class="mobile-nav-btn">Menu</span>';
    subDropBtn = '<span class="sub-mobile-nav-icon"></span>';
    
    // Convert
    $(jContainer + ' ul:first-child').addClass('mobile-menu');
    $(jContainer + ' ul li').addClass('sub-mobile-btn');
    $(jContainer + ' li > ul').parent().addClass('sub-expand').prepend(subDropBtn);
    $(jContainer + ' ul ul').addClass('sub-mobile-menu');
    $(jContainer).prepend(mobileBtn);
  };
  
  function mobileNavMenu(){
    
    mobileOpenBtn = document.querySelector('.'+o.CSS.mobileBtn);
    mobileOpenBtn.onclick = function (e) {
      toggleState('.mobile-menu', 'closed', 'open');
      e.preventDefault();
    };

    
    [].forEach.call(document.querySelectorAll('.sub-mobile-nav-icon'), function(el) {
      el.addEventListener('click', function() {
        
        // Convert
        // Hide all other menus
        $('.sub-mobile-menu').hide();
        $('.sub-mobile-btn').removeClass('sub-mobile-active');
        // Show current menu
        $(this).siblings('.sub-mobile-menu').toggle();
        $(this).parent().toggleClass('sub-mobile-active');

      })
    });
    
/*
    //jQuery Version
    $('.sub-mobile-nav-icon').click(function(){
      // Hide all other menus
      $('.sub-mobile-menu').hide();
      $('.sub-mobile-btn').removeClass('sub-mobile-active');
      // Show current menu
      $(this).siblings('.sub-mobile-menu').toggle();
      $(this).parent().toggleClass('sub-mobile-active');
    })
*/

  };

  function screenAdapt(width) {
    width = window.innerWidth;
    if (width > 600) {
      removeClass(container, 'nav-mobile');
    }
    else {
      addClass(container, 'nav-mobile');
    }
  }
  
  // Run Screensize Check
  window.onresize = function(){
    screenAdapt(window.innerWidth);
  }

  init();
  return{config:config, init:init}

  console.log('carrieJS has run');
  
};


// Start on Load
document.addEventListener('DOMContentLoaded', function() {
  carrieJS();
})
