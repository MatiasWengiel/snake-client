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
let movement;


const handleUserInput = (key) => {
 
  const inputObj = {
    [UP_KEY]: 'Move: up',
    [LEFT_KEY]: 'Move: left',
    [DOWN_KEY]: 'Move: down',
    [RIGHT_KEY]: 'Move: right',

  }

  const messageObj = {
    [MESSAGE_ONE]: 'Say: That was easy',
    [MESSAGE_TWO]: 'Say: Blocked!!',
    [MESSAGE_THREE]: 'Say: You got lucky'
  }

  // Determines type of input from key and responds accordingly with movement, message, etc
  if (inputObj[key]) {

    if(movement) {
      clearInterval(movement);
    }
  
    movement = setInterval(() => {
      connection.write(inputObj[key]);
    }, 1000);

  } else if (messageObj[key]) {
    connection.write(messageObj[key])
  } else if (key === '\u0003'){
    process.exit();
  } else {
    console.log('Invalid key');
  }

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