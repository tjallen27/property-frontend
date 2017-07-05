angular
  .module('blog', ['ui.router', 'ngResource', 'satellizer', 'checklist-model', 'ui.bootstrap', 'ngAnimate', 'ngMessages'])
  .constant('API_URL', 'https://desolate-reaches-84582.herokuapp.com')
  .filter('startFrom', function(){
    return function(data, start){
      return data.slice(start);
    };
  });
