/**
 * word_0 component: pure words ONLY
 */
Vue.component('st-word-0', {
  props: ['section'],
  template: `
<div>
    <div class="core-text-align-center st-word-0-core st-row-0-core" v-html="section.content.col_1"></div>
</div>
  `
});
