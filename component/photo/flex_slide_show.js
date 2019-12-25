
Vue.component('ph-flex-slide-show', {
  data: function() {
    return {
      srcListing: [],
      currentCat: '',
      // actual column of images for the slide show
      column_1: [],
      column_2: [],
      column_3: [],

      COLS: 3
    };
  },
  mounted: function() {
    let instance = this;
    if (!window.eventBus) {
      setTimeout(function () {
        window.eventBus.$on('update-photo-displays', function (data) {
          instance.onUpdatePhotoDisplays(data);
        });
      }, 100);
    } else {
      window.eventBus.$on('update-photo-displays', function (data) {
        instance.onUpdatePhotoDisplays(data);
      });
    }

  },
  methods: {
    onUpdatePhotoDisplays: function (data) {
      // should have "cat", "listing"
      this.srcListing = data.listing;
      this.currentCat = data.cat;
      // separate the src-listing items into 3 columns of img(s)
      this.column_1 = [];
      this.column_2 = [];
      this.column_3 = [];

      for (let i=0; i<this.srcListing.length; i++) {
        let _pick = i % this.COLS;
        switch (_pick) {
          case 0:
            this.column_1.push(this.srcListing[i]);
            break;
          case 1:
            this.column_2.push(this.srcListing[i]);
            break;
          case 2:
            this.column_3.push(this.srcListing[i]);
            break;
        }
      } // end -- for (srcListing items)
    }

  },
  template: `
<div class="ph-slide-core">
    <div class="ph-flex-row">
        <div class="ph-flex-column">
            <img v-for="item in column_1"
                v-bind:src="item.img"
                class="ph-flex-slide-img core-pointer"
            >
        </div>
        
        <div class="ph-flex-column">
            <img v-for="item in column_2"
                v-bind:src="item.img"
                class="ph-flex-slide-img core-pointer"
            >
        </div>
        
        <div class="ph-flex-column">
            <img v-for="item in column_3"
                v-bind:src="item.img"
                class="ph-flex-slide-img core-pointer"
            >
        </div>
    </div> <!-- row -->
</div>
  `
});
