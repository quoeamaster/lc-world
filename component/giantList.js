Vue.component('giant-list', {
  props: ['listing'],
  watch: {
    listing: function (val) {
      // load img list....
      let inst = this;
      setTimeout(function () {
        inst.lenIListMap = Object.keys(inst.iListMap).length;
        inst.getSelectedImgList('all');
      }, 1000);
      this.listing.forEach(function (item) {
        $.getJSON('./../scrubs/'+item.id, function (data) {
          inst.iListMap[item.id] = data;
        });
      });
    }
  },
  data: function() {
    return {
      iListMap: {},
      lenIListMap: 0,

      // default category / id === 'all'
      selectedCat: 'all',
      selectedImgList: [],  // img-list per selected cat
      allImgList: [],  // all category

      selectedCatItem: {},
    };
  },
  mounted: function() {
    window.eventBus.$on('onCatChange', this.onCatChange);
  },
  methods: {
    onCatChange: function (data) {
      if (this.selectedCat !== data.id) {
        this.selectedCat = data.id;
        this.getSelectedImgList(data.id);
      } else if (this.selectedCat === 'all') {
        this.getSelectedImgList(data.id);
      }
    },
    getSelectedImgList: function (cat) {
      // update the img list
      if (cat !== 'all') {
        console.log('not all');
        this.selectedImgList = this.iListMap[this.selectedCat];
      } else {
        // all means everything....
        if (this.allImgList.length === 0) {
          let keys = Object.keys(this.iListMap);
          let inst = this;
          keys.forEach(function (k) {
            inst.allImgList = inst.allImgList.concat(inst.iListMap[k]);
          }); // end -- forEach(keys)
        }
        this.selectedImgList = this.allImgList;
      } // end -- if (cat === 'all')
      // update the selected cat item
      for (let i=0; i<this.listing.length; i++) {
        let item = this.listing[i];
        if (item.id === this.selectedCat) {
          this.selectedCatItem = item;
          break;
        }
      }
    },


    // ** css ** //
    getGlContainerStyle: function () {
      return {
        display: (this.selectedCatItem && this.selectedCatItem.hasOwnProperty("id"))?'block':'none',
        width: parseInt(window.globalWindowDimensions.width * 0.8, 10)+'px'
      };
    },
    getGlCardContainerStyle: function () {
      return {};
    }

  },
  template: `
<div>
  <div class="gl-container" v-bind:style="getGlContainerStyle()">
    <div class="gl-title-1">{{selectedCatItem.label}}</div>
    <div class="gl-title-2">{{selectedCatItem.desc}}</div>
    
    <div class="gl-card-container" v-bind:style="getGlCardContainerStyle()">
      <!-- for loop on selectedImgList -->
    </div>
     
     
  </div>

  {{selectedCat}}
  list =>
  {{selectedImgList}}<p/>
  
  <div v-for="(lst, key) in iListMap">
    {{key}} => {{lst}}
  </div>
  <!-- weird bug... the reason might be... getJSON is not a promise; hence the core UI thread is not triggered for an update -->
  <input type="hidden" v-bind:value="lenIListMap" />
</div>
  `
});

/*
        // the promise way
        let _promise = $.Deferred();
        $.when($.getJSON('./../scrubs/'+item.id)).done(
          function (data) {
            _promise.resolve(data);
          }
        );
        _promise.done(function (data) {
          console.log(data);
          inst.iListMap[item.id] = data;
        });
 */
