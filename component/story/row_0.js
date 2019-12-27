/**
 * row_0 component: rows of content
 */
Vue.component('st-row-0', {
  props: ['section'],
  methods: {
    getSectionContent: function (idx) {
      let key = 'row_'+idx;
      return this.section.content[key];
    }
  },
  template: `
<div class="st-core-container">
    <div v-for="idx in section.content.num_of_rows"
        class="st-row-0-core"
    >
        <div v-html="getSectionContent(idx)"></div>
    </div>
    <!-- div class="core-text-align-center st-row-0-core" v-html="section.content.col_1"></div -->
</div>
  `
});
