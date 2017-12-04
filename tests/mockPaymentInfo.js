module.exports = {
  orderNumber: '12345678', // required
  currency: 'EUR', // required
  locale: 'fi_FI', // required
  urlSet: {
    // required
    success: 'https://www.esimerkkikauppa.fi/sv/success', // required
    failure: 'https://www.esimerkkikauppa.fi/sv/failure', // required
    pending: '',
    notification: 'https://www.esimerkkikauppa.fi/sv/success' // required
  },
  // Payment total. Send either exact payment data (orderDetails) or the payment total to the service
  // The value of price must be >= 0.65.
  // We recommend using orderDetails record whenever it is possible
  // price: '99.00'
  orderDetails: {
    includeVat: '1', // required
    contact: {
      telephone: '041234567',
      mobile: '041234567',
      email: 'tester@esimerkkikauppa.fi', // required
      firstName: 'Simon', // required
      lastName: 'Seller', // required
      companyName: '',
      address: {
        // required
        street: 'Test street 1', // required
        postalCode: '12340', // required
        postalOffice: 'Helsinki', // required
        country: 'FI' // required
      }
    },
    products: [
      // required
      {
        title: 'Example product', // required
        code: 'XX-123',
        amount: '1.00', // required
        price: '99.00', // required
        vat: '23.00', // required
        discount: '0.00', // required
        type: '1'
      },
      {
        title: 'Example product 2',
        code: 'XX-456',
        amount: '2.50',
        price: '19.90',
        vat: '23.00',
        discount: '0.00',
        type: '1'
      }
    ]
  }
}
