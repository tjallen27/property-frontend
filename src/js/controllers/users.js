angular
  .module('blog')
  .controller('UsersIndexCtrl', UsersIndexCtrl)
  .controller('UsersShowCtrl', UsersShowCtrl);

UsersIndexCtrl.$inject = ['User'];
function UsersIndexCtrl(User) {
  const vm = this;

  vm.all = User.query();
}

UsersShowCtrl.$inject = ['User', '$stateParams', '$state', '$auth'];
function UsersShowCtrl(User, $stateParams, $state, $auth) {
  const vm = this;
  vm.user = User.get($stateParams);

  function usersDelete() {

    vm.user
      .$remove()
      .then(() => {
        $auth.logout();
        $state.go('register');
      });
  }
  vm.delete = usersDelete;
}
