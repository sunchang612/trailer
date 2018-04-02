const { readFile, readFileSync } = require('fs')

setImmediate(() => console.log('阶段3.immediate  回调1'))
setImmediate(() => console.log('阶段3.immediate  回调2'))
setImmediate(() => console.log('阶段3.immediate  回调3'))

Promise.resolve().then(() => {
  console.log('[待切入下一个阶段] promise 回调1')

  setImmediate(() => {
    console.log('阶段3.immediate- promise 回调1 增加 immediate 回调4')
  })
})

readFile('../package.jn', 'utf-8', data => {
  console.log('阶段2... IO 回调, 读文件回调1')

  readFile('../1-1+导学.mp4', 'utf-8', data => {
    console.log('阶段2... IO 回调, 读文件回调2')

    setImmediate(() => console.log('阶段3.immediate- 读文件回调3 增加 immediate 回调8'))
  })
  setImmediate(() =>{
    console.log('阶段3.immediate- setImmediate 增加 immediate 回调5')
    Promise.resolve().then(() => {
      console.log('待切入下一个阶段 ， promise 回调2')
      process.nextTick(() => {
        console.log('待切入下一个阶段, promise 回调4 增加 nextTick 回调8')
      })
    }).then(() => {
      console.log('待切入下一个阶段 ， promise 回调3')
    })
  })

  setImmediate(() =>{
    console.log('阶段3.immediate- setImmediate1 增加 immediate 回调6')
    process.nextTick(() => {
      console.log('待切入下一个阶段, setImmediate回调3 增加 nextTick 回调6') })
    console.log('待切入下一个阶段, 这块正在同步阻塞的读取一个大文件')
    const video = readFileSync('../1-1+导学.mp4', 'utf-8')
    process.nextTick(() => console.log('待切入下一个阶段, immediate 回调3， 增加nextTick 回调7'))

    readFile('../package.json', 'utf-8', data => {
      console.log('阶段2...IO 回调 读取文件回调2')

      setImmediate(() => {
        console.log('阶段3.immediate 读取文件回调2  回调7')
      })

      setTimeout(() => {
        console.log('阶段1 定时器回调7')
      },0)
    })
  }) 

  process.nextTick(() => console.log('待切入下一个阶段, nextTick 回调 5'))
  setTimeout(() => console.log('阶段1---定时器， 回调5'), 0)
  setTimeout(() => console.log('阶段1---定时器， 回调6'), 0)
})

setTimeout(() => console.log('阶段1---定时器， 回调1'), 0)
setTimeout(() => {
  console.log('阶段1---定时器， 回调2')
  process.nextTick(() => {
    console.log('待切入下一个阶段, nextTick 回调1 ')
  })
}, 0)
setTimeout(() => console.log('阶段1---定时器， 回调3'), 0)
setTimeout(() => console.log('阶段1---定时器， 回调4'), 0)

process.nextTick(() => console.log('待切入下一个阶段, nextTick 回调1'))
process.nextTick(() => {
  console.log('待切入下一个阶段, nextTick 回调2')
  process.nextTick(() => {
    console.log('待切入下一个阶段, nextTick 回调4')
  })
})
process.nextTick(() => console.log('待切入下一个阶段, nextTick 回调3'))