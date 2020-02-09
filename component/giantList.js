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
      this.selectedImgList = [];
      // update the img list
      if (cat !== 'all') {
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
        width: parseInt(window.globalWindowDimensions.width * 1.0, 10)+'px'
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
      <div class="container-fluid">
        <div class="row">
<!-- TODO: should change the col-x when media query shows a small width device -->
          <div v-for="item in selectedImgList" 
            class="col-4 col-md-4 col-sm-12">
             <gl-card-item v-bind:item="item" v-bind:cat="selectedCat"></gl-card-item>
          </div>
        </div>
      </div>
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

Vue.component('gl-card-item', {
  props: ['item', 'cat'],
  data: function () {
    return {
      containerH: 100,
      // internal image's dimensions
      imgDimen: {
        w: 100,
        h: 100
      }
    };
  },
  mounted: function() {
    let e = document.querySelectorAll('.gl-card-item');
    for (let i=0; i<e.length; i++) {
      let el = e[i];
      this.containerH = el.clientWidth;
    } // end -- for (e.length)

    // pre-render
    /*let inst = this;
    setTimeout(function () {
      window.cacheObject.add("./../portfolio/"+inst.item.thumb, "./../portfolio/"+inst.item.thumb);
    }, Math.random()*200);*/

  },
  methods: {

    // ** css **
    getContainerStyle: function () {
      return {
        'height': this.containerH
      };
    },
    getImgDivStyle: function () {
      this.imgDimen.w = this.containerH-20;
      this.imgDimen.h = this.imgDimen.w-40;
      return {
        "background-image": "url('./../portfolio/"+this.item.thumb+"')",
        "width": this.imgDimen.w,
        "height": this.imgDimen.h,
      };
    },
    getCardItemCatLabelStyle: function () {
      return {
        'display': (this.cat === 'all')?'inline-block':'none'
      };
    }

  },
  template: `
<div class="gl-card-item" v-bind:style="getContainerStyle()">
  <div class="gl-card-item-img core-pointer"
    v-on:click="" 
    v-bind:style="getImgDivStyle()"></div>
  <div class="text-truncate" style="height: 40px; line-height: 40px; vertical-align: middle; margin-top: 6px; margin-bottom: 6px;">
    <!-- v-bind:style="getCardItemCatLabelStyle()" -->
    <!-- span class="gl-card-item-category-label">{{item.cat}}</span -->
    <!--  {{item.thumb}} -->
    <!-- span class="gl-card-item-label">{{item.desc}}</span -->
    <div class="gl-card-item-label">{{item.desc}}</div>
  </div>
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
