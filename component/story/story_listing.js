
/*
 *  core container for:
 *  - the list of stories
 *  - the actual chosen story
 */
Vue.component('st-container', {
  props: ['scrub'],
  data: function() {
    return {
      // column_x = the 3 cols of story entries (split the scrub.story into 3 equal columns)
      column_1: [],
      column_2: [],
      column_3: [],
      // chosen story from the listing....
      chosenStory: {}
    };
  },
  mounted: function() {
    // console.log('* inside mounted', this.scrub);
  },
  watch: {
    scrub: function (val) {
      this.onPrepareImageLists();
    }
  },
  methods: {
    onPrepareImageLists: function () {
      let items = this.scrub.story;
      for (let i=0; i<items.length; i++) {
        let _mod = i % 3;
        switch (_mod) {
          case 0:
            this.column_1.push(items[i]);
            break;
          case 1:
            this.column_2.push(items[i]);
            break;
          case 2:
            this.column_3.push(items[i]);
            break;
        }
      } // end -- for (scrub.story loop)
    },
    onStoryChosen: function (data) {
      this.chosenStory = data.story;
    }

  },
  template: `
<div>
    <st-chosen-story v-bind:story="chosenStory"></st-chosen-story>
    
    <div class="st-flex-row st-core-container">
        <div class="st-flex-col">
            <st-list-flex-item v-for="item in column_1" 
                v-on:on-story-chosen="onStoryChosen"
                v-bind:item="item"
            ></st-list-flex-item>
        </div>
        <div class="st-flex-col">
            <st-list-flex-item v-for="item in column_2"
                v-on:on-story-chosen="onStoryChosen" 
                v-bind:item="item"
            ></st-list-flex-item>
        </div>
        <div class="st-flex-col">
            <st-list-flex-item v-for="item in column_3"
                v-on:on-story-chosen="onStoryChosen" 
                v-bind:item="item"
            ></st-list-flex-item>
        </div>
    </div>
</div>
  `
});

/*
 *  story item(s)
 */
Vue.component('st-list-flex-item', {
  props: ['item'],
  methods: {
    raiseStoryChosenEvent: function () {
      this.$emit('on-story-chosen', {
        story: this.item
      });
    }
  },
  template: `
<div class="core-pointer">
    <img v-bind:src="item.featured_photo" 
        class="st-flex-img"
        v-on:click="raiseStoryChosenEvent()" 
        >
    <div class="st-flex-img-caption text-truncate">{{item.title}}</div>
</div>
  `
});


Vue.component('st-chosen-story', {
  props: ['story'],
  data: function() {
    return {
      contents: {},
      // flag to note on a change in the upper section
      curUpperSectionId: ''
    };

  },
  watch: {
    story: function (val) {
      // load the story details
      let instance = this;
      let contentFile = '/stories_scrub/'+this.story.story_id;
      fetch(contentFile
      ).then(function (data) {
        data.json().then(function(json) {
          instance.contents = json;
        });
      }).catch(function (err) {
        console.log(err);
      })
    }

  },
  methods: {
    /**
     * css classes for the container
     * @returns {{"core-display-none": boolean, "core-display-block": boolean}}
     */
    getContainerClass: function () {
      if (this.contents.hasOwnProperty('comment')) {
        return {
          'core-display-block': true,
          'core-display-none': false
        };
      }
      return {
        'core-display-block': false,
        'core-display-none': true
      };
    },
    getContentComponent: function (contentType) {
      if ('word_0' === contentType) {
        return 'st-word-0';
      }
      if ('row_0' === contentType) {
        return 'st-row-0';
      }
      if ('col_0' === contentType) {
        return 'st-col-0';
      }

    }

  },

  template: `
<div class="st-core-container" 
    class="st-story-container"
    v-bind:class="getContainerClass()">
    
    <div v-for="section in contents.sections">
        <!-- actual component -->
        <component :is="getContentComponent(section.type)" v-bind:section="section"></component>
    </div>
    
</div>
  `
});


