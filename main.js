// css
require('./style/common.css');
// require('./lib/maginficPopup.css');

require('./component/about_me.js');
require('./component/contact.js');
require('./component/portfolio_menu.js');
require('./component/fixed_header.js');
require('./component/dummy_test.js');
require('./component/carousel.js');
require('./component/card.js');
require('./component/app.js');

// include 3rd party jscript (already downloaded and not using npm repo to get the jscript src)
// PS. didn't work as jquery is required within the webpack...
// require('./lib/magnificPopup.min.js');
require('./index.js');
