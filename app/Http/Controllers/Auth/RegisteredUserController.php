<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */



     public function edit($id){

        $user = User::find($id);
        if($user){

            return [
                'success'=>true,
                'user'=>$user
            ];
        }
        else {

            return [
                'success'=>false,
                'user'=>[]
            ];
        }
     }
    public function deleteUser(Request $request)
    {
        $request->validate([
            'id' => 'required|exists:users,id',
        ]);

        $user = User::find($request->id);

        if (!$user) {
            return response()->json(['success' => false, 'message' => 'User not found'], 404);
        }

        $user->delete();

        return response()->json(['success' => true, 'message' => 'User deleted successfully']);
    }


    public function updateUser(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'batch' => 'required|string',
            'phone' => 'required',
            'semester' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255',
            'class_id' => ['required', 'integer'],
        ]);

        $user = User::find($request->id);

        if (!$user) {
            return response()->json(['success' => false, 'message' => 'User not found'], 404);
        }

        $dataToUpdate = [
            'name' => $request->name,
            'email' => $request->email,
            'class_id' => $request->class_id,
            'semester' => $request->semester,
            'phone' => $request->phone,
            'batch' => $request->batch,
        ];

        if ($request->has('password')) {
            $dataToUpdate['password'] = bcrypt($request->password);
        }

        $user->update($dataToUpdate);

        return response()->json(['success' => true, 'user' => $user]);
    }


    public function saveUser(Request $request)
    {


        $request->validate([
            'name' => 'required|string|max:255',
            'batch' => 'required|string|max:25',
            'phone' => 'required',
            'semester' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'string'],
            'class_id' => ['required', 'integer'],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'class_id' => $request->class_id,
            'semester' => $request->semester,
            'phone' => $request->phone,
            'batch' => $request->batch,
        ]);

        if ($user->id) {
            return ['success' => true, 'user' => $user];
        } else {
            return ['success' => false, 'user' => $user];
        }

    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }
}
