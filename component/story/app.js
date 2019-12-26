
/**
 * story application entry point
 * @type {Vue}
 * @private
 */
new Vue({
  el: '#app',
  data: function() {
    return {
      scrub_story: {}
    };
  },
  mounted: function() {
    // get the static scrub + scrub_story file loaded
    let instance = this;
    $.getJSON('./../../scrub_story', function(data) {
      if (data) {
        instance._data.scrub_story = data;
      }
    });
  }
});
