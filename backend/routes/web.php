<?php

use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\ProductoProveedorController;
use App\Http\Controllers\ProveedorController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

// Optimización de rutas
Route::prefix('api')->group(function () {
    Route::get('/proveedores', [ProveedorController::class, 'index'])->name('proveedores.index');
    Route::get('/proveedores/{id}', [ProveedorController::class, 'show'])->name('proveedores.show');
    Route::post('/proveedores', [ProveedorController::class, 'store'])->name('proveedores.store');
    Route::put('/proveedores/{id}', [ProveedorController::class, 'update'])->name('proveedores.update');
    Route::delete('/proveedores/{id}', [ProveedorController::class, 'destroy'])->name('proveedores.destroy');

    Route::get('/categorias', [CategoriaController::class, 'index'])->name('categorias.index');
    Route::get('/categorias/{id}', [CategoriaController::class, 'show'])->name('categorias.show');
    Route::post('/categorias', [CategoriaController::class, 'store'])->name('categorias.store');
    Route::put('/categorias/{id}', [CategoriaController::class, 'update'])->name('categorias.update');
    Route::delete('/categorias/{id}', [CategoriaController::class, 'destroy'])->name('categorias.destroy');

    Route::get('/productos', [ProductoController::class, 'index'])->name('productos.index');
    Route::get('/productos/{id}', [ProductoController::class, 'show'])->name('productos.show');
    Route::post('/productos', [ProductoController::class, 'store'])->name('productos.store');
    Route::put('/productos/{id}', [ProductoController::class, 'update'])->name('productos.update');
    Route::delete('/productos/{id}', [ProductoController::class, 'destroy'])->name('productos.destroy');

    Route::get('/productos/{producto_id}/proveedores', [ProductoProveedorController::class, 'index'])->name('productos_proveedores.index');
    Route::get('/productos/{producto_id}/proveedores/{proveedor_id}', [ProductoProveedorController::class, 'show'])->name('productos_proveedores.show');
    Route::post('/productos/{producto_id}/proveedores', [ProductoProveedorController::class, 'store'])->name('productos_proveedores.store');
    Route::put('/productos/{producto_id}/proveedores/{proveedor_id}', [ProductoProveedorController::class, 'update'])->name('productos_proveedores.update');
    Route::delete('/productos/{producto_id}/proveedores/{proveedor_id}', [ProductoProveedorController::class, 'destroy'])->name('productos_proveedores.destroy');
});
