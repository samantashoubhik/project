const app = require("express")();

// Middleares
const middleares = require("./middleware/middleware");
middleares(app);

// Routers
const routers = require("./routes/router");
routers(app);

// Database connacted
const connectDB = require("./config/db");
connectDB();

// App start on port 5000
const PORT = process.env.PORT | 5000;
app.listen(PORT, () => console.log(`Server Start on Port ${PORT}`));
