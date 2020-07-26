const express = require("express");
const http = require('http');

const usersController = require("./controller/user_controller");
const vacationController = require("./controller/vacation_controller");
const loginFilter = require('./middleware/login-filter');
const JWTerrorHandler = require('./middleware/error-handler');
const errorHandler = require("./errors/error-handler");
const fileUpload = require("express-fileupload");
// const server = express();
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server); 

const port = process.env.PORT || 3001;
const cors = require('cors');

app.use(cors())
app.use(express.static('uploads'));
app.use(loginFilter());
app.use(JWTerrorHandler);
app.use(express.json());
app.use(fileUpload());



app.use("/users", usersController);
app.use("/vacations",vacationController );

app.use(errorHandler);

io.on('connection', (socket) => {
    console.log('New Websocket Connection'); // printing a message when a new client connects

    
});





server.listen(port, () => console.log('Server started on port' + port));






