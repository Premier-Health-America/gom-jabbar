import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import io from "socket.io-client";

import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png").default,
  iconUrl: require("leaflet/dist/images/marker-icon.png").default,
  shadowUrl: require("leaflet/dist/images/marker-shadow.png").default,
});

const socket = io("http://localhost:8888");

const landBoundaries = {
  latMin: 60,
  latMax: 70,
  lonMin: -120,
  lonMax: -100,
};

function App() {
  const [locations, setLocations] = useState({});
  const [alerts, setAlerts] = useState([]);
  const nurseId = "nurse1";
  const initialLat = 64; // Initial latitude
  const initialLon = -114; // Initial longitude

  useEffect(() => {
    socket.on("locationUpdate", (data) => {
      setLocations(data);
    });

    socket.on("alert", (alert) => {
      setAlerts((prevAlerts) => [...prevAlerts, alert]);
    });

    // Simulate nurse moving around randomly
    let currentLat = initialLat;
    let currentLon = initialLon;

    const interval = setInterval(() => {
      // Small random movement within a small range
      const movementRange = 0.05; // Larger range for more noticeable movement
      currentLat += (Math.random() - 0.8) * movementRange;
      currentLon += (Math.random() - 0.8) * movementRange;

      // Ensure new location is within land boundaries
      currentLat = Math.max(
        landBoundaries.latMin,
        Math.min(landBoundaries.latMax, currentLat)
      );
      currentLon = Math.max(
        landBoundaries.lonMin,
        Math.min(landBoundaries.lonMax, currentLon)
      );

      fetch("http://localhost:8888/api/location/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nurseId, lat: currentLat, lon: currentLon }),
      });
    }, 300); // Adjust the interval for smoother movement

    return () => {
      socket.off("locationUpdate");
      socket.off("alert");
      clearInterval(interval);
    };
  }, []);

  //Commented it out, used to check location refreshes

  // useEffect(() => {
  //   console.log(locations);
  // }, [locations]);

  return (
    <div className="App">
      {/* <h1>Nurse Tracker</h1> */}
      <MapContainer
        center={[initialLat, initialLon]}
        zoom={5}
        style={{ height: "600px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
        />
        {Object.keys(locations).map((nurseId) => (
          <Marker
            key={nurseId}
            position={[locations[nurseId].lat, locations[nurseId].lon]}
          >
            <Popup>{nurseId}</Popup>
          </Marker>
        ))}
      </MapContainer>
      <h2>Alerts</h2>
      <div>
        {alerts.map((alert, index) => (
          <div key={index}>
            Nurse {alert.nurseId} is close to {alert.hospital.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
