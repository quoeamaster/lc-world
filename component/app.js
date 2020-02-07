/**
 * main application entry point
 * @type {Vue}
 * @private
 */
new Vue({
  el: '#app',
  data: function() {
    return {
      scrub: {},
      scrubNew: {}
    };
  },
  mounted: function() {
    // get the static scrub file loaded
    let instance = this;
    $.getJSON('./../scrub', function(data) {
      if (data) {
        // instance._data.scrub = data;
        instance.scrub = data;
        // preload images
        instance.preloadImages();
      }
    });
    $.getJSON('./../scrub_new', function(data) {
      if (data) {
        // instance._data.scrub = data;
        instance.scrubNew = data;
        // TODO: preload images
        //instance.preloadImages();
      }
    });

  },
  methods: {
    preloadImages: function () {
      let _imglisting = this.scrub.listing;
      if (_imglisting) {
        _imglisting.forEach(function (item) {
          new Promise(function(resolve) {
            resolve(window.cacheObject.add(item.preview, item.preview));
          });
        });
      }
    }
  }
});
