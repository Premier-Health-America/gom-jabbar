//Ended up NOT using dotenv for this because there was no databases used or web api used needing a key.

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
let deadNursesCount = 0;
let curedHousesCount = 0;
let intervals = []; // Add interval storage

// Illnesses and their cures
const illnesses = {
  Lupus: "Voclosporin",
  Alcoholism: "Brochures for AA",
  Frostbite: "A furnace",
  FoodPoisoning: "Pedialyte",
  IglooFever: "PS5 with 1gb Internet",
  Loneliness: "Tickle-Me-Elmo",
};

// Generate hospitals with random location
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
  const lat = 60 + Math.random() * 9; // Random latitude near -60
  const lon = -133 + Math.random() * 39; // Random longitude near -133
  const hasIllness = Math.random() < 1; // This was randomized at first but decided to make them all have illnesses
  const illness = hasIllness
    ? Object.keys(illnesses)[
        Math.floor(Math.random() * Object.keys(illnesses).length)
      ]
    : null;
  return {
    id: houses.length + 1,
    name: `House ${houses.length + 1}`,
    location: { lat, lon },
    illness,
    cured: false,
  };
};

// For Loop to push 20 hospitals
for (let i = 0; i < 20; i++) {
  hospitals.push(generateRandomHospital());
}

// For loop to push 25 houses
for (let i = 0; i < 25; i++) {
  houses.push(generateRandomHouse());
}

// Emit hospitals, houses, and counts data to clients
io.on("connection", (socket) => {
  socket.emit("hospitals", hospitals); // Emit hospitals data on initial connection
  socket.emit("houses", houses); // Emit houses data on initial connection
  socket.emit("updateCounts", { deadNursesCount, curedHousesCount }); // Emit counts data on initial connection
});

// Generate nurse IDs
const nurseIds = Array.from({ length: 30 }, (_, i) => `Nurse ${i + 1}`);

// This is the nurses initial location placement
const nurseStates = nurseIds.reduce((acc, nurseId) => {
  acc[nurseId] = {
    lat: 60 + Math.random() * 10, // Initial random starting position within [60, 70]
    lon: -133 + Math.random() * 40,
    latSpeed: (Math.random() - 0.5) * 0.003, // Initial random speed
    lonSpeed: (Math.random() - 0.5) * 0.003, // Initial random speed
    lastAlertTime: 0, // Track last alert time for cooldown
    alive: true, // Track if the nurse is alive
    countdown: 40, // Initialize countdown for 40 seconds
    hotChocolates: 2, // Initial number of hot chocolates
    lastHotChocolateTime: 0, // Track last hot chocolate time
    headingToHospital: false, // Track if the nurse is heading to a hospital
    carryingCure: null, // The cure the nurse is carrying
    targetHouse: null, // The house the nurse is targeting to deliver the cure
    alertSent: false, // Flag to check if alert was already sent for death
  };
  return acc;
}, {});

// Function to move nurse towards a target
const moveTowards = (current, target, speed) => {
  const dx = target.lat - current.lat;
  const dy = target.lon - current.lon;
  const distance = Math.sqrt(dx * dx + dy * dy);
  if (distance < speed) {
    return { lat: target.lat, lon: target.lon };
  } else {
    const ratio = speed / distance;
    return { lat: current.lat + dx * ratio, lon: current.lon + dy * ratio };
  }
};

// Function to check proximity between nurse and target dynamically
const isClose = (nurse, target) => {
  const proximityThreshold = 1;
  const distance = Math.sqrt(
    Math.pow(nurse.lat - target.lat, 2) + Math.pow(nurse.lon - target.lon, 2)
  );
  return distance <= proximityThreshold;
};

// Function to emit an alert
const emitAlert = (nurseId, message) => {
  io.emit("alert", { nurseId, message });
};

// Function to clear all intervals and stop activities
const clearAllIntervals = () => {
  intervals.forEach(clearInterval);
  intervals = [];
};

