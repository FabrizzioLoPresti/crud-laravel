<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Producto;
use Illuminate\Http\Request;

class ProductoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $productos = Producto::all();

        if ($productos->isEmpty())
            return response()->json([
                'message' => 'No hay productos registrados',
                'data' => []
            ], 404);

        return response()->json([
            'message' => 'Lista de productos',
            'data' => $productos->load(['categoria'])
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        try {
            $producto = Producto::create($request->all());

            return response()->json([
                'message' => 'Producto creado',
                'data' => $producto->load(['categoria'])
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al crear el producto',
                'data' => []
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $producto = Producto::find($id);

        if (!$producto)
            return response()->json([
                'message' => 'No se encontró el producto',
                'data' => []
            ], 404);

        return response()->json([
            'message' => 'Producto encontrado',
            'data' => $producto->load(['categoria'])
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        try {
            $producto = Producto::find($id);

            if (!$producto)
                return response()->json([
                    'message' => 'No se encontró el producto',
                    'data' => []
                ], 404);

            $producto->update($request->all());

            return response()->json([
                'message' => 'Producto actualizado',
                'data' => $producto->load(['categoria'])
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al actualizar el producto',
                'data' => []
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        try {
            $producto = Producto::find($id);

            if (!$producto)
                return response()->json([
                    'message' => 'No se encontró el producto',
                    'data' => []
                ], 404);

            $producto->delete();

            return response()->json([
                'message' => 'Producto eliminado',
                'data' => $producto->load(['categoria'])
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al eliminar el producto',
                'data' => []
            ], 500);
        }
    }
}
