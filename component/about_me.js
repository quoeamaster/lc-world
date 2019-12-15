
Vue.component('about-me', {
  props: ['about'],
  template: `
<div id="_about_" class="am-core">
    <div class="am-content-container">
        <div class="am-h3">{{getCaption()}}</div>
        <div class="am-h4">{{getContent()}}</div>
    </div>
</div>
  `,
  methods: {
    getCaption: function () {
      if (this.about) {
        return this.about.caption;
      }
      return '';
    },
    getContent: function () {
      if (this.about) {
        return this.about.content;
      }
      return '';
    }

  }
});
