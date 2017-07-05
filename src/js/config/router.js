angular
  .module('blog')
  .config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function Router($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'js/views/posts/index.html'
    })
    .state('postsIndex', {
      url: '/posts',
      templateUrl: 'js/views/posts/index.html',
      controller: 'PostsIndexCtrl as postsIndex'
    })
    .state('postsNew', {
      url: '/posts/new',
      templateUrl: 'js/views/posts/new.html',
      controller: 'PostsNewCtrl as postsNew'
    })
    .state('postsShow', {
      url: '/posts/:id',
      templateUrl: 'js/views/posts/show.html',
      controller: 'PostsShowCtrl as postsShow'
    })
    .state('postsEdit', {
      url: '/posts/:id/edit',
      templateUrl: 'js/views/posts/edit.html',
      controller: 'PostsEditCtrl as postsEdit'
    })
    .state('usersShow', {
      url: '/users/:id',
      templateUrl: 'js/views/users/show.html',
      controller: 'UsersShowCtrl as usersShow'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'js/views/auth/login.html',
      controller: 'AuthCtrl as auth'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'js/views/auth/register.html',
      controller: 'AuthCtrl as auth'
    })
    .state('about', {
      url: '/about',
      templateUrl: 'js/views/static/about.html'
    });

  $urlRouterProvider.otherwise('/');
}
