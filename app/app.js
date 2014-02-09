angular.module('angularBCN', ['ui.bootstrap', 'ui.router','ngSanitize'])

.config(function($urlRouterProvider, $stateProvider){
    $urlRouterProvider.otherwise("/");
    
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

.factory('DateUtils', function() {

    return {
        sameDay: function(date1, date2) {
            return date1.getDate() == date2.getDate() &&
                    date1.getMonth() == date2.getMonth() &&
                    date1.getYear() == date2.getYear();
        }
    }
})

.factory('Events', function($filter, DateUtils){
    
    var events = [
        {

            title: 'AngularJS day @ MWC',
            date: new Date(2014, 0, 25, 10,0,0),
            description: 'We have great news for this new year.'+
            ' According to the latest trend statistics, Google\’s AngularJS has skyrocketed in 2013 in its' +
            ' use and adoption by the global community of web' + 
            ' developers. A group of developers from Barcelona who use AngularJS in our projects want' +
            ' to create a community to share knowledge, teach and learn about this fantastic tool.\n' +
            ' From AngularBCN we want an event for newbies as well as seasoned angular developers with'+
            ' three hands-on workshops. We encourage you to bring your laptops and code with us some'+
            ' super-heroic ng-application :)',
            location: 'Mobile World Centre.',
            location_link: 'http://goo.gl/maps/YTT6k',
            workshops: [
                {
                    start: '10:30',
                    end: '11:30',
                    title: 'AngularJS 101',
                    speakers: ['@_joseraya', '@manel_perez'],
                    description : 'This is a workshop for people without prior angularjs experience'+
                    ' in which we will develop a simple calendar application using some of the (in the host\'s opinion)'+
                    ' most useful features of the framework: Data binding as alternative to DOM manipulation and code reuse'+
                    ' via services and directives. We will also introduce the core concepts of angularjs so that the attendants'+
                    ' will leave ready to read the angularjs literature and docs without being afraid of the terminology.'+
                    ' It is assumed that the attendants will have some javascript and HTML knowledge.',
                    level: 'Beginner'
                },
                {
                    start: '11:45',
                    end: '12:45',
                    speakers: ['@_sgimeno', '@amatiasq'],
                    title: 'Mobile apps with Cordova',
                    description : 'Writing mobile apps with Apache Cordova libraries and AngularJS is a workshop for web and mobile devs who are'+
                    'interested in hybrid and cross-platform development with web technologies. We will learn how to use'+
                    ' the Cordova APIs into our AngularJS app without breaking the angular zen. We will code and deploy a simple game on' +
                    ' our mobile devices (Android or iOS) focusing on the key aspects of mobile development with AngularJS.' ,
                    level: 'Intermediate'
                },
                {
                    start: '13:00',
                    end: '14:00',
                    speakers: ['@VictorBjelkholm', 'Andrés Berrios'],
                    title: 'Introduction to testing',
                    description : 'Introduction to testing with Karma and AngularJS is an introductory course to learn the fundamentals about testing,'+
                    ' writing testable code, writing tests for AngularJS with Jasmine and run them with Karma. It is assumed that the attendants will '+
                    'have some javascript and HTML knowledge. Having some hours of flight with AngularJS is desirable but not mandatory.',
                    level: 'Intermediate'
                }
            ]
        },
        {
            title: 'Testing with Karma',
            date: new Date(2014, 1, 13, 19,0,0),
            speakers: ['@VictorBjelkholm'],
            description: 'Introduction to testing with Karma and AngularJS is an introductory course to learn the fundamentals about testing,'+
            ' writing testable code, writing tests for AngularJS with Jasmine and run them with Karma.',
        }
    ];


    return {
        nextEvent: function(){
            return events[events.length-1];
        },
        getEventByDate: function(eventDate){
            return $filter('filter')(events, function(evt) {
                return DateUtils.sameDay(eventDate, evt.date);
            })[0];
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