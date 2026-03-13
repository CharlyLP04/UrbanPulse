# Comportamiento de interfaz ante restricciones de acceso

Proyecto: UrbanPulse  
Rol responsable: Frontend  

Este documento describe cómo la interfaz del sistema responde ante diferentes situaciones relacionadas con autenticación y autorización dentro de la aplicación.

La arquitectura de autenticación del sistema utiliza **JWT (JSON Web Tokens)** junto con **cookies seguras** para gestionar las sesiones de los usuarios.

---

# 1. Credenciales inválidas

## Situación
El usuario introduce un correo electrónico o contraseña incorrectos al intentar iniciar sesión en la plataforma.

## Comportamiento de la interfaz

- El sistema muestra un mensaje de error claro al usuario.
- No se redirige a otra página.
- Se permite al usuario intentar nuevamente el inicio de sesión.
- El formulario mantiene los campos editables para que el usuario pueda corregir la información.

## Mensaje mostrado al usuario


---

# 2. Sesión expirada

## Situación

El token de autenticación ha expirado o ya no es válido cuando el usuario intenta acceder a una ruta protegida.

Esto puede suceder cuando:

- La sesión ha superado el tiempo de expiración.
- El token fue invalidado por el servidor.
- El usuario estuvo inactivo durante un periodo prolongado.

## Comportamiento de la interfaz

- El sistema detecta que el token ya no es válido.
- La sesión almacenada en el cliente se elimina.
- El usuario es redirigido automáticamente a la pantalla de inicio de sesión.

## Mensaje mostrado al usuario


---

# 3. Rol insuficiente

## Situación

Un usuario intenta acceder a una sección del sistema para la cual no tiene permisos.

Ejemplo:

Un usuario con rol **USER** intenta acceder a una ruta reservada para **ADMIN**.

## Comportamiento de la interfaz

- El acceso al contenido es bloqueado.
- El sistema muestra una página o mensaje de **acceso denegado**.
- Se ofrece al usuario una opción para regresar a su panel principal.

## Mensaje sugerido


---

# 4. Cierre de sesión

## Situación

El usuario decide cerrar sesión manualmente desde la interfaz del sistema.

## Comportamiento del sistema

- El token JWT se elimina del almacenamiento del cliente.
- Las cookies de sesión se invalidan.
- Se eliminan los datos de sesión activos.
- El usuario es redirigido a la pantalla pública o al login.

## Ruta final
