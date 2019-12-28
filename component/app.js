/**
 * main application entry point
 * @type {Vue}
 * @private
 */
new Vue({
  el: '#app',
  data: function() {
    return {
      scrub: {}
    };
  },
  mounted: function() {
    // get the static scrub file loaded
    let instance = this;
    $.getJSON('./../scrub', function(data) {
      if (data) {
        // instance._data.scrub = data;
        instance.scrub = data;
      }
    });
  }
});
