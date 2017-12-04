const paymentInfo = require('./mockPaymentInfo')
const paytrail = require('../index.js')
const validate = require('../validate')
const test = require('tape')
const R = require('ramda')

const auth = {
  merchantId: '13466',
  merchantSecret: '6pKF4jkv97zmqBJ3ZL8gUw5DfT2NMQ'
}

test('Validate data', t => {
  try {
    validate.validateData(paymentInfo)
    t.pass('No errors in data validation')
    t.end()
  } catch (err) {
    t.end(err)
  }
})

test('Validate products data', t => {
  t.plan(3)

  try {
    validate.validateProduct(paymentInfo.orderDetails.products[0])
    t.pass('Should throw no errors for valid data')
  } catch (err) {
    t.fail(err)
  }

  const invalidPaymentInfo = R.dissocPath(
    ['orderDetails', 'products', 0, 'title'],
    paymentInfo
  )

  try {
    validate.validateProduct(invalidPaymentInfo.orderDetails.products[0])
  } catch (err) {
    t.pass('Should throw Error for invalid data')
    const expected = 'title is required'
    const actual = err.message
    t.equal(actual, expected, 'Error should have proper Error message')
    t.end()
  }
})

test('Create payment with valid data', async t => {
  try {
    const res = await paytrail.createPayment(auth, paymentInfo)
    t.equal(201, res.status, 'Response should have correct status code')
    t.equal('Created', res.statusText, 'valid data')
    t.end()
  } catch (error) {
    if (error.response) {
      const msg = `The request was made but the server responded with a statusCode: ${error.response.status}
${JSON.stringify(error.response.data, null, 4)}`
      t.fail(msg)
    } else if (error.request) {
      console.log(error.request)
      t.fail('The request was made but no response was received')
    } else {
      console.log('Error', error.message)
      t.fail(
        'Something happened in setting up the request that triggered an Error'
      )
    }
    t.end()
  }
})

test('Confirm payment', t => {
  const orderNumber = '12345678'
  const timeStamp = '1512390390'
  const paid = 'e4ffb64621'
  const method = 1
  const authCode = '26A3867134D927E1964D03BA312D2828'

  const actual1 = paytrail.confirmPayment(
    orderNumber,
    timeStamp,
    paid,
    method,
    auth.merchantSecret,
    authCode
  )
  const actual2 = paytrail.confirmPayment(
    'invalidOrderNumber',
    timeStamp,
    paid,
    method,
    auth.merchantSecret,
    authCode
  )
  const expected = true
  t.equal(true, actual1, 'Payment confirmation should be true for valid inputs')
  t.equal(
    false,
    actual2,
    'Payment confirmation should be false for invalid inputs'
  )
  t.end()
})
