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
let hospitals = [];

// Generate hospitals with random locations within specified Lat and Long
const generateRandomHospital = () => {
  const lat = 60 + Math.random() * 10; // Random latitude near -60
  const lon = -133 + Math.random() * 40; // Random longitude near -133
  return {
    id: hospitals.length + 1,
    name: `Hospital ${hospitals.length + 1}`,
    location: { lat, lon },
  };
};

// Generate multiple hospitals
for (let i = 0; i < 10; i++) {
  hospitals.push(generateRandomHospital());
}

// Emit hospitals data to clients
io.on("connection", (socket) => {
  socket.emit("hospitals", hospitals); // Emit hospitals data on initial connection
});

// Generate nurse IDs
const nurseIds = Array.from({ length: 20 }, (_, i) => `Nurse ${i + 1}`);

// THis is the nurses initial location placement
const nurseStates = nurseIds.reduce((acc, nurseId) => {
  acc[nurseId] = {
    lat: 60 + Math.random() * 10, // Initial random starting position within [60, 70]
    lon: -133 + Math.random() * 40,
    latSpeed: (Math.random() - 0.5) * 0.001, // Initial random speed
    lonSpeed: (Math.random() - 0.5) * 0.001, // Initial random speed
    lastAlertTime: 0, // Track last alert time for cooldown
  };
  return acc;
}, {});

// Trhis is the nurses movements
nurseIds.forEach((nurseId) => {
  setInterval(() => {
    const currentState = nurseStates[nurseId];

    // Calculate new positions with smaller speed increments
    let newLat = currentState.lat + currentState.latSpeed;
    let newLon = currentState.lon + currentState.lonSpeed;

    // Check boundaries and reverse direction when hit the boundary
    if (newLat <= 60 || newLat >= 70) {
      currentState.latSpeed *= -1; // Reverse latitude direction
      newLat = currentState.lat + currentState.latSpeed; // Recalculate new latitude
    }
    if (newLon <= -130 || newLon >= -100) {
      currentState.lonSpeed *= -1; // Reverse longitude direction
      newLon = currentState.lon + currentState.lonSpeed; // Recalculate new longitude
    }

    // Update nurse state
    nurseStates[nurseId] = {
      ...currentState,
      lat: newLat,
      lon: newLon,
    };

    // Report new position to clients via socket.io
    io.emit("locationUpdate", { nurseId, lat: newLat, lon: newLon });

    // Check proximity to hospitals
    hospitals.forEach((hospital) => {
      if (isClose({ lat: newLat, lon: newLon }, hospital.location, nurseId)) {
        io.emit("alert", { nurseId, hospital });
      }
    });
  }, 10); // Adjust interval to 3 milliseconds for smoother simulation
});

// Middleware
app.use(cors());
app.use(express.json());

// Serve static assets (Leaflet images) // Stackoverflow helped me with this
app.use(
  "/leaflet",
  express.static(
    path.join(__dirname, "node_modules", "leaflet", "dist", "images")
  )
);

// Endpoint for nurse location update for client side// GPT helped me with this
app.post("/api/location/report", (req, res) => {
  const { nurseId, lat, lon } = req.body;

  if (typeof lat === "undefined" || typeof lon === "undefined") {
    console.error(
      `Received invalid location for nurse ${nurseId}: (${lat}, ${lon})`
    );
    return res.status(400).send("Invalid location data");
  }

  nurses[nurseId] = { lat, lon };
  io.emit("locationUpdate", { nurseId, lat, lon });
  res.status(200).send("Location reported");
});

// Function to check proximity between nurse and hospital dynamically
function isClose(nurse, hospital, nurseId) {
  // console.log("isClose Testing");

  // Define proximity threshold from hospitals, can make huge and make all hospitals detectable if too big, be careful (adjust as needed)
  const proximityThreshold = 0.1;

  const distance = Math.sqrt(
    Math.pow(nurse.lat - hospital.lat, 2) +
      Math.pow(nurse.lon - hospital.lon, 2)
  );

  // Check if nruse is within the proximity threshold of the hospital
  if (distance <= proximityThreshold) {
    const now = Date.now();
    const lastAlertTime = nurseStates[nurseId].lastAlertTime || 0;
    const cooldownPeriod = 3 * 60 * 1000; // 3 minutes rest

    if (now - lastAlertTime >= cooldownPeriod) {
      nurseStates[nurseId].lastAlertTime = now;
      return true;
    }
  }

  return false;
}

// Start server
const port = process.env.PORT || 8888;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
