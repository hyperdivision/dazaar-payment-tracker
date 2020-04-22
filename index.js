module.exports = function (perSecond, minSeconds = 0, offset = 0) {
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
    return remainingFunds() > 0
  }

  function remainingTime () {
    const funds = remainingFunds()
    return Math.floor(Math.max(0, funds / perSecond * 1000))
  }

  function remainingFunds () {
    let now = Date.now() + minSeconds * 1000
    now -= offset // compensate delay for the seller to receive block

    let funds = 0

    for (let i = 0; i < payments.length; i++) {
      const { amount, time } = payments[i]
      const nextTime = i + 1 < payments.length ? payments[i + 1].time : now

      // add current payment
      funds += amount 

      // subtract amount spent since previous payment
      const consumed = Math.max(0, perSecond * (nextTime - time) / 1000)
      funds -= consumed

      // if funds are out, clear all earlier payments
      if (funds < 0) {
        payments.splice(0, i + 1)
        i = -1
        funds = 0
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
