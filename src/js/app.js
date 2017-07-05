angular
  .module('blog', ['ui.router', 'ngResource', 'satellizer', 'checklist-model', 'ui.bootstrap', 'ngAnimate', 'ngMessages'])
  .constant('API_URL', 'https://thawing-scrubland-24337.herokuapp.com')
  .filter('startFrom', function(){
    return function(data, start){
      return data.slice(start);
    };
  });
