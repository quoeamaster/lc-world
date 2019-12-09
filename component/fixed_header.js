/**
 * fixed header component
 */
Vue.component('fixed-header', {
  data: function() {
    return {
      labels: [
        {label: 'Portraits', 'link': '#tbd'},
        {label: 'Sketches', 'link': '#tbd'},
        {label: 'Photos', 'link': '#tbd'},
        {label: 'Awards', 'link': '#tbd'}
      ]
    };
  },
  template: `
<div class="fh-core fh-sticky">
    <div class="float-left">Welcome to Lilian.C's world</div>
    
    <fixed-header-label 
        v-for="label in labels"
        v-bind:label="label"
    ></fixed-header-label>
</div>

  `
});

/**
 * label for the fixed-header
 */
Vue.component('fixed-header-label', {
  props: ['label'],
  template: `
<div class="core-pointer float-right fh-font-1 fh-label-1" v-on:click="onLinkClick();">{{label.label}}</div>
  `,
  methods: {
    onLinkClick: function () {
      console.log(this.label.label + ' => ' + this.label.link);
      alert('TBD');
    }
  }
});


