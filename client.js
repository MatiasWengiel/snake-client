const net = require('net');
const {IP, PORT} = require('./constants');

// Creates connection to server from client side
const connect = () => {
  const conn = net.createConnection({
    host: IP,
    port: PORT
  });

  conn.setEncoding('utf8');

  // Allows the server to communicate with the player
  conn.on('data', (data) => {
    console.log('Server says: ', data);
  });

  // Confirms connection (if successful) and sets player name to MW
  conn.on('connect', () => {
    console.log('Successfully connected to game server');
    conn.write('Name: MW');
  });
  
  return conn;
};

module.exports = {
  connect
};