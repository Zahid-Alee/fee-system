<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fee Notification</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-ZenhVNpHmPQ0oW9R7vZc6iIWkTKN9s7X67AZEG4S+/IgONN0vbOMGyXsrjEGz/eR" crossorigin="anonymous">
</head>
<body>
    <div class="container mt-5">  <h1>Dear Student,</h1>
        <p>This email is to notify you about the fee details for semester {{ $fee->semester }}.</p>
        <div class="alert alert-info" role="alert">
            <i class="fas fa-money-bill-wave"></i>  The total fee amount is: <strong>{{ number_format($fee->fee, 2) }}</strong>
        </div>
        <p>The due date is: {{ $fee->due_date }}</p>
        <p>For further information on fee payment options, please visit our website or contact the administration office.</p>
        <p>Sincerely,</p>
        <p>The {{ config('app.name') }} Administration</p>
    </div>
</body>
</html>
