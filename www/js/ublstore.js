angular.module('starter.ublstore', [])
        .controller('ublCtrl', function ($scope, $http, $cordovaSocialSharing, $ionicModal, $timeout, $ionicPopup, $state, $window, $cordovaCamera, $cordovaFileTransfer, $cordovaActionSheet, $ionicLoading) {

            $scope.ublData = [];
            var data = function ()
            {
                var baseUrl = 'http://studio-tesseract.co/freesprite/wp-json/get/v2/affilatelinks';
                //var baseUrl = 'http://localhost/freesprite/wp-json/get/v2/affilatelinks';
                var req = {
                    method: 'GET',
                    url: baseUrl,
                    headers: {'Accept': 'application/json, text/javascript, */*; q=0.01',
                        'Content-Type': 'application/json; charset=utf-8'},
                    data: {id: $scope.USERID}
                };

                $http(req).then(function success(response) {
                    console.log(response.data);
                    $scope.ublData = response.data;
                },
                        function error(response)
                        {

                        }
                );
            };
            data();

            //Redirectiong to UBL Data
            $scope.getUblCatData = function (argID)
            {
                localStorage.setItem('UBL_ID', argID);
                $state.go('app.ubldetails');
            };

            //Get Merachandise Data
            $scope.getMerchandiseData = function ()
            {
                $scope.merchand=[];
                var baseUrl = 'http://studio-tesseract.co/freesprite/wp-json/get/v2/merchandisedata';
                //var baseUrl = 'http://localhost/freesprite/wp-json/get/v2/affilatelinks';
                var req = {
                    method: 'GET',
                    url: baseUrl,
                    headers: {'Accept': 'application/json, text/javascript, */*; q=0.01',
                        'Content-Type': 'application/json; charset=utf-8'}
                };

                $http(req).then(function success(response) {
                    console.log(response.data);
                    $scope.merchand = response.data;
                },
                        function error(response)
                        {

                        }
                );
            };
        })

        //UBL CATEGORY CONTROLLER
        .controller('ublCategoryCtrl', function ($scope, $http,$cordovaInAppBrowser, $cordovaSocialSharing, $ionicModal, $timeout, $ionicPopup, $state, $window, $cordovaCamera, $cordovaFileTransfer, $cordovaActionSheet, $ionicLoading) {

            //$scope.ublData=[];
            var data = function ()
            {
                $scope.UBl_DATA = [];
                $scope.UBLID = localStorage.getItem('UBL_ID');
                ///alert($scope.UBLID);
                var baseUrl = 'http://studio-tesseract.co/freesprite/wp-json/get/v2/ubllinks';
                //var baseUrl = 'http://localhost/freesprite/wp-json/get/v2/affilatelinks';
                var req = {
                    method: 'POST',
                    url: baseUrl,
                    headers: {'Accept': 'application/json, text/javascript, */*; q=0.01',
                        'Content-Type': 'application/json; charset=utf-8'},
                    data: {id: $scope.UBLID}
                };

                $http(req).then(function success(response) {
                    console.log(response.data);
                    $scope.UBl_DATA = response.data;
                },
                        function error(response)
                        {

                        }
                );
            };
            data();

            /////////////inapp browser////////
     $scope.browser = function(link) {
        console.log("open url")
            var options = {
                location: 'yes',
                clearcache: 'no',
                toolbar: 'yes',
                closebuttoncaption: 'DONE?'
            };

            $cordovaInAppBrowser.open(link, '_self', options)
                .then(function(event) {
                    // success
                })
                .catch(function(event) {
                    // error
                });
        }

        });