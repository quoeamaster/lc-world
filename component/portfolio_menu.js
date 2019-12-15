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
  mounted: function() {
    /*
    let instance = this;
    if (!window.eventBus) {
      setTimeout(function () {
        window.eventBus.$on('on-nav', function (data) {
          instance.onNavEvent(data);
        });
      }, 500);
    }*/
  },
  methods: {
    /*
    onNavEvent: function(data) {
      setTimeout(function () {
        if (data.label !== "Portfolio") {
          let menuObj = document.querySelector(".pmenu-core");
          if (menuObj) {
            menuObj.classList.remove("pmenu-core-rolling-background");
          }
        }
      }, 100);
    },
    */
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
      /*
      if (currentCat === 'Portfolio') {
        css['pmenu-core-rolling-background'] = true;
      } else {
        css['pmenu-core-rolling-background'] = false;
      }
      */
      if (currentCat === this.cat) {
        css['pmenu-palete-chosen'] = true;
      } else {
        css['pmenu-palete-chosen'] = false;
      }
      return css;
    }

  },
  template: `
<div id="_portfolio_" class="pmenu-core">
    <div class="pmenu-palete-container">
      <div class="pmenu-palete core-pointer" v-bind:class="getPaleteChosenClass('')" v-on:click="raiseCategoryChangeEvent('')">Highlights</div>
      <div class="pmenu-palete core-pointer" v-bind:class="getPaleteChosenClass('awards')" v-on:click="raiseCategoryChangeEvent('awards')">Awards</div>
      <div class="pmenu-palete core-pointer" v-bind:class="getPaleteChosenClass('photos')" v-on:click="raiseCategoryChangeEvent('photos')">Photos</div>
      <div class="pmenu-palete core-pointer" v-bind:class="getPaleteChosenClass('sketches')" v-on:click="raiseCategoryChangeEvent('sketches')">Sketches</div>
      <div class="pmenu-palete core-pointer" v-bind:class="getPaleteChosenClass('portraits')" v-on:click="raiseCategoryChangeEvent('portraits')">Portraits</div>
    </div>
</div>
  `
});
