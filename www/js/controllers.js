angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope, $http, $ionicModal, $ionicHistory, $timeout, $ionicPopup, $state, $window, $ionicLoading) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});
    // An alert dialog
    $scope.showAlert = function (title, msg) {
      var alertPopup = $ionicPopup.alert({
        title: title,
        template: msg
      });
      alertPopup.then(function (res) {
        //console.log('Error Login');
      });
    };

    // Form data for the login modal
    $scope.doLogin = function (form, record) {

      if (form.$valid) {
        // Setup the loader
        $ionicLoading.show({
          content: 'Loading',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0
        });
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
          $ionicLoading.hide();
          if (response.data == "error") {
            $scope.showAlert("Error", "<style>.popup {background: #f96332 !important;} .popup-body p{color:#fff !important} .popup-head h3{color:#fff !important} .button{background:#fff !important; color:#000 !important}</style><p>Invalid Username/Password<p/>");
          }
          else {
            $scope.loggedIn = 1;
            $scope.ID = response.data['ID'];
            $scope.Username = response.data['data']['display_name'];
            ///console.log($scope.Username);
            localStorage.setItem('uid', $scope.ID);
            localStorage.setItem('username', $scope.Username);
            localStorage.setItem('loggedIn', $scope.loggedIn);
            $state.go('app.home');
            //$window.location.reload(true);
          }
        });
      }
    };

    //Logout Function
    $scope.logout = function () {
      $state.go('login');
      ///$window.location.reload(true);
      $window.localStorage.clear();
      $ionicHistory.clearCache();
      $ionicHistory.clearHistory();
    };

    /////////////////////facebook login code////////////////////////////


    $scope.facebookFun = function () {
      // alert("facebook")
      $scope.fbdata = {};
      facebookConnectPlugin.getLoginStatus(function (response) {
        console.log('login status:-- ' + JSON.stringify(response));
        if (response.status == "unknown") {
          console.log("unknown");
          facebookConnectPlugin.login(["email"], function (response) {
            facebookConnectPlugin.api("/me?fields=picture,first_name,birthday,email,last_name,gender,location",
                ["public_profile"], function (response) {
              $scope.fbdata = response;
              //var baseUrl = 'http://studio-tesseract.co/freesprite/wp-json/add/v2/bucket';
              console.log('FB Res: ' + JSON.stringify(response));
              var baseUrl = 'http://studio-tesseract.co/freesprite/wp-json/get/v2/fblogin';
              //var baseUrl = 'http://localhost/freesprite/wp-json/get/v2/mybucketlist';
              var req = {
                method: 'POST',
                url: baseUrl,
                headers: {'Content-Type': "application/x-www-form-urlencoded"},
                data: $scope.fbdata
              };
              $http(req).then(function success(response) {
                $scope.loggedIn = 1;
                $scope.ID = response.data['ID'];
                console.log('Value of email: ' + JSON.stringify(response['config']['data']['email']));
                $scope.Username = response['config']['data']['email'];
                ///console.log($scope.Username);
                localStorage.setItem('uid', $scope.ID);
                localStorage.setItem('username', $scope.Username);
                localStorage.setItem('loggedIn', $scope.loggedIn);

                // $state.go('app.home');
                localStorage.setItem('fb', 1);
                $state.go('signup');  // testing plan selection and payment
              },
              function error(response) {
                console.error('Error from server: ' + error);
              });
              //console.log("facebookConnectPlugin_api_err-->> " + JSON.stringify(response));

            }, function (err) {
              console.log("facebookConnectPlugin_api_err-->> " + JSON.stringify(err));
            });
          }, function (err) {
            console.log('Problem login with fb: ' + JSON.stringify(err))
          });
        }
        else if (response.status == "connected") {
          console.log("connected");
          facebookConnectPlugin.api("/me?fields=picture,first_name,birthday,email,last_name,gender,location", ["public_profile"], function (response) {
            console.log("FB Response: " + JSON.stringify(response));
            $scope.fbdata = response;
            //var baseUrl = 'http://studio-tesseract.co/freesprite/wp-json/add/v2/bucket';
            var baseUrl = 'http://studio-tesseract.co/freesprite/wp-json/get/v2/fblogin';
            //var baseUrl = 'http://localhost/freesprite/wp-json/get/v2/mybucketlist';
            var req = {
              method: 'POST',
              url: baseUrl,
              headers: {'Content-Type': "application/x-www-form-urlencoded"},
              data: $scope.fbdata
            };
            $http(req).then(function success(response) {
                $scope.loggedIn = 1;
                $scope.ID = response.data['ID'];
                console.log('Value of data: ' + JSON.stringify(response['config']['data']['email']));
                $scope.Username = response['config']['data']['email'];
                ///console.log($scope.Username);
                localStorage.setItem('uid', $scope.ID);
                localStorage.setItem('username', $scope.Username);
                localStorage.setItem('loggedIn', $scope.loggedIn);
                // $state.go('app.home');

                // testing payment redirection
                localStorage.setItem('fb', 1);
                $state.go('signup');
              },
              function error(response) {
              }
            );
          }, function (err) {
            console.log("facebookConnectPlugin_api_err-->> " + JSON.stringify(err));
          });
        }
      });
    };
  })

  .controller('PlaylistsCtrl', function ($scope) {
    $scope.playlists = [
      {title: 'Reggae', id: 1},
      {title: 'Chill', id: 2},
      {title: 'Dubstep', id: 3},
      {title: 'Indie', id: 4},
      {title: 'Rap', id: 5},
      {title: 'Cowbell', id: 6}
    ];
  })

  .controller('PlaylistCtrl', function ($scope, $stateParams) {
  });
