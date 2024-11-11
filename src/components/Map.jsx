// App.js
import React, { useEffect, useState, useRef } from "react";
import "./Map.css";
import { useNavigate } from "react-router-dom";

function App() {
  const [map, setMap] = useState(null);
  const navigate = useNavigate();
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [navigationMarker, setNavigationMarker] = useState(null);
  const [ngoList, setNgoList] = useState([]);

  const mapRef = useRef(null);
  const ANIMATION_DURATION = 120000;

  useEffect(() => {
    initMap();
  }, []);

  const initMap = () => {
    const directionsServiceInstance =
      new window.google.maps.DirectionsService();
    const directionsRendererInstance =
      new window.google.maps.DirectionsRenderer({
        suppressMarkers: true,
      });

    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center: { lat: 20.5937, lng: 78.9629 },
      zoom: 12,
    });

    directionsRendererInstance.setMap(mapInstance);

    setDirectionsService(directionsServiceInstance);
    setDirectionsRenderer(directionsRendererInstance);
    setMap(mapInstance);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCurrentLocation(location);
        mapInstance.setCenter(location);
        findNearbyNGOs(location, mapInstance);
      },
      (error) => console.error("Error fetching location", error)
    );
  };

  const findNearbyNGOs = (origin, mapInstance) => {
    const service = new window.google.maps.places.PlacesService(mapInstance);

    const request = {
      location: new window.google.maps.LatLng(origin.lat, origin.lng),
      radius: 5000,
      keyword: "NGO",
    };

    service.nearbySearch(request, (results, status) => {
      if (
        status === window.google.maps.places.PlacesServiceStatus.OK &&
        results.length > 0
      ) {
        setNgoList(results.slice(0, 4));
      } else {
        alert("No nearby NGOs found.");
      }
    });
  };

  const showDirectionsToNGO = (ngoIndex) => {
    const destination = ngoList[ngoIndex].geometry.location;
    const selectedNGO = ngoList[ngoIndex]; // Get the selected NGO

    const request = {
      origin: currentLocation,
      destination: destination,
      travelMode: window.google.maps.TravelMode.DRIVING,
    };

    directionsService.route(request, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(result);
        setSelectedRoute(result.routes[0].legs[0]);
        map.setZoom(14);
        startAnimatedTrip(result.routes[0].legs[0], selectedNGO.name); // Pass the NGO name
      } else {
        alert("Could not display directions.");
      }
    });
  };

  const startAnimatedTrip = (route, ngoName) => {
    // Add ngoName parameter
    if (!route) return;

    let newNavigationMarker = navigationMarker;
    if (!newNavigationMarker) {
      newNavigationMarker = new window.google.maps.Marker({
        map: map,
        icon: {
          path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
          scale: 5,
          strokeColor: "#0000FF",
        },
      });
      setNavigationMarker(newNavigationMarker);
    }

    const steps = route.steps;
    const totalSteps = steps.length;
    const stepDuration = ANIMATION_DURATION / totalSteps;
    let stepIndex = 0;

    const animateMarker = () => {
      if (stepIndex >= totalSteps) {
        alert(`You have reached the destination: ${ngoName}!`); // Show NGO name in alert
        return;
        // navigate("/");
      }

      const nextStep = steps[stepIndex];
      const startLocation = nextStep.start_location;
      const endLocation = nextStep.end_location;

      const angle = Math.atan2(
        endLocation.lat() - startLocation.lat(),
        endLocation.lng() - startLocation.lng()
      );

      newNavigationMarker.setPosition(startLocation);
      newNavigationMarker.setIcon({
        path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
        scale: 5,
        strokeColor: "#0000FF",
        rotation: angle * (180 / Math.PI),
      });

      map.panTo(startLocation);
      stepIndex++;
      setTimeout(animateMarker, stepDuration);
    };

    animateMarker();
  };

  return (
    <div>
      <h1>Route to Nearest NGO</h1>
      <div
        ref={mapRef}
        style={{ height: "500px", width: "100%", marginTop: "20px" }}
      />
      <div className="ngo-list">
        <h3>Select a Nearby NGO</h3>
        <ul>
          {ngoList.map((place, index) => (
            <li key={index}>
              <strong>{place.name}</strong>
              <br />
              <span className="ngo-info">
                {place.vicinity} | Rating: {place.rating || "N/A"}
              </span>
              <button
                className="start-trip-button"
                onClick={() => showDirectionsToNGO(index)}
              >
                Start Trip
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
