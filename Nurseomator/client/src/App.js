//To be noted that I had in mind to have everything in its own components and prop everything needed down but at this
//point I just wanted to showcase with the amount of time that i have that I could actually deliver. I know this is
//something no one wants to see but usually, everything is super organized but I didn't want to risk breaking anything
//since this is a presentable product at this point.

import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import io from "socket.io-client";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";

// Icons declaration here
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

const nurseHoldIcon = new L.Icon({
  iconUrl: "/nurseHold.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// Socket connection
const socket = io("http://localhost:8888");

function App() {
  // State management sections, scoping is important
  const [locations, setLocations] = useState({});
  const [alerts, setAlerts] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [houses, setHouses] = useState([]);
  const [nursesStatus, setNursesStatus] = useState({});
  const [deadNursesCount, setDeadNursesCount] = useState(0);
  const [curedHousesCount, setCuredHousesCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  // Listen for updates from the server via socket.io
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

    // Socket alert with a 2 second interval, having a list was way too ugly and annoying
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
      setHouses((prevHouses) =>
        prevHouses.map((house) =>
          house.id === data.house.id ? { ...house, cured: true } : house
        )
      );
    });

    // Sockets for the scoreboard
    socket.on("updateCounts", (counts) => {
      setDeadNursesCount(counts.deadNursesCount);
      setCuredHousesCount(counts.curedHousesCount);
    });

    // Final alert for when all houses are cured, pretty much game over
    socket.on("allHousesCured", () => {
      setShowPopup(true);
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

  // Restart the application
  const handleRestart = () => {
    socket.emit("restart");
    setShowPopup(false);
  };

  return (
    <AppContainer>
      <Scoreboard>
        <ScoreboardTitle>Scoreboard</ScoreboardTitle>
        <ScoreboardText>Dead Nurses: {deadNursesCount}</ScoreboardText>
        <ScoreboardText>Cured Houses: {curedHousesCount}</ScoreboardText>
        <ScoreboardTitle>Alerts</ScoreboardTitle>
        <div>
          {alerts.map((alert, index) => (
            <Alert key={index}>
              {alert.nurseId} {alert.message}
            </Alert>
          ))}
        </div>
      </Scoreboard>
      {showPopup && (
        <PopupContainer>
          <h2>All houses are cured!</h2>
          <RestartButton onClick={handleRestart}>Restart</RestartButton>
        </PopupContainer>
      )}
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
                : nursesStatus[nurseId]?.carryingCure
                ? nurseHoldIcon
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
                <p>Status: {nursesStatus[nurseId]?.alive ? "Alive" : "Dead"}</p>
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
    </AppContainer>
  );
}

// Styled components
const AppContainer = styled.div`
  position: relative;
  display: flex;
`;

const Scoreboard = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  width: 15.5%;
  height: 23%;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 10px;
  box-sizing: border-box;
  z-index: 1000;
  font-family: "Arial", sans-serif;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
`;

const ScoreboardTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ScoreboardText = styled.p`
  font-size: 16px;
  margin: 5px 0;
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }

  80% {
    opacity: 0.2;
  }
  100% {
    opacity: 0;
  }
  
`;

const Alert = styled.div`
  animation: ${fadeOut} 3s ease-out forwards;
`;

const PopupContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 25%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  z-index: 1000;
  font-family: "Arial", sans-serif;
  text-align: center;
`;

const RestartButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
`;

export default App;
