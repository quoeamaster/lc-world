
Vue.component('card-listing', {
  props: ['listing'],
  template: `
<div class="container cd-core-before">
  <div class="row">
    <div v-for="item in listing" class="col-2 col-lg-3 col-md-3 col-sm-12">
        <card v-bind:presentation="item"
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
  template: `
<div class="cd-container">
    <div class="">
        <img v-bind:src="getPresentationImg()"
            v-bind:class="getPresentatonImgClass()"
            v-on:mouseover="acceptHoverEvent()" 
            v-on:mouseleave="acceptHoverLeaveEvent();" 
            class="cd-preview core-pointer">
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
