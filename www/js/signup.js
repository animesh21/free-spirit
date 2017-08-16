angular.module('signup.controllers', [])

  .controller('SignUp', function ($scope, $http, $ionicModal, $ionicPopup, $timeout, $state, $ionicLoading, PaypalService) {
    $scope.fb = localStorage.getItem('fb');
    console.log('Value of fb in local storage: ' + $scope.fb);
    console.log($scope.fb == 1);
    $scope.showing = function ($argId) {
      if ($scope.fb) {
        $scope.validate = true;  // all fb users are valid
      }
      else {
        $scope.validate = $scope.stepOneValidation();
      }
      if ($scope.validate == false) {
        $scope.showAlert("Error", "<style>.popup {background: #f96332 !important;} .popup-body p{color:#fff !important} .popup-head h3{color:#fff !important} .button{background:#fff !important; color:#000 !important}</style><p>Please Enter required Fileds!<p/>");
      }
      else if ($scope.validate == true) {
        //alert('True');
        $scope.show = $argId;
        if ($scope.show == 2) {
          var confirmPopup = $ionicPopup.confirm({
            title: 'Start your Free Trial Today',
            template: 'Sign up with the Premium plan and get the first month free !'
          });
          confirmPopup.then(function (res) {
            if (res) {
              var transaction_id;
              var transaction_status;
              var transaction_time;
              $scope.one_month = true;
              $scope.data.choice = 3;
              $scope.show = 3;
              $scope.setPaln($scope.data.choice);
              $scope.showing($scope.data.choice);
              // var amount = 97;
              var amount = 0.01;  // for testing
              $scope.payment(amount).then(function (response) {
                console.log('Payment successful: ' + JSON.stringify(response));
                transaction_id = response['response']['id'];
                transaction_status = response['response']['state'];
                transaction_time = response['response']['create_time'];
                $scope.showAlert('Payment successful', 'Payment ID: ' + transaction_id +
                  '\nPayment Status: ' + transaction_status);
                $scope.one_month = true;
                $scope.values = {
                  'name': $scope.data.name,
                  'email': $scope.data.email,
                  'choice': 3,
                  'birthday': $scope.data.birthday,
                  'password': $scope.data.password,
                  'transaction_time': transaction_time,
                  'transaction_id': transaction_id,
                  'transaction_status': transaction_status,
                  'one_month': $scope.one_month
                };
                $ionicLoading.show({
                  content: 'Loading',
                  animation: 'fade-in',
                  showBackdrop: true,
                  maxWidth: 200,
                  showDelay: 0
                });
                var baseUrl = 'http://studio-tesseract.co/freesprite/wp-json/register/v2/user';
                //var baseUrl = 'http://localhost/freesprite/wp-json/register/v2/user';
                var req = {
                  method: 'POST',
                  url: baseUrl,
                  headers: {'Content-Type': "application/x-www-form-urlencoded"},
                  data: $scope.values
                };
                $scope.signupHelper(req);
              }, function (error) {
                console.error('Error in payment: ' + error);
                $scope.showAlert('Payment not successful', 'Error: ' + error);
              });
            } else {
              console.log('You clicked on "Cancel" button');
              $scope.one_month = false;
            }
          });
        }
        if ($scope.show == 3) {
          if ($scope.enable == 1) {
            //alert($scope.enable);
            $scope.display = 4;
          } else if ($scope.enable == 2) {
            $scope.display = 5;
          } else if ($scope.enable == 3) {
            $scope.display = 6;
          }
          console.log('value of display: ' + $scope.display);
        }
      }
    };


    $scope.data = [];
    $scope.enable = 1;
    $scope.display = 4;
    $scope.flag = true;
    if ($scope.fb) {
      $scope.show = 2;
      $scope.data.name = '';
      $scope.data.email = localStorage.getItem('username');
      $scope.data.password = '';
      $scope.data.birthday = '';
      $scope.showing(2);
    }
    else {
      $scope.show = 1;
    }


    // variable for first one month free
    $scope.one_month = false;

    //Step One Validation
    $scope.stepOneValidation = function () {
      if ($scope.data.name == '' || $scope.data.name == null || $scope.data.name == 'undefined') {
        return false;
      } else if ($scope.data.email == '' || $scope.data.email == null || $scope.data.birthday == 'undefined') {
        return false;
      } else if ($scope.data.password == '' || $scope.data.password == null || $scope.data.password == 'undefined') {
        return false;
      } else if ($scope.data.birthday == '' || $scope.data.birthday == null || $scope.data.birthday == 'undefined') {
        return false;
      } else {
        return true;
      }
    };

    //Step Two Validation
    $scope.stepTwoValidation = function () {
      if ($scope.choice == '' || $scope.choice == null || $scope.choice == 'undefined') {
        return false;
      }
      else {
        return true;
      }
    };

    //Alert Box Function
    $scope.showAlert = function (title, msg) {
      var alertPopup = $ionicPopup.alert({
        title: title,
        template: msg
      });
      alertPopup.then(function (res) {
        //console.log('Error Login');
      });
    };


    ////////////////paypal//////////////////

    $scope.payment = function (amount) {
      return PaypalService.initPaymentUI().then(function () {
        console.log('initiated paypal UI');
        return PaypalService.makePayment(amount, "Total Amount");
      }, function (error) {
        console.error("Couldn't initiate payment UI: " + error);
      });
    };
    //Set Plan Function Starts Here...
    $scope.setPaln = function (val) {
      //alert("Function Called");
      $scope.enable = val;
      console.log('setting enable to : ' + val);
      localStorage.setItem('displayID', $scope.enable);
    };

    //Signup Function Starts Here
    $scope.signup = function (form, record) {
      var amount;
      var transaction_id;
      var transaction_time;
      var transaction_status;
      if (record.choice == 1) {
        amount = 0;
      }
      else if (record.choice == 2) {
        // amount = 39.99;
        amount = 0.01;  // for testing
      }
      else if (record.choice == 3) {
        // amount = 97;
        amount = 0.01;  // for testing
      }
      if (amount != 0) {
        var payment_promise = $scope.payment(amount);
        console.log('Payment promise: ' + payment_promise);
        payment_promise.then(function (response) {
          transaction_id = response['response']['id'];
          transaction_time = response['response']['create_time'];
          transaction_status = response['response']['state'];
          console.log('payment successful: ' + JSON.stringify(response));
          console.log('Transaction Time: ' + transaction_time);
          $scope.showAlert('Payment successful', 'Payment ID: ' + transaction_id +
            '\nPayment Status: ' + transaction_status);
          $scope.values = {
            "name": record.name,
            "email": record.email,
            "choice": record.choice,
            "birthday": record.birthday,
            "password": record.password,
            "transaction_time": transaction_time,
            "transaction_id": transaction_id,
            "transaction_status": transaction_status,
            "one_month": $scope.one_month
          };
          var baseUrl = 'http://studio-tesseract.co/freesprite/wp-json/register/v2/user';
          //var baseUrl = 'http://localhost/freesprite/wp-json/register/v2/user';
          var req = {
            method: 'POST',
            url: baseUrl,
            headers: {'Content-Type': "application/x-www-form-urlencoded"},
            data: $scope.values
          };
          $scope.signupHelper(req)
        }, function (error) {
          console.error('Error in the payment: ' + error);
          $scope.showAlert('Error in the payment', 'Error details: ' + error);
        });
      }
      else {
        transaction_id = "";
        transaction_time = "";
        transaction_status = "";
        $scope.values = {
          "name": record.name,
          "email": record.email,
          "choice": record.choice,
          "birthday": record.birthday,
          "password": record.password,
          "transaction_time": transaction_time,
          "transaction_id": transaction_id,
          "transaction_status": transaction_status,
          "one_month": $scope.one_month
        };
        var baseUrl = 'http://studio-tesseract.co/freesprite/wp-json/register/v2/user';
        //var baseUrl = 'http://localhost/freesprite/wp-json/register/v2/user';
        var req = {
          method: 'POST',
          url: baseUrl,
          headers: {'Content-Type': "application/x-www-form-urlencoded"},
          data: $scope.values
        };
        $scope.signupHelper(req)

      }
    };

    $scope.signupHelper = function (req) {
      console.log('inside helper');
      // Setup the loader
      $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0,
        duration: 3000
      });
      $http(req).then(function success(response) {
          console.log('request posted');
          $ionicLoading.hide();
          console.log(response.data);
          if (response.data['msg'] == "success") {
            //console.log(response.data['data']['ID']);
            $scope.loggedIn = 1;
            localStorage.setItem('uid', response.data['data']['ID']);
            localStorage.setItem('username', response.data['data']['display_name']);
            localStorage.setItem('loggedIn', $scope.loggedIn);
            $state.go('app.home');
            ///$state.go('login');
          } else if (response.data['msg'] == "warning") {
            $scope.showAlert("Error", "<style>.popup {background: #f96332 !important;} .popup-body p{color:#fff !important} .popup-head h3{color:#fff !important} .button{background:#fff !important; color:#000 !important}</style><p>Email Already Exists!<p/>");

          } else if (response.data['msg'] == "error") {
            $scope.showAlert("Error", "<style>.popup {background: #f96332 !important;} .popup-body p{color:#fff !important} .popup-head h3{color:#fff !important} .button{background:#fff !important; color:#000 !important}</style><p>Error in registration!<p/>");
          }
        }, function error(error) {
          console.error('response mein error: ' + error);
        }
      );
    };
  });

