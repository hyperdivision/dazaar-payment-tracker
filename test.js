const test = require('tape')
const account = require('./')
const bigint = require('./bigint')

// test('no payments', t => {
//   const p = account(1)

//   t.notOk(p.active())
//   t.equal(p.remainingFunds(), 0)
//   t.equal(p.remainingTime(), 0)
  
//   t.end()
// })

// test('no rate specified', t => {
//   t.throws(() => account())

//   t.end()
// })

// test('malformed entry', t => {
//   const p = account(1)

//   t.throws(() => p.add({}))

//   t.end()
// })

// test('zero payment', t => {
//   const p = account(1)

//   t.doesNotThrow(() => p.add({ amount: 0, time: Date.now()}))

//   t.notOk(p.active())
//   t.equal(p.remainingFunds(), 0)
//   t.equal(p.remainingTime(), 0)

//   t.end()
// })

// test('past date', t => {
//   const p = account(1)

//   t.doesNotThrow(() => p.add({ amount: 100, time: 0 }))

//   t.notOk(p.active())
//   t.equal(p.remainingFunds(), 0)
//   t.equal(p.remainingTime(), 0)

//   t.end()  
// })

// test('free', t => {
//   const p = account(0)

//   t.ok(p.active())
//   t.equal(p.remainingFunds(), 0)

//   t.end()
// })

// test('active', t => {
//   const p = account(1)

//   p.add({ amount: 10, time: Date.now()})

//   t.ok(p.active())

//   t.end()
// })

// test('timeout', t => {
//   const p = account(1)

//   p.add({ amount: 0.5, time: Date.now()})

//   t.ok(p.active())
//   setTimeout(() => {
//     t.notOk(p.active())
//     t.end()
//   }, 500)
// })


// test('minSeconds', t => {
//   const p = account(1, 1)

//   p.add({ amount: 0.5, time: Date.now()})

//   t.notOk(p.active())
//   t.end()
// })

// test('offset', t => {
//   const p = account(1, 0, 1000)

//   p.add({ amount: 0.5, time: Date.now()})

//   t.ok(p.active())
//   setTimeout(() => {
//     t.ok(p.active())
//   }, 1000)

//   setTimeout(() => {
//     t.notOk(p.active())
//     t.end()
//   }, 1500)
// })


// test('offset & minSeconds', t => {
//   const p = account(1, 0.5, 1000)

//   p.add({ amount: 1, time: Date.now()})

//   t.ok(p.active())
//   setTimeout(() => {
//     t.ok(p.active())
//   }, 1000)

//   setTimeout(() => {
//     t.notOk(p.active())
//     t.end()
//   }, 1500)
// })

// test('input 1: ok', t => {
//   const p = account(10)
  
//   setTimeout(() => {
//     t.ok(p.active())
//     t.ok(p.remainingFunds() <= 1)
//     t.ok(p.remainingTime() <= 100)

//     t.end()
//   }, 1000)

//   const now = Date.now()
//   for (let i = now; i <= now + 1000; i += 100) {
//     p.add({ amount: 1, time: i })
//   }
// })

// test('input 2: ok', t => {
//   const p = account(1000, null, 50)

//   setTimeout(() => {
//     t.ok(p.active())
//     t.ok(p.remainingFunds() <= 10)
//     t.ok(p.remainingTime() <= 10)

//     t.end()
//   }, 1000)

//   const now = Date.now()
//   for (let i = now; i <= now + 1000; i += 1) {
//     p.add({ amount: 1, time: i })
//   }
// })

// test('input 3: ok', t => {
//   const payments = [
//     { amount: 20, offset: 0 },
//     { amount: 10, offset: 100 },
//     { amount: 5, offset: 200 },
//     { amount: 2, offset: 300 },
//     { amount: 1, offset: 400 }
//   ]

//   const p = account(10)

