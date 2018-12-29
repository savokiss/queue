'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
var Queue = function () {
  /**
   * @constructor
   * @param {number} concurrency 并发数
   * @param {boolean} [autoStart] 是否自动开始
   */
  function Queue() {
    var concurrency = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var autoStart = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    _classCallCheck(this, Queue);

    this._concurrency = concurrency;
    this._running = 0;
    this._taskQueue = [];
    this._stopped = false; // 终止任务队列标志
    this._autoStart = autoStart; // 暂停队列标志
  }

  /**
   * 执行任务
   * @param {Function} task
   */


  _createClass(Queue, [{
    key: "_runTask",
    value: function _runTask(task) {
      var _this = this;

      this._running++;
      task(function () {
        _this._running--;
        if (_this._taskQueue.length > 0 && !_this._stopped) {
          _this._runTask(_this._taskQueue.shift());
        }
      });
    }

    // 排队任务

  }, {
    key: "_enqueueTask",
    value: function _enqueueTask(task) {
      return this._taskQueue.push(task);
    }
  }, {
    key: "push",
    value: function push(task) {
      if (!this._autoStart) {
        return this._enqueueTask(task);
      }
      return this._running < this._concurrency ? this._runTask(task) : this._enqueueTask(task);
    }

    /**
     * 终止队列
     * 只能停止未开始执行的 task
     * stop 后不能再次 start
     */

  }, {
    key: "stop",
    value: function stop() {
      this._stopped = true;
    }

    /**
     * 开始队列
     * 只用与默认停止的Queue
     */

  }, {
    key: "start",
    value: function start() {
      this._autoStart = true;
      if (this._taskQueue.length > 0) {
        this._runTask(this._taskQueue.shift());
      }
    }
  }]);

  return Queue;
}();

module.exports = Queue;
