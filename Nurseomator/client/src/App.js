import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import io from "socket.io-client";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";

const hospitalIcon = new L.Icon({
  iconUrl: "/hospital-icon.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const socket = io("http://localhost:8888");

function App() {
  const [locations, setLocations] = useState({});
  const [alerts, setAlerts] = useState([]);
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    // Listen for location updates from the server
    socket.on("locationUpdate", (data) => {
      setLocations((prevLocations) => ({
        ...prevLocations,
        [data.nurseId]: { lat: data.lat, lon: data.lon },
      }));
    });

    // Listen for alerts from the server
    socket.on("alert", (alert) => {
      setAlerts((prevAlerts) => [...prevAlerts, alert]);
    });

    // Listen for initial list of hospitals from the server
    socket.on("hospitals", (hospitals) => {
      setHospitals(hospitals);
    });

    // Clean up event listeners
    return () => {
      socket.off("locationUpdate");
      socket.off("alert");
      socket.off("hospitals");
    };
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div className="App">
      <MapContainer
        center={[65.5, -114]}
        zoom={5}
        style={{ height: "600px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
        />
        {/* Render hospitals as markers on the map */}
        {hospitals.map((hospital) => (
          <Marker
            key={hospital.id}
            position={[hospital.location.lat, hospital.location.lon]}
            icon={hospitalIcon}
          >
            <Popup>{hospital.name}</Popup>
          </Marker>
        ))}
        {/* Render nurse locations as markers on the map */}
        {Object.keys(locations).map((nurseId) => (
          <Marker
            key={nurseId}
            position={[locations[nurseId].lat, locations[nurseId].lon]}
          >
            <Popup>{nurseId}</Popup>
          </Marker>
        ))}
      </MapContainer>
      {/* Display alerts */}
      <h2>Alerts</h2>
      <div>
        {alerts.map((alert, index) => (
          <div key={index}>
            {alert.nurseId} is close to {alert.hospital.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
