angular.module('bucketlist.controllers', [])

        .controller('BucketListCtrl', function ($scope, $http, $ionicModal, $ionicHistory, $timeout, $ionicPopup, $state, $window) {
            $scope.category = '';
            if (localStorage.getItem("categoryid") == '18')
            {
                $scope.category = 'Health';
            } else if (localStorage.getItem("categoryid") == '19')
            {
                $scope.category = 'Sports';
            } else if (localStorage.getItem("categoryid") == '20')
            {
                $scope.category = 'Travel';
            } else if (localStorage.getItem("categoryid") == '21')
            {
                $scope.category = 'Learn';
            } else if (localStorage.getItem("categoryid") == '22')
            {
                $scope.category = 'Career/Wealth';
            } else if (localStorage.getItem("categoryid") == '23')
            {
                $scope.category = 'Relationships';
            }
            var catBucketList = function ()
            {
                $scope.catId = localStorage.getItem("categoryid");
                $scope.listData = [];
                ///$scope.catId = argID;
                //var baseUrl = 'http://localhost/freesprite/wp-json/getBucketList/v2/cat';
                var baseUrl = 'http://studio-tesseract.co/freesprite/wp-json/getBucketList/v2/cat';
                var req = {
                    method: 'POST',
                    url: baseUrl,
                    headers: {'Content-Type': "application/x-www-form-urlencoded"},
                    data: {id: localStorage.getItem("uid"), catid: $scope.catId}
                }
                $http(req).then(function success(response) {
                    console.log(response.data);
                    $scope.listData = response.data;
                },
                        function error(response)
                        {

                        }
                );
            };
            catBucketList();

            //Get Item Details Function
            $scope.getItemDetails = function (agrListId)
            {
                localStorage.setItem('listId', agrListId);
                $state.go('app.listdetailadmin');
            }

        }).filter('removeBlackItems', function () {
            return function (array) {
            return array.filter(function (o) {
            return o !== null;
        });
    };
});

        