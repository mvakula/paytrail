# Paytrail
npm package for [Paytrail](https://www.paytrail.com/) payment API

## Installation
```
npm i paytrail
```

## Usage

### Payment creation
```js
const { data } = await paytrail.createPayment(auth, paymentInfo)
// Save payment
res.redirect(data.url) // Redirect user to the payment page
```

`paymentInfo` should be valid data (see. `mockPaymentInfo.js` and [Paytrail docs](http://docs.paytrail.com/en/index-all.html#idm149442103152) for more info)

### Error handling
Use `try...catch` statement to handle errors

```js
try {
    const { data } = await paytrail.createPayment(auth, paymentInfo)
    res.redirect(data.url)
} catch (err) {
    console.log(err)
    res.send(err)
}
```

You can also use `validateData` function to check if your data is valid before calling `createPayment`. Beware, there still might be errors since `validateData` isn't exhaustive and there might be other errors.

### Payment confirmation
After successful payment user is redirected to url defined in paymentInfo (urlSet.success)
```js
app.get('/success', (req, res) => {
    const paymentIsValid = paytrail.confirmPayment(
    req.query['ORDER_NUMBER'],
    req.query['TIMESTAMP'],
    req.query['PAID'],
    req.query['METHOD'],
    auth.merchantSecret,
    req.query['RETURN_AUTHCODE']
)
    const msg = paymentIsValid ? 'OK' : 'Failed'
    // Do stuff (mark payment paid etc)
    res.send(msg)
})
```

### Examples
See `tests/tests.js` and `tests/exampleServer.js`

### Paytrail docs
http://docs.paytrail.com/en/index-all.html#payment-api.rest