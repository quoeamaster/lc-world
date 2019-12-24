// css
require('./style/common.css');
require('./style/photo.css');

// components
require('./component/photo/normal_header');
require('./component/photo/side_nav');
require('./component/photo/app');

/**
 * photo page related js...
 */

// event bus
window.eventBus = new Vue();
