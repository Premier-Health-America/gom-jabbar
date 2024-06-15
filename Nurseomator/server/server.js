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

let nurses = {};
let hospitals = [
  {
    id: 1,
    name: "Hospital A",
    location: { lat: 82.5, lon: -62.3 },
    needsCare: true,
  },
  // Add more hospitals with random locations
];

app.use(cors());
app.use(express.json());

// Serve static assets from Leaflet's node_modules directory
app.use(
  "/leaflet",
  express.static(
    path.join(__dirname, "node_modules", "leaflet", "dist", "images")
  )
);

// Endpoint to report location
app.post("/api/location/report", (req, res) => {
  const { nurseId, lat, lon } = req.body;
  // console.log(
  //   `Received location report: Nurse ID: ${nurseId}, Lat: ${lat}, Lon: ${lon}`
  // );
  nurses[nurseId] = { lat, lon };
  io.emit("locationUpdate", nurses);
  res.status(200).send("Location reported");
});

// Check proximity to hospitals
setInterval(() => {
  for (let nurseId in nurses) {
    const nurse = nurses[nurseId];
    hospitals.forEach((hospital) => {
      if (hospital.needsCare && isClose(nurse, hospital.location)) {
        io.emit("alert", { nurseId, hospital });
      }
    });
  }
}, 5000);

function isClose(nurse, hospital) {
  const distance = Math.sqrt(
    Math.pow(nurse.lat - hospital.lat, 2) +
      Math.pow(nurse.lon - hospital.lon, 2)
  );
  return distance < 0.5; // Example threshold
}

const port = 8888;
server.listen(port, () => console.log(`Server running on port ${port}`));
