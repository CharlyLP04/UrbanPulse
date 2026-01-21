 Sitemap (Mapa del Sitio)

 graph TD
    subgraph PÚBLICO [Zona Pública]
        A[Landing Page /] --> B[Login /login]
        A --> C[Registro /register]
        A --> D[Términos Legales /legal]
    end

    subgraph PRIVADO [Zona Privada / Requiere Auth]
        B --> |Auth Exitosa| E[Feed Principal /app]
        E --> F[Crear Reporte /report/new]
        E --> G[Perfil de Usuario /profile]
        E --> H[Detalle de Reporte /report/:id]
        
        F --> |Al enviar| E
        H --> |Al comentar/votar| H
    end

    style PÚBLICO fill:#e1f5fe,stroke:#01579b,stroke-width:2px
    style PRIVADO fill:#fff3e0,stroke:#e65100,stroke-width:2px

Flujo Crítico de Usuario (User Flow)

Caso de Uso: "Ciudadano crea un reporte de bache"

Este diagrama de secuencia ilustra la interacción entre el Usuario, el Frontend (Interfaz) y el Backend (API) para el proceso más importante de la app.

sequenceDiagram
    participant U as Usuario (Ciudadano)
    participant F as Frontend (UI)
    participant B as Backend (API)
    participant D as Base de Datos

    Note over U, F: El usuario ya inició sesión

    U->>F: Clic en "Crear Reporte"
    F->>U: Muestra formulario (Paso 1: Ubicación)
    U->>F: Selecciona ubicación en mapa
    F->>U: Pide detalles (Paso 2: Datos)
    U->>F: Escribe título, descripción y sube foto
    U->>F: Clic en "Enviar Reporte"
    
    F->>B: POST /api/reports (Token + Datos)
    
    activate B
    B->>B: Valida Token de sesión
    B->>B: Valida datos (sin groserías, coords válidas)
    B->>D: INSERT INTO reports...
    D-->>B: Retorna ID: 1054
    B-->>F: HTTP 201 Created (Success)
    deactivate B

    F->>U: Redirecciona al Feed con mensaje "Reporte Creado"
