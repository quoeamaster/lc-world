
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

Vue.component('carousel-flyer', {
  props: ['flyer', 'idx', 'flyersAvailable'],
  watch: {
    flyer: function (val) {
      document.querySelector(".car-flyer-core").classList.remove("fadeIn");
      setTimeout(function () {
          document.querySelector(".car-flyer-core").classList.add("fadeIn");
      }, 10);
    }
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
        this.$emit('car-swipe-flyer', {
          "idx": idx,
        });
      }
    }

  },
  template: `
<div class="car-flyer-core animated fadeIn"
    style="-webkit-animation-duration: 2.5s; -moz-animation-duration: 2.5s;" 
    v-bind:style="getFlyerStyle()">
    <!--div class="car-swipe-left">
      <i class="fas fa-angle-left"></i>
    </div -->
    <div class="car-dots">
        <i v-for="(val, idx) in flyersAvailable"
            v-on:click="raiseSwipeFlyerEvent(idx)"
            v-bind:class="getDotClass(idx)"
            class="car-dots-spacer-1 core-pointer"></i>
    </div>
</div>

  `
});

// background-image: url('/w3images/photographer.jpg');