// This is the nurses movements
nurseIds.forEach((nurseId) => {
  const movementInterval = setInterval(() => {
    const currentState = nurseStates[nurseId];

    // Only update position if the nurse is alive
    if (currentState.alive) {
      let newLat = currentState.lat;
      let newLon = currentState.lon;

      if (currentState.carryingCure && currentState.targetHouse) {
        // Move towards the target house if carrying a cure
        const targetHouse = houses.find(
          (house) => house.id === currentState.targetHouse.id
        );
        if (targetHouse) {
          ({ lat: newLat, lon: newLon } = moveTowards(
            currentState,
            targetHouse.location,
            0.001
          ));
          // Check if nurse has reached the house
          if (isClose({ lat: newLat, lon: newLon }, targetHouse.location)) {
            // Deliver the cure
            nurseStates[nurseId].carryingCure = null;
            nurseStates[nurseId].targetHouse = null;
            targetHouse.cured = true; // Mark the house as cured
            nurseStates[nurseId].hotChocolates += 2; // Get a hot chocolate back from the house
            nurseStates[nurseId].countdown = 40; // Reset countdown
            io.emit("cureDelivered", { nurseId, house: targetHouse });
            curedHousesCount += 1;
            emitAlert(nurseId, `Cured illness at ${targetHouse.name}`);
            io.emit("updateCounts", { deadNursesCount, curedHousesCount });

            if (houses.every((house) => house.cured)) {
              io.emit("allHousesCured");
              clearAllIntervals();
            }
          }
        }
      } else if (currentState.headingToHospital && currentState.targetHouse) {
        // Move towards the nearest hospital if not carrying a cure
        const nearestHospital = hospitals.reduce((nearest, hospital) => {
          const distance = Math.sqrt(
            Math.pow(currentState.lat - hospital.location.lat, 2) +
              Math.pow(currentState.lon - hospital.location.lon, 2)
          );
          if (!nearest || distance < nearest.distance) {
            return { hospital, distance };
          }
          return nearest;
        }, null);

        if (nearestHospital) {
          ({ lat: newLat, lon: newLon } = moveTowards(
            currentState,
            nearestHospital.hospital.location,
            0.001
          ));
          // Check if nurse has reached the hospital
          if (
            isClose(
              { lat: newLat, lon: newLon },
              nearestHospital.hospital.location
            )
          ) {
            // Pick up the cure and hot chocolate
            nurseStates[nurseId].carryingCure =
              illnesses[currentState.targetHouse.illness];
            nurseStates[nurseId].hotChocolates += 2; // Always get 2 hot chocolates
            nurseStates[nurseId].countdown = 40; // Reset countdown
            nurseStates[nurseId].headingToHospital = false;
          }
        }
      } else if (currentState.hotChocolates < 1) {
        // Move towards the nearest hospital if out of hot chocolates
        const nearestHospital = hospitals.reduce((nearest, hospital) => {
          const distance = Math.sqrt(
            Math.pow(currentState.lat - hospital.location.lat, 2) +
              Math.pow(currentState.lon - hospital.location.lon, 2)
          );
          if (!nearest || distance < nearest.distance) {
            return { hospital, distance };
          }
          return nearest;
        }, null);

        if (nearestHospital) {
          ({ lat: newLat, lon: newLon } = moveTowards(
            currentState,
            nearestHospital.hospital.location,
            0.001
          ));
          // Check if nurse has reached the hospital
          if (
            isClose(
              { lat: newLat, lon: newLon },
              nearestHospital.hospital.location
            )
          ) {
            // Pick up hot chocolate
            nurseStates[nurseId].hotChocolates += 2; // Always get hot chocolates
            nurseStates[nurseId].countdown = 40; // Reset countdown
          }
        }
      } else {
        // Random movement if not heading to a specific location
        newLat += currentState.latSpeed;
        newLon += currentState.lonSpeed;

        // Check boundaries and reverse direction when hitting the boundary
        if (newLat <= 60 || newLat >= 70) {
          currentState.latSpeed *= -1; // Reverse latitude direction
          newLat = currentState.lat + currentState.latSpeed; // Recalculate new latitude
        }
        if (newLon <= -133 || newLon >= -93) {
          currentState.lonSpeed *= -1; // Reverse longitude direction
          newLon = currentState.lon + currentState.lonSpeed; // Recalculate new longitude
        }
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
        carryingCure: currentState.carryingCure,
      });

      // Check proximity to houses with illnesses
      houses.forEach((house) => {
        if (
          house.illness &&
          !house.cured &&
          isClose({ lat: newLat, lon: newLon }, house.location)
        ) {
          if (!currentState.carryingCure) {
            // Set target house and head to the hospital
            nurseStates[nurseId].targetHouse = house;
            nurseStates[nurseId].headingToHospital = true;
          } else if (currentState.carryingCure === illnesses[house.illness]) {
            // Deliver the cure
            nurseStates[nurseId].carryingCure = null;
            nurseStates[nurseId].targetHouse = null;
            house.cured = true; // Mark the house as cured
            nurseStates[nurseId].hotChocolates += 1; // Get a hot chocolate back from the house
            nurseStates[nurseId].countdown = 40; // Reset countdown
            io.emit("cureDelivered", { nurseId, house });
            curedHousesCount += 1;
            emitAlert(nurseId, `Cured illness at ${house.name}`);
            io.emit("updateCounts", { deadNursesCount, curedHousesCount });

            if (houses.every((house) => house.cured)) {
              io.emit("allHousesCured");
              clearAllIntervals();
            }
          }
        }
      });
    }
  }, 10); // Adjusted interval to 10 milliseconds for smoother simulation

  intervals.push(movementInterval);

  // Decrement countdown and update alive status
  const countdownInterval = setInterval(() => {
    if (nurseStates[nurseId].countdown > 0) {
      nurseStates[nurseId].countdown -= 1;
    } else if (nurseStates[nurseId].hotChocolates > 0) {
      // Use a hot chocolate if available
      nurseStates[nurseId].hotChocolates -= 1;
      nurseStates[nurseId].countdown = 40; // Reset countdown
    } else {
      nurseStates[nurseId].alive = false;
      if (!nurseStates[nurseId].alertSent) {
        emitAlert(nurseId, "has died");
        nurseStates[nurseId].alertSent = true;
        deadNursesCount += 1;
        io.emit("updateCounts", { deadNursesCount, curedHousesCount });
      }
      io.emit("locationUpdate", {
        nurseId,
        lat: nurseStates[nurseId].lat,
        lon: nurseStates[nurseId].lon,
        alive: nurseStates[nurseId].alive,
        countdown: nurseStates[nurseId].countdown,
        hotChocolates: nurseStates[nurseId].hotChocolates,
        carryingCure: nurseStates[nurseId].carryingCure,
      });
    }
  }, 1000); // Decrement countdown every second

  intervals.push(countdownInterval);
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

// Start server
const port = process.env.PORT || 8888;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
