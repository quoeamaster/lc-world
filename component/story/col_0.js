/**
 * col_0 component: column based presentation of data
 */
Vue.component('st-col-0', {
  props: ['section'],
  methods: {
    isNumOfColsValid: function (cols) {
      return cols === 2 || cols === 3 || cols === 4;
    },
    getFlexColComponent: function (cols) {
      if (this.isNumOfColsValid(cols) === false) {
        return 'col_0-invalid';
      }
      switch (cols) {
        case 2:
          return 'col_0-2';
        case 3:
          return 'col_0-3';
        case 4:
          return 'col_0-4';
      }
    }

  },
  template: `
<div class="st-row-0-core">
    <component :is="getFlexColComponent(section.content.num_of_cols)" v-bind:section="section"></component>
</div>
  `
});

Vue.component('col_0-invalid', {
  props: ['section'],
  template: `
<div class="st-row-0-core core-text-align-center">
    the number of cols for this content is INVALID: {{section.content.num_of_cols}}
</div>
  `
});

Vue.component('col_0-2', {
  props: ['section'],
  template: `
<div class="st-row-0-core" style="display: -ms-flexbox; display: flex; -ms-flex-wrap: wrap; flex-wrap: wrap; padding: 0 4px;">
    <div class="st-col-flex-2">
        <div v-for="content in section.content.col_1" v-html="content"></div>
    </div>
    <div class="st-col-flex-2">
        <div v-for="content in section.content.col_2" v-html="content"></div>
    </div>
</div>
  `
});

Vue.component('col_0-3', {
  props: ['section'],
  template: `
<div class="st-row-0-core" style="display: -ms-flexbox; display: flex; -ms-flex-wrap: wrap; flex-wrap: wrap; padding: 0 4px;">
    <div class="st-col-flex-3">
        <div v-for="content in section.content.col_1" v-html="content"></div>
    </div>
    <div class="st-col-flex-3">
        <div v-for="content in section.content.col_2" v-html="content"></div>
    </div>
    <div class="st-col-flex-3">
        <div v-for="content in section.content.col_3" v-html="content"></div>
    </div>
</div>
  `
});

Vue.component('col_0-4', {
  props: ['section'],
  template: `
<div class="st-row-0-core" style="display: -ms-flexbox; display: flex; -ms-flex-wrap: wrap; flex-wrap: wrap; padding: 0 4px;">
    <div class="st-col-flex-4">
        <div v-for="content in section.content.col_1" v-html="content"></div>
    </div>
    <div class="st-col-flex-4">
        <div v-for="content in section.content.col_2" v-html="content"></div>
    </div>
    <div class="st-col-flex-4">
        <div v-for="content in section.content.col_3" v-html="content"></div>
    </div>
    <div class="st-col-flex-4">
        <div v-for="content in section.content.col_4" v-html="content"></div>
    </div>
</div>
  `
});
