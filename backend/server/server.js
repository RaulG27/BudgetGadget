const express = require("express");
const app = express();
const cors = require('cors');
const loginRoute = require('./routes/userLogin');
const getAllUsersRoute = require('./routes/userGetAllUsers');
const registerRoute = require('./routes/userSignUp');
const getUserByIdRoute = require('./routes/userGetUserById');
const editUser = require('./routes/userEditUser');
const deleteUser = require('./routes/userDeleteAll');
const connectDB = require('./config/db.config');

require('dotenv').config();
const SERVER_PORT = process.env.PORT || 8081;

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/user', loginRoute);
app.use('/user', registerRoute);
app.use('/user', getAllUsersRoute);
app.use('/user', getUserByIdRoute);
app.use('/user', editUser);
app.use('/user', deleteUser);

connectDB().then(() => {
    app.listen(SERVER_PORT, () => {
        console.log(`The backend service is running on port ${SERVER_PORT} and waiting for requests.`);
    });
}).catch(err => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1); // Exit the process with a failure code
});
