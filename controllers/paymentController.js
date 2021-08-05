const stripe = require("../services/stripePayment");

const calculateOrderAmount = (data) => {
  const { items, totalPay } = data;
  console.log(items);
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return totalPay;
};

const paymentController = {
  createPaymentIntent: async (req, res) => {
    const { items, totalPay } = req.body;
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount({ items, totalPay }),
      currency: "usd",
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  },
};

module.exports = paymentController;
