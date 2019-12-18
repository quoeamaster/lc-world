/**
 * carousel component
 * sub-component(s):
 * - carousel-flyer
 */
Vue.component('carousel', {
  props: ['scrub'],
  data: function() {
    return {
      imgIdx: 0
    };
  },
  methods: {
    getFeatureImage: function () {
      if (this.scrub && this.scrub.length>0) {
        return this.scrub[this.imgIdx];
      }
      return '';
    },
    getImageIdx: function() {
      return this.imgIdx;
    },
    getFlyersLength: function () {
      if (this.scrub && this.scrub.length>0) {
        return this.scrub.length;
      }
      return 0;
    },
    onCarSwipeFlyer: function (data) {
      if (data) {
        this.imgIdx = data.idx;
      }
    }

  },
  template: `
<div class="car-core">
    <!-- inline-block or right -->
    <div class="car-flyer-container">
      <carousel-flyer
          v-bind:flyer="getFeatureImage()"
          v-bind:idx="getImageIdx()"
          v-on:car-swipe-flyer="onCarSwipeFlyer"
          v-bind:flyersAvailable="getFlyersLength()"
      ></carousel-flyer>
    </div>
</div>
  `
});


/**
 * carousel-flyer component
 */
Vue.component('carousel-flyer', {
  props: ['flyer', 'idx', 'flyersAvailable'],
  data: function() {
    return {
      // flag to determine should the flip happen
      // isFlipEventPerformed: false,
      // when did the last flip happened
      lastFlipTimestamp: new Date()
    };
  },
  watch: {
    flyer: function (val) {
      document.querySelector(".car-flyer-core").classList.remove("flipInX");
      setTimeout(function () {
          document.querySelector(".car-flyer-core").classList.add("flipInX");
      }, 10);
    }
  },
  mounted: function() {
    /* auto - swipe feature
    let instance = this;
    setInterval(function () {
      let duration = new Date() - instance.lastFlipTimestamp;
      if (duration >= 5000) {
        instance.raiseNextWipeFlyerEvent();
      }
    }, 1000);
    */
  },
  methods: {
    getFlyerStyle: function () {
      //let _top = this.idx * (-500);
      //let _left = this.idx * (800);
      return {
        "background-image": "url('" + this.flyer + "')",
        "position": "relative",
        "float": "right",
        //"top": _top + "px",
        //"left": _left + "px"
      };
    },
    getDotClass: function(idx) {
      if (idx === this.idx) {
        return {
          "fas": true,
          "fa-circle": true,
        };
      }
      return {
        "far": true,
        "fa-circle": true,
      };
    },
    raiseSwipeFlyerEvent: function (idx) {
      if (idx !== this.idx) {
        this.lastFlipTimestamp = new Date();
        this.$emit('car-swipe-flyer', {
          "idx": idx,
        });
      }
    },
    raisePreviousWipeFlyerEvent: function () {
      this.lastFlipTimestamp = new Date();
      if (this.idx === 0) {
        this.$emit('car-swipe-flyer', {
          "idx": (this.flyersAvailable - 1),
        })
      } else {
        this.$emit('car-swipe-flyer', {
          "idx": (this.idx - 1),
        })
      }
    },
    raiseNextWipeFlyerEvent: function () {
      this.lastFlipTimestamp = new Date();
      if (this.idx < (this.flyersAvailable - 1)) {
        this.$emit('car-swipe-flyer', {
          "idx": (this.idx + 1),
        })
      } else {
        this.$emit('car-swipe-flyer', {
          "idx": 0,
        })
      }
    }
  },
  template: `
<div class="car-flyer-core animated fadeIn"
    style="-webkit-animation-duration: 2.5s; -moz-animation-duration: 2.5s;" 
    v-bind:style="getFlyerStyle()">
    <!-- left cursor -->
    <div class="car-swipe-left car-control-color-1 core-pointer" 
        v-on:click="raisePreviousWipeFlyerEvent()">
      <i class="fas fa-angle-left"></i>
    </div>
    <!-- right cursor -->
    <div class="car-swipe-right car-control-color-1 core-pointer" 
        v-on:click="raiseNextWipeFlyerEvent()">
      <i class="fas fa-angle-right"></i>
    </div>
    <!-- dots -->
    <div class="car-dots car-control-color-2">
        <i v-for="(val, idx) in flyersAvailable"
            v-on:click="raiseSwipeFlyerEvent(idx)"
            v-bind:class="getDotClass(idx)"
            class="car-dots-spacer-1 core-pointer"></i>
    </div>
</div>
  `
});


