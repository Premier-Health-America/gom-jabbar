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
let houses = [];

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

// Generate houses with random locations within specified Lat and Long
const generateRandomHouse = () => {
  const lat = 60 + Math.random() * 10; // Random latitude near -60
  const lon = -133 + Math.random() * 40; // Random longitude near -133
  return {
    id: houses.length + 1,
    name: `House ${houses.length + 1}`,
    location: { lat, lon },
  };
};

// Generate multiple hospitals
for (let i = 0; i < 10; i++) {
  hospitals.push(generateRandomHospital());
}

// Generate multiple houses
for (let i = 0; i < 40; i++) {
  houses.push(generateRandomHouse());
}

// Emit hospitals and houses data to clients
io.on("connection", (socket) => {
  socket.emit("hospitals", hospitals); // Emit hospitals data on initial connection
  socket.emit("houses", houses); // Emit houses data on initial connection
});

// Generate nurse IDs
const nurseIds = Array.from({ length: 20 }, (_, i) => `Nurse ${i + 1}`);

// This is the nurses initial location placement
const nurseStates = nurseIds.reduce((acc, nurseId) => {
  acc[nurseId] = {
    lat: 60 + Math.random() * 10, // Initial random starting position within [60, 70]
    lon: -133 + Math.random() * 40,
    latSpeed: (Math.random() - 0.5) * 0.001, // Initial random speed
    lonSpeed: (Math.random() - 0.5) * 0.001, // Initial random speed
    lastAlertTime: 0, // Track last alert time for cooldown
    alive: true, // Track if the nurse is alive
    countdown: 40, // Initialize countdown for 40 seconds
    hotChocolates: 1, // Initial number of hot chocolates
    lastHotChocolateTime: 0, // Track last hot chocolate time
    lastHospitalVisit: 0, // Track last hospital visit time
  };
  return acc;
}, {});

// This is the nurses movements
nurseIds.forEach((nurseId) => {
  setInterval(() => {
    const currentState = nurseStates[nurseId];

    // Only update position if the nurse is alive
    if (currentState.alive) {
      // Calculate new positions with smaller speed increments
      let newLat = currentState.lat + currentState.latSpeed;
      let newLon = currentState.lon + currentState.lonSpeed;

      // Check boundaries and reverse direction when hit the boundary
      if (newLat <= 60 || newLat >= 70) {
        currentState.latSpeed *= -1; // Reverse latitude direction
        newLat = currentState.lat + currentState.latSpeed; // Recalculate new latitude
      }
      if (newLon <= -133 || newLon >= -93) {
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
      io.emit("locationUpdate", {
        nurseId,
        lat: newLat,
        lon: newLon,
        alive: currentState.alive,
        countdown: currentState.countdown,
        hotChocolates: currentState.hotChocolates,
      });

      // Check proximity to hospitals
      hospitals.forEach((hospital) => {
        if (isClose({ lat: newLat, lon: newLon }, hospital.location)) {
          const now = Date.now();
          const cooldownPeriod = 20 * 1000; // 20 seconds cooldown for hot chocolate
          const lastHospitalVisit = nurseStates[nurseId].lastHospitalVisit;

          if (now - lastHospitalVisit >= cooldownPeriod) {
            nurseStates[nurseId].hotChocolates += 1;
            nurseStates[nurseId].lastHospitalVisit = now; // Update last hospital visit time
            io.emit("hotChocolateUpdate", {
              nurseId,
              hotChocolates: nurseStates[nurseId].hotChocolates,
            });
            io.emit("alert", { nurseId, hospital });
          }
        }
      });
    }
  }, 10); // Adjust interval to 10 milliseconds for smoother simulation

  // Decrement countdown and update alive status
  setInterval(() => {
    if (nurseStates[nurseId].countdown > 0) {
      nurseStates[nurseId].countdown -= 1;
    } else if (nurseStates[nurseId].hotChocolates > 0) {
      // Use a hot chocolate if available
      nurseStates[nurseId].hotChocolates -= 1;
      nurseStates[nurseId].countdown = 40; // Reset countdown
    } else {
      nurseStates[nurseId].alive = false;
      io.emit("locationUpdate", {
        nurseId,
        lat: nurseStates[nurseId].lat,
        lon: nurseStates[nurseId].lon,
        alive: nurseStates[nurseId].alive,
        countdown: nurseStates[nurseId].countdown,
        hotChocolates: nurseStates[nurseId].hotChocolates,
      });
    }
  }, 1000); // Decrement countdown every second
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

// Endpoint for nurse location update for client side
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
function isClose(nurse, hospital) {
  // Define proximity threshold from hospitals, can make huge and make all hospitals detectable if too big, be careful (adjust as needed)
  const proximityThreshold = 1;

  const distance = Math.sqrt(
    Math.pow(nurse.lat - hospital.lat, 2) +
      Math.pow(nurse.lon - hospital.lon, 2)
  );

  // Check if nurse is within the proximity threshold of the hospital
  return distance <= proximityThreshold;
}

// Start server
const port = process.env.PORT || 8888;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
