import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import io from "socket.io-client";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";

const nurseIcon = new L.Icon({
  iconUrl: "/nurse.png", // Example: Replace with your nurse icon URL
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const hospitalIcon = new L.Icon({
  iconUrl: "/hospital.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const houseIcon = new L.Icon({
  iconUrl: "/house.png", // Example: Replace with your house icon URL
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const deadNurseIcon = new L.Icon({
  iconUrl: "/memorial.png", // Example: Replace with your dead nurse icon URL
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const socket = io("http://localhost:8888");

function App() {
  const [locations, setLocations] = useState({});
  const [alerts, setAlerts] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [houses, setHouses] = useState([]);
  const [nursesStatus, setNursesStatus] = useState({});

  // Listen for updates from the server
  useEffect(() => {
    socket.on("locationUpdate", (data) => {
      setLocations((prevLocations) => ({
        ...prevLocations,
        [data.nurseId]: { lat: data.lat, lon: data.lon },
      }));

      setNursesStatus((prevStatus) => ({
        ...prevStatus,
        [data.nurseId]: {
          alive: data.alive,
          countdown: data.countdown,
          hotChocolates: data.hotChocolates,
        },
      }));
    });

    socket.on("alert", (alert) => {
      setAlerts((prevAlerts) => [...prevAlerts, alert]);
    });

    socket.on("hospitals", (hospitals) => {
      setHospitals(hospitals);
    });

    socket.on("houses", (houses) => {
      setHouses(houses);
    });

    socket.on("hotChocolateUpdate", (data) => {
      setNursesStatus((prevStatus) => ({
        ...prevStatus,
        [data.nurseId]: {
          ...prevStatus[data.nurseId],
          hotChocolates: data.hotChocolates,
        },
      }));
    });

    return () => {
      socket.off("locationUpdate");
      socket.off("alert");
      socket.off("hospitals");
      socket.off("houses");
      socket.off("hotChocolateUpdate");
    };
  }, []);

  return (
    <div className="App">
      <MapContainer
        center={[65.5, -114]}
        zoom={5}
        zoomControl={false}
        scrollWheelZoom={false}
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
        {/* Render houses as markers on the map */}
        {houses.map((house) => (
          <Marker
            key={house.id}
            position={[house.location.lat, house.location.lon]}
            icon={houseIcon}
          >
            <Popup>{house.name}</Popup>
          </Marker>
        ))}
        {/* Render nurse locations as markers on the map */}
        {Object.keys(locations).map((nurseId) => (
          <Marker
            key={nurseId}
            position={[locations[nurseId].lat, locations[nurseId].lon]}
            icon={nursesStatus[nurseId]?.alive ? nurseIcon : deadNurseIcon}
          >
            <Popup>
              <div>
                <p>Nurse ID: {nurseId}</p>
                <p>
                  Coordinates: [{locations[nurseId].lat.toFixed(2)},{" "}
                  {locations[nurseId].lon.toFixed(2)}]
                </p>
                <p>Status: {nursesStatus[nurseId]?.alive ? "Alive" : "Dead"}</p>
                <p>Time Left: {nursesStatus[nurseId]?.countdown} seconds</p>
                <p>Hot Chocolates: {nursesStatus[nurseId]?.hotChocolates}</p>
                <p>Inventory: (to be filled later)</p>
              </div>
            </Popup>
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