//   setTimeout(() => {
//     t.ok(p.active())
//     t.ok(p.remainingFunds() <= 28)
//     t.ok(p.remainingFunds() > 23)
//     t.ok(p.remainingTime() <= 2800)
//     t.ok(p.remainingTime() > 2300)

//     t.end()
//   }, 1000)

//   addMultiple(p, payments)
// })

// test('input 4: timeout', t => {
//   const payments = [
//     { amount: 20, offset: 0 },
//     { amount: 10, offset: 150 },
//     { amount: 2, offset: 200 },
//     { amount: 2, offset: 300 },
//     { amount: 1, offset: 400 }
//   ]

//   const p = account(100)

//   setTimeout(() => {
//     t.notOk(p.active())
//     t.equal(p.remainingFunds(), 0)
//     t.equal(p.remainingTime(), 0)

//     t.end()
//   }, 1000)

//   addMultiple(p, payments)
// })


// test('input 5: top-up after timeout', t => {
//   const payments = [
//     { amount: 20, offset: 0 },
//     { amount: 10, offset: 150 },
//     { amount: 2, offset: 200 },
//     { amount: 2, offset: 300 },
//     { amount: 1, offset: 400 },
//     { amount: 100, offset: 1000}
//   ]

//   const p = account(100)

//   setTimeout(() => {
//     t.ok(p.active())
//     t.ok(p.remainingFunds() < 100)
//     t.ok(p.remainingTime() < 1000)

//     t.end()
//   }, 1000)

//   addMultiple(p, payments)
// })

// test('gc 1', t => {
//   const p = account(100)

//   const payment = { amount: 1, time: 0 }
//   for (let i = 0; i < 500; i++) p.add(payment)

//   // gc should clear all 500 payments
//   t.equal(p.gc(), 0)

//   t.end()
// })

// test('gc 1', t => {
//   const p = account(100)

//   const payment = { amount: 1, time: 0 }
//   for (let i = 0; i < 500; i++) p.add(payment)

//   p.add({ amount: 10000, time: Date.now()})

//   // gc should leave one remaining payment
//   t.equal(p.gc(), 1)
//   t.end()
// })

test('bigint: no payments', t => {
  const p = bigint(1n)

  t.notOk(p.active())
  t.equal(p.remainingFunds(), 0n)
  t.equal(p.remainingTime(), 0)
  
  t.end()
})

test('bigint: no rate specified', t => {
  t.throws(() => bigint())

  t.end()
})

test('bigint: malformed entry', t => {
  const p = bigint(1n)

  t.throws(() => p.add({}))

  t.end()
})

test('bigint: zero payment', t => {
  const p = bigint(1n)

  t.doesNotThrow(() => p.add({ amount: 0n, time: Date.now()}))

  t.notOk(p.active())
  t.equal(p.remainingFunds(), 0n)
  t.equal(p.remainingTime(), 0)

  t.end()
})

test('bigint: past date', t => {
  const p = bigint(1n)

  t.doesNotThrow(() => p.add({ amount: 100n, time: 0 }))

  t.notOk(p.active())
  t.equal(p.remainingFunds(), 0n)
  t.equal(p.remainingTime(), 0)

  t.end()  
})

test('bigint: free', t => {
  const p = bigint(0n)

  t.ok(p.active())
  t.equal(p.remainingFunds(), 0n)

  t.end()
})

test('bigint: active', t => {
  const p = bigint(1n)

  p.add({ amount: 10n, time: Date.now()})

  t.ok(p.active())

  t.end()
})

test('bigint: timeout', t => {
  const p = bigint(10n)

  p.add({ amount: 5n, time: Date.now()})

  t.ok(p.active())
  setTimeout(() => {
    t.notOk(p.active())
    t.end()
  }, 500)
})


test('bigint: minSeconds', t => {
  const p = bigint(10n, 1)

  p.add({ amount: 5n, time: Date.now()})

  t.notOk(p.active())
  t.end()
})

