(function () {

    'use strict';

    directives.directive('globalDirectives', function ($window, $document) {
        return function (scope, element, attributes) {

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

})();