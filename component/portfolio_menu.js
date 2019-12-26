/*
 *  portfolio menu; provides a way to filter portfolio artworks based on the pick
 */
Vue.component('portfolio-menu', {
  data: function() {
    return {
      // cat(egory) picked, '' = all (default as well)
      'cat': ''
    };
  },
  methods: {
    raiseCategoryChangeEvent: function (newCat) {
      if (this.cat !== newCat) {
        this.cat = newCat;
        if (window.eventBus) {
          window.eventBus.$emit('on-category-change', {
            'cat': newCat
          });
        } // end -- if (eventBus)
      } // end -- if (cat comparison)
    },
    getPaleteChosenClass: function (currentCat) {
      let css = {};
      if (currentCat === this.cat) {
        css['pmenu-palete-chosen'] = true;
      } else {
        css['pmenu-palete-chosen'] = false;
      }
      return css;
    },
    forwardToPhoto: function (label) {
      window.location.replace("photo.html");
    },
    forwardToStory: function (label) {
      window.location.replace("story.html");
    }

  },
  template: `
<div id="_portfolio_" class="pmenu-core">
    <div class="pmenu-palete-container">
      <div class="pmenu-palete core-pointer" v-bind:class="getPaleteChosenClass('')" v-on:click="raiseCategoryChangeEvent('')">Highlights</div>
      <div class="pmenu-palete core-pointer" v-bind:class="getPaleteChosenClass('awards')" v-on:click="raiseCategoryChangeEvent('awards')">Awards</div>
      <div class="pmenu-palete core-pointer" v-bind:class="getPaleteChosenClass('photos')" v-on:click="forwardToPhoto('photos')">Photos</div>
      <div class="pmenu-palete core-pointer" v-bind:class="getPaleteChosenClass('sketches')" v-on:click="raiseCategoryChangeEvent('sketches')">Sketches</div>
      <div class="pmenu-palete core-pointer" v-bind:class="getPaleteChosenClass('portraits')" v-on:click="raiseCategoryChangeEvent('portraits')">Portraits</div>
      <div class="pmenu-palete core-pointer" v-bind:class="getPaleteChosenClass('works')" v-on:click="forwardToStory('story')">Works</div>
    </div>
</div>
  `
});

/*
 *  TODO:
 *  1. palete menu items should be dynamic (now is hard-coded)
 *  1a. palete menu needs to horizontal scrollable, copy from the photo.html components!!!!
 */
