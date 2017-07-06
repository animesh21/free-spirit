angular.module('inspirationitem.controllers', [])

        .controller('InspCtrl', function ($scope, $http, $ionicModal, $ionicHistory, $timeout, $ionicPopup, $state, $window, $ionicLoading, $cordovaSocialSharing) {

            $scope.IMAGE = null;
            $scope.CONTENT = null;
            var SingleItem = function ()
            {
                //$scope.DATA=[];
                $scope.LIST_ID = localStorage.getItem("singleListID");
                var baseUrl = 'http://studio-tesseract.co/freesprite/wp-json/get/v2/getSingleInspiration';
                //var baseUrl = 'http://localhost/freesprite/wp-json/get/v2/getSingleInspiration';
                var req = {
                    method: 'POST',
                    url: baseUrl,
                    headers: {'Content-Type': "application/x-www-form-urlencoded"},
                    data: {id: $scope.LIST_ID}
                };

                $http(req).then(function success(response) {
                    console.log(response);
                    $scope.TITLE = response.data['title'];
                    $scope.IMAGE = response.data['image'];
                    $scope.CONTENT = response.data['content'];
                    $scope.DATE = response.data['date'];
                },
                        function error(response)
                        {

                        }
                );
            };
            SingleItem();

            $scope.facebook = function () {
                alert('function called'+$scope.CONTENT+$scope.IMAGE);
                window.plugins.socialsharing.shareViaFacebook($scope.CONTENT, $scope.IMAGE /* img */, $scope.IMAGE /* url */);
            };
        });