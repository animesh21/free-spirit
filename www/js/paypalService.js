var app = angular.module('starter.payPalService', []);


app.factory('PaypalService', ['$q', '$ionicPlatform', '$filter', '$timeout', function ($q, $ionicPlatform, $filter, $timeout) {
  var init_defer;
  /**
   * Service object
   * @type object
   */
  var service = {
    initPaymentUI: initPaymentUI,
    createPayment: createPayment,
    configuration: configuration,
    onPayPalMobileInit: onPayPalMobileInit,
    makePayment: makePayment
  };

  /**
   * @ngdoc method
   * @name initPaymentUI
   * @methodOf app.PaypalService
   * @description
   * Inits the payapl ui with certain envs.
   *
   *
   * @returns {object} Promise paypal ui init done
   */
  function initPaymentUI() {
    init_defer = $q.defer();
    $ionicPlatform.ready().then(function () {
      var clientIDs = {
        // Martha credentials
        "PayPalEnvironmentProduction": 'AYKActECnLySzCIESTBMtRohlW686GolOQ-mtlxRHPgpB1nzJvjCHGT9cxMRg8vjkXaROE9-XqNuvrfQ',
        "PayPalEnvironmentSandbox":    'ATgFkBpV9y_XNYKTV9lQwyuBMcJ2kE5BVqT6ZfUJN2ilG8lYvtMNpTLCW68pyjA7xSquxRNdWmiqEv3Y'

        // Animesh credentials
        // "PayPalEnvironmentProduction": 'AYwiLQmAtIQTjAKyKgcQfVbUXGO6GH2DC9F8csfmj3R_gRPYuRVzTA87h-RQ9SBKlRcLvwmyOkgyEJVB',
        // "PayPalEnvironmentSandbox": 'AWJkdLrWjPVyfWVvfu77uIVueSkgZnYgK1FVu0gp1UJbbPv142DyTd5VBc37spVI65PlC6Lfwgz7fnYa'
      };
      PayPalMobile.init(clientIDs, onPayPalMobileInit);
    });
    return init_defer.promise;
  }

  /**
   * @ngdoc method
   * @name createPayment
   * @methodOf app.PaypalService
   * @param {string|number} total total sum. Pattern 12.23
   * @param {string} name name of the item in paypal
   * @description
   * Creates a paypal payment object
   *
   *
   * @returns {object} PayPalPaymentObject
   */
  function createPayment(total, name) {
    // "Sale == > immediate payment
    // "Auth" for payment authorization only, to be captured separately at a later time.
    // "Order" for taking an order, with authorization and capture to be done separately at a later time.
    var payment = new PayPalPayment("" + total, "USD", "" + name, "Sale");
    return payment;
  }

  /**
   * @ngdoc method
   * @name configuration
   * @methodOf app.PaypalService
   * @description
   * Helper to create a paypal configuration object
   *
   *
   * @returns {object} PayPal configuration
   */
  function configuration() {
    // for more options see `paypal-mobile-js-helper.js`
    return new PayPalConfiguration({
      merchantName: "The Free Spirit Project LLC",
      // merchantName: "PayPal App",
      merchantPrivacyPolicyURL: "https://www.paypal.com/in/webapps/mpp/ua/privacy-full",
      merchantUserAgreementURL: "https://www.paypal.com/us/webapps/mpp/ua/useragreement-full"
    });
  }

  function onPayPalMobileInit() {
    $ionicPlatform.ready().then(function () {
      // must be called
      // use PayPalEnvironmentNoNetwork mode to get look and feel of the flow
      PayPalMobile.prepareToRender('PayPalEnvironmentProduction', configuration(), function () {
      // PayPalMobile.prepareToRender('PayPalEnvironmentSandbox', configuration(), function () {
        $timeout(function () {
          init_defer.resolve();
        });
      });
    });
  }

  /**
   * @ngdoc method
   * @name makePayment
   * @methodOf app.PaypalService
   * @param {string|number} total total sum. Pattern 12.23
   * @param {string} name name of the item in paypal
   * @description
   * Performs a paypal single payment
   *
   *
   * @returns {object} Promise gets resolved on successful payment, rejected on error
   */
  function makePayment(total, name) {
    var defer = $q.defer();
    total = $filter('number')(total, 2);
    $ionicPlatform.ready().then(function () {
      PayPalMobile.renderSinglePaymentUI(createPayment(total, name), function (result) {
        $timeout(function () {
          defer.resolve(result);
        });
      }, function (error) {
        $timeout(function () {
          defer.reject(error);
        });
      });
    });
    return defer.promise;
  }

  return service;
}]);
