# Modelo de Usuarios, Roles y Permisos

## Tipos de usuario del sistema
- **Usuario Ciudadano**
  - Puede registrarse en la plataforma.
  - Puede crear reportes.
  - Puede comentar en reportes.
  - Puede votar reportes.

- **Administrador**
  - Puede gestionar reportes.
  - Puede moderar comentarios.
  - Puede gestionar usuarios.

---

## Roles definidos
- `USER`
- `ADMIN`

---

## Permisos por recurso / acción

### Reportes
| Acción | USER | ADMIN |
|------|------|------|
| Crear reporte | ✅ | ✅ |
| Ver reportes | ✅ | ✅ |
| Editar reporte | ❌ | ✅ |
| Eliminar reporte | ❌ | ✅ |

### Comentarios
| Acción | USER | ADMIN |
|------|------|------|
| Crear comentario | ✅ | ✅ |
| Eliminar comentario | ❌ | ✅ |

### Usuarios
| Acción | USER | ADMIN |
|------|------|------|
| Ver perfil | ✅ | ✅ |
| Gestionar usuarios | ❌ | ✅ |

---

## Matriz Rol-Permiso completa

| Recurso | Acción | USER | ADMIN |
|------|------|------|------|
| Reporte | Crear | ✅ | ✅ |
| Reporte | Editar | ❌ | ✅ |
| Reporte | Eliminar | ❌ | ✅ |
| Comentario | Crear | ✅ | ✅ |
| Comentario | Eliminar | ❌ | ✅ |
| Usuario | Gestionar | ❌ | ✅ |