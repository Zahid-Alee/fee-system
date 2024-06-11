<?php

namespace App\Http\Controllers;

use App\Mail\FeeNotification;
// use App\Mail\FeeSubmission;
use App\Mail\TransactionNotification;
use App\Models\FeeStructure;
use App\Models\FeeSubmission;
use App\Models\StudentClass;
use App\Models\Transaction;
use App\Models\User;
use Auth;
use Illuminate\Http\Request;
use Mail;

class FeeStructureController extends Controller
{

    public function index($id = null)
    {

        if ($id) {

            $user_id = Auth::id();

            $studentFees = FeeStructure::where('id', $id)
                ->with([
                    'transactions' => function ($query) use ($user_id) {
                        $query->where('user_id', $user_id);
                    }
                ])
                ->get();

        } else {

            $studentFees = FeeStructure::with('studentClass')->get();
        }
        return [
            "fees" => $studentFees,
            "success" => true,
        ];
    }
    public function store(Request $request)
    {
        try {
            $request->validate([
                'semester' => 'required|string|max:255',
                'fee' => 'required',
                'class_id' => 'required|integer',
                'due_date' => 'required',
                'installments_allowed' => '',
                'late_fee_fine' => '',
                'min_fee_per_installment' => '',
            ]);

            $studentFee = new FeeStructure();
            $studentFee->semester = $request->input('semester');
            $studentFee->fee = $request->input('fee');
            $studentFee->installments_allowed = $request->input('installments_allowed');
            $studentFee->min_fee_per_installment = $request->input('min_fee_per_installment');
            $studentFee->late_fee_fine = $request->input('late_fee_fine');
            $studentFee->due_date = $request->input('due_date');
            $studentFee->class_id = $request->input('class_id');
            $studentFee->save();

            $users_emails = User::where('class_id', $request->input('class_id'))
                ->where('semester', $request->input('semester'))
                ->pluck('email');

            foreach ($users_emails as $email) {
                $current_user = User::where('email', $email)->first();
                if ($current_user->scholorship) {

                    $transaction = new Transaction();
                    $transaction->email = $current_user->email;
                    $transaction->total_amount = $request->input('fee');
                    $transaction->card_holder = 'UNIVERSITY OF SAHIWAL';
                    $transaction->card_no = '1234-5678-9012-3456';
                    $transaction->credit_cvc = '345';
                    $transaction->credit_expiry = '10/25';
                    $transaction->late_fine = 0;
                    $transaction->payment_method = 'Master';
                    $transaction->remaining_fee = 0;
                    $transaction->fee_id = $studentFee->id;
                    $transaction->user_id = $current_user->id;
                    $created_trans = $transaction->save();

                    if ($created_trans) {
                        $fee_submission = new FeeSubmission();
                        $fee_submission->user_id = $current_user->id;
                        $fee_submission->fee_id = $studentFee->id;
                        $saved_fee_submission = $fee_submission->save();

                        if($saved_fee_submission){
                            Mail::to($current_user->email)->send(new TransactionNotification($transaction));
                        }
                    }

                } else {
                    // dd('user has not awarded scholorhip');
                    $feeNotification = new FeeNotification($studentFee);
                    Mail::to($email)->send($feeNotification);
                }
            }

            return [
                "fees" => $studentFee,
                "success" => true,
            ];
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }




    public function update(Request $request)
    {
        $request->validate([
            'semester' => 'required|string|max:255',
            'fee' => 'required',
            'class_id' => 'required|integer',
            'due_date' => 'required',
            'installments_allowed' => '',
            'late_fee_fine' => '',
            'min_fee_per_installment' => '',
        ]);

        // $semester = $request->input('semester');
        // $fee = $request->input('fee');
        // $class_id = $request->input('class_id');
        // $due_date = $request->input('due_date');

        $studentFee = FeeStructure::find($request->input('id'));

        $studentFee->semester = $request->input('semester');
        $studentFee->fee = $request->input('fee');
        $studentFee->installments_allowed = $request->input('installments_allowed');
        $studentFee->min_fee_per_installment = $request->input('min_fee_per_installment');
        $studentFee->late_fee_fine = $request->input('late_fee_fine');
        $studentFee->due_date = $request->input('due_date');
        $studentFee->class_id = $request->input('class_id');
        $studentFee->save();

        return [
            "fees" => $studentFee,
            "success" => true,
        ];
    }

    public function destroy(Request $request)
    {

        $id = $request->input('id');
        FeeStructure::destroy($id);
        return [
            "success" => true,
        ];
    }
}
