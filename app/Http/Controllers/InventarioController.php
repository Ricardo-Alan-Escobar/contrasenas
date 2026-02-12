<?php

namespace App\Http\Controllers;
 
use App\Models\Inventario;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InventarioController extends Controller
{
    public function index()
    {
        return Inertia::render('inventario', [
            'items' => Inventario::orderBy('created_at', 'desc')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'modelo' => 'required|string|max:255',
            'marca' => 'required|string|max:255',
            'color' => 'required|string|max:100',
            'cantidad_inicial' => 'required|integer|min:0',
            'stock_minimo' => 'required|integer|min:0',
            'precio_compra' => 'required|numeric|min:0',
            'precio_venta' => 'required|numeric|min:0',
        ]);

        Inventario::create($validated);

        return redirect()->back();
    }

    public function update(Request $request, Inventario $inventario)
    {
        $validated = $request->validate([
            'modelo' => 'required|string|max:255',
            'marca' => 'required|string|max:255',
            'color' => 'required|string|max:100',
            'cantidad_inicial' => 'required|integer|min:0',
            'stock_minimo' => 'required|integer|min:0',
            'precio_compra' => 'required|numeric|min:0',
            'precio_venta' => 'required|numeric|min:0',
        ]);

        $inventario->update($validated);

        return redirect()->back();
    }

    public function destroy(Inventario $inventario)
    {
        $inventario->delete();

        return redirect()->back();
    }
    public function stockBajo()
{
    return Inertia::render('stokbajo', [
        'items' => Inventario::where(function($query) {
            $query->whereRaw('cantidad_inicial <= stock_minimo')
                  ->orWhere('cantidad_inicial', 0);
        })
        ->orderBy('cantidad_inicial', 'asc')
        ->get(),
    ]);
}

public function reportes()
{
    return Inertia::render('reportes', [
        'items' => Inventario::orderBy('created_at', 'desc')->get(),
    ]);
}
}