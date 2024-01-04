<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Categoria;
use Illuminate\Http\Request;

class CategoriaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $categorias = Categoria::all();

        if ($categorias->isEmpty())
            return response()->json([
                'message' => 'No hay categorías registradas',
                'data' => []
            ], 404);

        return response()->json([
            'message' => 'Lista de categorías',
            'data' => $categorias
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        try {
            $categoria = Categoria::create($request->all());

            return response()->json([
                'message' => 'Categoría creada',
                'data' => $categoria
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al crear la categoría',
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
        $categoria = Categoria::find($id);

        if (!$categoria)
            return response()->json([
                'message' => 'No se encontró la categoría',
                'data' => []
            ], 404);

        return response()->json([
            'message' => 'Categoría encontrada',
            'data' => $categoria
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        try {
            $categoria = Categoria::find($id);

            if (!$categoria)
                return response()->json([
                    'message' => 'No se encontró la categoría',
                    'data' => []
                ], 404);

            $categoria->update($request->all());

            return response()->json([
                'message' => 'Categoría actualizada',
                'data' => $categoria
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al actualizar la categoría',
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
            $categoria = Categoria::find($id);

            if (!$categoria)
                return response()->json([
                    'message' => 'No se encontró la categoría',
                    'data' => []
                ], 404);

            $categoria->delete();

            return response()->json([
                'message' => 'Categoría eliminada',
                'data' => $categoria
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al eliminar la categoría',
                'data' => []
            ], 500);
        }
    }
}
