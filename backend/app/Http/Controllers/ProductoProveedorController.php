<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\ProductoProveedor;
use Illuminate\Http\Request;
use Ramsey\Uuid\Type\Integer;

class ProductoProveedorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(string $producto_id)
    {
        //
        $productoProveedor = ProductoProveedor::where('producto_id', $producto_id)->get();

        if ($productoProveedor->isEmpty()) {
            return response()->json([
                'message' => 'No hay proveedores registrados para este producto',
                'data' => []
            ], 404);
        }

        return response()->json([
            'message' => 'Lista de proveedores para este producto',
            'data' => $productoProveedor->load(['producto', 'proveedor'])
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, string $producto_id)
    {
        //
        try {
            $productoProveedor = new ProductoProveedor();
            $productoProveedor->producto_id = (int)$producto_id;
            $productoProveedor->proveedor_id = $request->proveedor_id;
            $productoProveedor->precio = $request->precio;
            $productoProveedor->save();

            return response()->json([
                'message' => 'Producto proveedor registrado',
                'data' => $productoProveedor->load(['producto', 'proveedor'])
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al registrar el producto proveedor',
                'error' => $th->getMessage(),
                'data' => []
            ], 400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $producto_id, string $proveedor_id)
    {
        //
        $productoProveedor = ProductoProveedor::where('producto_id', $producto_id)->where('proveedor_id', $proveedor_id)->first();

        if (!$productoProveedor) {
            return response()->json([
                'message' => 'No se encontro el producto proveedor',
                'data' => []
            ], 404);
        }

        return response()->json([
            'message' => 'Producto proveedor encontrado',
            'data' => $productoProveedor->load(['producto', 'proveedor'])
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $producto_id, string $proveedor_id)
    {
        //
        try {
            $productoProveedor = ProductoProveedor::where('producto_id', $producto_id)->where('proveedor_id', $proveedor_id)->first();

            if (!$productoProveedor) {
                return response()->json([
                    'message' => 'No se encontro el producto proveedor',
                    'data' => []
                ], 404);
            }

            $productoProveedor->precio = $request->input('precio');
            // return $productoProveedor;
            $productoProveedor->save();

            return response()->json([
                'message' => 'Producto proveedor actualizado',
                'data' => $productoProveedor->load(['producto', 'proveedor'])
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al actualizar el producto proveedor',
                'error' => $th->getMessage(),
                'data' => []
            ], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $producto_id, string $proveedor_id)
    {
        //
        try {
            $productoProveedor = ProductoProveedor::where('producto_id', $producto_id)->where('proveedor_id', $proveedor_id)->first();

            if (!$productoProveedor) {
                return response()->json([
                    'message' => 'No se encontro el producto proveedor',
                    'data' => []
                ], 404);
            }

            $productoProveedor->delete();

            return response()->json([
                'message' => 'Producto proveedor eliminado',
                'data' => $productoProveedor->load(['producto', 'proveedor'])
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al eliminar el producto proveedor',
                'error' => $th->getMessage(),
                'data' => []
            ], 400);
        }
    }
}
