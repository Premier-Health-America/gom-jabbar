import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import io from "socket.io-client";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
import "leaflet-defaulticon-compatibility";

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

  useEffect(() => {
    socket.on("locationUpdate", (data) => {
      console.log("Received location update:", data);
      setLocations((prevLocations) => ({
        ...prevLocations,
        [data.nurseId]: { lat: data.lat, lon: data.lon },
      }));
    });

    socket.on("alert", (alert) => {
      console.log("Received alert:", alert);
      setAlerts((prevAlerts) => [...prevAlerts, alert]);
    });

    return () => {
      socket.off("locationUpdate");
      socket.off("alert");
    };
  }, []);

  return (
    <div className="App">
      <MapContainer
        center={[64, -114]}
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
