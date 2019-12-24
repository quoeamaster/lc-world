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
        this.preparePhotos(_firstCat.listing);
      }
    }
  },
  methods: {
    preparePhotos: function(listing) {
// TODO:
// TODO:
// TODO:
// TODO:
      window.eventBus.$emit('update-photo-displays', {
        cat: this.currentCat,
        listing: listing
      });
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
