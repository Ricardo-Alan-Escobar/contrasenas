<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inventario extends Model
{
    use HasFactory;

    protected $fillable = [
        'modelo',
        'marca',
        'color',
        'cantidad_inicial',
        'stock_minimo',
        'precio_compra',
        'precio_venta',
    ];
}
