const express = require("express");
require("dotenv").config();
const process = require("process");
require("./db");

const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// ROUTES
const tripAPIRoutes = require("./ApiRoutes/trips");
const destinationAPIRoutes = require("./ApiRoutes/destinations");


const userRoutes = require('./ApiRoutes/users')
app.use('/api/users', userRoutes)

const tripAPIRoutes = require('./ApiRoutes/trips')
app.use('/api/trips', tripAPIRoutes)

app.use("/api/trips", tripAPIRoutes);
app.use("/api/destinations", destinationAPIRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
