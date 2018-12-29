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