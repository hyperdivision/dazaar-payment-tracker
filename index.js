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

    const funds = payments.reduce(leftoverFunds, 0)

    return funds

    function leftoverFunds (funds, payment, i) {
      const nextTime = i + 1 < payments.length ? payments[i + 1].time : now

      const consumed = perSecond * (nextTime - payment.time) / 1000
      funds += payment.amount - consumed

      return funds > 0 ? funds : 0
    }
  }

  return {
    add,
    active,
    remainingTime,
    remainingFunds
  }
}
