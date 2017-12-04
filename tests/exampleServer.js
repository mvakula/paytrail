const app = require('express')()
const paytrail = require('../index')
const R = require('ramda')

const host = '127.0.0.1'
const port = '3000'
const auth = {
  merchantId: '13466',
  merchantSecret: '6pKF4jkv97zmqBJ3ZL8gUw5DfT2NMQ'
}

const baseUrl = `http://${host}:${port}`
const urlSet = {
  success: `${baseUrl}/payment/success`,
  failure: `${baseUrl}/payment/failure`,
  notification: `${baseUrl}/payment/notify`
}

app.get('/', (req, res) => {
  res.send('<a href="/makepayment">Make Payment</a>')
})

app.get('/makepayment', async (req, res) => {
  const paymentInfo = R.assoc('urlSet', urlSet, require('./mockPaymentInfo'))
  try {
    const { data } = await paytrail.createPayment(auth, paymentInfo)
    console.log(data)
    res.redirect(data.url)
  } catch (err) {
    console.log(err)
    res.send(err)
  }
})

app.get('/payment/success', (req, res) => {
  const paymentIsValid = paytrail.confirmPayment(
    req.query['ORDER_NUMBER'],
    req.query['TIMESTAMP'],
    req.query['PAID'],
    req.query['METHOD'],
    auth.merchantSecret,
    req.query['RETURN_AUTHCODE']
  )
  const msg = paymentIsValid ? 'OK' : 'Failed'
  console.log(`Payment: ${msg}`)
  res.send(msg)
})

app.listen(port, host, () => {
  console.log(`Listening ${baseUrl}`)
})
