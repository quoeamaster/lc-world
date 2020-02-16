Vue.component('giant-list', {
  props: ['listing'],
  watch: {
    listing: function (val) {
      // load img list....
      let inst = this;
      setTimeout(function () {
        inst.lenIListMap = Object.keys(inst.iListMap).length;
        inst.getSelectedImgList('all');
      }, 1500);
      this.listing.forEach(function (item) {
        if (item.id !== 'all') {
          setTimeout(function () {
            $.getJSON('./../scrubs/'+item.id, function (data) {
              inst.iListMap[item.id] = data;
              // preload image(s)
              if (data) {
                data.forEach(function (item) {
                  //addCacheWrapper("../portfolio"+item.thumb);
                  /*
                  if (item.hasOwnProperty("thumbs")) {
                    item.thumbs.forEach(function (t) {
                      window.cacheObject.add("../portfolio"+t.img, "../portfolio"+t.img);
                    }); // end -- forEach (thumbs)
                  } // end -- if (contains thumbs)
                  */
                });
              } // end -- if (data is valid)

            });
          }, Math.random()*1500);
        }
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

      // the modal dlg item for display
      modalDlgItem: {},

      shouldShowBackToTop: false
    };
  },
  mounted: function() {
    window.eventBus.$on('onCatChange', this.onCatChange);
    window.addEventListener('scroll', this.onscroll);
  },
  destroyed: function() {
    window.removeEventListener('scroll', this.onscroll);
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
        // preload
        /*
        if (this.selectedImgList && this.selectedImgList.length > 0) {
          this.selectedImgList.forEach(function (item) {
            window.cacheObject.add("../portfolio"+item.thumb, "../portfolio"+item.thumb);
            // story thumbs????
            if (item.hasOwnProperty("thumbs")) {
              item.thumbs.forEach(function (iT) {
                window.cacheObject.add("../portfolio"+iT.img, "../portfolio"+iT.img);
              });
            } // end -- if (thumbs / story)
          })
        } // end -- if (preload)
        */
      } else {
        // all means everything.... (the 1st item in each category)
        if (this.allImgList.length === 0) {
          let keys = Object.keys(this.iListMap);
          let inst = this;
          keys.forEach(function (k) {
            let cList = inst.iListMap[k];
            if (cList && cList.length>0) {
              // only the 1st content
              inst.allImgList = inst.allImgList.concat(cList[0]);
              addCacheWrapper("../portfolio"+cList[0].thumb);
              //window.cacheObject.add("../portfolio"+cList[0].thumb, "../portfolio"+cList[0].thumb);
            }
            // all... contents
            //inst.allImgList = inst.allImgList.concat(inst.iListMap[k]);
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
    onShowModalDetails: function(data) {
      this.modalDlgItem = data;
    },
    scrollToTop: function() {
      window.scrollTo(0, 0);
    },
    onscroll: function(e) {
      let windowH = window.innerHeight; //document.body.clientHeight;
      let currentScroll = document.body.scrollTop; //document.documentElement.scrollTop;
      let icon = document.querySelector('._gl_back_top_');
      // TODO: hard code for the moment
      windowH = 200;
      if (currentScroll >= windowH) {
        icon.style.display = 'block';
      } else {
        icon.style.display = 'none';
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
    },
    getBackToTopLocation: function () {
      return {
        position: 'fixed',
        bottom: '40px',
        right: '20px',
        'z-index': 5
      };
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
          <div v-for="item in selectedImgList" 
            class="col-4 col-md-4 col-sm-12">
             <gl-card-item
              v-on:onShowModalDetails="onShowModalDetails" 
              v-bind:item="item" 
              v-bind:cat="selectedCat"></gl-card-item>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- modal dialog -->
  <gl-details-modal v-bind:item="modalDlgItem" v-on:onShowModalDetails="onShowModalDetails"></gl-details-modal>
  <!-- scroll to top -->
  <div class="float-right" v-bind:style="getBackToTopLocation()">
    <img src="/portfolio/others/backToTop.png"
      v-on:click="scrollToTop()" 
      style="width: 60px; display: none;" 
      class="core-pointer _gl_back_top_" />
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
    let inst = this;
    /*
    setTimeout(function () {
      window.cacheObject.add("./../portfolio/"+inst.item.thumb, "./../portfolio/"+inst.item.thumb);
    }, Math.random()*200);*/
    // TODO: check performance => findings loading the non exist scrubs would make the images loading longer
    // TODO: findings => no cache is faster to load images if scrubs are missing...
    window.cacheObject.add("./../portfolio/"+inst.item.thumb, "./../portfolio/"+inst.item.thumb);
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
    },

    // *** ui ***
    displayDetails: function () {
      this.$emit('onShowModalDetails', this.item);
    }

  },
  template: `
<div class="gl-card-item" v-bind:style="getContainerStyle()">
  <div class="gl-card-item-img core-pointer"
    v-on:click="displayDetails()" 
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

/**
 * modal dialog
 */
Vue.component('gl-details-modal', {
  props: ["item"],
  watch: {
    item: function(val) {
      this.selectedItem = val;
    }
  },
  data: function() {
    return {
      selectedItem: {}
    };
  },
  methods: {
    // *** css ***
    getContainerClass: function () {
      if (this.selectedItem && this.selectedItem.hasOwnProperty('cat')) {
        $('body').css('overflow', 'hidden');
      }
      return {
        'gl-modal-container-show': (this.selectedItem && this.selectedItem.hasOwnProperty('cat'))?true:false,
        'gl-modal-container-hide': (this.selectedItem && this.selectedItem.hasOwnProperty('cat'))?false:true,
      };
    },

    // ** handler **
    closeDlg: function () {
      $('body').css('overflow', 'auto');
      this.selectedItem = {};
      this.$emit('onShowModalDetails', {}); // reset selected item
    },

    // *** content ***
    getHeaderDesc: function() {
      if (this.item.hasOwnProperty("desc")) {
        if (this.item.desc !== '') {
          return this.item.desc;
        }
      }
      return "&nbsp;";
    },
    getSoftwareList: function () {
      let s = [];
      if (this.item.hasOwnProperty("software")) {
        this.item.software.forEach(function (item) {
          s.push('/portfolio' + item);
        });
      }
      return s;
    }

  },
  computed: {
    pickInnerComponent: function () {
      let c = '';
      if (this.item) {
        if (this.item.hasOwnProperty('thumbs')) {
          c = "gl-story-display";
        } else {
          c = "gl-single-image-display";
        }
      }
      return c;
    }

  },
  template: `
<div v-on:click="closeDlg()">
  <div id="_gl_dlg_" class="gl-modal-container" v-bind:class="getContainerClass()">
    <span class="gl-modal-x core-pointer" v-on:click="closeDlg()">&times;</span>
    <!--img class="modal-content" id="img01">
    <div id="caption"></div-->
    <div class="gl-modal-display-container">
      <div class="gl-modal-header-text">
        <div style="display: inline-block;"><span v-html="getHeaderDesc()"></span></div>
        <div style="display: inline-block;" class="float-right">
          <img v-for="s in getSoftwareList()" v-bind:src="s" class="gl-modal-header-img" />
        </div>
      </div>
      <component :is="pickInnerComponent" v-bind:item="item"></component>
    </div>
  </div> 
</div>
  `
});

Vue.component('gl-single-image-display', {
  props: ['item'],
  methods: {
    getImgSrc: function () {
      return "/portfolio" + this.item.thumb;
    }
  },
  template: `
<div>
  <img v-bind:src="getImgSrc()" style="width: 100%;"/>
  <div class="gl-modal-detail-caption">{{item.desc}}</div>
</div>  
  `
});

Vue.component('gl-story-display', {
  props: ['item'],
  methods: {
    getImgSrc: function (item) {
      return '/portfolio' + item.img;
    },
    getDesc: function (item) {
      if (item.desc && item.desc !== '') {
        return item.desc;
      } else {
        return "&nbsp;";
      }
    }
  },
  template: `
<div style="margin-bottom: 40px;">
  <div v-for="i in item.thumbs">
    <img v-bind:src="getImgSrc(i)" style="width: 100%;"/>
    <div class="gl-modal-story-caption" v-html="getDesc(i)"></div>
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
