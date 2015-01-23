Package.describe({
  name: '3stack:underscore-addons',
  version: '0.0.1',
  summary: 'Extends underscore, with sortedIndexCmp, stoppableDebounce, stoppableThrottle',
  git: 'https://github.com/3stack-software/meteor-underscore-addons',
  documentation: 'README.md'
});

Package.onUse(function(api){
  api.versionsFrom('METEOR@0.9.2');
  api.use('underscore');
  api.addFiles('underscore-addons.js');
});
