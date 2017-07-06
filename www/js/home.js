angular.module('home.controllers', [])

        .controller('HomeCtrl', function ($scope, $http, $ionicModal, $ionicHistory, $timeout, $ionicPopup, $state, $window, $ionicLoading, $cordovaCamera, $ionicLoading) {

//            $ionicLoading.show({
//                content: 'Loading',
//                animation: 'fade-in',
//                showBackdrop: true,
//                maxWidth: 200,
//                showDelay: 0
//            });
            $scope.bucket = [];
            $scope.following = [];
            var record = function ()
            {
                // Setup the loader
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                //var baseUrl = 'http://localhost/freesprite/wp-json/get/v2/getbucketItems';
                var baseUrl = 'http://studio-tesseract.co/freesprite/wp-json/get/v2/getbucketItems';
                var req = {
                    method: 'POST',
                    url: baseUrl,
                    headers: {'Accept': 'application/json, text/javascript, */*; q=0.01',
                        'Content-Type': 'application/json; charset=utf-8'}
                }
                $http(req).then(function success(response) {
                    $ionicLoading.hide();
                    console.log(response.data);
                    $scope.bucket = response.data;
                    //console.log($scope.bucket);
                },
                        function error(response)
                        {
                            $ionicLoading.hide();
                        }
                );
            };
            record();

            //Do Refresh Fuction Starts Here
            $scope.doRefresh = function () {
                //var baseUrl = 'http://localhost/freesprite/wp-json/get/v2/inspirationdata';
                var baseUrl = 'http://studio-tesseract.co/freesprite/wp-json/get/v2/getbucketItems';
                var req = {
                    method: 'POST',
                    url: baseUrl,
                    headers: {'Accept': 'application/json, text/javascript, */*; q=0.01',
                        'Content-Type': 'application/json; charset=utf-8'}
                };
                $http(req).then(function success(response) {
                    $scope.bucket = response.data;
                })
                        .finally(function () {
                            // Stop the ion-refresher from spinning
                            $scope.$broadcast('scroll.refreshComplete');
                        });
            };

            //Get Data Function
            $scope.getData = function (argID) {
                //alert(argID);
                localStorage.setItem('listId', argID);
//                $timeout(function () {
//                    $window.location.reload(true);
//                });
                $state.go('app.listdetail');
            };

            //Get Selected List Of Profile Post
            $scope.getFollowingListPost = function ()
            {
                $scope.USER_ID = localStorage.getItem("uid");
                $scope.following = [];
                ///$scope.catId = argID;
                //var baseUrl = 'http://localhost/freesprite/wp-json/getBucketList/v2/cat';
                var baseUrl = 'http://studio-tesseract.co/freesprite/wp-json/getBucketList/v2/cat';
                var req = {
                    method: 'POST',
                    url: baseUrl,
                    headers: {'Content-Type': "application/x-www-form-urlencoded"},
                    data: {id: localStorage.getItem("uid")}
                };
                $http(req).then(function success(response) {
                    console.log(response.data);
                    $scope.following = response.data;
                },
                        function error(response)
                        {

                        }
                );
            };

            //Go to Profile
            $scope.goToProfile = function (argID)
            {
                localStorage.setItem('userID', argID);
                //$window.location.reload(true);
                $state.go('app.userprofile');
            };
        });