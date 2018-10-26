module.exports = () => {
    const socket = io("http://localhost:3000/list_room");
    return socket;
}