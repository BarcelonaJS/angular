angular.module('angularBCN', ['ui.bootstrap', 'ui.router'])

.config(function($urlRouterProvider, $stateProvider){
    $urlRouterProvider.otherwise("home");
    
    $stateProvider
        .state('home', {
          url: "/",
          templateUrl: "app/partials/home.tpl.html",
          controller: 'HomeCtrl'
        })
        .state('event', {
          url: "/events/:eventDate",
          templateUrl: "app/partials/event.tpl.html",
          controller: 'EventCtrl'
        });

})
.controller('HomeCtrl', function AppCtrl($scope, Events) {

    $scope.nextEvent = Events.nextEvent();

})

.controller('EventCtrl', function AppCtrl($scope, $stateParams, Events) {

    $scope.currentEvent = Events.getEventByDate(new Date($stateParams.eventDate));

})

.factory('Events', function($filter){
    
    var events = [
        {

            title: 'AngularJS special event @ MWC',
            date: new Date('01-25-2014'),
            description: 'We have great news for this new year.'+
            ' The 25th january 2014 we will be holding a special event at Mobile World Capital.'+
            ' We will have talks and workshops covering from the basics of the framework to deeper'+
            ' subjects as testing and mobile apps.',
            location: 'Mobile World Capital',
            location_link: 'http://goo.gl/maps/YTT6k'
        }
    ];


    return {
        nextEvent: function(){
            return events[events.length-1];
        },
        getEventByDate: function(eventDate){
            return $filter('filter')(events, {date: eventDate})[0];
        }
    }
})

.filter('meetupDate', function() {
    return function(date) {
        function ordinal(date) {
            if (date > 20 || date < 10) {
                switch (date % 10) {
                    case 1:
                        return "st";
                    case 2:
                        return "nd";
                    case 3:
                        return "rd";
                }
            }
            return "th";
        }
        return ordinal(date);
    }
})

;