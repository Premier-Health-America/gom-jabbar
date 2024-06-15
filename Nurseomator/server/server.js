const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Data placeholders
let nurses = {};
let hospitals = [
  {
    id: 1,
    name: "Hospital A",
    location: { lat: 82.5, lon: -62.3 },
    needsCare: true,
  },
];

// Generate nurse IDs
const nurseIds = Array.from({ length: 20 }, (_, i) => `nurse${i + 1}`);

// Initialize nurse locations
const nurseStates = nurseIds.reduce((acc, nurseId) => {
  acc[nurseId] = {
    lat: 60 + Math.random() * 10, // Initial random starting position within a valid range
    lon: -120 + Math.random() * 20,
    latSpeed: (Math.random() - 0.5) * 0.01, // Initial random speed
    lonSpeed: (Math.random() - 0.5) * 0.01, // Initial random speed
  };
  return acc;
}, {});

// Simulate nurse movement
nurseIds.forEach((nurseId) => {
  setInterval(() => {
    const currentState = nurseStates[nurseId];

    // Calculate new positions
    const newLat = currentState.lat + currentState.latSpeed;
    const newLon = currentState.lon + currentState.lonSpeed;

    // Ensure new positions are within valid bounds (example bounds, adjust as needed)
    const validLat = Math.max(60, Math.min(70, newLat));
    const validLon = Math.max(-130, Math.min(-100, newLon));

    // Update nurse state
    nurseStates[nurseId] = {
      ...currentState,
      lat: validLat,
      lon: validLon,
    };

    // Report new position to clients via socket.io
    io.emit("locationUpdate", { nurseId, lat: validLat, lon: validLon });

    // Log the new position
    // console.log(`Nurse ${nurseId} moved to (${validLat}, ${validLon})`);
  }, 1); // Adjust interval as needed
});

// Middleware
app.use(cors());
app.use(express.json());

// Serve static assets (Leaflet images)
app.use(
  "/leaflet",
  express.static(
    path.join(__dirname, "node_modules", "leaflet", "dist", "images")
  )
);

// Endpoint to report nurse location
app.post("/api/location/report", (req, res) => {
  const { nurseId, lat, lon } = req.body;

  if (typeof lat === "undefined" || typeof lon === "undefined") {
    console.error(
      `Received invalid location for nurse ${nurseId}: (${lat}, ${lon})`
    );
    return res.status(400).send("Invalid location data");
  }

  nurses[nurseId] = { lat, lon };
  io.emit("locationUpdate", { nurseId, lat, lon }); // Broadcast new location
  console.log(`Nurse ${nurseId} reported new location: (${lat}, ${lon})`);
  res.status(200).send("Location reported");
});

// Check proximity to hospitals periodically
setInterval(() => {
  Object.values(nurses).forEach((nurse) => {
    hospitals.forEach((hospital) => {
      if (hospital.needsCare && isClose(nurse, hospital.location)) {
        io.emit("alert", { nurseId: nurse.id, hospital });
      }
    });
  });
}, 100);

// Function to calculate distance between nurse and hospital
function isClose(nurse, hospital) {
  if (typeof nurse.lat === "undefined" || typeof nurse.lon === "undefined") {
    console.error(`Invalid nurse location: (${nurse.lat}, ${nurse.lon})`);
    return false;
  }
  const distance = Math.sqrt(
    Math.pow(nurse.lat - hospital.lat, 2) +
      Math.pow(nurse.lon - hospital.lon, 2)
  );
  return distance < 0.5; // Example threshold (adjust as needed)
}

// Start server
const port = process.env.PORT || 8888;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
