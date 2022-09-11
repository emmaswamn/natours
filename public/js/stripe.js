/* eslint-disable */
import { showAlert } from "./alerts";
const stripe = Stripe('pk_test_51Lg4wfIGwHIlOnnnUTzazEz6gRwdCEQwkogKTQSfQBHO6EB72NBzV5QChjmCS1CTANLcx7Pd1AApPFFWljgVxyKQ00K1ss2Wn9');

export const bookTour = async tourId => {
    try {
        // 1) get checkout session from API
        const session = await axios(
            `/api/v1/bookings/checkout-session/${tourId}`
        );
        // console.log(session);
    
        // 2) create checkout from + charge credit card
        await stripe.redirectToCheckout({
            sessionId: session.data.session.id
        });
    } catch (err) {
        console.log(err);
        showAlert('error', err);
    }
}