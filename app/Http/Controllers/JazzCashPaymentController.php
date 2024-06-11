<?php

namespace App\Http\Controllers;

use Http;
use Illuminate\Http\Request;
use zfhassaan\JazzCash\JazzCash;

class JazzCashPaymentController extends Controller
{

    public function checkout(Request $request)
    {
        $amount = 403;
        $billReference = uniqid('ref_'); // Generate a unique bill reference

        $jazzcash = new JazzCash();
        $jazzcash->setAmount(302);
        $jazzcash->setBillReference($billReference);
        return $jazzcash->sendRequest();

        if ($checkoutUrl) {
            return redirect()->away($checkoutUrl); // Redirect user to JazzCash checkout
        } else {
            // Handle errors during request initiation
            return back()->withErrors(['error' => $jazzcash->getMessage()]);
        }
    }
    public function handleCallback(Request $request)
    {
        $jazzcash = new JazzCash(config('jazzcash'));

        if ($jazzcash->verifyResponse($request->all())) {
            if ($jazzcash->transactionStatus() === 'Approved') {
                $orderId = $jazzcash->orderId(); // Get the order ID from the response
                // ...

                return response()->json(['success' => true]);
            } else {
                return response()->json(['error' => 'Payment failed']);
            }
        } else {
            return response()->json(['error' => 'Invalid JazzCash response']);
        }
    }
    
}
