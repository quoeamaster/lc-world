/**
 * the side navigation bar
 */
Vue.component('ph-side-nav', {
  props: ['scrub'],
  data: function() {
    return {
      currentCat: ''
    };
  },
  watch: {
    scrub: function (val) {
      let _firstCat = {};
      if (val.category && val.category.length>0) {
        _firstCat = val.category[0];

        this.currentCat = _firstCat.name;
        // only the first time ... need a delay so that the other components could be
        // mounted before receiving the event
        this.preparePhotos(_firstCat.listing, 500);
      }
    }
  },
  methods: {
    preparePhotos: function(listing, delayInMS) {
      let _cat = this.currentCat;
      if (delayInMS) {
        setTimeout(function () {
          window.eventBus.$emit('update-photo-displays', {
            cat: _cat,
            listing: listing
          });
        }, 200);
      } else {
        window.eventBus.$emit('update-photo-displays', {
          cat: this.currentCat,
          listing: listing
        });
      }
    },
    onCatChange: function (data) {
      let _cat = data.cat;
      if (_cat !== this.currentCat) {
        this.currentCat = _cat;
        // todo: load or update the photos based on the changed cat...
        for (let i=0; i<this.scrub.category.length; i++) {
          let _catObj = this.scrub.category[i];
          if (_catObj.name === _cat) {
            this.preparePhotos(_catObj.listing);
            break;
          }
        } // end -- for (scrub.category)
      } // end -- if (cat check)
    },
    getCategoryList: function () {
      let instance = this;
      if (!this.scrub) {
        setTimeout(function () {
          return instance.scrub.category;
        }, 200);
      } else {
        return instance.scrub.category;
      }
    },
    invokeCatChange: function (pickedCat) {
      return this.onCatChange({
        'cat': pickedCat
      });
    }

  },
  template: `
<div class="ph-side-nav">
    <div class="ph-hr-main"></div>
    <div class="h2 ph-display-name">{{scrub.author.display_name}}</div>
    
    <div class="ph-job-title">{{scrub.author.job_title}}</div>
    <div class="ph-bio" v-html="scrub.author.bio"></div>
    
    <div class="ph-hr-cat">
        <ph-cat-nav v-for="(item, idx) in scrub.category"
            v-bind:item="item"
            v-bind:idx="idx"
            v-bind:currentCat="currentCat"
            v-on:cat-change="onCatChange"
        ></ph-cat-nav>
    </div>
    
    <div class="ph-contact-core">
        <div class="ph-hr-contact"></div>
        <div>
            <i class="fas fa-envelope ph-contact-spacer core-pointer"></i><!--span style="margin-left: 8px;">{{scrub.contact.email}}</span-->
            <i class="fab fa-instagram ph-contact-spacer core-pointer"></i>
            <i class="fab fa-linkedin-in ph-contact-spacer core-pointer"></i>
        </div>
    </div>
    
    <!-- for smaller screens, need a fixed navigator menu at the very top -->
    <ph-cat-nav-small-menu 
        v-on:cat-change="onCatChange"
        v-bind:category="scrub.category"
    ></ph-cat-nav-small-menu>
</div>
  `
});

/**
 * category entries
 */
Vue.component('ph-cat-nav', {
  props: ['item', 'idx', 'currentCat'],
  methods: {
    getClass: function () {
      if (this.currentCat === '' && this.idx === 0) {
        return {
          'ph-hr-cat-name-selected': true
        }
      } else if (this.currentCat === this.item.name) {
        return {
          'ph-hr-cat-name-selected': true
        }
      }
      return {
        'ph-hr-cat-name-selected': false
      }
    },
    raiseCatChangeEvent: function () {
      this.$emit('cat-change', {
        cat: this.item.name
      });
    }

  },
  template: `
<div class="ph-hr-cat-name core-pointer"
    v-bind:class="getClass()"
    v-on:click="raiseCatChangeEvent()"
>
    {{item.name}}
</div>
  `
});

Vue.component('ph-cat-nav-small-menu', {
  props:['category'],
  data: function() {
    return {
      chosenCat: ''
    };
  },
  mounted: function() {
    if (this.category && this.category.length>0) {
      this.chosenCat = this.category[0].name;
    }
  },
  methods: {
    raiseCatChangeEvent: function (cat) {
      this.chosenCat = cat;
      this.$emit('cat-change', {
        cat: cat
      });
    },
    getChosenCatClass: function (itemCat) {
      if (itemCat === this.chosenCat) {
        return {
          'ph-cat-nav-menu-fixed-item-chosen': true
        };
      }
      return {
        'ph-cat-nav-menu-fixed-item-chosen': false
      };
    }

  },
  template: `
<div class="ph-cat-nav-menu-fixed-core">
    <a href="#"
        style="display: inline-block; color: #0b0b0b; text-align: center; padding: 14px; text-decoration: none;"
        v-for="item in category" 
        v-bind:class="getChosenCatClass(item.name)"
        v-on:click="raiseCatChangeEvent(item.name)">{{item.name}}</a>
    </ul>
</div>
  `
});
