angular.module('userprofile.controllers', [])

        .controller('UserpCtrl', function ($scope, $http, $ionicModal, $ionicHistory, $timeout, $ionicPopup, $state, $window, $ionicLoading) {

            $scope.hiddenDiv = true;
            $scope.class = 'button-calm';
            $scope.follow='FOLLOW';
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
                $scope.user = [];
                $scope.FOLLOWING_ID = localStorage.getItem("userID");
                $scope.USER_ID = localStorage.getItem("uid");
                var baseUrl = 'http://studio-tesseract.co/freesprite/wp-json/get/v2/expertuserinformation';
                //var baseUrl = 'http://localhost/freesprite/wp-json/get/v2/expertuserinformation';
                var req = {
                    method: 'POST',
                    url: baseUrl,
                    headers: {'Accept': 'application/json, text/javascript, */*; q=0.01',
                        'Content-Type': 'application/json; charset=utf-8'},
                    data: {id: $scope.FOLLOWING_ID}
                };

                $http(req).then(function success(response) {
                    $ionicLoading.hide();
                    $scope.user.name = response.data['data']['display_name'];
                    $scope.user.email = response.data['data']['user_email'];
                    $scope.user.active = response.data['data']['user_registered'];
                },
                        function error(response)
                        {

                        }
                );
            };
            record();

            //Follow and Unfollow Code Starts Here....
            $scope.follow_unfollow = function () {
                $scope.hiddenDiv = $scope.hiddenDiv === false ? true: false;
                if($scope.hiddenDiv==false)
                {
                    $scope.class = 'button-balanced';
                    $scope.follow='UNFOLLOW';
                    $scope.action='FOLLOW';
                }else if($scope.hiddenDiv==true)
                {
                    $scope.class = 'button-calm';
                    $scope.follow='FOLLOW';
                    $scope.action='UNFOLLOW';
                }
                //console.log($scope.action);
                //var baseUrl = 'http://localhost/freesprite/wp-json/add/v2/addUserfollowing';
                var baseUrl = 'http://studio-tesseract.co/freesprite/wp-json/add/v2/addUserfollowing';
                var req = {
                    method: 'POST',
                    url: baseUrl,
                    headers: {'Content-Type': "application/x-www-form-urlencoded"},
                    data: {user_id: localStorage.getItem("uid"), following_id: localStorage.getItem("userID"), action: $scope.action}
                };
                $http(req).then(function success(response) {
                    //console.log(response.data);
                },
                        function error(response)
                        {

                        }
                );
            };
            
            //Get User Following
            $scope.get_user_following=function()
            {
                $scope.FOLLOWING_ID = localStorage.getItem("userID");
                $scope.USER_ID = localStorage.getItem("uid");
                //console.log('User ID'+$scope.USER_ID + 'Following ID'+$scope.FOLLOWING_ID);
                //var baseUrl = 'http://localhost/freesprite/wp-json/get/v2/checkfollowing';
                var baseUrl = 'http://studio-tesseract.co/freesprite/wp-json/get/v2/checkfollowing';
                var req = {
                    method: 'POST',
                    url: baseUrl,
                    headers: {'Content-Type': "application/x-www-form-urlencoded"},
                    data: {user_id: $scope.USER_ID, following_id: $scope.FOLLOWING_ID}
                };
                $http(req).then(function success(response) {
                    console.log(response.data);
                    if(response.data=="success")
                    {
                        $scope.class = 'button-balanced';
                        $scope.follow='UNFOLLOW';
                        $scope.action='FOLLOW';
                        $scope.hiddenDiv=false;
                        ///console.log('Data'+$scope.hiddenDiv);
                    }else if(response.data=="error")
                    {
                        $scope.class = 'button-calm';
                        $scope.follow='FOLLOW';
                        $scope.action='UNFOLLOW';
                        $scope.hiddenDiv=true;
                    }
                    
                },
                        function error(response)
                        {

                        }
                );
            };
            
        });