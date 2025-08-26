import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export const processpayment = async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "USD",
    metadata: {
      company: "TechTon",
    },
  });
  res.status(200).json({
    success: true,
    client_secret: myPayment.client_secret,
  });
};

export const stripeKey=async(req,res,next)=>{

}