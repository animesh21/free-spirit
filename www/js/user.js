angular.module('user.controllers', [])

        .controller('UsrCtrl', function ($scope, $http, $ionicModal, $ionicHistory, $timeout, $ionicPopup, $state, $window, $cordovaActionSheet, $cordovaCamera) {

            //File Upload Code Starts Here
            $scope.image = null;
            $scope.URL = null;
            $scope.editimage = "img/user.svg";
            $scope.input = false;
            $scope.takepic = function () {
                var actionSheetOptions = {
                    title: 'Select a picture',
                    buttonLabels: ['Camera', 'Choose from gallery'],
                    addCancelButtonWithLabel: 'Cancel',
                    androidEnableCancelButton: true,
                };
                $cordovaActionSheet.show(actionSheetOptions).then(function (btnIndex) {
                    var index = btnIndex;
                    if (index == 2) {
                        $scope.cameraFunc(Camera.PictureSourceType.PHOTOLIBRARY)
                    } else if (index == 1) {
                        $scope.cameraFunc(Camera.PictureSourceType.CAMERA)
                    }
                });
            };

            $scope.cameraFunc = function (picType) {
                var options = {
                    quality: 50,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: picType,
                    allowEdit: false,
                    encodingType: 0,
                    targetWidth: 600,
                    targetHeight: 500,
                    encodingType: Camera.EncodingType.JPEG,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false,
                    correctOrientation: true
                }
                $cordovaCamera.getPicture(options).then(function (imageData) {
                    $scope.editimage = "data:image/jpeg;base64," + imageData;
                    $scope.URL = imageData;
                }, function (err) {
                    console.log(JSON.stringify(err));
                });


            };

            $scope.choosepic = function () {
                var options = {
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                    destinationType: Camera.DestinationType.FILE_URI,
                    quality: 400,
                    targetWidth: 400,
                    targetHeight: 400,
                    encodingType: Camera.EncodingType.JPEG,
                    correctOrientation: true
                };
                $cordovaCamera.getPicture(options).then(function (imageURI) {
                    // var image = document.getElementById('myImage');
                    $scope.editimage = "data:image/jpeg;base64," + imageData;
                    $scope.imgURI = "data:image/jpeg;base64," + imageURI;
                    // $scope.image.push($scope.imgURI);
                    //  image.src = imageURI;
                }, function (err) {
                    // error
                });
            };

            var record = function ()
            {
                ///alert(localStorage.getItem("uid"));
                $scope.user = [];
                //var baseUrl = 'http://localhost/freesprite/wp-json/info/v2/user';
                var baseUrl = 'http://studio-tesseract.co/freesprite/wp-json/info/v2/user';
                var req = {
                    method: 'POST',
                    url: baseUrl,
                    headers: {'Content-Type': "application/x-www-form-urlencoded"},
                    data: {id: localStorage.getItem("uid")}
                }
                $http(req).then(function success(response) {
                    console.log(response);
                    $scope.user.id = localStorage.getItem("uid");
                    $scope.user.email = response.data['email'];
                    $scope.user.name = response.data['firstname'];
                    $scope.user.bio = response.data['bio'];
                    if (response.data['image'] != '')
                    {
                        $scope.pic = 'http://studio-tesseract.co/freesprite/uploads/user/' + response.data['image'];
                    } else
                    {
                        $scope.pic = 'img/user.svg';
                    }
                    $scope.editimage = $scope.pic;
                    console.log($scope.editimage);
                },
                        function error(response)
                        {

                        }
                );
            };
            record();

            // An alert dialog
            $scope.showAlert = function (title, msg) {
                var alertPopup = $ionicPopup.alert({
                    title: title,
                    template: msg
                });
                alertPopup.then(function (res) {
                    $timeout(function () {
                        $window.location.reload(true);
                    });
                });
            };

            //Update Profile Function
            $scope.updateProfile = function (form, record)
            {
                $scope.val = {
                    'id': record.id,
                    'name': record.name,
                    'email': record.email,
                    'bio': record.bio,
                    'profile_image': $scope.URL,
                    'user_password': record.password
                };
                console.log($scope.val);
                //var baseUrl = 'http://localhost/freesprite/wp-json/update/v2/user';
                var baseUrl = 'http://studio-tesseract.co/freesprite/wp-json/update/v2/user';
                var req = {
                    method: 'POST',
                    url: baseUrl,
                    headers: {'Content-Type': "application/x-www-form-urlencoded"},
                    data: $scope.val
                }
                $http(req).then(function success(response) {
                    if (response.data == "success")
                    {
                        $scope.showAlert("Success", "<style>.popup {background-color:#33cd5f !important;} .popup-body p{color:#fff !important} .popup-head h3{color:#fff !important} .button{background:#fff !important; color:#000 !important}</style><p>Changes saved!<p/>");

                    } else if (response.data == "error")
                    {
                        $scope.showAlert("Error", "<style>.popup {background-color:#ef473a !important;} .popup-body p{color:#fff !important} .popup-head h3{color:#fff !important} .button{background:#fff !important; color:#000 !important}</style><p>Error in Updation<p/>");
                    }
                },
                        function error(response)
                        {

                        }
                );
            };

            //Check user old password
            $scope.checkoldpassword = function (argVal)
            {
                $scope.password = argVal;
                var baseUrl = 'http://studio-tesseract.co/freesprite/wp-json/verify/v2/password';
                var req = {
                    method: 'POST',
                    url: baseUrl,
                    headers: {'Content-Type': "application/x-www-form-urlencoded"},
                    data: {userid: localStorage.getItem("uid"), pass: $scope.password}
                };
                $http(req).then(function success(response) {
                    $scope.input = response.data;
                    console.log(response);
//                    if (response.data == "success")
//                    {
//                        $scope.showAlert("Success", "<style>.popup {background-color:#33cd5f !important;} .popup-body p{color:#fff !important} .popup-head h3{color:#fff !important} .button{background:#fff !important; color:#000 !important}</style><p>Changes saved!<p/>");
//                    } else if (response.data == "error")
//                    {
//                        $scope.showAlert("Error", "<style>.popup {background-color:#ef473a !important;} .popup-body p{color:#fff !important} .popup-head h3{color:#fff !important} .button{background:#fff !important; color:#000 !important}</style><p>Error in Updation<p/>");
//                    }
                },
                        function error(response)
                        {

                        }
                );
            };
        });

