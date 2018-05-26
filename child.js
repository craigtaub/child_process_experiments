const { spawn } = require('child_process');
const path = require('path');

// baby process
// console.log('CHILD invoked BABY');
const babyprocess = invokeProcess();

// block
// process.stdout.on('data', function (data) { });

babyprocess.stdout.on('data', function (data) {
  console.log('CHILD received: ' + data);
});

// child sends
// console.log('YO FROM CHILD');

// // child listens + sends
// process.stdin.on('data', function (data) {
//   console.log('CHILD: Received data: ' + data);
// });
  

// if receives KILL, print message
// WORKS: in isolation 
console.log('CHILD setup signint');
process.on('SIGINT', () => {
  console.log('SIGINT IN CHILD');
  babyprocess.kill('SIGINT');
  process.exit();
});
// if (process.platform === 'win32') {
//   var rl = require('readline').createInterface({
//     input: process.stdin,
//     output: process.stdout
//   });
//   rl.on('SIGINT', () => {
//     console.log('SIGINT IN CHILD');
//     // babyprocess.kill('SIGINT');
//     process.exit();
//   });
// }

// always runs if nothing holding pipe open
// process.on('exit', () => {
//   console.log('CHILD PROCESS EXIT')
// });

// blocker
setTimeout(() => {
  console.log('CHILD BLOCKER TIMER');
  babyprocess.kill('SIGINT')
}, 2000);


function invokeProcess() {
  const args = [path.join(__dirname, '..', 'child_process_experiments', 'baby.js')];
  return spawn(process.execPath, args);
}