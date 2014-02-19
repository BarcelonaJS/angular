angular.module('angularBCN', ['angularBCN.events'])

.controller('HomeCtrl', function AppCtrl($scope, Events) {

    $scope.nextEvent = Events.nextEvent();

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