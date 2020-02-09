/*
 *  portfolio menu; provides a way to filter portfolio artworks based on the pick
 */
Vue.component('portfolio-menu', {
  props: ['listing'],
  watch: {
    listing: function (val) {}
  },
  data: function() {
    return {
      // cat(egory) picked, Featured is the "awards" value
      "id": "all",
      // list of awards available category(s) - dynamic
      'catList': [],

      // actual optionDiv's width
      optionDivWidth: 0,
      optionDivEl: null, // dom element of the optionDiv
      scrollDelta: 40,

      shouldOptionAdvShow: false

    };
  },
  methods: {
    // *** handlers *** //
    onLeftArrowClick: function() {
      if (this.optionDivWidth === 0) {
        this.optionDivWidth = this.calculateOptionDivWidth();
      }
      // current location
      let loc = this.optionDivEl.scrollLeft;
      if ((loc - this.scrollDelta) < 0) {
        loc = 0;
      } else {
        loc = loc - this.scrollDelta;
      }
      this.optionDivEl.scrollLeft = loc;
    },
    onRightArrowClick: function() {
      if (this.optionDivWidth === 0) {
        this.optionDivWidth = this.calculateOptionDivWidth();
      }
      // current location
      let loc = this.optionDivEl.scrollLeft;
      if ((loc + this.scrollDelta) > this.optionDivWidth) {
        loc = this.optionDivWidth;
      } else {
        loc = loc + this.scrollDelta;
      }
      this.optionDivEl.scrollLeft = loc;
    },
    calculateOptionDivWidth: function() {
      if (!this.optionDivEl) {
        this.optionDivEl = document.querySelector(".pmenu-options-container");
      }
      if (this.optionDivEl) {
        return this.optionDivEl.clientWidth;
      }
      return 0;
    },

    onCategoryClick: function(item) {
      this.id = item.id;
      this.shouldOptionAdvShow = false; // close the hidden tab
      // TODO: raise event to update the contents based on id
      window.eventBus.$emit('onCatChange', {
        id: this.id,
      });
    },
    onMoreClick: function() {
      // show the hidden menu
      this.shouldOptionAdvShow = !this.shouldOptionAdvShow;
    },


    // *** css methods *** //
    getMenuCoreWidth: function () {
      // 40 per button + 20 padding + 1x40 ... button
      return {
        width: (document.querySelector("body").clientWidth - 160)+'px'
      };
    },
    getLabelClass: function (id) {
      let c = {
        'pmenu-option-label-selected': false
      };
      if (id === this.id) {
        c['pmenu-option-label-selected'] = true;
      }
      return c;
    },
    getLabelContainerClass: function(id) {
      let c = {
        'pmenu-option-selected': false
      };
      if (id === this.id) {
        c['pmenu-option-selected'] = true;
      }
      return c;
    },
    getAdvanceOptionStyle: function () {
      let hWidth = 840;
      // PS: transition ONLY works for attribute changes e.g. height from 0 to 300px
      return {
        // 500 is width, but 20 is padding
        'margin-left': (document.querySelector('body').clientWidth - hWidth - 28)+'px',
        "overflow": "hidden",
        "height": (this.shouldOptionAdvShow === true)?'300px':'0'
      };
    },
    getAdvanceOptionBtnStyle: function (item) {
      return {
        "background-image": 'url("../'+item.thumb+'")'
      };
    }

  },
  template: `
<div id="_portfolio_" class="pmenu-core">
  <!-- left arrow -->
  <div class="pmenu-dpad pmenu-dpad-40 core-pointer core-no-hilight" v-on:click="onLeftArrowClick()">
    <i class="fas fa-angle-left pmenu-dpad-icon-40" style="font-size: 1.1em;"></i>
  </div>
  <!-- options list -->
  <div class="pmenu-options-container core-no-hilight" v-bind:style="getMenuCoreWidth()">
    <div class="pmenu-option core-pointer" v-for="item in listing" v-bind:class="getLabelContainerClass(item.id)" v-on:click="onCategoryClick(item)">
      <span class="pmenu-option-label" v-bind:class="getLabelClass(item.id)">{{item.label}}</span> 
    </div>
  </div>
  <!-- right arrow -->
  <div class="pmenu-dpad pmenu-dpad-40 core-pointer core-no-hilight" v-on:click="onRightArrowClick()">
    <i class="fas fa-angle-right pmenu-dpad-icon-40" style="font-size: 1.1em;"></i>
  </div>
  <!-- more button -->
  <div class="pmenu-dpad-dot-btn pmenu-dpad-40 core-pointer" v-on:click="onMoreClick()">...</div>
  
  <!-- hidden advance menu -->
  <div class="pmenu-advance-option-container" v-bind:style="getAdvanceOptionStyle()">
    <div style="overflow: scroll; width: 840px; height: 300px; padding: 20px; margin: auto;">
      <div v-for="item in listing"
        v-on:click="onCategoryClick(item)" 
        class="pmenu-advance-option core-pointer"
        v-bind:style="getAdvanceOptionBtnStyle(item)">
        {{item.label}}
      </div>
    </div>
  </div>
</div>
  `
});

