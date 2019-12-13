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
    }

  },
  template: `
<div class="pmenu-core">
    <div class="pmenu-palete-container">
      <div class="pmenu-palete core-pointer" v-on:click="raiseCategoryChangeEvent('')">All</div>
      <div class="pmenu-palete core-pointer" v-on:click="raiseCategoryChangeEvent('awards')">Awards</div>
      <div class="pmenu-palete core-pointer" v-on:click="raiseCategoryChangeEvent('photos')">Photos</div>
      <div class="pmenu-palete core-pointer" v-on:click="raiseCategoryChangeEvent('sketches')">Sketches</div>
      <div class="pmenu-palete core-pointer" v-on:click="raiseCategoryChangeEvent('portraits')">Portraits</div>
    </div>
</div>
  `
});
