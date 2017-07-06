angular.module('editbucket.controllers', [])

        .controller('EditCtrl', function ($scope, $http, $cordovaDatePicker, $ionicModal, $ionicHistory, $timeout, $ionicPopup, $state, $window, $ionicLoading) {

            $scope.progress = '';
            $scope.checked = {};
            $scope.record = [];
            $scope.enable = '';
            $scope.PLAN = '';
            $scope.items = [
                {id: 18, label: 'Health'},
                {id: 19, label: 'Sports'},
                {id: 20, label: 'Travel'},
                {id: 21, label: 'Learn'},
                {id: 22, label: 'Career/Wealth'},
                {id: 23, label: 'Relationships'}
            ];
            $scope.options = [
                {id: 0, label: 'Private'},
                {id: 1, label: 'Public'}
            ];
            $scope.selected = '';
            //Alert Function
            $scope.showAlert = function (title, msg) {
                var alertPopup = $ionicPopup.alert({
                    title: title,
                    template: msg
                });
                alertPopup.then(function (res) {
                    if (res)
                    {
                        $window.location.reload(true);
                    }
                });
            };

            $scope.checkItems = {};
            var getData = function ()
            {

                $scope.item = [];
                $scope.arr = [];
                $scope.BUCKET_ID = localStorage.getItem("LIST_ID");
                var baseUrl = 'http://studio-tesseract.co/freesprite/wp-json/edit/v2/bucket';
                //var baseUrl = 'http://localhost/freesprite/wp-json/add/v2/bucket';
                var req = {
                    method: 'POST',
                    url: baseUrl,
                    headers: {'Content-Type': "application/x-www-form-urlencoded"},
                    data: {bucketId: $scope.BUCKET_ID, userID: localStorage.getItem("uid")}
                };
                $http(req).then(function success(response) {
                    //$scope.item = response.data;
                    $scope.record.title = response.data['listdata']['title'];
//                    $scope.selected = response.data['listdata']['cat'];
                    $scope.record.date = response.data['date_details']['goal_date'];
                    ///$scope.record.pp = response.data['date_details']['private_/_public'];
                    $scope.item = response.data['items'];
                    //console.log($scope.item);
                    //Category Dropdown
                    if (response.data['listdata']['cat'] == 18)
                    {
                        $scope.record.selected = $scope.items[0];
                    } else if (response.data['listdata']['cat'] == 19)
                    {
                        $scope.record.selected = $scope.items[1];
                    } else if (response.data['listdata']['cat'] == 20)
                    {
                        $scope.record.selected = $scope.items[2];
                    } else if (response.data['listdata']['cat'] == 21)
                    {
                        $scope.record.selected = $scope.items[3];
                    } else if (response.data['listdata']['cat'] == 22)
                    {
                        $scope.record.selected = $scope.items[4];
                    } else if (response.data['listdata']['cat'] == 23)
                    {
                        $scope.record.selected = $scope.items[5];
                    }
                    //Private Public Dropdowm
                    if (response.data['date_details']['private_/_public'] == 'Private')
                    {
                        $scope.record.pp = $scope.options[0];
                    } else if (response.data['date_details']['private_/_public'] == 'Public')
                    {
                        $scope.record.pp = $scope.options[1];
                    }
                    console.log($scope.item);
                },
                        function error(response)
                        {

                        }
                );
            };
            getData();
            var getDataChecked = function ()
            {
                $scope.BUCKET_ID = localStorage.getItem("LIST_ID");
                var baseUrl = 'http://studio-tesseract.co/freesprite/wp-json/get/v2/checkboxtstatus';
                //var baseUrl = 'http://localhost/freesprite/wp-json/add/v2/bucket';
                var req = {
                    method: 'POST',
                    url: baseUrl,
                    headers: {'Content-Type': "application/x-www-form-urlencoded"},
                    data: {lid: $scope.BUCKET_ID}
                };
                $http(req).then(function success(response) {
                    $scope.checked = response.data['record'];
                    console.log($scope.checked);
                    console.log($scope.checkItems);
                },
                        function error(response)
                        {

                        }
                );
            };
            getDataChecked();
            //Update Bucket
            $scope.updateBucket = function ()
            {
                //console.log($scope.record);
                $scope.record = {
                    'ID': localStorage.getItem("LIST_ID"),
                    'TITLE': $scope.record['title'],
                    'DATE': $scope.record['date'],
                    'CAT': $scope.record['selected']['id'],
                    'PP': $scope.record['pp']['id']
                };
                //console.log($scope.record);
                var baseUrl = 'http://studio-tesseract.co/freesprite/wp-json/get/v2/updatepost';
                //var baseUrl = 'http://localhost/freesprite/wp-json/add/v2/bucket';
                var req = {
                    method: 'POST',
                    url: baseUrl,
                    headers: {'Content-Type': "application/x-www-form-urlencoded"},
                    data: $scope.record
                };
                $http(req).then(function success(response) {
                    console.log(response.data);
                },
                        function error(response)
                        {

                        }
                );
            };
            //Update Todo
            $scope.updateTodo = function ()
            {
                //alert('Hi');
                //console.log($scope.checked);
                // Setup the loader
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                //$scope.checkItems.push($scope.checked);
                //console.log($scope.checkItems);
                $scope.checkItems = angular.merge($scope.checkItems, $scope.checked);
                //console.log($scope.checkItems);
                $scope.bucket_id = localStorage.getItem("LIST_ID");
                var baseUrl = 'http://studio-tesseract.co/freesprite/wp-json/update/v2/todo';
                //var baseUrl = 'http://localhost/freesprite/wp-json/add/v2/bucket';
                var req = {
                    method: 'POST',
                    url: baseUrl,
                    headers: {'Content-Type': "application/x-www-form-urlencoded"},
                    data: {id: $scope.bucket_id, dataArray: $scope.checkItems}
                };
                $http(req).then(function success(response) {
                    //console.log(response.data);
                    $ionicLoading.hide();
                    if (response.data)
                    {
                        $scope.showAlert("Success", "<style>.popup {background-color:#fff !important;} .popup-body p{color:#136B7C !important} .popup-head h3{color:#136B7C !important} .button{background:#136B7C !important; color:#fff !important}</style><p>Congratulations! You completed something off your bucket list !<p/>");
                        $timeout(function () {
                            $window.location.reload(true);
                        });
                    }
//                    } else
//                    {
//                        $scope.showAlert("Error", "<style>.popup {background-color:#fff !important;} .popup-body p{color:#136B7C !important} .popup-head h3{color:#136B7C !important} .button{background:#136B7C !important; color:#fff !important}</style><p>Error in updating !<p/>");
//                    }

                },
                        function error(response)
                        {

                        }
                );

            };
            //Get Progress bar data
            var progress = function ()
            {
                $scope.BUCKET_ID = localStorage.getItem("LIST_ID");
                var baseUrl = 'http://studio-tesseract.co/freesprite/wp-json/get/v2/progresscount';
                //var baseUrl = 'http://localhost/freesprite/wp-json/get/v2/affilatelinks';
                var req = {
                    method: 'POST',
                    url: baseUrl,
                    headers: {'Content-Type': "application/x-www-form-urlencoded"},
                    data: {lid: $scope.BUCKET_ID}
                };

                $http(req).then(function success(response) {
                    $scope.progress = response.data;

                },
                        function error(response)
                        {

                        }
                );
            };
            progress();
            
            //Get User Plan
            var checkplan = function ()
            {
                $scope.USER_SESSID = localStorage.getItem("uid");
                //var baseUrl = 'http://studio-tesseract.co/freesprite/wp-json/add/v2/bucket';
                var baseUrl = 'http://studio-tesseract.co/freesprite/wp-json/get/v2/userplan';
                //var baseUrl = 'http://localhost/freesprite/wp-json/get/v2/mybucketlist';
                var req = {
                    method: 'POST',
                    url: baseUrl,
                    headers: {'Content-Type': "application/x-www-form-urlencoded"},
                    data: {id: $scope.USER_SESSID}
                };
                $http(req).then(function success(response) {
                    $scope.PLAN = response.data;
                    if ($scope.PLAN == 1)
                    {
       
                        $scope.enable = false;
                    } else if ($scope.PLAN == 2)
                    {
                        $scope.enable = true;
                    } else if ($scope.PLAN == 3)
                    {
                        $scope.enable = true;
                    }
                },
                        function error(response)
                        {

                        }
                );
            };
            checkplan();
            
            $scope.datepicker = function () {
                var options = {
                    date: new Date(),
                    mode: 'date', // or 'time'
                    minDate: new Date() - 10000,
                    allowOldDates: true,
                    allowFutureDates: false,
                    dateFormat: 'dd MMMM yyyy',
                    doneButtonLabel: 'DONE',
                    doneButtonColor: '#F2F3F4 ',
                    cancelButtonLabel: 'CANCEL',
                    cancelButtonColor: '#000000 '
                };

                $cordovaDatePicker.show(options).then(function (date) {
                    alert(date);
                    console.log("data=======" + JSON.stringify(date));
                });
            };


        });


