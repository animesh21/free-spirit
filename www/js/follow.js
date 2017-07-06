angular.module('follow.controllers', [])

        .controller('FowCtrl', function ($scope, $http, $ionicModal, $ionicHistory, $timeout, $ionicPopup, $state, $window, $ionicLoading) {

            //Get All User
            $scope.image = "img/user.svg";
            $scope.Class = "button-stable";
            $scope.Text = "Follow";
            $scope.id = null;
            $scope.input = false;
            $scope.showSearchInput = function ()
            {
                //alert('function called');
                $scope.input = true;
                console.log($scope.input);
            };
            var user = function ()
            {
                // Setup the loader
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                $scope.user = [];
                $scope.USERID = localStorage.getItem('uid');
                var baseUrl = 'http://studio-tesseract.co/freesprite/wp-json/get/v2/userfollowing';
                //var baseUrl = 'http://localhost/freesprite/wp-json/get/v2/userfollowing';
                var req = {
                    method: 'POST',
                    url: baseUrl,
                    headers: {'Accept': 'application/json, text/javascript, */*; q=0.01',
                        'Content-Type': 'application/json; charset=utf-8'},
                    data: {id: $scope.USERID}
                };

                $http(req).then(function success(response) {
                    //console.log(response.data);
                    $ionicLoading.hide();
                    $scope.user = response.data;
                },
                        function error(response)
                        {

                        }
                );
            };
            user();

            //Add Following
            $scope.addFollowing = function (argID)
            {
                localStorage.setItem('userID', argID);
                //$window.location.reload(true);
                $state.go('app.userprofile');
            };

            //Get Following Data
            $scope.getFollowingData = function ()
            {
                $scope.fdata = [];
                // Setup the loader
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                //alert('function called');
                var baseUrl = 'http://studio-tesseract.co/freesprite/wp-json/get/v2/userFollowingData';
                //var baseUrl = 'http://localhost/freesprite/wp-json/get/v2/userFollowingData';
                var req = {
                    method: 'POST',
                    url: baseUrl,
                    headers: {'Accept': 'application/json, text/javascript, */*; q=0.01',
                        'Content-Type': 'application/json; charset=utf-8'},
                    data: {id: localStorage.getItem("uid")}
                };

                $http(req).then(function success(response) {
                    $ionicLoading.hide();
                    $scope.fdata = response.data;
                },
                        function error(response)
                        {

                        }
                );
            };

            //Get Particular Following function Starts Here...
            $scope.get_particular_following = function ()
            {
                $scope.particular_followers=[];
                var baseUrl = 'http://studio-tesseract.co/freesprite/wp-json/get/v2/getParticularFollowing';
                //var baseUrl = 'http://localhost/freesprite/wp-json/get/v2/getParticularFollowing';
                var req = {
                    method: 'POST',
                    url: baseUrl,
                    headers: {'Accept': 'application/json, text/javascript, */*; q=0.01',
                        'Content-Type': 'application/json; charset=utf-8'},
                    data: {id: localStorage.getItem("uid")}
                };

                $http(req).then(function success(response) {
                    console.log(response);
                    $scope.particular_followers=response.data;
                },
                        function error(response)
                        {

                        }
                );
            };

        });