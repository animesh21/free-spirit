angular.module('recommand.controllers', [])

        .controller('RecCtrl', function ($scope, $http, $ionicModal, $ionicHistory, $timeout, $ionicPopup, $state, $window, $ionicLoading, $ionicLoading) {

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

            //Recommand Js Starts Here

            //Get Question
            $scope.quesdata = [];
            var data = function ()
            {
                // Setup the loader
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                var baseUrl = 'http://studio-tesseract.co/freesprite/wp-json/get/v2/userquestion';
                //var baseUrl = 'http://localhost/freesprite/wp-json/get/v2/userquestion';
                var req = {
                    method: 'GET',
                    url: baseUrl,
                    headers: {'Accept': 'application/json, text/javascript, */*; q=0.01',
                        'Content-Type': 'application/json; charset=utf-8'}
                };

                $http(req).then(function success(response) {
                    $ionicLoading.hide();
                    //console.log(response.data);
                    $scope.quesdata = response.data;
                },
                        function error(response)
                        {

                        }
                );
            };
            data();

            //
            $scope.getDiscusstion = function ()
            {
                // Setup the loader
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                var baseUrl = 'http://studio-tesseract.co/freesprite/wp-json/get/v2/userRecommandations';
                //var baseUrl = 'http://localhost/freesprite/wp-json/get/v2/userquestion';
                var req = {
                    method: 'GET',
                    url: baseUrl,
                    headers: {'Accept': 'application/json, text/javascript, */*; q=0.01',
                        'Content-Type': 'application/json; charset=utf-8'}
                };

                $http(req).then(function success(response) {
                    $ionicLoading.hide();
                    //console.log(response.data);
                    $scope.quesdata = response.data;
                },
                        function error(response)
                        {

                        }
                );
            };

            //Add Question
            $scope.submitQuestion = function (form, record)
            {
                if (form.$valid)
                {
                    // Setup the loader
                    $ionicLoading.show({
                        content: 'Loading',
                        animation: 'fade-in',
                        showBackdrop: true,
                        maxWidth: 200,
                        showDelay: 0
                    });
                    var baseUrl = 'http://studio-tesseract.co/freesprite/wp-json/insert/v2/userquestion';
                    //var baseUrl = 'http://localhost/freesprite/wp-json/insert/v2/userquestion';
                    var req = {
                        method: 'POST',
                        url: baseUrl,
                        headers: {'Content-Type': "application/x-www-form-urlencoded"},
                        data: {id: localStorage.getItem("uid"), ques: record['question']}
                    };

                    $http(req).then(function success(response) {
                        $ionicLoading.hide();
                        $window.location.reload(true);
                    },
                            function error(response)
                            {

                            }
                    );
                }
            };

            //Ques Ans Function
            $scope.quesAns = function (argId)
            {
                localStorage.setItem('questionID', argId);
//                $window.location.reload(true);
                $state.go('app.quesans');
            };

            //Ask an Expert functions Starts Here
            $scope.getUserDetails = function ()
            {
                $scope.userdata = [];
                $scope.user = localStorage.getItem("uid");
                // Setup the loader
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                //var baseUrl = 'http://studio-tesseract.co/freesprite/wp-json/get/v2/userquestion';
                var baseUrl = 'http://studio-tesseract.co/freesprite/wp-json/get/v2/expertuserinformation';
                //var baseUrl = 'http://localhost/freesprite/wp-json/get/v2/expertuserinformation';
                var req = {
                    method: 'POST',
                    url: baseUrl,
                    headers: {'Content-Type': "application/x-www-form-urlencoded"},
                    data: {id: localStorage.getItem("uid")}
                };

                $http(req).then(function success(response) {
                    $ionicLoading.hide();
                    //console.log(response.data);
                    $scope.userdata.name = response.data['data']['display_name'];
                    $scope.userdata.email = response.data['data']['user_email'];
                },
                        function error(response)
                        {

                        }
                );

            };

            //Send User Information to Expert
            $scope.send = function (form, record)
            {
                if (form.$valid)
                {
                    console.log(record.name);
                    values = {
                        name: record.name,
                        email: record.email,
                        phone: record.phone,
                        message: record.message
                    };
                    // Setup the loader
                    $ionicLoading.show({
                        content: 'Loading',
                        animation: 'fade-in',
                        showBackdrop: true,
                        maxWidth: 200,
                        showDelay: 0
                    });
                    //var baseUrl = 'http://localhost/freesprite/sendmail.php';
                    var baseUrl = 'http://studio-tesseract.co/freesprite/sendmail.php';
                    var req = {
                        method: 'POST',
                        url: baseUrl,
                        headers: {'Content-Type': "application/x-www-form-urlencoded"},
                        data: values
                    };

                    $http(req).then(function success(response) {
                        $ionicLoading.hide();
                        $timeout(function () {
                            $window.location.reload(true);
                        });
                        console.log(response);
                        if (response.data == "success")
                        {
                            $scope.showAlert("Success", "<style>.popup {background-color:#33cd5f !important;} .popup-body p{color:#fff !important} .popup-head h3{color:#fff !important} .button{background:#fff !important; color:#000 !important}</style><p>Mail Send Successfully !<p/>");
                            $window.location.reload(true);
                        } else if (response.data == "error")
                        {
                            $scope.showAlert("Error", "<style>.popup {background-color:#ef473a !important;} .popup-body p{color:#fff !important} .popup-head h3{color:#fff !important} .button{background:#fff !important; color:#000 !important}</style><p>Error in Sending<p/>");
                        }

                    },
                            function error(response)
                            {

                            }
                    );
                }
            };

            //Submit Recommand function Starts Here..
            $scope.submitRecommand = function (form, data)
            {
                if (form.$valid)
                {
                    $scope.USER_ID = localStorage.getItem("uid");
                    ///$scope.catId = argID;
                    //var baseUrl = 'http://localhost/freesprite/wp-json/getBucketList/v2/cat';
                    var baseUrl = 'http://studio-tesseract.co/freesprite/wp-json/add/v2/recommand';
                    var req = {
                        method: 'POST',
                        url: baseUrl,
                        headers: {'Content-Type': "application/x-www-form-urlencoded"},
                        data: {id: localStorage.getItem("uid"), content: data.recommand}
                    };
                    $http(req).then(function success(response) {
                        console.log(response.data);
                        $timeout(function () {
                            $window.location.reload(true);
                        });
                    },
                            function error(response)
                            {

                            }
                    );
                }
            };
            //Ends Here

            $scope.recommandAns = function (argId)
            {
                localStorage.setItem('recommandID', argId);
//                $window.location.reload(true);
                $state.go('app.recommandans');
            };


        })
        .controller('RecommandAns', function ($scope, $http, $ionicModal, $ionicHistory, $timeout, $ionicPopup, $state, $window, $ionicLoading, $ionicLoading) {

            var data = function ()
            {
                $scope.ques = [];
                $scope.QuesId = localStorage.getItem("questionID");
                var baseUrl = 'http://studio-tesseract.co/freesprite/wp-json/get/v2/singleRecommand';
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
            data();

            //Answer Recommandation
            $scope.answerRecommand=function (form, data)
            {
                if (form.$valid)
                {
                    var baseUrl = 'http://studio-tesseract.co/freesprite/wp-json/add/v2/singleRecommandAnwer';
                    //var baseUrl = 'http://localhost/freesprite/wp-json/add/v2/singleQuestionAnwer';
                    var req = {
                        method: 'POST',
                        url: baseUrl,
                        headers: {'Content-Type': "application/x-www-form-urlencoded"},
                        data: {ques_id: localStorage.getItem("recommandID"), user_id: localStorage.getItem("uid"), ans: data['answer']}
                    };

                    $http(req).then(function success(response) {
                        var myEl = angular.element(document.querySelector('#myList'));
                        myEl.append('<div class="category-items padding item-text-wrap" ng-repeat="y in answer">' +
                                '<div class="row">' +
                                '<div class="col"><img src="img/user.svg" height="50" width="50" alt="user.svg" /></div>' +
                                '<div class="col col-75">' + data['answer'] + '</div>' +
                                '</div>' +
                                '</div>');
                    },
                            function error(response)
                            {

                            }
                    );
                }
            };
            
            var comments = function ()
            {
                $scope.answer=[];
                var baseUrl = 'http://studio-tesseract.co/freesprite/wp-json/select/v2/answers';
                //var baseUrl = 'http://localhost/freesprite/wp-json/select/v2/answers';
                var req = {
                    method: 'POST',
                    url: baseUrl,
                    headers: {'Content-Type': "application/x-www-form-urlencoded"},
                    data: {id: localStorage.getItem("recommandID")}
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