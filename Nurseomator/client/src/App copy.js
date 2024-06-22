import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import io from "socket.io-client";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";

const nurseIcon = new L.Icon({
  iconUrl: "/nurse.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const nurseColdIcon = new L.Icon({
  iconUrl: "/coldNurse.png",
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
  iconUrl: "/house.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const houseIllIcon = new L.Icon({
  iconUrl: "/houseIll.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const deadNurseIcon = new L.Icon({
  iconUrl: "/memorial.png",
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
  const [deadNursesCount, setDeadNursesCount] = useState(0);
  const [curedHousesCount, setCuredHousesCount] = useState(0);

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
          carryingCure: data.carryingCure,
        },
      }));
    });

    socket.on("alert", (alert) => {
      setAlerts((prevAlerts) => [...prevAlerts, alert]);
      setTimeout(() => {
        setAlerts((prevAlerts) => prevAlerts.filter((a) => a !== alert));
      }, 2000);
    });

    socket.on("hospitals", (hospitals) => {
      setHospitals(hospitals);
    });

    socket.on("houses", (houses) => {
      setHouses(houses);
    });

    socket.on("cureDelivered", (data) => {
      console.log(`${data.nurseId} delivered cure to ${data.house.name}`);
      setHouses((prevHouses) =>
        prevHouses.map((house) =>
          house.id === data.house.id ? { ...house, cured: true } : house
        )
      );
    });

    socket.on("updateCounts", (counts) => {
      setDeadNursesCount(counts.deadNursesCount);
      setCuredHousesCount(counts.curedHousesCount);
    });

    socket.on("allHousesCured", () => {
      alert("All houses are cured!");
    });

    return () => {
      socket.off("locationUpdate");
      socket.off("alert");
      socket.off("hospitals");
      socket.off("houses");
      socket.off("cureDelivered");
      socket.off("updateCounts");
      socket.off("allHousesCured");
    };
  }, []);

  return (
    <div className="App" style={{ display: "flex" }}>
      <div
        style={{
          width: "10%",
          height: "100vh",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          opacity: "3",
          padding: "10px",
          boxSizing: "border-box",
        }}
      >
        <h2>Scoreboard</h2>
        <p>Dead Nurses: {deadNursesCount}</p>
        <p>Cured Houses: {curedHousesCount}</p>
        <h2>Alerts</h2>
        <div>
          {alerts.map((alert, index) => (
            <div key={index}>
              {alert.nurseId} {alert.message}
            </div>
          ))}
        </div>
      </div>
      <div style={{ width: "90%" }}>
        <MapContainer
          center={[65.5, -114]}
          zoom={5}
          style={{ height: "100vh", width: "100%" }}
          zoomControl={false} // Disable zoom control
          scrollWheelZoom={false} // Disable scroll wheel zoom
          doubleClickZoom={false} // Disable double click zoom
          // dragging={false} // Disable dragging
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
              icon={house.illness && !house.cured ? houseIllIcon : houseIcon}
            >
              <Popup>
                <div>
                  <p>{house.name}</p>
                  {house.illness && !house.cured && (
                    <p>Illness: {house.illness}</p>
                  )}
                  {house.cured && <p>Status: Cured</p>}
                </div>
              </Popup>
            </Marker>
          ))}
          {/* Render nurse locations as markers on the map */}
          {Object.keys(locations).map((nurseId) => (
            <Marker
              key={nurseId}
              position={[locations[nurseId].lat, locations[nurseId].lon]}
              icon={
                !nursesStatus[nurseId]?.alive
                  ? deadNurseIcon
                  : nursesStatus[nurseId]?.hotChocolates < 1
                  ? nurseColdIcon
                  : nurseIcon
              }
            >
              <Popup>
                <div>
                  <p>Nurse ID: {nurseId}</p>
                  <p>
                    Coordinates: [{locations[nurseId].lat.toFixed(2)},{" "}
                    {locations[nurseId].lon.toFixed(2)}]
                  </p>
                  <p>
                    Status: {nursesStatus[nurseId]?.alive ? "Alive" : "Dead"}
                  </p>
                  <p>Time Left: {nursesStatus[nurseId]?.countdown} seconds</p>
                  <p>Hot Chocolates: {nursesStatus[nurseId]?.hotChocolates}</p>
                  <p>
                    Inventory: {nursesStatus[nurseId]?.carryingCure || "None"}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default App;
