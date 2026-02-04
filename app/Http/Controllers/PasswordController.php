<?php

namespace App\Http\Controllers;

use App\Models\Password;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PasswordController extends Controller
{
    public function index()
    {
        return Inertia::render('dashboard', [
            'passwords' => Password::where('user_id', auth()->id())->get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'site_name' => 'required|string|max:255',
            'site_url' => 'nullable|url',
            'username' => 'required|string|max:255',
            'password' => 'required|string',
            'category' => 'nullable|string|max:100',
            'notes' => 'nullable|string',
        ]);

        Password::create([
            'user_id' => auth()->id(),
            ...$request->only([
                'site_name',
                'site_url',
                'username',
                'password',
                'category',
                'notes',
            ]),
        ]);

        return back();
    }

    public function update(Request $request, Password $password)
    {
        abort_if($password->user_id !== auth()->id(), 403);

        $request->validate([
            'site_name' => 'required|string|max:255',
            'site_url' => 'nullable|url',
            'username' => 'required|string|max:255',
            'password' => 'required|string',
            'category' => 'nullable|string|max:100',
            'notes' => 'nullable|string',
        ]);

        $password->update($request->only([
            'site_name',
            'site_url',
            'username',
            'password',
            'category',
            'notes',
        ]));

        return back();
    }

    public function destroy(Password $password)
    {
        abort_if($password->user_id !== auth()->id(), 403);

        $password->delete();

        return back();
    }
}
