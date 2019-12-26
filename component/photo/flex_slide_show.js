
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
      // is pop-up init(ed)
      // isPopupInited: false
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
    // calculate the height for the slide show area
    this.calculateSlideShowDivHeight();
    // resize event
    window.onresize = function() {
      instance.calculateSlideShowDivHeight();
    };
    // add back lighbox feature to the photos
    setTimeout(function () {
      instance.addLightBoxEffectOnImages();
    }, 500);
  },
  methods: {
    /**
     * method to add back lightbox effects on images; when to call?
     * a. during init (mounted)
     * b. when the category list (columns) changed
     */
    addLightBoxEffectOnImages: function() {
      setTimeout(function () {
        jQuery('.meta-lightbox').magnificPopup({
          type: 'image',
          closeOnContentClick: true,
          closeBtnInside: false,
          fixedContentPos: true,
          image: {
            verticalFit: true
          },
          zoom: {
            enabled: true,
            duration: 300
          }
          // other options
        });
      }, Math.random()*1000);
    },
    calculateSlideShowDivHeight: function() {
      // media query match check -- only need to set the height when screen big enough; for mobile, let it scroll freely
      if (!window.matchMedia("(max-width: 600px)").matches) {
        let docHeight = document.querySelector("body").clientHeight;
        let headerHeight = document.querySelector(".fh-core").clientHeight;
        let coreSpace1Height = document.querySelector('.core-spacer-1').clientHeight;
        // console.log(docHeight, "vs", headerHeight, "vs", coreSpace1Height, " required height for slide view -> ", (docHeight-headerHeight-coreSpace1Height));
        document.querySelector('.ph-slide-core').style.height = (docHeight-headerHeight-coreSpace1Height)+"px";
      }

    },
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
      // re-apply lightbox effects on the images
      this.addLightBoxEffectOnImages();
    },
    onPopupInit: function(data) {
      if (this.isPopupInited === false) {
        this.isPopupInited = true;
        setTimeout(function () {
          jQuery(data['className']).magnificPopup({
            type: 'image',
            closeOnContentClick: true,
            closeBtnInside: false,
            fixedContentPos: true,
            image: {
              verticalFit: true
            },
            zoom: {
              enabled: true,
              duration: 300
            }
            // other options
          });
        }, 500);
      }
    }

  },
  template: `
<div class="ph-slide-core">
    <div class="ph-slide-core-inner">
        <div class="ph-flex-row">
            <div class="ph-flex-column">
                <a class="meta-lightbox"
                    v-for="item in column_1"
                    v-bind:href="item.img"
                >
                    <img v-bind:src="item.img"
                        class="ph-flex-slide-img core-pointer meta-lightbox">
                </a>
                <!--a class="meta-lightbox" v-bind:href="item.img">
                    <img v-for="item in column_1"
                        v-bind:src="item.img"
                        class="ph-flex-slide-img core-pointer meta-lightbox"
                    >
                </a-->
            </div>
            
            <div class="ph-flex-column">
                <a class="meta-lightbox"
                    v-for="item in column_2"
                    v-bind:href="item.img"
                >
                    <img v-bind:src="item.img"
                        class="ph-flex-slide-img core-pointer meta-lightbox">
                </a>
            </div>
            
            <div class="ph-flex-column">
                <a class="meta-lightbox"
                    v-for="item in column_3"
                    v-bind:href="item.img"
                >
                    <img v-bind:src="item.img"
                        class="ph-flex-slide-img core-pointer meta-lightbox">
                </a>
            </div>
        </div> <!-- row -->
    </div>
</div>
  `
});
