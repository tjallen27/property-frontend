angular
  .module('blog')
  .controller('PostsIndexCtrl', PostsIndexCtrl)
  .controller('PostsNewCtrl', PostsNewCtrl)
  .controller('PostsShowCtrl', PostsShowCtrl)
  .controller('PostsEditCtrl', PostsEditCtrl);

PostsIndexCtrl.$inject = ['Post', 'filterFilter', '$scope'];
function PostsIndexCtrl(Post, filterFilter, $scope) {

  const vm = this;
  vm.all = Post.query();
  $scope.pageSize = 4;
  $scope.currentPage = 1;
}

PostsNewCtrl.$inject = ['Post', 'User', '$state'];
function PostsNewCtrl(Post, User, $state) {
  const vm = this;
  vm.post = {
    'image': 'http://placehold.it/350x150'
  };
  vm.users = User.query();

  function postsCreate() {
    Post
      .save({ post: vm.post })
      .$promise
      .then(() => $state.go('postsIndex'));
  }

  vm.create = postsCreate;
}

PostsShowCtrl.$inject = ['Post', 'User', 'Comment','$stateParams', '$state', '$auth'];
function PostsShowCtrl(Post, User, Comment, $stateParams, $state, $auth) {
  const vm = this;

  if ($auth.getPayload())
    vm.currentUser = User.get({ id: $auth.getPayload().id });

  vm.post = Post.get($stateParams);
  vm.comment = {};

  function postsDelete() {
    vm.post
      .$remove()
      .then(() => $state.go('postsIndex'));
  }
  vm.delete = postsDelete;

  function addComment() {
    vm.comment.post_id = vm.post.id;
    vm.comment.user_id = vm.currentUser.id;
    Comment
      .save({ comment: vm.comment })
      .$promise
      .then((comment) => {
        vm.post.comments.push(comment);
        vm.comment = {};
      });
  }

  vm.addComment = addComment;

  function deleteComment(comment) {
    Comment
      .delete({ id: comment.id })
      .$promise
      .then(() => {
        const index = vm.post.comments.indexOf(comment);
        vm.post.comments.splice(index, 1);
      });
  }

  vm.deleteComment = deleteComment;
}

PostsEditCtrl.$inject = ['Post', 'User', '$stateParams', '$state'];
function PostsEditCtrl(Post, User, $stateParams, $state) {
  const vm = this;

  Post.get($stateParams).$promise.then((post) => {
    vm.post = post;
  });

  vm.users = User.query();

  function postsUpdate() {
    Post
      .update({id: vm.post.id, post: vm.post })
      .$promise
      .then(() => $state.go('postsShow', { id: vm.post.id }));
  }

  vm.update = postsUpdate;
}
