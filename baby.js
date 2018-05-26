console.log('BABY invoked');

console.log('BABY setup signint');
process.on('SIGINT', () => {
  console.log('SIGINT IN BABY')
  process.exit();
});
// if (process.platform === 'win32') {
//   var rl = require('readline').createInterface({
//     input: process.stdin,
//     output: process.stdout
//   });
//   rl.on('SIGINT', () => {
//     console.log('SIGINT IN BABY')
//     process.exit();
//   });
// }


// Blocker
process.stdout.on('data', function (data) {
  console.log('BABY received: ' + data);
});

// Blocker
// setTimeout(() => {
//   console.log('BABY BLOCKER TIMER');
// }, 2000);

// process.on('exit', () => {
//   console.log('exit IN BABY')
//   // process.exit();
// });