
1) npm init --yes ✅
2) estructura de carpetas ✅
   1) crear archivo principal  ✅
   2) carpetas: ✅
      1) routes
      2) public
         1) js
         2) css
         3) html
         4) index.html
      3) data
      4) db
      5) middlewares
3) instalar dependencias ✅
   1) express
   2) mongoose
   3) nanoid 3.0.0
4) Descripción de la API 
   1) Endpoints
      1) GET /api/tareas:   regresa todas las tareas, permite filtros ?titulo,
      2) GET /api/tareas/:id 
      3) POST /api/tareas   mandar propiedades sin id (no se vale titulos repetidos)
      4) PUT  /api/tareas/:id  actualiza las propiedades dadas sin id, no se permiten repetidos
      5) PUT /api/tareas/:id/completar
      6) DELETE /api/tareas/:id   borar esa tarea 
   2) Descripción de los documentos a almacenar
      1) Tareas
        {
            "id": "XGSDFIOSDF",
            "titulo": "tarea de DASW",
            "descripcion": "avance de proyecto",
            "fechaCreacion": 234325345,
            "fechaLimite": 20230424,
            "completada": false
        }
   3) Codificar API
      1) Crear base de datos, esquemas y modelos
   4) validar .http
5) Codificar frontend
   1) Estructura general
   2) Solicitudes a la API
   3) detalles

