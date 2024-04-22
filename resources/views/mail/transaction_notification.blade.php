<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fee Payment Confirmation</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-ZenhVNpHmPQ0oW9R7vZc6iIWkTKN9s7X67AZEG4S+/IgONN0vbOMGyXsrjEGz/eR" crossorigin="anonymous">
    <style>
        .table {
            width: 100%;
            max-width: 100%;
            margin-bottom: 0;
            background-color: transparent;
        }
        .table th,
        .table td {
            padding: 0.75rem;
            vertical-align: top;
            border-top: 1px solid #ddd;
        }
    </style>
</head>
<body>
    <div class="container mt-5">
        <h1>Dear {{ $transaction->user->name }},</h1>
        <p>This email confirms your fee payment for semester {{ $transaction->fee->semester }}.</p>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th scope="col">Transaction Details</th>
                    <th scope="col">Amount</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Total Fee</td>
                    <td>{{ number_format($transaction->fee->fee, 2) }}</td>
                </tr>
                <tr>
                    <td>Payment Received</td>
                    <td>{{ number_format($transaction->total_amount, 2) }}</td>
                </tr>
                @if ($transaction->remaining_fee > 0)
                    <tr>
                        <td>Remaining Dues</td>
                        <td>{{ number_format($transaction->remaining_fee, 2) }}</td>
                    </tr>
                @endif
                @if ($transaction->late_fine > 0)
                    <tr>
                        <td>Late Fee</td>
                        <td>{{ number_format($transaction->late_fine, 2) }}</td>
                    </tr>
                @endif
            </tbody>
        </table>
        <p>
            @if ($transaction->remaining_fee > 0)
                **Please note:** You have a remaining balance of {{ number_format($transaction->remaining_fee, 2) }} for semester {{ $transaction->fee->semester }}. We encourage you to settle this balance at your earliest convenience.
            @else
                Your fee payment for semester {{ $transaction->fee->semester }} has been settled in full.
            @endif
        </p>
        <p>Payment details:</p>
        <ul>
            <li>Card Holder: {{ $transaction->card_holder }}</li>
            <li>Payment Method: {{ $transaction->payment_method }}</li>
        </ul>
        <p>Thank you for your payment.</p>
        <p>Sincerely,</p>
        <p>The {{ config('app.name') }} Administration</p>
    </div>
</body>
</html>
