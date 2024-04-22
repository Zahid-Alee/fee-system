<?php

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\FeeStructureController;
use App\Http\Controllers\FeeSubmissionController;
use App\Http\Controllers\JazzCashPaymentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StudentClassController;
use App\Http\Controllers\TransactionController;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard/{any?}/{id?}/{user_id?}', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::get('/users/all',function() {
    return  User::where('role','student')->with('studentClass')->get();
});


Route::controller(RegisteredUserController::class)->group(function () {
    Route::post('/save/user','saveUser')->name('save.user');
    Route::post('/update/user','updateUser')->name('update.user');
    Route::post('/delete/user','deleteUser')->name('delete.user');
    Route::get('/api/user/{id?}','edit')->name('user.view');
});


Route::controller(StudentClassController::class)->group(function () {
    
    Route::get('/view/class','index')->name('view.class');
    Route::post('/save/class','store')->name('save.class');
    Route::post('/update/class','update')->name('update.class');
    Route::post('/delete/class','destroy')->name('delete.class');
});


Route::controller(FeeStructureController::class)->group(function () {
    
    Route::get('/view/fee/{id?}','index')->name('view.fee');
    Route::post('/save/fee','store')->name('save.fee');
    Route::post('/update/fee','update')->name('update.fee');
    Route::post('/delete/fee','destroy')->name('delete.fee');
});


Route::controller(FeeSubmissionController::class)->group(function () {
    
    Route::get('/view/submission','index')->name('view.submission');
    Route::post('/save/submission','store')->name('save.submission');
});

Route::controller(TransactionController::class)->group(function () {
    
    Route::post('/checkout','checkout')->name('make.checkout');
    Route::get('/view/transaction','index')->name('view.transaction');

    // Route::post('/payment/callback','handleCallback')->name('save.callback');
});



    // Route::post('/checkout', 'JazzCashPaJazzCashPaymentControllerymentController@checkout');
// Route::post('/payment/callback', 'JazzCashPaymentController@/payment/callback');



require __DIR__.'/auth.php';
