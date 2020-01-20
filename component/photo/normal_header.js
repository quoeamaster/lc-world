/**
 * fixed header component
 */
Vue.component('norm-header', {
  data: function() {
    return {
      labels: [
        //{label: 'Links',      'link': '_link_'},
        {label: 'Contact',    'link': 'index.html#_contact_'},
        //{label: 'Resume',     'link': '_resume_'},
        {label: 'About me',   'link': 'index.html#_about_'},
        {label: 'Portfolio',  'link': 'index.html#_portfolio_'}
      ],
      isBurgerMenuShown: false
    };
  },
  methods: {
    onShowBurgerMenu: function () {
      let menuObj = document.querySelector(".fh-hamburger-list");
      if (menuObj) {
        if (this.isBurgerMenuShown === false) {
          menuObj.classList.add('slideInDown');
          menuObj.classList.remove('rotateOutUpLeft');
          menuObj.style.display = "inline-block";
        } else {
          menuObj.classList.add('rotateOutUpLeft');
          menuObj.classList.remove('slideInDown');
          setTimeout(function () {
            menuObj.style.display = "none";
          }, 200);

        } // end -- if ()
        this.isBurgerMenuShown = !this.isBurgerMenuShown;
      }
    },
    getLink: function (label) {
      return 'index.html'+label;
    }

  },
  template: `
<div class="fh-core norm-header-sticky">
    <div class="float-left">Welcome to Lilian.C's world</div>
    
    <!-- hamburger icon -->
    <fixed-hamburger v-on:show-burger-menu="onShowBurgerMenu"></fixed-hamburger>
    
    <fixed-header-label 
        v-for="label in labels"
        v-bind:label="label"
    ></fixed-header-label>
    
    <div class="fh-hamburger-list core-pointer animated" style="z-index: 100;">
      <ul>
          <li><a v-bind:href="getLink('#_portfolio_')" v-on:click="onShowBurgerMenu()">Portfolio</a></li>
          <li><a v-bind:href="getLink('#_about_')" v-on:click="onShowBurgerMenu()">About Me</a></li>
          <li><a v-bind:href="getLink('#_contact_')" v-on:click="onShowBurgerMenu()">Contact</a></li>
      </ul>
    </div>
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
      return true;
    },
    getLink: function () {
      return this.label.link;
    }
  }
});



Vue.component('fixed-hamburger', {
  methods: {
    raiseShowBurgerMenu: function () {
      this.$emit('show-burger-menu', {});
    }
  },
  template: `
<div class="fh-hamburger-1 fh-font-1 float-right"  v-on:click="raiseShowBurgerMenu()">
    <i class="fas fa-bars"></i>
</div>
  `
});


