// css
require('./style/common.css');
require('./style/story.css');

// components
require('./component/photo/normal_header');
// content components
require('./component/story/col_0');
require('./component/story/row_0');
require('./component/story/word_0');
require('./component/story/story_listing');

require('./component/story/app');

// event bus
window.eventBus = new Vue();

// util - cache object
window.cacheObject = new CacheObject(20);
