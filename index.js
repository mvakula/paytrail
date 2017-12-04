const axios = require('axios')
const Promise = require('bluebird')
const crypto = require('crypto')
const R = require('ramda')
const validateData = require('./validate').validateData

const defaultUrls = {
  paymentCreate: 'https://payment.paytrail.com/api-payment/create'
}

const createPayment = (auth, paymentInfo) => {
  const data = createBody(paymentInfo, defaultUrls)
  validateData(data)
  const url = data.urlSet.paymentCreate
  return paytrailRequest(url, auth, data)
}

function createBody (data, defaultUrlSet) {
  const urlSet = R.merge(defaultUrlSet, data.urlSet)
  return R.assoc('urlSet', urlSet, data)
}

function paytrailRequest (url, { merchantId, merchantSecret }, data) {
  const auth = {
    username: merchantId,
    password: merchantSecret
  }
  const headers = {
    'User-Agent': 'node-paytrail',
    'X-Verkkomaksut-Api-Version': 1
  }
  const config = {
    method: 'post',
    url,
    headers,
    auth,
    json: true,
    data
  }
  return axios(config)
}

function confirmPayment (
  orderNumber,
  timestamp,
  paid,
  method,
  merchantSecret,
  authCode
) {
  const base = [orderNumber, timestamp, paid, method, merchantSecret].join('|')
  const hash = crypto.createHash('md5').update(base).digest('hex')
  return hash.toUpperCase() === authCode
}

module.exports = {
  createPayment,
  confirmPayment
}
