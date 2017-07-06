/**
 * SurfIT invisionApp
 */
angular.module('invisionApp', ['ionic', 'srfSocialSharing', 'starter.share', 'ngCordova', 'starter.controllers', 'home.controllers', 'user.controllers', 'addbuket.controllers', 'bucketlist.controllers', 'listdetail.controllers', 'starter.sevices', 'comment.controllers', 'signup.controllers', 'starter.ublstore', 'starter.payPalService', 'follow.controllers', 'recommand.controllers', 'quesans.controllers', 'inspirationitem.controllers', 'userprofile.controllers', 'editbucket.controllers'])

  .run([
    '$ionicPlatform',
    '$window',
    function ($ionicPlatform, $window) {
      $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleDefault();
        }

        $window.localStorage.setItem('showIntro', true);

        var notificationOpenedCallback = function () {
        };
        // Update with your OneSignal AppId and googleProjectNumber before running.
        if ($window.plugins && $window.plugins.OneSignal) {
          $window.plugins.OneSignal.init('bff790de-6c7b-4550-9202-0acebb924b28', {googleProjectNumber: '295165547597'}, notificationOpenedCallback);
        }
      });
    }
  ])

  .config([
    '$stateProvider',
    '$urlRouterProvider',
    '$ionicConfigProvider',
    function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
      $ionicConfigProvider.tabs.position('top');
      $ionicConfigProvider.tabs.style('standard');

      $stateProvider
        .state('app', {
          url: '/app',
          abstract: true,
          templateUrl: 'templates/menu.html',
          controller: 'ApplicationController as appCtrl'
        })
        .state('app.categories', {
          url: '/categories',
          views: {
            'menuContent': {
              templateUrl: 'templates/categories.html',
              controller: 'CategoriesController as categoriesCtrl'
            }
          }
        })
        .state('app.category', {
          url: '/categories/:categoryId',
          views: {
            'menuContent': {
              templateUrl: 'templates/category.html',
              controller: 'ItemsController as itemsCtrl'
            }
          }
        })
        .state('app.category-featured', {
          url: '/categories/featured/:categoryId',
          views: {
            'menuContent': {
              templateUrl: 'templates/category-featured.html',
              controller: 'ItemsController as itemsCtrl'
            }
          }
        })
        .state('app.item', {
          url: '/items/:itemId',
          views: {
            'menuContent': {
              templateUrl: 'templates/item.html',
              controller: 'ItemsController as itemCtrl'
            }
          }
        })
        .state('app.comments', {
          cache: false,
          url: '/comments',
          views: {
            'menuContent': {
              templateUrl: 'templates/comments.html',
              controller: 'CommentsController as commentsCtrl'
            }
          }
        })
        .state('login', {
          cache: false,
          url: '/login',
          templateUrl: 'templates/login.html',
          controller: 'AppCtrl'
        })
        .state('register', {
          url: '/register',
          views: {
            'menuContent': {
              controller: 'LoginController as loginCtrl',
              templateUrl: 'templates/register.html'
            }
          }
        })
        .state('app.home', {
          cache: false,
          url: '/home',
          views: {
            'menuContent': {
              templateUrl: 'templates/home.html',
              controller: 'HomeCtrl'
            }
          }
        })
        .state('app.terms', {
          url: '/terms',
          views: {
            'menuContent': {
              templateUrl: 'templates/terms.html'
            }
          }
        })
        .state('app.help', {
          url: '/help',
          views: {
            'menuContent': {
              templateUrl: 'templates/help.html'
            }
          }
        })
        .state('signup', {
          cache: false,
          url: '/register',
          templateUrl: 'templates/register.html',
          controller: 'SignUp'
        })
        .state('app.user', {
          url: '/user',
          views: {
            'menuContent': {
              templateUrl: 'templates/user.html',
              controller: 'UsrCtrl'
            }
          }
        })
        .state('app.addbuket', {
          cache: false,
          url: '/addbuket',
          views: {
            'menuContent': {
              templateUrl: 'templates/addbuket.html',
              controller: 'AddBucket'
            }
          }
        })
        .state('app.bucketlist', {
          url: '/bucketlist',
          views: {
            'menuContent': {
              templateUrl: 'templates/bucketlist.html',
              controller: 'BucketListCtrl'
            }
          }
        })
        .state('app.listdetail', {
          url: '/listdetail',
          views: {
            'menuContent': {
              templateUrl: 'templates/listdetail.html',
              controller: 'ListCtrl'
            }
          }
        })

        .state('app.listdetailadmin', {
          cache: false,
          url: '/listdetailadmin',
          views: {
            'menuContent': {
              templateUrl: 'templates/listdetailadmin.html',
              controller: 'ListDetailCtrl'
            }
          }
        })

        .state('app.comment', {
          cache: false,
          url: '/comment',
          views: {
            'menuContent': {
              templateUrl: 'templates/comment.html',
              controller: 'CmtCntrl'
            }
          }
        })

        .state('app.recommand', {
          cache: false,
          url: '/recommand',
          views: {
            'menuContent': {
              templateUrl: 'templates/recommand.html',
              controller: 'RecCtrl'
            }
          }
        })

        .state('app.ublstore', {
          url: '/ublstore',
          views: {
            'menuContent': {
              templateUrl: 'templates/ublstore.html',
              controller: 'ublCtrl'
            }
          }
        })
        .state('app.slideshow', {
          url: '/slideshow/:forceShow',
          views: {
            'menuContent': {
              templateUrl: 'templates/slideshow.html',
              controller: 'SlideshowController as slideshowCtrl'
            }
          }
        })

        .state('app.follow', {
          url: '/follow',
          views: {
            'menuContent': {
              templateUrl: 'templates/following.html',
              controller: 'FowCtrl'
            }
          }
        })

        .state('app.quesans', {
          url: '/quuesans',
          views: {
            'menuContent': {
              templateUrl: 'templates/quesans.html',
              controller: 'QuesCtrl'
            }
          }
        })

        .state('app.inspirationitem', {
          url: '/inspirationitem',
          views: {
            'menuContent': {
              templateUrl: 'templates/inspirationitem.html',
              controller: 'InspCtrl'
            }
          }
        })

        .state('app.userprofile', {
          url: '/userprofile',
          views: {
            'menuContent': {
              templateUrl: 'templates/userprofile.html',
              controller: 'UserpCtrl'
            }
          }
        })

        .state('app.editbucket', {
          cache: false,
          url: '/editbucket',
          views: {
            'menuContent': {
              templateUrl: 'templates/editbucket.html',
              controller: 'EditCtrl'
            }
          }
        })

        .state('app.ubldetails', {
          cache: false,
          url: '/ubldetails',
          views: {
            'menuContent': {
              templateUrl: 'templates/ubldetails.html',
              controller: 'ublCategoryCtrl'
            }
          }
        })

        .state('app.useraddbucket', {
          cache: false,
          url: '/useraddbucket',
          views: {
            'menuContent': {
              templateUrl: 'templates/useraddbucket.html',
              controller: 'UserAddBucket'
            }
          }
        })
        .state('app.recommandans', {
          cache: false,
          url: '/recommandans',
          views: {
            'menuContent': {
              templateUrl: 'templates/recommandans.html',
              controller: 'RecommandAns'
            }
          }
        })
        .state('app.socialSharing', {
          url: '/socialSharing',
          views: {
            'menuContent': {
              templateUrl: 'templates/socialSharing.html',
              controller: 'shareCtrl'
            }
          }
        });

      // if none of the above states are matched, use this as the fallback
      $urlRouterProvider.otherwise(function ($injector, $location) {
        var state = $injector.get('$state');
        //state.go('app.slideshow', {'forceShow': false});
        state.go('login', {'forceShow': false});
        return $location.path();
      });
    }
  ]);
