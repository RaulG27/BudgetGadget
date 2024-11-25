const express = require("express");
const app = express();
const cors = require('cors');
const loginRoute = require('./routes/userLogin');
const getAllUsersRoute = require('./routes/userGetAllUsers');
const registerRoute = require('./routes/userSignUp');
const getUserByIdRoute = require('./routes/userGetUserById');
const editUser = require('./routes/userEditUser');
const deleteUser = require('./routes/userDeleteAll');
const userFinancialEntry = require('./routes/userFinancialEntry');
const userFavoriteStocks = require('./routes/userFavoriteStocks');
const connectDB = require('./config/db.config'); // Ensure your DB config file is correct
const userDailyBudget = require('./routes/userDailyBudget');
require('dotenv').config();
const SERVER_PORT = process.env.PORT || 8081;


// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json()); // For parsing application/json

// Routes
app.use('/user', loginRoute);
app.use('/user', registerRoute);
app.use('/user', getAllUsersRoute);
app.use('/user', getUserByIdRoute);
app.use('/user', editUser);
app.use('/user', deleteUser);
app.use('/user', userFinancialEntry); // Financial entries route
app.use('/user', userFavoriteStocks);
app.use('/budget', userDailyBudget); // Daily budget route

// Start server after connecting to DB
connectDB().then(() => {
    app.listen(SERVER_PORT, () => {
        console.log(`The backend service is running on port ${SERVER_PORT} and waiting for requests.`);
    });
}).catch(err => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1); // Exit the process with a failure code
});
