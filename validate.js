const R = require('ramda')

// Add better validation
// e.g. validate if product amount is float. See. http://docs.paytrail.com/en/index-all.html#idm149442103152

const throwErrIfEmpty = R.curry((obj, key) => {
  if (!obj[key]) throw Error(`${key} is required`)
})

const validateData = data => {
  const throwErrIfEmptyKeyInData = throwErrIfEmpty(data)
  throwErrIfEmptyKeyInData('orderNumber')
  throwErrIfEmptyKeyInData('currency')
  throwErrIfEmptyKeyInData('locale')
  validateUrls(data.urlSet)
  validateOrderDetails(data.orderDetails)
}

function validateUrls (urls) {
  if (!urls.success || !urls.failure || !urls.notification) {
    throw Error('Please defined callback urls')
  }
  return urls
}

function validateOrderDetails (orderDetails) {
  const throwErrIfEmptyKeyInOrderDetails = throwErrIfEmpty(orderDetails)
  throwErrIfEmptyKeyInOrderDetails('includeVat')
  orderDetails.products.map(validateProduct)
  validateContact(orderDetails.contact)
}

function validateContact (contact) {
  const throwErrIfEmptyKeyInContact = throwErrIfEmpty(contact)
  throwErrIfEmptyKeyInContact('firstName')
  throwErrIfEmptyKeyInContact('lastName')
  throwErrIfEmptyKeyInContact('address')
  const throwErrIfEmptyKeyInAddress = throwErrIfEmpty(contact.address)
  throwErrIfEmptyKeyInAddress('street')
  throwErrIfEmptyKeyInAddress('postalCode')
  throwErrIfEmptyKeyInAddress('postalOffice')
  throwErrIfEmptyKeyInAddress('country')
}

function validateProduct (product) {
  const throwErrIfEmptyKeyInProduct = throwErrIfEmpty(product)
  throwErrIfEmptyKeyInProduct('title')
  throwErrIfEmptyKeyInProduct('amount')
  throwErrIfEmptyKeyInProduct('price')
  throwErrIfEmptyKeyInProduct('vat')
  throwErrIfEmptyKeyInProduct('discount')
}

module.exports = {
  validateData,
  validateUrls,
  validateOrderDetails,
  validateProduct,
  validateContact
}
