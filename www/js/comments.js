angular.module('comment.controllers', [])

        .controller('CmtCntrl', function ($scope, $http, $ionicModal, $ionicPopup, $timeout, $window) {

            //Get Comments
            var getComment = function ()
            {
                $scope.comments = [];
                $scope.listID = localStorage.getItem("listId");
                $scope.userID = localStorage.getItem("uid");
                var baseUrl = 'http://studio-tesseract.co/freesprite/wp-json/get/v2/comment';
                //var baseUrl = 'http://localhost/freesprite/wp-json/get/v2/comment';
                var req = {
                    method: 'POST',
                    url: baseUrl,
                    headers: {'Content-Type': "application/x-www-form-urlencoded"},
                    data: {userid: $scope.userID, postID: $scope.listID}
                }
                $http(req).then(function success(response) {
                    console.log(response.data);
                    $scope.comments = response.data;
                },
                        function error(response)
                        {

                        }
                );
            };
            getComment();

            //Add Comment Script Starts Here...
            $scope.submitComment = function (form, data)
            {
                if (form.$valid)
                {
                    ///alert('Siddhant Kulshreshtha');
                    $scope.listID = localStorage.getItem("listId");
                    $scope.userID = localStorage.getItem("uid");
                    $scope.user = localStorage.getItem("username");
                    //alert('ListID'+$scope.listID+'User ID'+$scope.userID);
                    var baseUrl = 'http://studio-tesseract.co/freesprite/wp-json/add/v2/comment';
                    //var baseUrl = 'http://studio-tesseract.co/freesprite/wp-json/getBucketList/v2/cat';
                    var req = {
                        method: 'POST',
                        url: baseUrl,
                        headers: {'Content-Type': "application/x-www-form-urlencoded"},
                        data: {userid: $scope.userID, postID: $scope.listID, comment: data['chat']}
                    }
                    $http(req).then(function success(response) {
                        //console.log(response.data);
                        $scope.listData = response.data;
                        $window.location.reload(true);
                    },
                            function error(response)
                            {

                            }
                    );
//                    $scope.html = angular.element(document.querySelector('#text'));
//                    $scope.html.append('<ion-item class="user-info">'+
//                            '<img class="user-avatar" src="http://placehold.it/550x550" />'+
//                            '<div class="user-comment">'+
//                            '<h4>'+$scope.user+'</h4>'+
//                            '<p>'+ data['chat'] +' <span class="positive" style="float:right"></span></p>'+
//                            '</div>'+
//                            '</ion-item>');
                }
            };

            //Remove Comment FUnction Starts Here
            $scope.removeComment = function (argID)
            {
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Confirm Delete',
                    template: 'Are you sure you want to delete this comment !'
                });
                confirmPopup.then(function (res) {
                    if (res) {
                        $scope.USER_SESSID = localStorage.getItem("uid");
                        var baseUrl = 'http://studio-tesseract.co/freesprite/wp-json/remove/v2/comment';
                        //var baseUrl = 'http://localhost/freesprite/wp-json/add/v2/custombucket';
                        var req = {
                            method: 'POST',
                            url: baseUrl,
                            headers: {'Content-Type': "application/x-www-form-urlencoded"},
                            data: {commentID: argID}
                        };
                        $http(req).then(function success(response) {
                            if (response.data == "success")
                            {
                                $window.location.reload(true);
                            } else
                            {
                                $scope.showAlert("Error", "<style>.popup {background-color:#fff !important;} .popup-body p{color:#136B7C !important} .popup-head h3{color:#136B7C !important} .button{background:#136B7C !important; color:#fff !important}</style><p>Error in Removing !<p/>");
                            }
                        },
                                function error(response)
                                {

                                }
                        );
                    } else {
                        console.log('You clicked on "Cancel" button');
                    }
                });
            };

        });