test('bigint: offset', t => {
  const p = bigint(10n, 0, 1000)

  p.add({ amount: 5n, time: Date.now()})

  t.ok(p.active())
  setTimeout(() => {
    t.ok(p.active())
  }, 1000)

  setTimeout(() => {
    t.notOk(p.active())
    t.end()
  }, 1500)
})


test('bigint: offset & minSeconds', t => {
  const p = bigint(2n, 1, 1000)

  p.add({ amount: 2n, time: Date.now()})

  t.ok(p.active())
  setTimeout(() => {
    t.ok(p.active())
  }, 800)

  setTimeout(() => {
    t.notOk(p.active())
    t.end()
  }, 1500)
})

test('bigint: input 1: ok', t => {
  const p = bigint(10n)
  
  setTimeout(() => {
    t.ok(p.active())
    t.ok(p.remainingFunds() <= 1n)
    t.ok(p.remainingTime() <= 100)

    t.end()
  }, 1000)

  const now = Date.now()
  for (let i = now; i <= now + 1000; i += 100) {
    p.add({ amount: 1n, time: i })
  }
})

test('bigint: input 2: ok', t => {
  const p = bigint(1000n, null, 100)

  setTimeout(() => {
    t.ok(p.active())
    t.ok(p.remainingFunds() <= 10n)
    t.ok(p.remainingTime() <= 10)

    t.end()
  }, 1000)

  const now = Date.now()
  for (let i = now; i <= now + 1000; i += 1) {
    p.add({ amount: 1n, time: i })
  }
})

test('bigint: input 3: ok', t => {
  const payments = [
    { amount: 20n, offset: 0 },
    { amount: 10n, offset: 100 },
    { amount: 5n, offset: 200 },
    { amount: 2n, offset: 300 },
    { amount: 1n, offset: 400 }
  ]

  const p = bigint(10n)

  setTimeout(() => {
    t.ok(p.active())
    t.ok(p.remainingFunds() <= 28n)
    t.ok(p.remainingFunds() > 23n)
    t.ok(p.remainingTime() <= 2800)
    t.ok(p.remainingTime() > 2000)

    t.end()
  }, 1000)

  addMultiple(p, payments)
})

test('bigint: input 4: timeout', t => {
  const payments = [
    { amount: 20n, offset: 0 },
    { amount: 10n, offset: 150 },
    { amount: 2n, offset: 200 },
    { amount: 2n, offset: 300 },
    { amount: 1n, offset: 400 }
  ]

  const p = bigint(100n)

  setTimeout(() => {
    t.notOk(p.active())
    t.equal(p.remainingFunds(), 0n)
    t.equal(p.remainingTime(), 0)

    t.end()
  }, 1000)

  addMultiple(p, payments)
})


test('bigint: input 5: top-up after timeout', t => {
  const payments = [
    { amount: 20n, offset: 0 },
    { amount: 10n, offset: 150 },
    { amount: 2n, offset: 200 },
    { amount: 2n, offset: 300 },
    { amount: 1n, offset: 400 },
    { amount: 100n, offset: 1000}
  ]

  const p = bigint(100n)

  setTimeout(() => {
    t.ok(p.active())
    t.ok(p.remainingFunds() < 150n)
    t.ok(p.remainingTime() < 1000)

    t.end()
  }, 1000)

  addMultiple(p, payments)
})

test('bigint: gc 1', t => {
  const p = bigint(100n)

  const payment = { amount: 1n, time: 0 }
  for (let i = 0; i < 500; i++) p.add(payment)

  // gc should clear all 500 payments
  t.equal(p.gc(), 0)

  t.end()
})

test('bigint: gc 1', t => {
  const p = bigint(100n)

  const payment = { amount: 1n, time: 0 }
  for (let i = 0; i < 500; i++) p.add(payment)

  p.add({ amount: 10000n, time: Date.now()})

  // gc should leave one remaining payment
  t.equal(p.gc(), 1)
  t.end()
})

function addMultiple (p, arr) {
  const now = Date.now()
  for (let { amount, offset } of arr) {
    p.add({ amount, time: now + offset })
  }
}
