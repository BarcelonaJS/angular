angular.module('angularBCN', ['ui.bootstrap'])

.controller( 'AppCtrl', function AppCtrl ( $scope ) {
  
  $scope.hello = 'AngularJS Meetup Barcelona';

  $scope.join = 'AngularJS special event';

  $scope.eventDate = new Date('01-25-2014');
})
;
