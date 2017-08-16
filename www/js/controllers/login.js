/**
 * Login controller
 */
(function () {
  angular
    .module('invisionApp')

    .controller('LoginController', [
      '$ionicSideMenuDelegate',
      '$state',
      '$ionicHistory',
      '$scope',
      '$http',
      '$ionicModal',
      '$ionicHistory',
      '$ionicPopup',
      '$state',
      '$window',
      function ($ionicSideMenuDelegate, $state, $http, $ionicModal,
                $ionicPopup, $widnow, $ionicHistory) {
        'use strict';
        $ionicSideMenuDelegate.canDragContent(false);
        var vm = this;

        vm.doLogin = doLogin;

        function goToSingUp() {
          localStorage.clear();
          console.log('clearing local storage');
          $state.go('signup');
        }

        function doLogin(form, record) {
          if (form.$valid) {
            var postUrl = 'http://studio-tesseract.co/freesprite/wp-json/login/v2/user';
            //var postUrl = 'http://localhost/freesprite/wp-json/login/v2/user'
            var req = {
              method: 'POST',
              url: postUrl,
              headers: {'Content-Type': "application/x-www-form-urlencoded"},
              data: record
            };
            $http(req).then(function success(response) {
              //console.log(response);
              if (response.data == "error") {
                $scope.showAlert("Error", "<style>.popup {background-color: transparent !important;} .popup-body p{color:#fff !important} .popup-head h3{color:#fff !important} .button{background:#fff !important; color:#000 !important}</style><p>Invalid Username/Password<p/>");
              }
              else {
                $scope.loggedIn = 1;
                $scope.ID = response.data['ID'];
                $scope.Username = response.data['data']['display_name'];
                // console.log($scope.Username);
                localStorage.setItem('uid', $scope.ID);
                localStorage.setItem('username', $scope.Username);
                localStorage.setItem('loggedIn', $scope.loggedIn);
                $state.go('app.home');
                //$window.location.reload(true);
              }
            });
            $ionicHistory.nextViewOptions({
              disableBack: true
            });
            //$state.go('app.categories', {}, {location: "replace", reload: true});
            console.log(record);
          }
        }
      }
    ]);

})();
