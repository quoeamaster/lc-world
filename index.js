// global event bus for event handling / receiving
let eventBus = new Vue();
window.eventBus = eventBus;

window.globalWindowDimensions = {
  width: document.querySelector("body").clientWidth,
  height: document.querySelector("body").clientHeight
};

// util - cache object
window.cacheObject = new CacheObject(50);

window.onscroll = function() {
  applyStickToFixedHeader();
};
window.onload = function () {
  let w = window.globalWindowDimensions.width;
  if (w <= 600) {
    hideCoreSpacer1();
  }
};

function hideCoreSpacer1() {
  document.querySelector(".core-spacer-1").style.display = 'none';
}

/**
 * add back the fixed header css if started scrolling
 */
function applyStickToFixedHeader() {
  let pmenuOffset = 575;  // hard coded
  let w = window.globalWindowDimensions.width;

  // related to the media query settings...
  /* @media only screen and (max-width: 360px) */
  if (w <= 600) {
    pmenuOffset = 60;
  } else {
    // console.log('page y offset:', window.pageYOffset); console.log('clientHeight:', a.clientHeight);
    // console.log('offsetHeight:', a.offsetHeight); console.log('scrollHeight:', a.scrollHeight);
    pmenuOffset = 575;  // hard coded

  }
  // common
  // fh-core (fixed header)
  if (window.pageYOffset > 20) {
    document.querySelector(".fh-core").classList.add('fh-rolling-background');
  } else {
    document.querySelector(".fh-core").classList.remove('fh-rolling-background');
  }
  // pmenu-core (category menu)
  /*
  let pmenuObj = document.querySelector(".pmenu-core");
  let a = document.querySelector(".cd-core-before");
  let endMenuOffsetY = a.clientHeight + pmenuOffset;
  if (pmenuObj) {
    // let pmenuObjOffsetTop = pmenuObj.offsetTop - 24;
    if (window.pageYOffset > pmenuOffset && window.pageYOffset < endMenuOffsetY) {
      pmenuObj.classList.add("pmenu-core-rolling-background");
    } else {
      pmenuObj.classList.remove("pmenu-core-rolling-background");
    }
  }
  */
}
