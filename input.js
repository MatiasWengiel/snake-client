const {
  UP_KEY,
  LEFT_KEY,
  DOWN_KEY,
  RIGHT_KEY,
  MESSAGE_ONE,
  MESSAGE_TWO,
  MESSAGE_THREE,
} = require('./constants');

let connection;
const handleUserInput = (key) => {
  const inputObj = {
    [UP_KEY]: 'Move: up',
    [LEFT_KEY]: 'Move: left',
    [DOWN_KEY]: 'Move: down',
    [RIGHT_KEY]: 'Move: right',
    [MESSAGE_ONE]: 'Say: That was easy',
    [MESSAGE_TWO]: 'Say: Blocked!!',
    [MESSAGE_THREE]: 'Say: You got lucky',
  }

  if (key === '\u0003') {
    process.exit();
  }

    connection.write(inputObj[key]);
};

const setupInput = function(conn) {
  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.setEncoding("utf8");
  stdin.resume();


  connection = conn;

  stdin.on("data", handleUserInput);
  return stdin;
};


module.exports = {
  setupInput
};