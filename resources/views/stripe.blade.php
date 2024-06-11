@extends('welcome')
@section('content')
<style>
    /* Form container styles */
    /* Example CSS styles to mimic Stripe's card input */
    /* Example CSS to mimic Stripe's card input */
.payment-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.label {
    font-weight: bold;
    margin-bottom: 5px;
}

.input {
    padding: 10px;
    width: 100%;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

.stripe-card-element {
    padding: 10px;
    width: 100%;
    height: 40px; /* Adjust height as needed */
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

.stripe-button {
    background-color: #6772e5;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.stripe-button:hover {
    background-color: #7795f8;
}


</style>
<div class="payment-form">
    <label for="card-holder-name" class="label">Card Holder Name</label>
    <input id="card-holder-name" type="text" class="input">

    <!-- Stripe Elements Placeholder -->
    <div id="card-element" class="stripe-card-element"></div>

    <button id="card-button" class="stripe-button">
        Process Payment
    </button>
</div>
@endsection

@section('javascript')
<script>
    const primaryKey = '{{ env('STRIPE_KEY') }}';
    const stripe = Stripe(primaryKey);
    const elements = stripe.elements();
    const cardElement = elements.create('card', {
        hidePostalCode: true,
    });

    cardElement.mount('#card-element');
</script>

<script>
    const cardHolderName = document.getElementById('card-holder-name');
    const cardButton = document.getElementById('card-button');

    cardButton.addEventListener('click', async (e) => {
        const { paymentMethod, error } = await stripe.createPaymentMethod(
            'card', cardElement, {
                billing_details: { name: cardHolderName.value }
            }
        );

        if (error) {
            // Display "error.message" to the user...
            console.error(error.message);
        } else {
            // The card has been verified successfully...
            const paymentMethodId = paymentMethod.id;
            // Send paymentMethodId to your server using fetch or AJAX to complete the payment process
            // Example using fetch:
            fetch('/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': "{{csrf_token()}}",
                },
                body: JSON.stringify({ paymentMethodId })
            })

            .then(response => {
                console.log('post response: ',response);
                if (response.ok) {
                    // Payment was successful
                    // Redirect user or show success message
                    console.log("success");
                } else {
                    // Handle payment failure
                    // Display error message to the user or handle accordingly
                    console.log("error");
                }
            })
            .catch(error => {
                // Handle network error or other issues
                // Display an error message or retry payment
                alert("exception");
            });
        }
    });
</script>
@endsection
