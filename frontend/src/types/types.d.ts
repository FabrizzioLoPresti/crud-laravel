export type CategoriaType = {
  id: number;
  nombre: string;
  descripcion?: string;
  activo: boolean;
  created_at: string;
  updated_at: string;
}

export type ProductoType = {
  id?: number;
  nombre: string;
  descripcion?: string;
  precio_lista: number;
  stock: number;
  activo?: boolean;
  categoria_id: number;
  created_at?: string;
  updated_at?: string;
  categoria?: CategoriaType
}

export type DireccionType = {
  id?: number;
  calle: string;
  numero: number;
  barrio: string;
  ciudad: string;
  provincia: string;
  proveedor_id?: number;
  created_at?: string;
  updated_at?: string;
}

export type ProviderType = {
  id?: number;
  nombre: string;
  telefono: string;
  email: string;
  direccion: DireccionType;
  estado?: boolean;
  created_at?: string;
  updated_at?: string;
}

export type ProductoProveedorType = {
  id?:           number;
  producto_id:  number;
  proveedor_id: number;
  precio?:       number;
  created_at?:   Date;
  updated_at?:   Date;
  producto?:     ProductoType;
  proveedor?:    ProviderType;
}

export type ApiResponseType<T> = {
  data: T;
  message: string;
}