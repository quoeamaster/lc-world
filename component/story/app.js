
/**
 * story application entry point
 * @type {Vue}
 * @private
 */
new Vue({
  el: '#app',
  data: function() {
    return {
      scrub_story: {},
      // if any story id was provided
      story_id: ''
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
    // story_id (if provided)
    let urlParams = new URLSearchParams(window.location.search);
    this.story_id = urlParams.get('story_id');
    if (this.story_id === null) {
      this.story_id = '';
    }
  }
});
