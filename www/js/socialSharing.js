angular.module('starter.share', [])
        .controller('shareCtrl', function ($scope, $http, $cordovaSocialSharing, $ionicModal, $timeout, $ionicPopup, $state, $window, $cordovaCamera, $cordovaFileTransfer, $cordovaActionSheet, $ionicLoading) {
            $scope.inpirationData = [];
            //Get Inspiration Data
            var inspiration = function () {
                // Setup the loader
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                var baseUrl = 'http://studio-tesseract.co/freesprite/wp-json/get/v2/inspirationdata';
                //var baseUrl = 'http://localhost/freesprite/wp-json/get/v2/inspirationdata';
                var req = {
                    method: 'GET',
                    url: baseUrl,
                    headers: {'Accept': 'application/json, text/javascript, */*; q=0.01',
                        'Content-Type': 'application/json; charset=utf-8'}
                };

                $http(req).then(function success(response) {
                    $ionicLoading.hide();
                    console.log(response.data);
                    $scope.inpirationData = response.data;
                },
                        function error(response)
                        {

                        }
                );
            };

            inspiration();

            $scope.doRefresh = function () {
                //var baseUrl = 'http://localhost/freesprite/wp-json/get/v2/inspirationdata';
                var baseUrl = 'http://studio-tesseract.co/freesprite/wp-json/get/v2/inspirationdata';
                var req = {
                    method: 'GET',
                    url: baseUrl,
                    headers: {'Accept': 'application/json, text/javascript, */*; q=0.01',
                        'Content-Type': 'application/json; charset=utf-8'}
                };
                $http(req).then(function success(response) {
                            $scope.inpirationData = response.data;
                        })
                        .finally(function () {
                            // Stop the ion-refresher from spinning
                            $scope.$broadcast('scroll.refreshComplete');
                        });
            };
            
            //Redirecting to the Item Page
            $scope.getSingleItem=function(argID)
            {
                localStorage.setItem('singleListID', argID);
//                $timeout(function () {
//                    $window.location.reload(true);
//                });
                $state.go('app.inspirationitem');
            };

            // $cordovaSocialSharing
            //    .shareViaTwitter(message, image, link)
            //    .then(function(result) {
            //      // Success!
            //    }, function(err) {
            //      // An error occurred. Show a message to the user
            //    });
            $scope.shareViaWhatsApp = function () {
                console.log("function called")
                $cordovaSocialSharing
                        .shareViaWhatsApp(" hello ", " ", "www.google.com")
                        .then(function (result) {
                            // Success!
                            console.log("Success");
                        }, function (err) {
                            // An error occurred. Show a message to the user
                            console.log("error")
                        });
            }

            //  $cordovaSocialSharing
            //    .shareViaFacebook(message, image, link)
            //    .then(function(result) {
            //      // Success!
            //    }, function(err) {
            //      // An error occurred. Show a message to the user
            //    });

            //     $cordovaSocialSharing
            //    .shareViaEmail(message, subject, toArr, ccArr, bccArr, file)
            //    .then(function(result) {
            //      // Success!
            //    }, function(err) {
            //      // An error occurred. Show a message to the user
            //    });
            
            //Get Single Item
//            $scope.getSingleItem=function(argID)
//            {
//                console.log(argID)
//            };
        });