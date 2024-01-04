<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Proveedor extends Model
{
    use HasFactory;

    protected $table = 'proveedores';

    protected $fillable = [
        'nombre',
        'telefono',
        'email',
        'estado',
    ];

    public function direccion()
    {
        return $this->hasOne(Direccion::class);
    }

    public function productos()
    {
        return $this->belongsToMany(Producto::class);
    }
}
