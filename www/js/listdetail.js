angular.module('listdetail.controllers', [])
        .controller('ListCtrl', function ($scope, $http, $http, serverRepo, $ionicModal, $ionicHistory, $timeout, $ionicPopup, $state, $window, $cordovaCamera, $cordovaFileTransfer, $ionicLoading) {
            $scope.items = [];
            $scope.checkItems = [];
            $scope.image = null;
            $scope.URL = null;
            $scope.editimage = "http://studio-tesseract.co/freesprite/wp-content/uploads/2017/05/demo.jpg";
            $scope.value = {};
            //Image Upload Code Starts Here.....
            $scope.takepic = function () {

                var actionSheetOptions = {
                    title: 'Select a picture',
                    buttonLabels: ['Camera', 'Choose from gallery'],
                    addCancelButtonWithLabel: 'Cancel',
                    androidEnableCancelButton: true,
                }
                $cordovaActionSheet.show(actionSheetOptions).then(function (btnIndex) {
                    var index = btnIndex;
                    if (index == 2) {
                        $scope.cameraFunc(Camera.PictureSourceType.PHOTOLIBRARY)
                    } else if (index == 1) {
                        $scope.cameraFunc(Camera.PictureSourceType.CAMERA)
                    }
                });
            }

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
                    console.log(JSON.stringify(err))
                })


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
                    $scope.imgURI = "data:image/jpeg;base64," + imageURI;
                    // $scope.image.push($scope.imgURI);
                    //  image.src = imageURI;
                    $scope.URL = imageURI;
                }, function (err) {
                    // error
                });
            };
            //Upload function
            $scope.getImageData = function ()
            {
                alert('function called');
                // var url = 'http://studio-tesseract.co/freesprite/wp-json/upload/v2/image';
                // File for Upload
                //     var url = 'http://studio-tesseract.co/freesprite/upload.php';

                var data = {
                    "profile_image": $scope.URL
                            // $scope.editimages 

                }
                console.log("Data---->>" + JSON.stringify(data))

                serverRepo.postServices(data).then(function (res) {

                    console.log("6666666====" + JSON.stringify(res))



                }, function (err) {
                    console.log("err---->>" + JSON.stringify(err))
                })


                //      $http({
                //      url: 'http://studio-tesseract.co/freesprite/upload.php',
                //      method: "POST",
                //       headers: {'Content-Type': "application/x-www-form-urlencoded"},
                //     data: { 'profile_image' : $scope.URL }
                //    })
                //     .then(function(response) {
                //         alert("success")
                // // success
                //       }, 
                //     function(response) { // optional
                // // failed
                //        });
                // var targetPath = $scope.URL;
                // // File name only
                // var filename = $scope.image;
                // var options = {
                //     fileKey: "file",
                //     fileName: filename,
                //     chunkedMode: true,
                //     mimeType: "image/jpg"
                // };
                // // document.addEventListener('deviceready', function () {

                // $cordovaFileTransfer.upload(url, targetPath, options).then(function (result) {
                //     console.log(result);
                //     alert('Success', 'Image upload finished.');
                // });
                // }, false);
            };
            //Ends Here....
            var record = function ()
            {
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                $scope.listID = localStorage.getItem("listId");
                //alert($scope.listID);
                //var baseUrl = 'http://localhost/freesprite/wp-json/getSingleList/v2/list';
                var baseUrl = 'http://studio-tesseract.co/freesprite/wp-json/getSingleList/v2/list';
                var req = {
                    method: 'POST',
                    url: baseUrl,
                    headers: {'Content-Type': "application/x-www-form-urlencoded"},
                    data: {id: $scope.listID}
                }

                $http(req).then(function success(response) {
                    $ionicLoading.hide();
                    if (response.data['thumbnail'] == '' || response.data['thumbnail'] == null)
                    {
                        $scope.image = "http://studio-tesseract.co/freesprite/wp-content/uploads/2017/05/demo.png";

                    } else
                    {
                        $scope.image = 'http://studio-tesseract.co/freesprite/uploads/' + response.data['thumbnail'];
                    }
                    //alert($scope.image);
                    console.log(response.data);
                    $scope.value.author = response.data['name'];
                    $scope.value.postId = response.data['postId'];
                    $scope.value.category = response.data['category'];
                    $scope.value.title = response.data['title'];
                    $scope.value.status = response.data['pub/pri'];
                    $scope.editimage = $scope.image;
                    $scope.value.date = response.data['goalDate'];
                    $scope.value.posted_date = response.data['posted_date'];
                    if (response.data['item_1'] != '' && response.data['item_1'] != null)
                    {
                        $scope.items.push(response.data['item_1']);
                    }
                    if (response.data['item_2'] != '' && response.data['item_2'] != null)
                    {
                        $scope.items.push(response.data['item_2']);
                    }
                    if (response.data['item_3'] != '' && response.data['item_3'] != null)
                    {
                        $scope.items.push(response.data['item_3']);
                    }
                    if (response.data['item_4'] != '' && response.data['item_4'] != null)
                    {
                        $scope.items.push(response.data['item_4']);
                    }
                    if (response.data['item_5'] != '' && response.data['item_5'] != null)
                    {
                        $scope.items.push(response.data['item_5']);
                    }
                    ///console.log($scope.items);
                    $scope.checkItems = $scope.items;
                },
                        function error(response)
                        {
                        }
                );
            };
            record();
            //Alert Function
            $scope.showAlert = function (title, msg) {
                var alertPopup = $ionicPopup.alert({
                    title: title,
                    template: msg
                });
                alertPopup.then(function (res) {
                    //console.log('Error Login');
                });
            };
            //            $scope.getImageData = function ()
            //            {
            //                var f = document.getElementById('file').files[0];
            //                var fd = new FormData();
            //                fd.append('file', file);
            //                fd.append('name', f.name);
            //                $http.post('http://localhost/freesprite/wp-json/upload/v2/postImage', fd, {
            //                    transformRequest: angular.identity,
            //                    headers: {'Content-Type': undefined, 'Process-Data': false}
            //                })
            //                        .success(function (response) {
            //                            console.log(response);
            //                        })
            //                        .error(function () {
            //                            console.log("Success");
            //                        });
            //            };
            //Add Filed
            $scope.choices = [{id: 'choice1'}];
            $scope.addFiled = function ()
            {
                //alert('Siddhant');
                var newItemNo = $scope.choices.length + 1;
                if (newItemNo != 5)
                {
                    //console.log($scope.choices);
                    $scope.choices.push({'id': 'choice' + newItemNo});
                } else
                {
                    $scope.showAlert("Error", "<style>.popup {background-color:#ef473a !important;} .popup-body p{color:#fff !important} .popup-head h3{color:#fff !important} .button{background:#fff !important; color:#000 !important}</style><p>Maximum limit Reached !<p/>");
                }
            };
            //Remove Fileds
            $scope.removeFiled = function () {
                var lastItem = $scope.choices.length - 1;
                if (lastItem != 0)
                {
                    $scope.choices.splice(lastItem);
                }
            };
            //Update List Data
            $scope.updateListData = function (responce)
            {
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                $scope.arrList = [];
                $scope.leng = $scope.choices.length;
                for (i = 0; i < $scope.leng; i++)
                {
                    $scope.arrList.push($scope.choices[i]['list'])
                }
                $scope.updateData = {
                    'postID': responce['postId'],
                    'postTitle': responce['title'],
                    'date': responce['date'],
                    'author': localStorage.getItem("uid"),
                    'cat': responce['category'],
                    'pripub': responce['status'],
                    'items': $scope.arrList,
                    'image': $scope.URL
                };
                var baseUrl = 'http://studio-tesseract.co/freesprite/wp-json/updateSingleList/v2/list';
                //var baseUrl = 'http://localhost/freesprite/wp-json/updateSingleList/v2/list';
                var req = {
                    method: 'POST',
                    url: baseUrl,
                    headers: {'Content-Type': "application/x-www-form-urlencoded"},
                    data: $scope.updateData
                };
                $http(req).then(function success(response) {
                    $ionicLoading.hide();
                    if (response.data == "success")
                    {
                        $scope.showAlert("Success", "<style>.popup {background-color:#33cd5f !important;} .popup-body p{color:#fff !important} .popup-head h3{color:#fff !important} .button{background:#fff !important; color:#000 !important}</style><p>Bucket Updated Successfully<p/>");
                        $window.location.reload(true);
                    } else if (response.data == "error")
                    {
                        $scope.showAlert("Error", "<style>.popup {background-color:#ef473a !important;} .popup-body p{color:#fff !important} .popup-head h3{color:#fff !important} .button{background:#fff !important; color:#000 !important}</style><p>Error in Updating<p/>");
                    }
                },
                        function error(response)
                        {
                        }
                );
                console.log(responce.data);
                console.log($scope.updateData);
            };
        })

        //ListDeatils Controllers 
        .controller('ListDetailCtrl', function ($scope, $http, $http, serverRepo, $ionicModal, $ionicHistory, $timeout, $ionicPopup, $state, $window, $cordovaCamera, $cordovaFileTransfer, $ionicLoading) {

            $scope.items = [];
            $scope.checkItems = [];
            $scope.image = null;
            $scope.URL = null;
            $scope.editimage = "http://studio-tesseract.co/freesprite/wp-content/uploads/2017/05/demo.jpg";
            $scope.value = {};
            $scope.todo = {};
            $scope.rec = {};
            var record = function ()
            {
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                $scope.listID = localStorage.getItem("listId");
                //alert($scope.listID);
                //var baseUrl = 'http://localhost/freesprite/wp-json/getSingleList/v2/list';
                var baseUrl = 'http://studio-tesseract.co/freesprite/wp-json/getSingleList/v2/list';
                var req = {
                    method: 'POST',
                    url: baseUrl,
                    headers: {'Content-Type': "application/x-www-form-urlencoded"},
                    data: {id: $scope.listID}
                }

                $http(req).then(function success(response) {
                    $ionicLoading.hide();
                    if (response.data['thumbnail'] == '' || response.data['thumbnail'] == null)
                    {
                        $scope.image = "http://studio-tesseract.co/freesprite/wp-content/uploads/2017/05/demo.png";

                    } else
                    {
                        $scope.image = 'http://studio-tesseract.co/freesprite/uploads/' + response.data['thumbnail'];
                    }
                    //alert($scope.image);
                    $scope.rec = response.data;
                    $scope.value.postId = response.data['postId'];
                    $scope.value.category = response.data['category'];
                    $scope.value.title = response.data['title'];
                    $scope.value.status = response.data['pub/pri'];
                    $scope.editimage = $scope.image;
                    $scope.value.date = response.data['goalDate'];
                    $scope.value.posted_date = response.data['posted_date'];
                    if (response.data['item_1'] != '' && response.data['item_1'] != null)
                    {
                        $scope.items.push(response.data['item_1']);
                    }
                    if (response.data['item_2'] != '' && response.data['item_2'] != null)
                    {
                        $scope.items.push(response.data['item_2']);
                    }
                    if (response.data['item_3'] != '' && response.data['item_3'] != null)
                    {
                        $scope.items.push(response.data['item_3']);
                    }
                    if (response.data['item_4'] != '' && response.data['item_4'] != null)
                    {
                        $scope.items.push(response.data['item_4']);
                    }
                    if (response.data['item_5'] != '' && response.data['item_5'] != null)
                    {
                        $scope.items.push(response.data['item_5']);
                    }
                    console.log(response.data);
                    $scope.checkItems = $scope.items;
                },
                        function error(response)
                        {
                        }
                );
            };
            record();

            //Alert
            $scope.showAlert = function (title, msg) {
                var alertPopup = $ionicPopup.alert({
                    title: title,
                    template: msg
                });
                alertPopup.then(function (res) {
                    //console.log('Error Login');
                });
            };

            //Add Idea to user
            $scope.addIdeaToUser = function ()
            {
                $scope.LISTING_ID = localStorage.getItem("listId");
                localStorage.setItem("LISTINGID", $scope.LISTING_ID);
                $window.location.reload(true);
                $state.go('app.useraddbucket');
            };

        })
        ///User Add List Controller
        .controller('UserAddBucket', function ($scope, $http, $cordovaDatePicker, $ionicModal, $timeout, $ionicPopup, $state, $window, $cordovaCamera, $cordovaFileTransfer, $cordovaActionSheet, $ionicLoading) {

            $scope.image = null;
            $scope.URL = null;
            $scope.editimage = "http://studio-tesseract.co/freesprite/wp-content/uploads/2017/05/demo-150x150.png";
            $scope.value = {};
            $scope.data = [];
            $scope.choice = {};
            $scope.items = [
                {id: 18, label: 'Health'},
                {id: 19, label: 'Sports'},
                {id: 20, label: 'Travel'},
                {id: 21, label: 'Learn'},
                {id: 22, label: 'Career/Wealth'},
                {id: 23, label: 'Relationships'}
            ];
            var record = function ()
            {
                $scope.LISTING_ID = localStorage.getItem("LISTINGID");
                var baseUrl = 'http://studio-tesseract.co/freesprite/wp-json/add/v2/usercustombucket';
                //var baseUrl = 'http://localhost/freesprite/wp-json/add/v2/custombucket';
                var req = {
                    method: 'POST',
                    url: baseUrl,
                    headers: {'Content-Type': "application/x-www-form-urlencoded"},
                    data: {LIST_ID: $scope.LISTING_ID}
                };
                $http(req).then(function success(response) {
                    console.log(response.data);
                    $scope.value.title = response.data['title'];
                    if (response.data['category'] == 18)
                    {
                        $scope.value.selected = $scope.items[0];
                    } else if (response.data['category'] == 19)
                    {
                        $scope.value.selected = $scope.items[1];
                    } else if (response.data['category'] == 20)
                    {
                        $scope.value.selected = $scope.items[2];
                    } else if (response.data['category'] == 21)
                    {
                        $scope.value.selected = $scope.items[3];
                    } else if (response.data['category'] == 22)
                    {
                        $scope.value.selected = $scope.items[4];
                    } else if (response.data['category'] == 23)
                    {
                        $scope.value.selected = $scope.items[5];
                    }
                    //Items Array
                    if (response.data['item_1'] != '')
                    {
                        $scope.data.push(response.data['item_1']);
                    } else if (response.data['item_2'] != '')
                    {
                        $scope.data.push(response.data['item_2']);
                    }
                    if (response.data['item_3'] != '')
                    {
                        $scope.data.push(response.data['item_3']);
                    }
                    if (response.data['item_4'] != '')
                    {
                        $scope.data.push(response.data['item_4']);
                    }
                    if (response.data['item_5'] != '')
                    {
                        $scope.data.push(response.data['item_5']);
                    }
                    console.log($scope.data);
//                    if (response.data == "success")
//                    {
//                        $scope.showAlert("Sucess", "<style>.popup {background-color:#fff !important;} .popup-body p{color:#136B7C !important} .popup-head h3{color:#136B7C !important} .button{background:#136B7C !important; color:#fff !important}</style><p>Added to your bucket !<p/>");
//                    } else
//                    {
//                        $scope.showAlert("Error", "<style>.popup {background-color:#fff !important;} .popup-body p{color:#136B7C !important} .popup-head h3{color:#136B7C !important} .button{background:#136B7C !important; color:#fff !important}</style><p>Error in Adding !<p/>");
//                    }
                },
                        function error(response)
                        {

                        }
                );
            };
            record();

            //Take Pic Function
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
            //Camera Function
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
                    console.log(JSON.stringify(err))
                });


            };

            //Choose pic function
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
                    $scope.imgURI = "data:image/jpeg;base64," + imageURI;
                    $scope.URL = imageURI;
                    // $scope.image.push($scope.imgURI);
                    //  image.src = imageURI;
                }, function (err) {
                    // error
                });
            };

            //Alert Function
            $scope.showAlert = function (title, msg) {
                var alertPopup = $ionicPopup.alert({
                    title: title,
                    template: msg
                });
                alertPopup.then(function (res) {
                    $state.go('app.home');
                    $timeout(function () {
                        $window.location.reload(true);
                    });
                });
            };

            //Add Filed Function 
            $scope.choices = [{id: 'choice1'}];
            $scope.addFiled = function ()
            {
                var newItemNo = $scope.choices.length + 1;
                if (newItemNo != 5)
                {
                    $scope.choices.push({'id': 'choice' + newItemNo});
                } else
                {
                    $scope.showAlert("Error", "<style>.popup {background-color:#fff !important;} .popup-body p{color:#136B7C !important} .popup-head h3{color:#136B7C !important} .button{background:#136B7C !important; color:#fff !important}</style><p>Maximum limit reached !<p/>");
                }
            };

            //Delete Filed Function
            //Remove Fileds
            $scope.removeFiled = function () {
                var lastItem = $scope.data.length - 1;
                if (lastItem != 0)
                {
                    $scope.data.splice(lastItem);
                }
            };

            //Remove Fileds
            $scope.removeFiled1 = function () {
                var lastItem = $scope.choices.length - 1;
                if (lastItem != 0)
                {
                    $scope.choices.splice(lastItem);
                }
            };

            ///Save Todo
            $scope.saveTodoList = function (form)
            {
                if (form.$valid)
                {
                    $scope.dataArray = {
                        'userid': localStorage.getItem("uid"),
                        'title': $scope.value['title'],
                        'category': $scope.value['selected']['id'],
                        'date': $scope.value.gdate,
                        'budget': $scope.value.budget,
                        'items': $scope.data,
                        'itemsentered': $scope.choices,
                        'pri_pub':$scope.value.gpubprivat,
                        'image': $scope.URL
                    };
                    console.log($scope.dataArray);
                }
                var baseUrl = 'http://studio-tesseract.co/freesprite/wp-json/add/v2/custombucket';
                //var baseUrl = 'http://localhost/freesprite/wp-json/add/v2/custombucket';
                var req = {
                    method: 'POST',
                    url: baseUrl,
                    headers: {'Content-Type': "application/x-www-form-urlencoded"},
                    data: $scope.dataArray
                };
                $http(req).then(function success(response) {
                    //console.log(response.data);
                    if (response.data == "success")
                    {
                        $scope.showAlert("Sucess", "<style>.popup {background-color:#fff !important;} .popup-body p{color:#136B7C !important} .popup-head h3{color:#136B7C !important} .button{background:#136B7C !important; color:#fff !important}</style><p>Added to your bucket !<p/>");
                    } else
                    {
                        $scope.showAlert("Error", "<style>.popup {background-color:#fff !important;} .popup-body p{color:#136B7C !important} .popup-head h3{color:#136B7C !important} .button{background:#136B7C !important; color:#fff !important}</style><p>Error in Adding !<p/>");
                    }
                },
                        function error(response)
                        {

                        }
                );
            };
        });
        