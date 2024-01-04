<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Direccion;
use App\Models\Proveedor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProveedorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $proveedores = Proveedor::all();

        if ($proveedores->isEmpty())
            return response()->json([
                'message' => 'No hay proveedores registrados',
                'data' => []
            ], 404);

        return response()->json([
            'message' => 'Lista de proveedores',
            'data' => $proveedores->load(['direccion'])
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // return $request->all();
        // Iniciar una transacción de base de datos
        DB::beginTransaction();

        try {
            // Crear el proveedor sin la dirección
            $proveedor = Proveedor::create($request->except('direccion'));

            // Verificar si el proveedor se creó correctamente
            if (!$proveedor) {
                throw new \Exception('Error al crear el proveedor');
            }

            // Extraer datos de dirección del request
            $direccionData = $request->get('direccion');

            // Crear la dirección con el ID del proveedor
            $direccionData['proveedor_id'] = $proveedor->id;
            $direccion = Direccion::create($direccionData);

            // Verificar si la dirección se creó correctamente
            if (!$direccion) {
                throw new \Exception('Error al crear la dirección');
            }

            // Commit de la transacción si todo fue exitoso
            DB::commit();
        } catch (\Exception $e) {
            // Rollback de la transacción en caso de error
            DB::rollback();

            return response()->json([
                'message' => 'Ocurrió un error al registrar proveedor y dirección',
                'data' => []
            ], 500);
        }

        return response()->json([
            'message' => 'Proveedor y dirección registrados correctamente',
            'data' => $proveedor->load(['direccion'])
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $proveedor = Proveedor::find($id);

        if (!$proveedor)
            return response()->json([
                'message' => 'No se encontró el proveedor',
                'data' => []
            ], 404);

        return response()->json([
            'message' => 'Proveedor encontrado',
            'data' => $proveedor->load(['direccion'])
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        DB::beginTransaction();

        try {
            $proveedor = Proveedor::find($id);

            if (!$proveedor)
                return response()->json([
                    'message' => 'No se encontró el proveedor',
                    'data' => []
                ], 404);

            $proveedor->update($request->except('direccion'));

            $direccionData = $request->get('direccion');

            $direccion = $proveedor->direccion;

            $direccion->update($direccionData);

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollback();

            return response()->json([
                'message' => 'Error al actualizar el proveedor',
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
            $proveedor = Proveedor::find($id);

            if (!$proveedor)
                return response()->json([
                    'message' => 'No se encontró el proveedor',
                    'data' => []
                ], 404);

            $proveedor->delete();

            return response()->json([
                'message' => 'Proveedor eliminado correctamente',
                'data' => $proveedor->load(['direccion'])
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al eliminar el proveedor',
                'data' => []
            ], 500);
        }
    }
}
