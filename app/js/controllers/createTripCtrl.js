'use strict';

app.controller('createTripCtrl', ['$scope', 'identity','notifier','tripsService','citiesService','$location', '$q', function($scope, identity, notifier, tripService, citiesService, $location, $q) {
    var directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true}),
        sofia = new google.maps.LatLng(42.8831601, 25.32831759999999),
        mapOptions = {
            zoom:7,
            center: sofia
        },
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions),
        directionsService = new google.maps.DirectionsService(),
        geocoder = new google.maps.Geocoder(),
        fromMarker = new google.maps.Marker({
            position: map.getCenter(),
            map: null,
            title: 'Click to zoom'
        }),
        toMarker = new google.maps.Marker({
            position: map.getCenter(),
            map: null,
            title: 'Click to zoom'
        });

    function initialize() {
        google.maps.event.addListener(map, 'click', function(event) {
            if (!fromMarker.map) {
                setCityName(event, true).then(setMarkerToNearestTown);
                return this;
            }

            if (!toMarker.map) {
                setCityName(event, false).then(setMarkerToNearestTown);
            }
        });

        google.maps.event.addListener(fromMarker, 'click', function(event) {
            fromMarker.setMap(null);
            directionsDisplay.setMap(null);
        });
        google.maps.event.addListener(toMarker, 'click', function(event) {
            toMarker.setMap(null);
            directionsDisplay.setMap(null);
        });
    }

    function calcRoute() {
        var request = {
            origin:fromMarker.position,
            destination:toMarker.position,
            travelMode: google.maps.TravelMode.DRIVING
        };

        directionsService.route(request, function(result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(result);
                directionsDisplay.setMap(map);
            }
        });
    }

    function setCityName(event, setFrom) {
        var deferred = $q.defer();
        geocoder.geocode({'location': event.latLng}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK && results[1]) {
                for (var i = 0; i < results.length; i++) {
                    for (var j = 0; j < $scope.allCities.length; j++) {
                        if (~results[i].formatted_address.indexOf($scope.allCities[j])) {
                            deferred.resolve({setFrom: setFrom, city: $scope.allCities[j]});
                            return;
                        }
                    }
                }
            } else {
                deferred.reject();
            }
        });
        
        return deferred.promise;
    }

    function setMarkerToNearestTown(object) {
        var deferred = $q.defer();
        geocoder.geocode({'address': object.city + ', Bulgaria'}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK && results[0]) {
                if (object.setFrom) {
                    fromMarker.position = new google.maps.LatLng(results[0].geometry.location.A, results[0].geometry.location.F);
                    fromMarker.setMap(map);
                    $scope.trip.from = object.city;
                } else {
                    toMarker.position = new google.maps.LatLng(results[0].geometry.location.A, results[0].geometry.location.F);
                    toMarker.setMap(map);
                    $scope.trip.to = object.city;
                }

                if (fromMarker.map && toMarker.map) {
                    calcRoute();
                }

                deferred.resolve();
            }
        });

        deferred.promise.then();
    }

    initialize();

    citiesService.getCities().then(function(data){
        $scope.allCities = data;
    });

    $scope.trip = $scope.trip || {};
    $scope.setMarkerToNearestTown = setMarkerToNearestTown;
    $scope.createTrip = function(trip) {
        var d = new Date();
        if(trip.departureTime.getTime() < d.getTime())
        {
            notifier.error("The date must be in the future!");

        }else if(trip.from==trip.to)
        {
            notifier.error("Start and end destination must be different!");
        }
        else{
            tripService.createTrip(trip).then(function(data){
                console.log(data);
            })
        }
    }
}]);

