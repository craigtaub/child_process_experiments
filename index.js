const { spawn } = require('child_process');
const path = require('path');

function app () {
  console.log('PARENT invoked CHILD');
  const subprocess = invokeProcess();

// parent sends data 
// subprocess.stdin.write("PARENT: Hello there!");

  // parent listens for data back from child
  subprocess.stdout.on('data', function (data) {
    console.log('PARENT received: ' + data);
  });

  timer(subprocess);
}
app();

// parent listens for error on child
// process.stderr.on('data', function (data) {
//   console.log('PARENT error: ' + data);
// });

if (true) {
  // IF manually trigger this runs both SIGINTS
  // process.stdout.on('data', () => {
  process.on('SIGINT', () => {
    console.log('EXIT IN PARENT')
    process.exit();
  });
  if (process.platform === 'win32') {
    var rl = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.on('SIGINT', () => {
      console.log('EXIT IN PARENT')
      process.exit();
    });
  }
}


function invokeProcess() {
  const args = [path.join(__dirname, '..', 'child_process_experiments', 'child.js')];
  return spawn(process.execPath, args);
}

function timer(subprocess) {
  // console.log('START TIMER')
  setTimeout(function() {
    // kill the child
    // WORKS: PARENT stdout.on('data) receives CHILD log message
    console.log('TIMER RAN');
    subprocess.kill('SIGINT');
  }, 1000);
}