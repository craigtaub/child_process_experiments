# NodeJS child process experiments

- spawning child (and sub) processes
- blocking processes (stream + timers)
- sending signals 

## Branch - `parentChildProxy` test

    node child.js


## Keeping process open:
- pipes for stdin/stdout+stderr are established between the parent Node.js process and the spawned child
- holding process/shell open:
  - timers + stream (of data, via TCP sockets) hold it 
  - spawn(process.execPath, args) -> holds (stream)
  - process.stdout.on('data') -> holds (stream)
    - same applies to parent or child process
  - setTimeout(() => { /* code */ }, 1000) - holds (timer)
  - process.on('SIGINT') -> doesnt hold (not a stream, an event)
- WHY: 
  - child process waits to read all of its input 
  - the child will not continue until the stream has been closed via end() or kill().
  - process.stdin.end() OR process.kill('SIGINT')
  - can pass kill event down stack i.e. parent -> child -> baby
- 'EXIT' event - emitted after the child process ends 
  - IF nothing holding process will always run at end of script
  - ELSE signal could manually have exited it, will have signal.
