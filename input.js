const {
  UP_KEY,
  LEFT_KEY,
  DOWN_KEY,
  RIGHT_KEY,
  MESSAGE_ONE,
  MESSAGE_TWO,
  MESSAGE_THREE,
  SPEED
} = require('./constants');

let connection;
let movement;


const handleUserInput = (key) => {
 
  const moveInput = {
    [UP_KEY]: 'Move: up',
    [LEFT_KEY]: 'Move: left',
    [DOWN_KEY]: 'Move: down',
    [RIGHT_KEY]: 'Move: right',

  };

  const messageInput = {
    [MESSAGE_ONE]: 'Say: That was easy',
    [MESSAGE_TWO]: 'Say: Blocked!!',
    [MESSAGE_THREE]: 'Say: You got lucky'
  };

  // Determines type of input from key and responds accordingly with movement, message, etc
  if (moveInput[key]) {

    /* Note for mentor: I made the snake so that it moves in the last direction it was pointed, like the original game. That's why I have the setInterval code. For the original specs, I would just have the following instead:

    connection.write(moveInput[key]) */

    if (movement) {
      clearInterval(movement);
    }
  
    movement = setInterval(() => {
      connection.write(moveInput[key]);
    }, SPEED);

  } else if (messageInput[key]) {
    //Prevents message inputs from stopping the movement of the snake
    connection.write(messageInput[key]);

  } else if (key === '\u0003') {
    process.exit();
  } else {
    console.log('Invalid key');
  }

};

const setupInput = (conn) => {
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