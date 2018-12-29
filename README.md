# queue
Just a simple async queue

# Installation

```console
npm i @savo/queue
```

# Usage

## Basic
```js
const q = new Queue(1)
const task1 = done => setTimeout(_ => {console.log('1'); done()}, 1000)
const task2 = done => setTimeout(_ => {console.log('2'); done()}, 1000)
const task3 = done => setTimeout(_ => {console.log('3'); done()}, 1000)
q.push(task1)
q.push(task2)
q.push(task3)

// console
// 1 - after 1000ms
// 2 - after 2000ms
// 3 - after 3000ms
```

## Concurrency=2
```js
const q = new Queue(2)
const task1 = done => setTimeout(_ => {console.log('1'); done()}, 1000)
const task2 = done => setTimeout(_ => {console.log('2'); done()}, 1000)
const task3 = done => setTimeout(_ => {console.log('3'); done()}, 1000)

// console
// 1 - after 1000ms
// 2 - after 1000ms
// 3 - after 2000ms
```

## AutoStart=false

```js
const q = new Queue(1, false)
const task1 = done => setTimeout(_ => {console.log('1'); done()}, 1000)
const task2 = done => setTimeout(_ => {console.log('2'); done()}, 1000)
const task3 = done => setTimeout(_ => {console.log('3'); done()}, 1000)
// queue wont start until you call q.start()
q.start()

// console
// 1 - after 1000ms
// 2 - after 2000ms
// 3 - after 3000ms
```

## Stop

```js
const q = new Queue(1)
const task1 = done => setTimeout(_ => {console.log('1'); done()}, 1000)
const task2 = done => setTimeout(_ => {console.log('2'); done()}, 1000)
const task3 = done => setTimeout(_ => {console.log('3'); done()}, 1000)
// When you call stop after 1500 ms
q.stop()

// console
// 1 - after 1000ms
// 2 - after 2000ms
```

# API
```ts
interface Task {
  (done: Function): void;
}

declare class Queue {
  constructor(concurrency:number, autoStart = true);

  push(task: Task): void;

  start(): void;

  stop(): void;
}

export default Queue

```
# License
MIT