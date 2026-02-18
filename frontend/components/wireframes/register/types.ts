export type RegisterData = {
  nombre: string
  telefono: string
  ciudad: string
  colonia: string
  email: string
  password: string
  confirmPassword: string
  rol: string
  terms: boolean
  newsletter: boolean
}

export type RegisterTextField =
  | 'nombre'
  | 'telefono'
  | 'ciudad'
  | 'colonia'
  | 'email'
  | 'password'
  | 'confirmPassword'
  | 'rol'
