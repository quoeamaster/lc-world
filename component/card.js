
Vue.component('card-listing', {
  props: ['listing'],
  data: function() {
    return {
      isPopupInited: false
    };
  },
  methods: {
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
<div class="container cd-core-before">
  <div class="row">
    <div v-for="item in listing"
        class="col-2 col-lg-3 col-md-3 col-sm-12">
        <card v-bind:presentation="item"
            v-on:popup-init="onPopupInit"
        ></card>    
    </div>

  </div>
</div>
  `
});

Vue.component('card', {
  props: ['presentation'],
  data: function() {
    return {
      isHovered: false
    };
  },
  mounted: function() {
    let instance = this;
    setTimeout(function () {
      instance.$emit('popup-init', {
        'className': '.meta-lightbox'
      });
    }, 100+(Math.random() * 1000));
  },
  template: `
<div class="cd-container">
    <div class="">
        <a class="meta-lightbox" v-bind:href="getPresentationImg()">
          <img v-bind:src="getPresentationImg()"
              v-bind:class="getPresentatonImgClass()"
              v-on:mouseover="acceptHoverEvent()" 
              v-on:mouseleave="acceptHoverLeaveEvent();" 
              class="cd-preview core-pointer-zoom-in meta-lightbox">
          <!-- div class="cd-content-pane">{{getPresentationContent()}}</div -->
        </a>
        <div style="text-align: center; margin-top: 4px;">{{presentation.title}}</div>
    </div>
</div>
  `,
  methods: {
    getPresentationImg: function () {
      if (this.presentation) {
        return this.presentation.preview;
      }
      return '';
    },
    getPresentationContent: function() {
      if (this.presentation) {
        // is it empty or null?
        var content = this.presentation['content'];
        if (!content || content === '') {
          return '';
        }
        return content;
      }
      return "";
    },
    acceptHoverEvent: function () {
      this.isHovered = true;
    },
    acceptHoverLeaveEvent: function () {
      this.isHovered = false;
    },
    getPresentatonImgClass: function() {
      if (this.isHovered) {
        return {
          "cd-preview-hover": true
        };
      }
      return {
        "cd-preview-hover": false
      };
    }

  }
});
