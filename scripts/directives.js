(function () {

    'use strict';

    directives.directive('globalDirectives', function ($window, $document) {
        return function (scope, element, attributes) {

            var 
              w = angular.element($window), 
              d = angular.element($document)
            ;

            w.on('orientationchange', function () {
                scope.toTop();
            });

            d.on('click', function () {
                scope.hideSubmenus();
            });

            scope.toTop = function () { 
                w.scrollTop(0);
            };

            scope.hideSubmenus = function () {
              $('.menu-toggle').removeClass('open');
              $('.submenu').hide();
            };

            scope.getProfileImg = function () {
                var profileImgsSrc = $('#profile-avatar').attr('src');
                return profileImgsSrc.indexOf('data:image') !== -1 ? profileImgsSrc : '/images/default_profile_img.png';
            };

            scope.showLoader = function () {
                $('body').append('<div class="overlay" />');
            };

            scope.hideLoader = function() {
                $('.overlay').remove();
            };

        };
    });

    directives.directive('hideSubmenus', function () {
        return {
          scope: true,
          restrict: 'A',
          link: function (scope, element, attributes) {
            element.on('click', scope.hideSubmenus);
          }
        };
     });

    directives.directive('toggleSubmenu', function () {
        return {
          scope: true,
          restrict: 'A',
          link: function (scope, element, attributes) {
            element.on('click', function (e) {
              var $this = $(this);
              $this.siblings().removeClass('open');
              $this.toggleClass('open');
              $(attributes.target).siblings('.submenu').hide();
              $(attributes.target).toggle();
              e.stopPropagation();
            });
          }
        };
     });

    directives.directive('triggerOnKeypress', function () {
        return {
          scope: true,
          restrict: 'A',
          link: function (scope, element, attributes) {
            var options = JSON.parse(attributes.triggerOnKeypress);
            element.find('input, textarea').on('keyup', function (e) {
              var isValid = element.hasClass('ng-valid');
              if (e.keyCode === options.keycode && isValid) {
                scope[options.method]();
              }
            }); 
          }
        };
     });

})();