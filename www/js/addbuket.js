angular.module('addbuket.controllers', [])

  .controller('AddBucket', function ($scope, $http, $cordovaDatePicker, $ionicModal, $timeout, $ionicPopup, $state, $window, $cordovaCamera, $cordovaFileTransfer, $cordovaActionSheet, $ionicLoading) {

    //File Upload Code Starts Here
    $scope.image = null;
    $scope.URL = null;
    $scope.editimage = "http://studio-tesseract.co/freesprite/wp-content/uploads/2017/05/demo-150x150.png";
    $scope.PLAN = '';
    $scope.PLAN_TEXT = '';
    $scope.PLAN_COUNT = '';
    $scope.BUCKET_COUNT = '';
    $scope.VALUE_COUNT = '';
    $scope.enable = '';
    //Set Default Checkbox
    $scope.category = 18;
    $scope.takepic = function () {
      var actionSheetOptions = {
        title: 'Select a picture',
        buttonLabels: ['Camera', 'Choose from gallery'],
        addCancelButtonWithLabel: 'Cancel',
        androidEnableCancelButton: true
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
        //console.log('Error Login');
      });
    };

    //Add Dynamically Forms Filed
    $scope.choices = [{id: 'choice1'}];
    $scope.addFiled = function () {
      var newItemNo = $scope.choices.length + 1;
      if (newItemNo != 5) {
        $scope.choices.push({'id': 'choice' + newItemNo});
      } else {
        $scope.showAlert("Error", "<style>.popup {background-color:#fff !important;} .popup-body p{color:#136B7C !important} .popup-head h3{color:#136B7C !important} .button{background:#136B7C !important; color:#fff !important}</style><p>Maximum limit reached !<p/>");
      }
    };

    //Remove Fileds
    $scope.removeFiled = function () {
      var lastItem = $scope.choices.length - 1;
      if (lastItem != 0) {
        $scope.choices.splice(lastItem);
      }
    };

    //My Bucket List Item
    var mybucketlist = function () {
      $scope.mybucket = [];
      $scope.USERID = localStorage.getItem('uid');
      //var baseUrl = 'http://studio-tesseract.co/freesprite/wp-json/add/v2/bucket';
      var baseUrl = 'http://studio-tesseract.co/freesprite/wp-json/get/v2/mybucketlist';
      //var baseUrl = 'http://localhost/freesprite/wp-json/get/v2/mybucketlist';
      var req = {
        method: 'POST',
        url: baseUrl,
        headers: {'Content-Type': "application/x-www-form-urlencoded"},
        data: {id: $scope.USERID}
      };
      $http(req).then(function success(response) {
          $scope.mybucket = response.data;
        },
        function error(response) {

        }
      );

    };
    mybucketlist();

    //Save Idea Function Starts Here
    $scope.saveIdea = function (form, record) {
      if (form.$valid) {
        // Setup the loader
        $ionicLoading.show({
          content: 'Loading',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0
        });
        $scope.arrList = [];
        $scope.leng = $scope.choices.length;
        for (i = 0; i < $scope.leng; i++) {
          $scope.arrList.push($scope.choices[i]['list'])
        }
        $scope.data = {
          'author': localStorage.getItem("uid"),
          'cat': record['category'],
          'name': record['gname'],
          'date': record['gdate'],
          'budget': (record['budget'] != '') ? record['budget'] : '',
          'pripub': record['gpubprivat'],
          'items': $scope.arrList,
          'profile_image': $scope.URL
        };
        console.log($scope.data);
//                console.log($scope.choices[0]['list']);
//                console.log(record);
        var baseUrl = 'http://studio-tesseract.co/freesprite/wp-json/add/v2/bucket';
        //var baseUrl = 'http://localhost/freesprite/wp-json/add/v2/bucket';
        var req = {
          method: 'POST',
          url: baseUrl,
          headers: {'Content-Type': "application/x-www-form-urlencoded"},
          data: $scope.data
        };
        $http(req).then(function success(response) {
            //console.log(response.data);
            $ionicLoading.hide();
            if (response.data == "success") {
              $scope.showAlert("Success", "<style>.popup {background-color:#33cd5f !important;} .popup-body p{color:#fff !important} .popup-head h3{color:#fff !important} .button{background:#fff !important; color:#000 !important}</style><p>Bucket Added Successfully<p/>");
              $timeout(function () {
                $window.location.reload(true);
              });
            } else {
              $scope.showAlert("Error", "<style>.popup {background-color:#ef473a !important;} .popup-body p{color:#fff !important} .popup-head h3{color:#fff !important} .button{background:#fff !important; color:#000 !important}</style><p>Error in Adding<p/>");
            }
          },
          function error(response) {

          }
        );
      }
    };

    //Get List Data
    $scope.getListData = function (argID) {
      //alert(argID);
      localStorage.setItem('categoryid', argID);
      $state.go('app.bucketlist');
    };

    //Get Data Function Starts Here
    $scope.getData = function (argID) {
      localStorage.setItem('LIST_ID', argID);
      //$window.location.reload(true);
      $state.go('app.editbucket');
    };


    //Get User Plan
    $scope.checkplan = function () {
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
          ///alert($scope.PLAN);
          if ($scope.PLAN == 1) {
            $scope.PLAN_TEXT = 'Basic';
            $scope.enable = false;
            $scope.PLAN_COUNT = 100;
          } else if ($scope.PLAN == 2) {
            $scope.PLAN_TEXT = 'Pro';
            $scope.enable = true;
            $scope.PLAN_COUNT = 200;
          } else if ($scope.PLAN == 3) {
            $scope.PLAN_TEXT = 'Premium';
            $scope.enable = true;
            $scope.PLAN_COUNT = 300;
          }
        },
        function error(response) {

        }
      );
    };
    ///////////////////////////////////USER BUCKET COUNT///////////////////////

    $scope.getUserBucketCount = function () {
      $scope.USER_SESSID = localStorage.getItem("uid");
      //var baseUrl = 'http://studio-tesseract.co/freesprite/wp-json/add/v2/bucket';
      var baseUrl = 'http://studio-tesseract.co/freesprite/wp-json/get/v2/bucketcount';
      //var baseUrl = 'http://localhost/freesprite/wp-json/get/v2/mybucketlist';
      var req = {
        method: 'POST',
        url: baseUrl,
        headers: {'Content-Type': "application/x-www-form-urlencoded"},
        data: {id: $scope.USER_SESSID}
      };
      $http(req).then(function success(response) {
          $scope.VALUE_COUNT = response.data;
        },
        function error(response) {

        }
      );
    };

    ///////////////////////////////////datepicker///////////////////////
    $scope.datepicker = function () {
      console.log("datapic")
      var options = {
        date: new Date(),
        mode: 'date', // or 'time'
        minDate: new Date() - 10000,
        allowOldDates: true,
        allowFutureDates: false,
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

    //Delete Bucket Items functiion starts here..
    $scope.delete_bucket = function (argID) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Delete Bucket',
        template: 'Are you sure want to delete this bucket from your list !'
      });
      confirmPopup.then(function (res) {
        if (res) {
          var baseUrl = 'http://studio-tesseract.co/freesprite/wp-json/delete/v2/bucketpost';
          var req = {
            method: 'POST',
            url: baseUrl,
            headers: {'Content-Type': "application/x-www-form-urlencoded"},
            data: {id: argID}
          };
          $http(req).then(function success(response) {
              console.log(response);
              $scope.showAlert("Success", "<style>.popup {background-color:#33cd5f !important;} .popup-body p{color:#fff !important} .popup-head h3{color:#fff !important} .button{background:#fff !important; color:#000 !important}</style><p>Bucket Deleted Successfully<p/>");
              $timeout(function () {
                $window.location.reload(true);
              }, 2000);
            },
            function error(response) {
            }
          );
        } else {
          console.log('You clicked on "Cancel" button');
        }
      });
    };

  })
  .directive('sgNumberInput', ['$filter', '$locale', function ($filter, $locale) {
    return {
      require: 'ngModel',
      restrict: "A",
      link: function ($scope, element, attrs, ctrl) {
        var fractionSize = parseInt(attrs['fractionSize']) || 0;
        var numberFilter = $filter('number');
        //format the view value
        ctrl.$formatters.push(function (modelValue) {
          var retVal = numberFilter(modelValue, fractionSize);
          var isValid = isNaN(modelValue) == false;
          ctrl.$setValidity(attrs.name, isValid);
          return retVal;
        });
        //parse user's input
        ctrl.$parsers.push(function (viewValue) {
          var caretPosition = getCaretPosition(element[0]), nonNumericCount = countNonNumericChars(viewValue);
          viewValue = viewValue || '';
          //Replace all possible group separators
          var trimmedValue = viewValue.trim().replace(/,/g, '').replace(/`/g, '').replace(/'/g, '').replace(/\u00a0/g, '').replace(/ /g, '');
          //If numericValue contains more decimal places than is allowed by fractionSize, then numberFilter would round the value up
          //Thus 123.109 would become 123.11
          //We do not want that, therefore I strip the extra decimal numbers
          var separator = $locale.NUMBER_FORMATS.DECIMAL_SEP;
          var arr = trimmedValue.split(separator);
          var decimalPlaces = arr[1];
          if (decimalPlaces != null && decimalPlaces.length > fractionSize) {
            //Trim extra decimal places
            decimalPlaces = decimalPlaces.substring(0, fractionSize);
            trimmedValue = arr[0] + separator + decimalPlaces;
          }
          var numericValue = parseFloat(trimmedValue);
          var isEmpty = numericValue == null || viewValue.trim() === "";
          var isRequired = attrs.required || false;
          var isValid = true;
          if (isEmpty && isRequired) {
            isValid = false;
          }
          if (isEmpty == false && isNaN(numericValue)) {
            isValid = false;
          }
          ctrl.$setValidity(attrs.name, isValid);
          if (isNaN(numericValue) == false && isValid) {
            var newViewValue = numberFilter(numericValue, fractionSize);
            element.val(newViewValue);
            var newNonNumbericCount = countNonNumericChars(newViewValue);
            var diff = newNonNumbericCount - nonNumericCount;
            var newCaretPosition = caretPosition + diff;
            if (nonNumericCount == 0 && newCaretPosition > 0) {
              newCaretPosition--;
            }
            setCaretPosition(element[0], newCaretPosition);
          }
          return isNaN(numericValue) == false ? numericValue : null;
        });
      } //end of link function
    };
    //#region helper methods
    function getCaretPosition(inputField) {
      // Initialize
      var position = 0;
      // IE Support
      if (document.selection) {
        inputField.focus();
        // To get cursor position, get empty selection range
        var emptySelection = document.selection.createRange();
        // Move selection start to 0 position
        emptySelection.moveStart('character', -inputField.value.length);
        // The caret position is selection length
        position = emptySelection.text.length;
      } else if (inputField.selectionStart || inputField.selectionStart == 0) {
        position = inputField.selectionStart;
      }
      return position;
    }

    function setCaretPosition(inputElement, position) {
      if (inputElement.createTextRange) {
        var range = inputElement.createTextRange();
        range.move('character', position);
        range.select();
      } else {
        if (inputElement.selectionStart) {
          inputElement.focus();
          inputElement.setSelectionRange(position, position);
        } else {
          inputElement.focus();
        }
      }
    }

    function countNonNumericChars(value) {
      return (value.match(/[^a-z0-9]/gi) || []).length;
    }

    //#endregion helper methods
  }]);
