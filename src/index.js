/**
 * 异步队列
 * @example
 * const q = new Queue(1)
 * const task1 = done => setTimeout(_ => {console.log('1'); done()}, 1000)
 * const task2 = done => setTimeout(_ => {console.log('2'); done()}, 500)
 * const task3 = done => setTimeout(_ => {console.log('3'); done()}, 250)
 * q.push(task1)
 * q.push(task2)
 * q.push(task3)
 */
class Queue {
  /**
   * @constructor
   * @param {number} concurrency 并发数
   * @param {boolean} [autoStart] 是否自动开始
   */
  constructor (concurrency = 1, autoStart = true) {
    this._concurrency = concurrency
    this._running = 0
    this._taskQueue = []
    this._stopped = false // 终止任务队列标志
    this._autoStart = autoStart // 暂停队列标志
  }

  /**
   * 执行任务
   * @param {Function} task
   */
  _runTask (task) {
    this._running++
    task(() => {
      this._running--
      if (this._taskQueue.length > 0 && !this._stopped) {
        this._runTask(this._taskQueue.shift())
      }
    })
  }

  // 排队任务
  _enqueueTask (task) {
    return this._taskQueue.push(task)
  }

  push (task) {
    if (!this._autoStart) {
      return this._enqueueTask(task)
    }
    return this._running < this._concurrency ? this._runTask(task) : this._enqueueTask(task)
  }

  /**
   * 终止队列
   * 只能停止未开始执行的 task
   * stop 后不能再次 start
   */
  stop () {
    this._stopped = true
  }

  /**
   * 开始队列
   * 只用与默认停止的Queue
   */
  start () {
    this._autoStart = true
    if (this._taskQueue.length > 0) {
      this._runTask(this._taskQueue.shift())
    }
  }
}

export default Queue
