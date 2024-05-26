<?php

namespace App\Http\Controllers;

use App\Mail\FeeNotification;
use App\Mail\TransactionNotification;
use App\Models\FeeStructure;
use App\Models\FeeSubmission;
use App\Models\Transaction;
use Auth;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Mail;

class TransactionController extends Controller
{

    public function index($id = null)
    {

        if ($id) {
            $transactiones = Transaction::find($id);
        } else {

            $user = Auth::user();
            if ($user) {
                if ($user->role == 'admin') {
                    $transactiones = Transaction::with('fee')->with('user')->get();
                } else {
                    $transactiones = Transaction::where('user_id', $user->id)->with('fee')->with('user')->get();
                }
            }
        }
        return [
            "transactions" => $transactiones,
            "success" => true,
        ];
    }
    public function checkout(Request $request)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $request->validate([
            'total_amount' => 'required|string|max:255',
            'card_holder' => 'required|string|max:255',
            'card_no' => 'required|string|max:255',
            'credit_expiry' => 'required|string|max:255',
            'credit_cvc' => 'required|string|max:255',
            'late_fine' => 'string|max:255',
            'payment_method' => 'required|string|max:255',
            'fee_id' => 'required',
        ]);

        $fee = FeeStructure::find($request->input('fee_id'));

        if (!$fee) {
            return response()->json(['error' => 'Fee not found'], 404);
        }

        $current_late_fee_fine = $request->input('late_fine');
        $late_fine = $fee->late_fee_fine;
        $payable_amount = $request->input('total_amount');

        $due_date = Carbon::parse($fee->due_date);

        if ($due_date->isPast()) {
            // dd('you are paying it late');
            $payable_amount += $late_fine;
            $current_late_fee_fine = $late_fine;
        }else {
            // dd('due date is not over yet');
        }

        $prev_transactions = Transaction::select('total_amount', 'remaining_fee')->where('fee_id', $fee->id)->where('user_id', Auth::id())->get();
        $total_amount_paid = 0;

        if (count($prev_transactions) > 0) {
            foreach ($prev_transactions as $trans) {
                $total_amount_paid = $total_amount_paid + intval($trans->total_amount);
            }
        }

        $total_remaining_fee = $fee->fee - $total_amount_paid;

        if ($total_remaining_fee > 0) {

            $transaction = new Transaction();
            $transaction->email = $user->email;
            $transaction->total_amount = $payable_amount;
            $transaction->card_holder = $request->input('card_holder');
            $transaction->card_no = $request->input('card_no');
            $transaction->credit_cvc = $request->input('card_no');
            $transaction->credit_expiry = $request->input('credit_expiry');
            $transaction->late_fine = $current_late_fee_fine;
            $transaction->payment_method = $request->input('payment_method');
            $transaction->remaining_fee = $total_remaining_fee - $payable_amount;
            $transaction->fee_id = $request->input('fee_id');
            $transaction->user_id = $user->id;
            $transaction->save();

            if ($transaction->remaining_fee <= 0) {
                $fee_submission = new FeeSubmission();
                $fee_submission->user_id = $user->id;
                $fee_submission->fee_id = $fee->id;
                $fee_submission->save();
            }

            Mail::to($user->email)->send(new TransactionNotification($transaction));

            return [
                "transaction" => $transaction,
                "success" => true,
            ];
        } else {
            return [
                "transaction" => [],
                "success" => false,
                'messag' => 'There are no remaining dues'
            ];
        }

    }

}
