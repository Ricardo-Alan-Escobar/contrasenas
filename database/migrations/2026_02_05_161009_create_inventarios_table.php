<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('inventarios', function (Blueprint $table) {
            $table->id();

            $table->string('modelo');
            $table->string('marca');
            $table->string('color')->nullable();

            $table->integer('cantidad_inicial');
            $table->integer('stock_minimo');

            $table->decimal('precio_compra', 10, 2);
            $table->decimal('precio_venta', 10, 2);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('inventarios');
    }
};
