import Queue from '@/index'

describe('Queue', () => {
  let spy = null
  beforeEach(() => {
    spy = jest.fn(done => done())
    jest.useFakeTimers()
  })

  it('constructor', () => {
    let q = new Queue(1)
    q.push(done => setTimeout(() => {
      spy(done)
    }, 1000))
    q.push(done => setTimeout(() => {
      spy(done)
    }, 1000))
    expect(spy).toHaveBeenCalledTimes(0)
    jest.advanceTimersByTime(1500)
    expect(spy).toHaveBeenCalledTimes(1)
    jest.advanceTimersByTime(1000)
    expect(spy).toHaveBeenCalledTimes(2)
  })

  it('double thread', () => {
    let q = new Queue(2)
    q.push(done => setTimeout(() => {
      spy(done)
    }, 1000))
    q.push(done => setTimeout(() => {
      spy(done)
    }, 1000))
    jest.advanceTimersByTime(3000)
    expect(spy).toHaveBeenCalledTimes(2)
  })

  it('autoStart false', () => {
    let q = new Queue(1, false)
    q.push(done => setTimeout(() => {
      spy(done)
    }, 1000))
    q.push(done => setTimeout(() => {
      spy(done)
    }, 1000))
    jest.advanceTimersByTime(2000)
    expect(spy).toHaveBeenCalledTimes(0)
    q.start()
    jest.advanceTimersByTime(3000)
    expect(spy).toHaveBeenCalledTimes(2)
  })

  it('stop', () => {
    let q = new Queue(1)
    q.push(done => setTimeout(() => {
      spy(done)
    }, 1000))
    q.push(done => setTimeout(() => {
      spy(done)
    }, 1000))
    q.push(done => setTimeout(() => {
      spy(done)
    }, 1000))
    jest.advanceTimersByTime(1500)
    expect(spy).toHaveBeenCalledTimes(1)
    q.stop()
    jest.advanceTimersByTime(3000)
    expect(spy).toHaveBeenCalledTimes(2)
  })
})
