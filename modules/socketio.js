const socketIO = require("socket.io");

exports.initialize = ((server) => {
    io = socketIO(server);
    return io;
})