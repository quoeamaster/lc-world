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
      scrubNew: {},
      imgListingMap: {}
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
        //instance.preloadImages();
      }
    });
    $.getJSON('./../scrub_new', function(data) {
      if (data) {
        // instance._data.scrub = data;
        instance.scrubNew = data;
        instance.postScrubNewLoad();
      }
    });
  },
  methods: {
    postScrubNewLoad: function() {
      if (!this.scrubNew || !this.scrubNew.listing) {
        return
      }
      let aList = this.scrubNew.listing;
      aList.forEach(function (item) {
        // preload
        window.cacheObject.add("../"+item.thumb, item.thumb);
      }, this);
    },

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
