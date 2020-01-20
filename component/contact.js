
Vue.component('contact-me', {
  methods: {
    openInstagramLink: function () {
      window.open('https://www.instagram.com/lalamomentt/', 'social');
    },
    openLinkedInLink: function () {
      window.open('https://www.linkedin.com/in/lilian-yc-712684a9/', 'social');
    },
    openEmailLink: function () {
      // TODO: window.location.href = "mailto:liliany.chan@gmail.com";
    }
  },
  template: `
<div id="_contact_" class="cm-core">
    <div class="cm-caption">follow me</div>
    <div class="cm-social-media">
        <i class="fab core-pointer fa-instagram cm-social-item" v-on:click="openInstagramLink()"></i>
        <i class="fab core-pointer fa-linkedin-in cm-social-item" v-on:click="openLinkedInLink()"></i>
        <i class="far core-pointer fa-envelope cm-social-item" v-on:click="openEmailLink()"></i>
    </div>
</div>
  `
});
