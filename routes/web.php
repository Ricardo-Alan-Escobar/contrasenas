<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\PasswordController;

// Ruta pública
Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

// Rutas autenticadas
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [PasswordController::class, 'index'])->name('dashboard');
    Route::post('/passwords', [PasswordController::class, 'store'])->name('passwords.store');
});

require __DIR__.'/settings.php';