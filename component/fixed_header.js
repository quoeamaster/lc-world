/**
 * fixed header component
 */
Vue.component('fixed-header', {
  data: function() {
    return {
      labels: [
        {label: 'Links',      'link': '_link_'},
        {label: 'Contact',    'link': '_contact_'},
        {label: 'Resume',     'link': '_resume_'},
        {label: 'About me',   'link': '_about_'},
        {label: 'Portfolio',  'link': '_portfolio_'}
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
<div class="float-right fh-font-1 fh-label-1" v-on:click="onLinkClick();">
    <a v-bind:href="getLink()">{{label.label}}</a>
</div>
  `,
  methods: {
    onLinkClick: function () {
      //console.log(this.label.label + ' => ' + this.label.link);
      //alert('TBD');
      return true;
    },
    getLink: function () {
      return '#' + this.label.link;
    }
  }
});


