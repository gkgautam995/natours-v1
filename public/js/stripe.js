/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';

const stripe = Stripe(
  'pk_test_51M7g6WSF7TamEyf8w0Pzed4hgBEOG7kzEkGo1jtheER1sM6OAvw5yAfd1jaMvC0qNIgnQdh3biw7WpNdNHem3FDr00EJi2rOhZ'
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v2/bookings/checkout-session/${tourId}`);
    // console.log(session);

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
