<?php

namespace App\Http\Controllers;

use App\Models\FeeStructure;
use App\Models\FeeSubmission;
use App\Models\StudentClass;
use App\Models\Transaction;
use App\Models\User;
use Auth;
use Illuminate\Http\Request;

class FeeSubmissionController extends Controller
{


    public function dashboardAnalytics($s_id = null)
    {

        $user = Auth::user();

        if ($user['role'] == 'student') {
            
        }

        $registration_count = User::count() - 1;
        $department_count = StudentClass::count();
        $total_revenue = Transaction::sum('total_amount');


        return [
            'registrations' => $registration_count,
            'departments' => $department_count,
            'total_revenue' => $total_revenue,
        ];

    }
    public function index()
    {
        $user = Auth::user();
        $studentFees = $user->fees()
            ->where('semester', $user->semester)
            ->get();

        $studentFeeDetails = [];

        foreach ($studentFees as $studentFee) {
            $status = $user->hasSubmittedFee($studentFee->id) ? 'Paid' : 'Pending';

            $feeStructure = FeeStructure::find($studentFee->id);

            if ($feeStructure) {
                $studentFeeDetails[] = [
                    'id' => $feeStructure->id,
                    'due_date' => $feeStructure->due_date,
                    'semester' => $feeStructure->semester,
                    'fee' => $feeStructure->fee,
                    'status' => $status,
                    'created_at' => $feeStructure->created_at,
                ];
            }
        }

        return response()->json(['fees' => $studentFeeDetails]);
    }


    public function store(Request $request)
    {
        $request->validate([
            'semester' => 'required|string|max:255',
            'fee' => 'required',
            'class_id' => 'required|integer',
            'due_date' => 'required',
        ]);

        $studentFee = new FeeSubmission();
        $studentFee->semester = $request->input('semester');
        $studentFee->fee = $request->input('fee');
        $studentFee->due_date = $request->input('due_date');
        $studentFee->class_id = $request->input('class_id');
        $studentFee->save();

        return [
            "fees" => $studentFee,
            "success" => true,
        ];
    }
}
