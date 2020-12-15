module.exports = function (perSecond, minSeconds = 0n, offset = 0n) {
  if (perSecond === undefined) throw new Error('rate must be specified')

  const payments = []

  function add (payment) {
    if (payment.amount === undefined || payment.time === undefined) {
      throw new Error('payment must be of format { amount: x, time: y }')
    }
    payments.push(payment)
  }

  function active () {
    if (!perSecond) return true
    return remainingFunds() > 0n
  }

  function remainingTime () {
    const funds = remainingFunds()
    return max(0n, (funds * 1000n) / perSecond)
  }

  function remainingFunds () {
    let now = BigInt(Date.now()) + minSeconds * 1000n
    now -= offset // compensate delay for the seller to receive block

    let funds = 0n

    for (let i = 0; i < payments.length; i++) {
      const { amount, time } = payments[i]
      const nextTime = i + 1 < payments.length ? payments[i + 1].time : now

      // add current payment
      funds += amount 

      // subtract amount spent since previous payment
      const consumed = max(0n, perSecond * (nextTime - time) / 1000n)
      funds -= consumed

      // if funds are out, clear all earlier payments
      if (funds < 0) {
        payments.splice(0, i + 1)
        i = -1
        funds = 0n
      }
    }

    return funds
  }

  function gc () {
    remainingFunds()
    return payments.length
  }

  return {
    add,
    active,
    remainingTime,
    remainingFunds,
    gc
  }
}

function max (a, b) {
  return (a >= b) ? a : b
}
