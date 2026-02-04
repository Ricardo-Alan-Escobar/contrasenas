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
    Route::put('/passwords/{password}', [PasswordController::class, 'update'])->name('passwords.update');
    Route::delete('/passwords/{password}', [PasswordController::class, 'destroy'])->name('passwords.destroy');

    Route::get('/generador', function () {
        return Inertia::render('generador');
    })->name('generador');
});

require __DIR__.'/settings.php';