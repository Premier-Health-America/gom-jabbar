const express = require('express');
const app = express();
const port = 3000;

var cors = require('cors')

// Import the API routes from the dataApi.js file
const dataApi = require('./api/dataApi');

app.use(cors());

app.get('/', (req, res) =>{

    res.send('Hello, world!!');
});

// Use the API routes
app.use('/api', dataApi);


const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Export the app instance for testing and server usage
module.exports = {app, server };