/**
 * listing of card(s)
 */
Vue.component('card-listing', {
  props: ['listing'],
  data: function() {
    return {
      isPopupInited: false,
      // cat == 'Featured' is the DEFAULT
      cat: 'Featured'
    };
  },
  mounted: function() {
    let instance = this;
    /*
     *  there is a chance that the eventBus is not yet initialized; hence wait for 500ms
     */
    if (!window.eventBus) {
      setTimeout(function () {
        window.eventBus.$on('on-category-change', function (data) {
          instance.onCategoryChange(data);
        });
      }, 500);
    } else {
      window.eventBus.$on('on-category-change', function (data) {
        instance.onCategoryChange(data);
      });
    }
  },
  methods: {
    onCategoryChange: function(data) {
      if (data) {
        // possible values '', awards, photos, sketches
        this.cat = data.cat;
      }
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
    },
    getCardId: function(idx) {
      return '__card__'+idx;
    },
    _getAnimationClass: function(item, idx, cardObj) {
      // should be "Featured" instead of '' (HARD-CODED)
      // this.cat === '' ||
      //  || this.cat === 'Featured'
      if (this.cat === item.cat) {
        console.log('cat matched', cardObj.attr('id'));
        cardObj.addClass('core-display-block').removeClass('core-display-none');
        cardObj.addClass('zoomIn').removeClass('zoomOut');
      } else {
        console.log(cardObj.attr('id'));
        cardObj.addClass('zoomOut').removeClass('zoomIn');
        cardObj.addClass('core-display-none').removeClass('core-display-block');
      }
    },
    getAnimationClass: async function (item, idx) {
      /*
      let instance = this;
      let pCardObj = new Promise(function (resolve) {
        setTimeout(function () {
          let cardObj = jQuery('#'+instance.getCardId(idx));
          //console.log(cardObj.attr('id'));
          resolve(cardObj);
        }, 100);
      });
      let realCardObj = null;
      await pCardObj.then(function (data) {
        realCardObj = data;
        instance._getAnimationClass(item, idx, realCardObj);
      });
      */


      /*
      let instance = this;
      let cardObj = jQuery('#'+instance.getCardId(idx));
      if (!cardObj) {
        setTimeout(function () {
          cardObj = jQuery('#'+instance.getCardId(idx));
          instance._getAnimationClass(item, idx, cardObj);
        }, 500);
      } else {
        this._getAnimationClass(item, idx, cardObj);
      }
      */
    }

  },
  template: `
<div class="container cd-core-before">
  <div class="row">
    <div v-for="(item, idx) in listing"
        v-bind:id="getCardId(idx)"
        class="animated col-lg-3 col-md-4 col-sm-12 core-display-none"
        v-bind:class="getAnimationClass(item, idx)"
        style="-webkit-animation-duration: 0.6s; -moz-animation-duration: 0.6s;" >
        <card v-bind:presentation="item"
            v-on:popup-init="onPopupInit"
        ></card>    
    </div>

  </div>
</div>
  `
});
/**
 * TODO:
 * TODO:
 * TODO:
 *  1. listing should be "updated" based on "cat" (default cat is "Featured")
 *  2. the updated list / card would have the animation effects...
 */

/**
 * card - presenting a particular portfolio
 */
Vue.component('card', {
  props: ['presentation'],
  data: function() {
    return {
      isHovered: false,
      isCatMatch: true,
      previousCatMatch: true,
      shouldDisplayNone: false
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
<div class="cd-container" >
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
