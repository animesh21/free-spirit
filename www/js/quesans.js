angular.module('quesans.controllers', [])

        .controller('QuesCtrl', function ($scope, $http, $ionicModal, $ionicHistory, $timeout, $ionicPopup, $state, $window, $ionicLoading) {

            var values = function ()
            {
                $scope.ques = [];
                $scope.QuesId = localStorage.getItem("questionID");
                var baseUrl = 'http://studio-tesseract.co/freesprite/wp-json/get/v2/singleQuestion';
                //var baseUrl = 'http://localhost/freesprite/wp-json/get/v2/singleQuestion';
                var req = {
                    method: 'POST',
                    url: baseUrl,
                    headers: {'Content-Type': "application/x-www-form-urlencoded"},
                    data: {id: $scope.QuesId}
                };

                $http(req).then(function success(response) {
                    //console.log(response.data);
                    $scope.ques = response.data;
                },
                        function error(response)
                        {

                        }
                );
            };
            values();

            //Submit Answer Function Starts Here
            $scope.answerQuestion = function (form, data)
            {
                if (form.$valid)
                {
                    var baseUrl = 'http://studio-tesseract.co/freesprite/wp-json/add/v2/singleQuestionAnwer';
                    //var baseUrl = 'http://localhost/freesprite/wp-json/add/v2/singleQuestionAnwer';
                    var req = {
                        method: 'POST',
                        url: baseUrl,
                        headers: {'Content-Type': "application/x-www-form-urlencoded"},
                        data: {ques_id: $scope.QuesId, user_id: localStorage.getItem("uid"), ans: data['answer']}
                    };

                    $http(req).then(function success(response) {
                        var myEl = angular.element(document.querySelector('#myList'));
                        myEl.append('<div class="category-items padding item-text-wrap" ng-repeat="y in answer">'+  
                                    '<div class="row">'+
                                    '<div class="col"><img src="img/user.svg" height="50" width="50" alt="user.svg" /></div>'+
                                    '<div class="col col-75">'+data['answer']+'</div>'+
                                    '</div>'+
                                    '</div>');
                    },
                            function error(response)
                            {

                            }
                    );
                }
            };

            //Get Comments
            var comments = function ()
            {
                $scope.answer=[];
                var baseUrl = 'http://studio-tesseract.co/freesprite/wp-json/select/v2/answers';
                //var baseUrl = 'http://localhost/freesprite/wp-json/select/v2/answers';
                var req = {
                    method: 'POST',
                    url: baseUrl,
                    headers: {'Content-Type': "application/x-www-form-urlencoded"},
                    data: {id: $scope.QuesId}
                };

                $http(req).then(function success(response) {
                    console.log(response.data);
                    $scope.answer = response.data;
                },
                        function error(response)
                        {

                        }
                );
            };
            comments();
        });