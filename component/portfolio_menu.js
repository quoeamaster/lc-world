/*
 *  portfolio menu; provides a way to filter portfolio artworks based on the pick
 */
Vue.component('portfolio-menu', {
  props: ['listing'],
  watch: {
    listing: function (val) {
      if (this.listing.length > 0) {
        let _catList = [];
        let _p = '';
        for (let i=0; i<this.listing.length; i++) {
          let _c = this.listing[i];
          if (_c.cat !== _p) {
            // updates only if the cat is a non-exist once
            if (_catList.indexOf(_c.cat) === -1) {
              _catList.push(_c.cat);
            }
            _p = _c.cat;
          }
        } // end -- for (listing iteration)
        if (_catList.length > 0) {
          this.catList = _catList;
        }
      } // end -- if (listing length > 0 ??)
    }

  },
  data: function() {
    return {
      // cat(egory) picked, '' = all (default as well)
      'cat': '',
      // list of all available category(s) - dynamic
      'catList': []
    };
  },
  methods: {
    raiseCategoryChangeEvent: function (newCat) {
      if (this.cat !== newCat) {
        this.cat = newCat;
        if (this.cat === 'Photos') {
          this.forwardToPhoto(this.cat);
        } else if (this.cat === 'Works') {
          this.forwardToStory(this.cat);
        } else if (window.eventBus) {
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
    <div class="pmenu-hscroll-core core-text-align-center">
        <div v-for="item in catList" 
            class="pmenu-palete core-pointer" 
            v-bind:class="getPaleteChosenClass(item)" 
            v-on:click="raiseCategoryChangeEvent(item)">{{item}}</div>
    </div>
</div>
  `
});

