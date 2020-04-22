# dazaar-payment-tracker

Module to track payments for streaming services.

## Usage

```js
const account = require('payment-tracker')

// set up new account, with rate 10 units/s
var p = account(10)

p.add({ amount: 10, time: Date.now()})

p.active() // true
p.remainingTime() // 998 ms
p.remainingFunds() // 9.98

setTimeout(p.active, 1000) // false

```

## API

#### `var p = account(perSecond, [minSeconds, offset])`

Set up a new account which charges `perSecond` units/seconds. `minSeconds` may define a minimum amount of stream time. `offset` may be used to account for the delay between sending and receipt of payment.

#### `p.add({ amount, time })`

Add a payment to the account. `amount` is in arbitrary units and `time` should be passed as the number of milliseconds since Unix epoch, ie. the format given by `Date.now()`

#### `p.active()`

Returns `true` if the account has enough funds, `false` otherwise.

#### `p.remainingTime()`

Returns the amount of streamtime remaining on the account in milliseconds.

#### `p.remainingFunds()`

Returns the amount of funds remaining in the account.
